jQuery(document).ready(function () {
    
    var dd = document.getElementById("date_order");
    var store = document.getElementById("id_store");
    var user = document.getElementById("id_user");
    var order = document.getElementById("id_order");
    var myform = document.getElementById("form0");
    var action = null;

    dd.value = getCurrentDate() + 'T' + getCurrentTime();
    dd.setAttribute('readonly', 'readonly');
    
    loadComboboxData(document.getElementById("list_id_user")).done(function () {
        autoNameFromDataList('id_user', 'name_user', null);
        user.focus();
    });
    loadComboboxData(document.getElementById("list_id_place")).done(function () {
        autoNameFromDataList('id_place', 'note_order', null);
    });

    if (getIdEnterprise() !== null) {
        store.value = getIdEnterprise();
    }
    if (getUserIdLogin() !== null) {
        user.value = getUserIdLogin();
    }

    if (getPOST('action') !== null && getPOST('id_order') !== null) {
        order.value = getPOST('id_order');
        action = getPOST('action');
        document.getElementById('save').setAttribute('action', action);
        unsetPOST('action');
        unsetPOST('id_order');
    }
    
    if(getUserRoleLogin()!=='AA' && getUserRoleLogin()!=='VN'){
        user.setAttribute('readonly', 'readonly');
    }
    
    getData(order);
    
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item, false).done(function () {
            setTimeout(function () {
                if (getLastInsertId() !== null && getLastInsertId() !== '' && getLastInsertId() !== 0) {
                    resetForm(item);
                    setIdOrder(getLastInsertId());
                    setPOST('action','insert');
                    //window.location.href = 'FormOrderDetails.html';
                }
            }, 100);
        });
    }

}