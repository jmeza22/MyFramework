jQuery(document).ready(function () {
    var myform = document.getElementById("form0");
    var product = document.getElementById("id_product");
    NewForm(myform);
    loadComboboxData(document.getElementById("list_id_product"));
    loadComboboxData(document.getElementById("list_id_category"));
    POST();
    product.onkeypress = function (event) {
        if (event.keyCode === 13 || event.keyCode === 9) {
            Find(product);
        }
    };
});

function POST() {
    var idname = null;
    var form = document.getElementById("form0");
    var id = null;
    var action = null;
    idname = getFindBy(form);
    id = getElement(form, idname);

    if (getPOST('action') !== null && getPOST(idname) !== null) {
        id.value = getPOST(idname);
        action = getPOST('action');
        getData(form).done(function () {
            document.getElementById('save').setAttribute('action', action);
        });
        unsetPOST('action');
        unsetPOST(idname);
    }
}

function NewForm(form) {
    form = getForm(form);
    resetForm(form);
    var store = document.getElementById("id_store");
    if (getIdEnterprise() !== null) {
        store.value = getIdEnterprise();
    }
    document.getElementById('save').setAttribute('action', 'insert');
}

function Find(form) {
    var id = null;
    var val = null;
    form = getForm(form);
    id = getElement(form, getFindBy(form));
    if (form !== null && id !== null) {
        val = id.value;
        resetForm(form);
        id.value = val;
        getData(form).done(function () {
            document.getElementById('save').setAttribute('action', 'update');
        });
    }
}

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item, false).done(function () {
            NewForm(form);
        });
    }
}