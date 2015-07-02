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

        var problemPanel = Ext.create('AA.view.problem.ProblemPanel', {
            region: 'center'
        });

        var codePanel = Ext.create('Ext.panel.Panel', {
            region: 'west',
            layout: 'fit',
            items: [code],
            tbar: [themeBtn, runBtn],
            minWidth : 400,
            border : false
        });

        me.items = [codePanel, visualisation, problemPanel];

        me.callParent(arguments);

        function run() {

            var values = visualisation.tape.tape.form.getValues();
            var data = [], tape = [];
            var i, j;

            for(i in values) {
                data.push(values[i]);
            }

            for (i = 0; i < data.length; i++) if (data[i]) break;
            for (j = data.length -1; j >= 0; j--) if (data[j]) break;
            for (; i <= j; i++) tape.push(data[i] ? data[i] : " ");

            log(cc=code)

            var c = code.getValue().split("\n")

            for(i in c) c[i] = c[i].replace(/ /g, '');

log(c)
            springRequest({
                url: 'machine/eval',
                method: 'POST',
                data: {
                    tape: tape,
                    code: c
                }
            }, function (data) {
                log(data)
            }, function () {
                log("error")
            });
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