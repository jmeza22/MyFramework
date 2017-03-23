jQuery(document).ready(function () {
    var mytable = document.getElementById("dataTable0");
    loadTableData(mytable, true);
});

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

function Edit(item) {
    var myform = null;
    var id = null;
    var model = null;
    myform = getForm(item);
    if (myform !== null) {
        id = getElement(myform, getFindBy(myform));
        model = getModel(myform);
    }
    if (id !== null) {
        setPOST(id.name, id.value);
        setPOST('action', 'update');
        window.location.href = 'FormCustomers.html';
    }
}