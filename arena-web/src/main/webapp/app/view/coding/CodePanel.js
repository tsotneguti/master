/**
 * Created by tsotne on 5/25/15.
 */
Ext.define('AA.view.coding.CodePanel', {
    extend: 'Ext.panel.Panel',
    layout: 'border',
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;
        var code = Ext.create('Ext.form.field.TextArea');
        var themeBtn = Ext.create('AA.view.main.Theme', {
            textarea: code
        });

        var visualisation = Ext.create('AA.view.coding.VisualisationPanel', {
            region: 'north',
            collapsible: true,
            title: 'შესრულების ვიზუალიზაცია'
        });

        log(vv = visualisation)

        var runBtn = Ext.create('Ext.button.Button', {
            scale: 'small',
            text: 'გაშვება ( run )',
            handler: run
        });

        var prev = Ext.create('Ext.button.Button', {
            text: '&laquo; წინა',
            handler: goToPrev
        });
        var next = Ext.create('Ext.button.Button', {
            text: 'შემდეგი &raquo;',
            handler: goToNext
        });

        var problemPanel = Ext.create('AA.view.problem.ProblemPanel', {
            region: 'center',
            bbar: [prev, '->', next]
        });

        var codePanel = Ext.create('Ext.panel.Panel', {
            region: 'west',
            layout: 'fit',
            items: [code],
            tbar: [themeBtn, runBtn],
            minWidth: 400,
            //border : false
        });

        me.items = [codePanel, visualisation, problemPanel];

        me.callParent(arguments);

        function run() {

            var values = visualisation.tape.tape.form.getValues();
            var data = [], tape = [];
            var i, j;

            for (i in values) {
                data.push(values[i]);
            }

            for (i = 0; i < data.length; i++) if (data[i]) break;
            for (j = data.length - 1; j >= 0; j--) if (data[j]) break;
            for (; i <= j; i++) tape.push(data[i] ? data[i] : " ");

            var c = code.getValue().split("\n")

            for (i in c) c[i] = c[i].replace(/ /g, '');

            springRequest({
                url: 'machine/eval',
                method: 'POST',
                data: {
                    tape: tape,
                    code: c
                }
            }, function (data) {
                Ext.MessageBox.alert("შედეგი", data.result);
                log(data)
            }, function () {
                log("error")
            });
        }

        me.loadProblem = function (problemId) {
            me.setLoading("იტვირთება...");
            prev.disable();
            next.disable();

            springRequest({
                url: 'alan/problems',
                method: 'POST',
                data: problemId,
            }, function (data) {
                if (!data.length) {
                    goToErrorPage();
                }
                problemPanel.text.setHtml(data[0].text);
                problemPanel.inOut.store.loadData(data[0].examples);

                me.problemId = problemId;

                springRequest({
                    url: 'alan/problems',
                    method: 'POST',
                    data: (me.problemId - 1) + "",
                }, function (data) {
                    if (data && data.length) {
                        prev.setText("&laquo; წინა (" + data[0].name + ")");
                        prev.enable();
                    } else {
                        prev.setText("&laquo; წინა");
                    }
                }, function () {
                    log("error");
                });

                springRequest({
                    url: 'alan/problems',
                    method: 'POST',
                    data: +me.problemId + 1,
                }, function (data) {
                    if (data && data.length) {
                        next.setText("შემდეგი &raquo; (" + data[0].name + ")");
                        next.enable();
                    } else {
                        next.setText("შემდეგი &raquo;");
                    }
                }, function () {
                    log("error");
                });

                me.setLoading(false);

            }, function () {
                log("error");
            });
        }

        function goToPrev() {
            window.location.href = "#problem/" + (me.problemId - 1);

        }

        function goToNext() {
            window.location.href = "#problem/" + (+me.problemId + 1);
        }

    }
});

/*

 ორობითის შეცვლა
 R
 L
 I 2
 G1
 2
 R
 I 4
 I13
 W1
 G2
 3
 W0
 G2
 4
 L
 S

 */