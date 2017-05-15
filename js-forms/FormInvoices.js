/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery(document).ready(function () {
    var idstore = document.getElementById('id_store');
    var idinvoice = document.getElementById('id_invoice');
    var idorder = document.getElementById('id_order');
    var numberinvoice = document.getElementById('number_invoice');
    var docseller = document.getElementById('doc_seller');
    var doccustomer = document.getElementById('doc_customer');
    var dateinvoice = document.getElementById('date_invoice');
    autoCalculateSubtotal();
    //localStorage.removeItem('NumberInvoice');

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
    
    
    if (getNumberInvoice() === null) {
        newInvoiceNumber(idinvoice).done(function () {
            setNumberInvoice(numberinvoice.value);
        });
    } else {
        numberinvoice.value=getNumberInvoice();
    }
    
    autoLoadNameFromId('id_product', 'name_product', 'id_unit', 'price_product');
    

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
                        console.log('Error: '+result);
                    }
                }
                if (result !== null && result !== '') {
                    console.log(result.message);
                    if (result.status !== null && result.status !== undefined && result.status === 1) {
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

function calculateSubtotal(){
    var quantity=document.getElementById("quantity_product");
    var price=document.getElementById("price_product");
    var subtotal=document.getElementById("subtotal");
    if(validateNumber(quantity.value) && validateNumber(price.value)){
        subtotal.value=quantity.value*price.value;
    }else{
        subtotal.value='';
    }
}

function autoCalculateSubtotal(){
    var quantity=document.getElementById("quantity_product");
    var price=document.getElementById("price_product");
    
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