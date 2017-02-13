jQuery(document).ready(function () {
    getData(document.getElementById("id_order"));
    var dd = document.getElementById("date_order");
    var store = document.getElementById("id_store");
    var user = document.getElementById("id_user");
    var order = document.getElementById("id_order");
    var myform = document.getElementById("form0");
    var action = null;
    
    dd.value = getCurrentDate() + 'T' + getCurrentTime();
    dd.setAttribute('readonly', 'readonly');
    loadComboboxData(document.getElementById("list_id_user")).done(function () {
        setNameFromDataList('id_user', 'name_user');
    });
    loadComboboxData(document.getElementById("list_id_place")).done(function () {
        setNameFromDataList('id_place', 'note_order');
    });

    if (getIdEnterprise() !== null) {
        store.value = getIdEnterprise();
    }
    if (getUserIdLogin() !== null) {
        user.value = getUserIdLogin();
    }
    
    if(getPOST('action')!==null && getPOST('id_order')!==null){
        order.value=getPOST('id_order');
        action=getPOST('action');
        getData(myform);
        document.getElementById('save').setAttribute('action', action);
        unsetPOST('action');
        unsetPOST('id_order');
    }
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item, false).done(function () {
            setTimeout(function () {
                resetForm(item);
                setIdOrder(getLastInsertId());
                window.location.href = 'FormOrderDetails.html';
            }, 100);
        });
    }

}