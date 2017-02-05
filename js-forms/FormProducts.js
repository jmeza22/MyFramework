jQuery(document).ready(function () {
    resetPOST();
    var idproduct = document.getElementById("id_product");
    getData(idproduct);
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item);
    }
}