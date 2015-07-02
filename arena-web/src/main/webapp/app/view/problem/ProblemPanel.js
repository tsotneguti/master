/**
 * Created by tsotne on 7/2/15.
 */
Ext.define('AA.view.problem.ProblemPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;

        var text = Ext.create('Ext.panel.Panel', {
            html: '<div class="panel-body"> <p style="text-align: justify;"> Samodelkin, Professor decided make by hand volumetric model bricks from matches, and use the matches for edges. Length of edges of every brick equally for one match.</p> <p style="text-align: justify;"> For model’s construction of three bricks he uses <strong>28</strong> matches.</p> <p style="text-align: justify;"> What least quantity of matches Samodelkin needs for construction of model with N bricks?</p> <p style="text-align: justify;"> Every number of problems does not exceed <strong>2·10<sup>9</sup></strong>.</p> <p> <strong>Input</strong></p> <p> One number <strong>N</strong> is quantity of bricks.</p> <p> <strong>Output</strong></p> <p> One number is quantity of matches.</p> </div>',
            flex: 1,
            bodyPadding: 10,
            autoScroll: true,
            border: false
        });

        var inOut = Ext.create('Ext.grid.Panel', {
            store: {
                fields: ['in', 'out']
            },
            disableSelection: true,
            columns: [{
                text: 'შემავალის მაგალითი',
                dataIndex: 'in',
                flex: 1
            }, {
                text: 'გამომავალის მაგალითი',
                dataIndex: 'out',
                flex: 1
            }]
        });

        var info = Ext.create('Ext.panel.Panel', {
            bodyPadding: 10,
            border: false, split: true,
            style: 'border-top : 1px solid black',
            height: 200,
            items: [inOut],
            layout: 'fit'
        });

        me.items = [text, info];

        me.callParent(arguments);

        me.on('afterrender', function(){

            inOut.store.loadData([{
                in : 123,
                out: 987
            }, {
                in : "abc sdfsd fsdf sd",
                out: "აბც"
            }]);
        });
    }
});