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
            collapsible : true,
            title : 'შესრულების ვიზუალიზაცია'
        });

        var runBtn = Ext.create('Ext.button.Button', {
            scale: 'small',
            text: 'გაშვება ( run )'
        });

        var codePanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'fit',
            items: [code],
            tbar : [themeBtn, runBtn]
        });

        me.items = [codePanel, visualisation];

        me.callParent(arguments);
    }
});