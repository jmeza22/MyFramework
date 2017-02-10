jQuery(document).ready(function () {
    var idstore = document.getElementById("id_store");
    var idplace = document.getElementById("id_place");
    var valid = getIdEnterprise();
    if (valid !== null) {
        idstore.value = valid;
    }
    getData(idplace);
    loadTableData(document.getElementById("dataTable0"), true);
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item, false).done(function () {
            setTimeout(function () {
                loadTableData(document.getElementById("dataTable0"), true);
                resetForm(document.getElementById('form0'));
                var savebutton = null;
                savebutton = getElementForm(document.getElementById('form0'), 'save');
                savebutton.setAttribute('action', 'insert');
            }, 100);
        });
    }
}

function Edit(item) {
    var destform = null;
    resetForm(document.getElementById('form0'));
    destform = document.getElementById('form0');
    sendIdValue(item, destform);
    getData(destform).done(function () {
        setTimeout(function () {
            var savebutton = null;
            savebutton = getElementForm(document.getElementById('form0'), 'save');
            savebutton.setAttribute('action', 'update');
            document.getElementById("number_place").focus();
        }, 100);
    });
}

function Delete(item) {
    if (confirm('Desea Eliminar este Registro?')) {
        submitForm(item, false).done(function () {
            setTimeout(function () {
                loadTableData(document.getElementById("dataTable0"), true);
            }, 100);
        });
    }
}
