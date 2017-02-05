jQuery(document).ready(function () {
    var store = document.getElementById("id_store");
    if (getIdEnterprise() !== null) {
        store.value = getIdEnterprise();
    }
    var idproduct = document.getElementById("id_product");
    getData(idproduct);
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item);
    }
}