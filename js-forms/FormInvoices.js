/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery(document).ready(function () {
    var idstore = document.getElementById('id_store');
    var idinvoice = document.getElementById('id_invoice');
    var idorder = document.getElementById('id_order');
    var docseller = document.getElementById('doc_seller');
    var doccustomer = document.getElementById('doc_customer');
    var dateinvoice = document.getElementById('date_invoice');
    var mytable = document.getElementById("dataTable0");
    autoCalculateSubtotal();
    //localStorage.removeItem('IdInvoice');
    localStorage.removeItem('InvoiceDetails');

    idstore.value = getIdEnterprise();
    idorder.value = getIdOrder();
    dateinvoice.value = getCurrentDate() + 'T' + getCurrentTime();
    docseller.value = 0;
    doccustomer.value = '';

    autoLoadNameFromId('doc_seller', 'fullname_seller', null, null);
    autoLoadNameFromId('doc_customer', 'fullname_customer', null, null);
    docseller.focus();
    doccustomer.focus();

    docseller.value = getUsernameLogin();
    doccustomer.value = 0;
    loadNameFromId('doc_seller', 'fullname_seller', null, null);
    loadNameFromId('doc_customer', 'fullname_customer', null, null);


    if (getIdInvoice() === null) {
        newInvoiceNumber(idinvoice).done(function () {
            setIdInvoice(idinvoice.value);
        });
    } else {
        idinvoice.value = getIdInvoice();
    }

    autoLoadNameFromId('id_product', 'name_product', 'id_unit', 'price_product');

    loadTableData(mytable, true);
    Listing();
});

function newInvoiceNumber(element) {
    var promise = null;
    var myform = null;
    var object = null;
    var url = null;
    var formData = null;
    var token = getTokenLogin();
    myform = getForm(element);
    formData = {
        "model": 'InvoicingNumbersApp',
        "action": 'Generate',
        "token": token
    };
    url = "Base/Controllers/InvoicingNumbersController.php";
    console.log('Getting New Invoice Number!');
    if (formData !== null && url !== null && url !== '') {
        promise = $.ajax({
            method: "POST",
            url: url,
            data: formData,
            success: function (result, status) {
                if (result !== null && result !== '') {
                    try {
                        result = JSON.parse(result);
                    } catch (e) {
                        console.log('Error: ' + result);
                    }
                }
                if (result !== null && result !== '') {
                    console.log("Result: "+result);
                    if (result.status !== null && result.status !== undefined && result.status === 1) {
                        console.log(result.message);
                        setLastInsertId(result.lastInsertId);
                        object = result.data;
                        try {
                            object = JSON.parse(object);
                            setDataForm(myform, object);

                        } catch (e) {
                            console.error("Error de Conversion JSON (Data) - Get Data Form!.");
                        }
                    }

                } else {
                    alert(result);
                    console.error('Servicio Web Falló!.');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error de Comunicacion - Get Data Form!.");
            }
        }
        );
    }
    return promise;
}

function calculateSubtotal() {
    var form = null;
    var quantity = null;
    var price = null;
    var subtotal = null;
    form = document.getElementById('form1');
    if (form !== null && form.tagName === 'FORM') {
        quantity = document.getElementById("quantity_product");
        price = document.getElementById("price_product");
        subtotal = document.getElementById("subtotal");
        if (validateNumber(quantity.value) && validateNumber(price.value)) {
            subtotal.value = quantity.value * price.value;
        } else {
            subtotal.value = 'NULL';
        }
    }
}

function autoCalculateSubtotal() {
    var quantity = document.getElementById("quantity_product");
    var price = document.getElementById("price_product");

    quantity.oninput = function () {
        calculateSubtotal();
    };
    quantity.onfocus = function () {
        calculateSubtotal();
    };
    price.oninput = function () {
        calculateSubtotal();
    };
    price.onfocus = function () {
        calculateSubtotal();
    };
}

function SendMaster(button) {
    var form = getForm(button);
    var result = null;
    if (validateForm(form)) {
        result = submitForm(form, false).done(function () {
            console.log("Invoice Sent!.");
        });
        delay(500);
    }
    return result;
}

function SendDetail(button) {
    var form = getForm(button);
    var url = null;
    var json = null;
    var token = null;
    var action = null;
    var model = null;
    var result = null;

    if (form !== null && form !== 'undefined') {
        url = "Base/Controllers/InvoiceDetailController.php";
        try {
            json = getDetails();
            json = parseDetailsToArray(json);
            json = JSON.stringify(json);
        } catch (e) {
            console.error(e);
        }
        action = "Replace";
        model = "SalesInvoiceDetailsApp";
        token = getTokenLogin();
        result = submitJSON(url, json, action, model, token);
        delay(500);
    }
    return result;
}

function Send(button) {
    SendMaster(button);
    SendDetail(button);

}

function NewForm(button) {

}

function ResetDetail() {
    var form = null;
    var iddetail = null;

    form = document.getElementById("form1");
    if (form !== null) {
        form.reset();
        iddetail = getElement(form, 'id_invoicedetail');
        iddetail.value = "";
        return true;
    }
    return false;
}

function SaveDetail(button) {
    var form = null;
    var formparent = null;
    var iddetail = null;
    var idinvoice = null;
    var idproduct = null;
    var nameproduct = null;
    var quantity = null;
    var price = null;
    var unit = null;
    var array = null;
    var detailstring = null;
    var modal = null;
    form = getForm(button);
    formparent = document.getElementById("form0");
    if (form !== null) {

        iddetail = getElement(form, 'id_invoicedetail');
        idinvoice = getElement(form, 'id_invoice');
        idproduct = getElement(form, 'id_product');
        nameproduct = getElement(form, 'name_product');
        quantity = getElement(form, 'quantity_product');
        price = getElement(form, 'price_product');
        unit = getElement(form, 'id_unit');

        if (idinvoice.value === "NULL" || idinvoice.value === "") {
            sendValue(formparent, 'id_invoice', form, 'id_invoice');
        }
        if (iddetail.value === "NULL" || iddetail.value === "") {
            iddetail.value = '' + idinvoice.value + 'D' + getDateTimeString() + RandomNumber(10, 99);
        }
        if (validateForm(form)) {
            array = {
                'id_invoicedetail': iddetail.value,
                'id_invoice': idinvoice.value,
                'id_product': idproduct.value,
                'name_product': nameproduct.value,
                'quantity_product': quantity.value,
                'price_product': price.value,
                'id_unit': unit.value
            };

            array = JSON.stringify(array);
            detailstring = getDetails();
            if (getValueFromJSON(detailstring, iddetail.value) !== null) {
                detailstring = unsetToJSON(detailstring, iddetail.value);
                setDetails(detailstring);
            }
            detailstring = setValueToJSON(getDetails(), iddetail.value, array);
            setDetails(detailstring);
            resetForm(form);
            price.value = 0;
            quantity.value = 0;
            unit.value = "UND";
            idinvoice.value = "NULL";
            iddetail.value = "NULL";
            $('#modal_form').modal('hide');
            return true;
        }
    }
    return false;
}

function EditDetail(button) {
    var formparent = null;
    var formtarget = null;
    var iddetail = null;
    var details = null;
    var quantity = null;

    formparent = getForm(button);
    formtarget = document.getElementById("form1");
    iddetail = getElement(formparent, "id_invoicedetail");
    if (iddetail !== null && formtarget !== null && formtarget.tagName === "FORM") {
        iddetail = iddetail.value;
        details = getDetails();
        details = getValueFromJSON(details, iddetail);
        try {
            details = JSON.parse(details);
        } catch (e) {
            console.error(e);
        }
        setDataForm(formtarget, details);
        $("#modal_form").modal('show');
        quantity = getElement(formtarget, 'quantity_product');
        quantity.focus();
        return true;
    }
    return false;
}

function DeleteDetail(button) {
    var formparent = null;
    var iddetail = null;
    var details = null;

    formparent = getForm(button);
    iddetail = getElement(formparent, "id_invoicedetail");
    if (iddetail !== null) {
        iddetail = iddetail.value;
        details = getDetails();
        details = unsetToJSON(details, iddetail);
        setDetails(details);
        return true;
    }
    return false;
}

function parseDetailsToArray(jsonstring) {
    var json = null;
    var array = [];
    var subindex = null;
    var aux = null;
    var j = null;

    try {
        json = JSON.parse(jsonstring);
    } catch (e) {
        console.error(e);
        json = null;
    }

    if (json !== null && json !== undefined) {
        j = 0;
        for (var i = 0; i < json.length; i++) {
            subindex = Object.keys(json[i])[0];
            aux = json[i][subindex];
            console.log("Item[" + aux + "]Item");
            try {
                aux = JSON.parse(aux);
            } catch (e) {
                aux = null;
            }
            array[i] = aux;
            aux = null;
        }
    }
    return array;
}

function Listing() {
    var jsonstring = null;
    var array = null;
    var mytable = null;
    var mainform = null;
    var idinvoice = null;
    jsonstring = getDetails();
    mytable = document.getElementById("dataTable0");
    mainform = document.getElementById("form0");
    if (mainform !== null) {
        idinvoice = getElement(mainform, 'id_invoice');
        idinvoice = idinvoice.value;
    }
    if (LocalStorageStatus()) {
        if (jsonstring !== null && jsonstring !== undefined) {
            if (jsonstring !== "" && jsonstring !== "[]") {
                array = parseDetailsToArray(jsonstring);
            }
        }
        setTableData(mytable, array, true);
        return true;
    }
    return false;
}

function SaveAndListing(button) {
    SaveDetail(button);
    Listing();
}

function DeleteAndListing(button) {
    DeleteDetail(button);
    Listing();
}