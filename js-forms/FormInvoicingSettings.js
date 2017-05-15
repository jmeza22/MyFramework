/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery(document).ready(function () {
    var idstore=document.getElementById('id_store');
    var idinvoicing=document.getElementById('id_invoicing');
    var createdate=document.getElementById('create_invoicing');
    var updatedate=document.getElementById('update_invoicing');
    var mytable = document.getElementById("dataTable0");
    
    idstore.value=getIdEnterprise();
    createdate.value=getCurrentDate() + 'T' + getCurrentTime();
    updatedate.value=getCurrentDate() + 'T' + getCurrentTime();
    createdate.setAttribute('disabled', 'disabled');
    updatedate.setAttribute('disabled', 'disabled');
    getData(idinvoicing);
    loadTableData(mytable, true);
});

function Send(item) {
    var myform = null;
    var mytable = null;
    myform = getForm(item);
    mytable = document.getElementById("dataTable0");
    if (validateForm(myform)) {
        submitForm(myform, false).done(function () {
            setTimeout(function () {
                loadTableData(mytable, true);
                New(item);
                var savebutton = null;
                savebutton = getElement(myform, 'save');
                savebutton.setAttribute('action', 'insert');
            }, 100);
        });
    }
}

function Edit(item) {
    var myform = null;
    myform = document.getElementById('form0');
    resetForm(myform);
    sendValue(item, null, myform, null);
    getData(myform).done(function () {
        setTimeout(function () {
            var savebutton = null;
            savebutton = getElement(myform, 'save');
            savebutton.setAttribute('action', 'update');
            document.getElementById("number_place").focus();
        }, 100);
    });
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

function New(item) {
    var myform = getForm(item);
    var id = null;
    var identerprise = null;
    resetForm(myform);
    id = getElement(myform, getFindBy(myform));
    identerprise = getElement(myform, 'id_store');
    if (id !== null) {
        id.value = 0;
    }
    if (identerprise !== null) {
        identerprise.value = 0;
    }
    if (identerprise !== null && getIdEnterprise() !== null) {
        identerprise.value = getIdEnterprise();
    }
    
    var savebutton = null;
    savebutton = getElement(myform, 'save');
    savebutton.setAttribute('action', 'insert');
    document.getElementById("number_place").focus();
}


