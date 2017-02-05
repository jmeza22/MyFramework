jQuery(document).ready(function () {
    getData(document.getElementById("id_order"));
    var dd = document.getElementById("date_order");
    var store = document.getElementById("id_store");
    var user = document.getElementById("id_user");
    if (getIdEnterprise() !== null) {
        store.value = getIdEnterprise();
    }
    if (getUserIdLogin() !== null) {
        user.value = getUserIdLogin();
    }
    dd.value = getCurrentDate() + 'T' + getCurrentTime();
    dd.setAttribute('readonly', 'readonly');
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item, false).done(function () {
            setTimeout(function () {
                setIdOrder(getLastInsertId());
                window.location.href='FormOrderDetails.html';
            }, 200);
        });
    }
}