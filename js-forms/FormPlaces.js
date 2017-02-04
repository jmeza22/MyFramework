jQuery(document).ready(function () {
    var idstore = document.getElementById("id_store");
    var idplace = document.getElementById("id_place");

    var valid = getIdEnterprise();
    if (valid !== null) {
        idstore.value = valid;
    }
    getData(idplace);
    loadTableData(document.getElementById("dataTable0"));
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item, false).done(function () {
            setTimeout(function () {
                loadTableData(document.getElementById("dataTable0"));
            }, 200);
        });
    }
}

function Delete(item) {
    submitForm(item, false).done(function () {
        setTimeout(function () {
            loadTableData(document.getElementById("dataTable0"));
        }, 200);
    });
}

