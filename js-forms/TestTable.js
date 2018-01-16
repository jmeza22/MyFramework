/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery(document).ready(function () {
    var mytable = document.getElementById("dataTable0");
    loadTableData(mytable, false);
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item, false);
    }
}

function DeleteItem(item) {
    var form = getForm(item);
    var tr = getParentTR(item);
    var id = getElement(tr, 'id_testtable');
    var url = null;
    var json = null;
    var token = null;
    var action = null;
    var model = null;
    var result = null;

    if (form !== null && form !== 'undefined') {
        url = getURL(form);
        action = "replace";
        model = getModel(form);
        token = getTokenLogin();

        try {
            json = {
                "model": model,
                "action": action,
                "token": token,
                "id_testtable": id,
                "status_testtable": 0
            };
            result = submitJSON(url, json, action, model, token);
            deleteRowInTable("dataTable0");
        } catch (e) {
            console.error(e);
        }

        delay(500);
    }
}