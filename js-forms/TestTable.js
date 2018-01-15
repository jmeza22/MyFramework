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
