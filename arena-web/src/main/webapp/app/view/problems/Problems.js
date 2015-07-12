/**
 * Created by tsotne on 7/12/15.
 */
Ext.define('AA.view.problems.Problems', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: 'fit',
    constructor: function (cfg) {
        cfg = cfg || {};
        var me = this;

        var gridStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'difficulty']
        });

        var grid = Ext.create('Ext.grid.Panel', {
            store: gridStore,
            columns: [
                {text: 'ამოცანა', dataIndex: 'name', flex: 1},
                {text: 'სირთულე', dataIndex: 'difficulty', flex: 1}
            ],
            listeners : {
                dblclick : function(){

                }
            }
        });

        me.items = [grid];

        me.tbar = [{
            text : 'refresh',
            handler : loadProblems
        }];

        me.callParent(arguments);

        function loadProblems(){
            springRequest({
                url: 'alan/problems',
                method: 'POST',
                data: null,
            }, function (data) {
                //Ext.MessageBox.alert("შედეგი", data);
                grid.store.loadData(data)
                log(data)
            }, function () {
                log("error")
            });
        }
    }
});