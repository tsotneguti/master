/**
 * Created by tsotne on 5/22/15.
 */

Ext.define('AA.view.main.Header', {
    extend: 'Ext.panel.Panel',
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};

        var userBtn = Ext.create('AA.view.main.User');

        var logo = Ext.create('Ext.Img',{
            src : '/images/alan-arena.png',
            height : 30
        });

        me.tbar = [logo ,'->' ,userBtn ];

        me.callParent(arguments);
    }
});