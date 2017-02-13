jQuery(document).ready(function () {
    var store = document.getElementById("id_store");
    var product = document.getElementById("id_product");
    var myform = document.getElementById("form0");
    var action = null;
    if (getIdEnterprise() !== null) {
        store.value = getIdEnterprise();
    }
    var idproduct = document.getElementById("id_product");
    if (getPOST('action') !== null && getPOST('id_product') !== null) {
        product.value = getPOST('id_product');
        action = getPOST('action');
        getData(myform).done(function () {
            var img = document.getElementById("imagePhoto");
            var nmimg = document.getElementById("photo_product");
            img.src = getWSPath() + 'Base/Controllers/ImageFiles/' + nmimg.value;
        });
        document.getElementById('save').setAttribute('action', action);
        unsetPOST('action');
        unsetPOST('id_product');
    }
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item, false).done(function () {
            resetForm(form);
        });
    }
}