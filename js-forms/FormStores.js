jQuery(document).ready(function () {
    var idstore = document.getElementById("id_store");
    var valid = getIdEnterprise();
    if (valid !== null) {
        idstore.value = valid;
    }
    getData(idstore);
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item);
    }
}