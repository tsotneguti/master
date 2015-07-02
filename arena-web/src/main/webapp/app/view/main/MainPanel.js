/**
 * Created by vako on 5/15/15.
 */
Ext.define('AA.view.main.MainPanel', {
    extend: 'Ext.panel.Panel',
    layout: 'border',
    border: false,
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;

        me.defaults = {
            split: true
        };

        var header = Ext.create('AA.view.main.Header', {
            region: 'north'
        });

        var codePanel = Ext.create('AA.view.coding.CodePanel');

        var mainPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'fit',
            items: [codePanel]
        });

        me.items = [mainPanel, header];

        me.callParent(arguments);
    }
});