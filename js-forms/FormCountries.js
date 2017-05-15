jQuery(document).ready(function () {
    var idcountry = document.getElementById("id_country");
    var mytable = document.getElementById("dataTable0");
     
    getData(idcountry);
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
            document.getElementById("code_country").focus();
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
    resetForm(myform);
    id = getElement(myform, getFindBy(myform));
   if (id !== null) {
        id.value = '';
    }
       
    var savebutton = null;
    savebutton = getElement(myform, 'save');
    savebutton.setAttribute('action', 'insert');
    document.getElementById("code_country").focus();
}