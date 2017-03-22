jQuery(document).ready(function () {
    var id = document.getElementById("doc_customer");
    var mytable = document.getElementById("dataTable0");
    var savebutton= document.getElementById("save");
    
    if(id!==null && getPOST(id.name)!==null){
        id.value=getPOST(id.name);
        unsetPOST(id.name);
    }
    if(getPOST('action')!==null){
        savebutton.setAttribute('action',getPOST('action'));
        unsetPOST('action');
    }
    
    getData(id);
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
                document.getElementById("doc_customer").focus();
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
            document.getElementById("doc_customer").focus();
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
    document.getElementById("doc_customer").focus();
}
