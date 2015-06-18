Ext.define('AA.view.main.User', {
    extend: 'Ext.button.Button',
    scale: 'medium',
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;
        me.menu = [
            {
                text: 'გამოსვლა',
                handler: logout
            }
        ];
        me.text = AA.user.firstName + ' ' + AA.user.lastName;
        me.callParent(arguments);
    }
});