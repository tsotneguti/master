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