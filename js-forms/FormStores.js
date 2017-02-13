jQuery(document).ready(function () {
    var myform = document.getElementById("form0");
    var idstore = document.getElementById("id_store");
    var action = null;
    var valid = getIdEnterprise();
    if (valid !== null) {
        idstore.value = valid;
    }
    if (getPOST('action') !== null && getPOST('id_store') !== null) {
        idstore.value = getPOST('id_store');
        action = getPOST('action');
        document.getElementById('save').setAttribute('action', action);
        unsetPOST('action');
        unsetPOST('id_store');
    }
    getData(myform).done(function () {
        var img = document.getElementById("imagePhoto");
        var nmimg = document.getElementById("logo_store");
        img.src = getWSPath() + 'Base/Controllers/ImageFiles/' + nmimg.value;
    });
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item, false);
    }
}