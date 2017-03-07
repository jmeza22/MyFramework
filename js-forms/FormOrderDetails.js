jQuery(document).ready(function () {

    var order = document.getElementById("id_order");
    var user = document.getElementById("id_user");
    var formorder = document.getElementById("formOrder");
    var formdetail = document.getElementById("formDetail");
    var datedetail = document.getElementById("date_detail");
    var table0 = document.getElementById("dataTable0");
    var savebutton = getElement(formorder, 'save');
    var action = null;


    loadComboboxData(document.getElementById("list_id_user")).done(function () {
        autoNameFromDataList('id_user', 'name_user', null);
    });

    loadComboboxData(document.getElementById("list_id_product")).done(function () {
        autoNameFromDataList('id_product', 'name_product', 'price_product');
    });

    console.log('Set Orden ' + getIdOrder());
    if (getIdOrder() !== null) {
        order.value = getIdOrder();
    }

    if (getPOST('id_order') !== null) {
        order.value = getPOST('id_order');
        unsetPOST('id_order');
    }

    if (getPOST('action') !== null && savebutton !== null) {
        savebutton.setAttribute('action', getPOST('action'));
        unsetPOST('action');
    }

    getData(formorder).done(function () {
        user.focus();
        order.focus();
        sendValue(formorder, 'id_order', formdetail, 'id_order');
        order.setAttribute('disabled', 'disabled');
        user.setAttribute('disabled', 'disabled');
        table0.setAttribute('findbyvalue', order.value);
        loadTableData(table0, true);
    });

    datedetail.value = getCurrentDate();
    datedetail.setAttribute('disabled', 'disabled');

});

function Send(item) {
    var thisform = getForm(item);
    var otherform = document.getElementById("formOrder");
    var iddetail = null;
    if (validateForm(thisform)) {
        submitForm(thisform, false).done(function () {
            setTimeout(function () {
                resetForm(thisform);
                sendValue(otherform, 'id_order', thisform, 'id_order');
                iddetail = getElement(thisform, 'id_detail');
                iddetail.value = '0';
                loadTableData(document.getElementById("dataTable0"), true);
            }, 100);
        });
    }

}

function Delete(item) {
    var mytable = null;
    mytable = document.getElementById("dataTable0");
    if (confirm('Desea Eliminar este Registro?')) {
        submitForm(item, false).done(function () {
            setTimeout(function () {
                loadTableData(mytable, true);
            }, 100);
        });
    }
}