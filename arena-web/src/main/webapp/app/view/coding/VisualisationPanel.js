/**
 * Created by tsotne on 5/28/15.
 */
Ext.define('AA.view.coding.VisualisationPanel', {
    extend: 'Ext.panel.Panel',
    minHeight : 150,
    scrolable : false,
    bodyPadding: 15,
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;

        var tape = Ext.create('AA.view.coding.Tape');

        me.items = [tape];

        me.callParent(arguments);
    }
});