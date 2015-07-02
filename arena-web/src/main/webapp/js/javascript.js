/**
 * Created by tsotne on 5/22/15.
 */
if (!window.console) {
    window.console = {};
    window.console.log = function () {
    };
}

function log() {
    if (document.all)
        return;
    return console.log.apply(console, arguments);
}

function logout() {
    alert("logout");
}

function changeTheme(item) {
    if (!item || !item.text) item = AA.themeMenu.menu.items.items[0];
    $("#" + AA.themeMenu.textarea.name).ace({theme: item.text, lang: 'turing'});
    AA.themeMenu.setText("თემა ( " + item.text + " )");

    item.addCls('menu-checked');

    if (AA.themeMenu.lastItemChecked) {
        AA.themeMenu.lastItemChecked.removeCls('menu-checked');
    }
    AA.themeMenu.lastItemChecked = item;
};

$(function () {
   setTimeout(function () {
       changeTheme();
   },50);
});

function springRequest(obj, callback, errorHandler) {
    var springPrefix = '';
    var reqObj = {
        url: springPrefix + '' + obj.url,
        method: obj.method || 'POST',
        callback: function (opts, succ, xhr) {
            if (succ && Ext.isFunction(callback)) {
                var res;
                try {
                    res = Ext.decode(xhr.responseText);
                } catch (e) {
                    res = xhr.responseText;
                }
                return callback.call(null, res);
            }
        }
    };
    if (obj.data)
        Ext.apply(reqObj, {
            jsonData: Ext.encode(obj.data)
        });
    if (obj.params)
        Ext.apply(reqObj, {
            params: obj.params
        });
    if (Ext.isFunction(errorHandler))
        Ext.apply(reqObj, {
            failure: errorHandler
        });

    if (obj.pathVariable && obj.pathVariable.constructor != ({}).constructor) {
        if (obj.pathVariable instanceof Array) {
            for (var vr in obj.pathVariable) {
                reqObj.url += '/' + obj.pathVariable[vr];
            }
        } else {
            reqObj.url += '/' + obj.pathVariable;
        }
    }

    return Ext.Ajax.request(reqObj);
}