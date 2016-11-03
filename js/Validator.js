var res = null;
document.oncontextmenu = function () {
    return false;
}
document.oncopy = new Function("return false");
document.oncut = new Function("return false");

function getErrorMessage() {
    var message = 'Connection Error!.';
    return message;
}

function clearForm(form) {
    if (form != null && form.tagName === "FORM") {
        form.reset();
    }
}

function showNotification(text) {
    var notifications = document.getElementById("notification");
    if (text != null || text != "") {
        notifications.value = text;
    }
    return notifications;
}


function noBackButton() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button";
    window.onhashchange = function () {
        window.location.hash = "no-back-button";
    }
}

(function ($) {
    $.get = function (key) {
        key = key.replace(/[\[]/, '\\[');
        key = key.replace(/[\]]/, '\\]');
        var pattern = "[\\?&]" + key + "=([^&#]*)";
        var regex = new RegExp(pattern);
        var url = unescape(window.location.href);
        var results = regex.exec(url);
        if (results === null) {
            return null;
        } else {
            return results[1];
        }
    }
})(jQuery);

function getWebservicePath() {
    var path = "http://localhost/";
    return path;
}

function trim(text) {
    var exp = /^\s+|\s+$/g;
    return text.replace(exp, "");
}

function validateOnlyNumeric(text) {
    var pattern = /^\d*$/;
    if (!text.search(pattern))
        return true;
    else
        return false;
}

function validateNumber(text) {
    if (isNaN(text)) {
        return false;
    } else {
        return true;
    }
}

function validateOnlyText(text) {
    var pattern = /^[a-zA-Z\s\á\é\í\ó\ñ\Ñ]*$/;
    // En caso de querer validar cadenas sin espacios usar: /^[a-zA-Z*]$/
    if (/^\s+$/.test(text)) {
        return false;
    }
    if (!text.search(pattern)) {
        return true;
    } else {
        return false;
    }
    return false;
}

function validateEmail(email) {
    var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (/^\s+$/.test(email)) {
        return false;
    }
    if (!email.search(pattern)) {
        return true;
    } else {
        return false;
    }
    return false;
}

function validateOnlyTextAlphanumeric(text) {
    var pattern = /^[a-zA-Z0-9\s\@\á\é\í\ó\ú\Á\É\Í\Ó\Ú\ñ\Ñ\.\,\:\;\-\_\*\/\+\?\¿\(\)\"\$\#\!\'\"/\n]*$/;
    if (/^\s+$/.test(text)) {
        return false;
    }
    if (!text.search(pattern)) {
        return true;
    } else {
        return false;
    }
    return false;
}

function validateUser(text) {
    var pattern = /^[a-zA-Z0-9\@\-\_\.]*$/;
    if (/^\s+$/.test(text)) {
        return false;
    }
    if (!text.search(pattern)) {
        return true;
    } else {
        return false;
    }
    return false;
}

function validatePassword(text) {
    var pattern = /^[a-zA-Z0-9\s\@\á\é\í\ó\ú\Á\É\Í\Ó\Ú\ñ\Ñ\.\,\:\;\-\_\*\/\+]*$/;
    if (/^\s+$/.test(text)) {
        return false;
    }
    if (!text.search(pattern)) {
        return true;
    } else {
        return false;
    }
    return false;
}

function validateURL(text) {
    var pattern = /^[a-zA-Z0-9\s\/\.\-\_\?\&\=\%\$\@\+\#]*$/;
    if (!text.search(pattern)) {
        return true;
    } else {
        return false;
    }
    return false;
}

function validateDateDDMMYYYY(text) {
    var pattern = /^(0[1-9]|[12]\d|3[01])\-(0[1-9]|1[0-2])\-(19|20)\d{2}$/;
    if (/^\s+$/.test(text)) {
        return false;
    }
    if (!text.search(pattern)) {
        return true;
    } else {
        return false;
    }
    return false;
}

function validateDateYYYYMMDD(text) {
    var pattern = /^(19|20)\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|[12]\d|3[01])$/;
    if (/^\s+$/.test(text)) {
        return false;
    }
    if (!text.search(pattern)) {
        return true;
    } else {
        return false;
    }
    return false;
}

function isDate(text) {
    try {
        var F = new Date(text);
        F.getDate();
        return true;
    } catch (e) {
        return false;
    }
    return false;
}

function validateText(text) {
    if (text == null || text == "" || /^\s+$/.test(text)) {
        return false;
    }
    return true;
}

function getTitle(Obj) {
    if (Obj != null) {
        if (Obj.getAttribute('title') != null) {
            return Obj.getAttribute('title');
        }
    }
    return '';
}

function getPlaceholder(Obj) {
    if (Obj != null) {
        if (Obj.getAttribute('placeholder') != null) {
            return Obj.getAttribute('placeholder');
        }
    }
    return '';
}

function hideElement(element) {
    if (element != null) {
        element.style = 'visibility: hidden; display: none;';
        return true;
    }
    return false;
}

function disableElement(element) {
    if (element != null) {
        element.setAttribute('disable', 'true');
        return true;
    }
    return false;
}

function goToElement(Obj) {
    if (Obj != null) {
        Obj.focus();
        return true;
    }
    return false;
}

function requireElement(Obj) {
    if (Obj != null) {
        Obj.style = '';
        goToElement(Obj);
        return true;
    }
    return false;
}

function getForm(item) {
    if (item != null) {
        if (item.parentNode.tagName === "FORM") {
            return item.parentNode;
        } else {
            return getForm(item.parentNode);
        }
    }
    return null;
}

function getElementDocument(id) {
    var item = null;
    if (id != null && id != '') {
        item = document.getElementById(id);
        return item;
    }
    return null;
}

function getElementForm(form, id) {
    var j = 0;
    var elements = null;

    if (form != null && id != null && id != '') {
        if (form.tagName === "FORM") {
            elements = form.elements;
            if (elements.length > 0) {
                for (j = 0; j < elements.length; j++) {
                    if (elements[j].getAttribute("id") == id) {
                        return elements[j];
                    }
                }
            }
        }
    }
    return getElementDocument(id);
}

function createInputHidden(form, name, value) {
    var element = null;
    if (form != null && form.tagName === "FORM" && name != null) {
        element = document.createElement('input');
        element.setAttribute('type', 'hidden');
        element.setAttribute('id', name);
        element.setAttribute('name', name);
        element.setAttribute('value', value);
        form.appendChild(element);
        console.log('Creado Input '+name);
        return true;
    }
    return false;
}

function createInputHiddenTemp(form, name, value) {
    var element = null;
    if (createInputHidden(form, name, value)) {
        element = getElementForm(form, name);
        if (element !== null) {
            element.setAttribute('temp', 'true');
            console.log('Input Oculto '+name);
            return true;
        }
    }
    return false;
}

function deleteElement(element) {
    var parent = null;
    if (element !== null) {
        parent = element.parentNode;
        parent.removeChild(element);
        return true;
    }
    return false;
}

function deleteTemporalElements(parent) {
    var elements = null;
    var j = null;
    var exists = false;
    elements = parent.elements;
    if (elements.length > 0) {
        for (j = 0; j < elements.length; j++) {
            if (elements[j].getAttribute("temp") == 'true') {
                deleteElement(elements[j]);
                exists = true;
            }
        }
        return exists;
    }
    return false;
}


function getUrlForm(form) {
    if (form != null && form.tagName === "FORM") {
        if (form.getAttribute("url") != null && form.getAttribute("url") != '') {
            return form.getAttribute("url");
        }
    }
    return null;
}

function getTokenForm(form) {
    if (form != null && form.tagName === "FORM") {
        if (form.getAttribute("token") != null && form.getAttribute("token") != '') {
            return form.getAttribute("token");
        }
    }
    return null;
}

function getModelForm(form) {
    if (form != null && form.tagName === "FORM") {
        if (form.getAttribute("model") != null && form.getAttribute("model") != '') {
            return form.getAttribute("model");
        }
    }
    return null;
}

function getActionForm(form) {
    if (form != null && form.tagName === "FORM") {
        if (form.getAttribute("do") != null && form.getAttribute("do") != '') {
            return form.getAttribute("do");
        }
    }
    return null;
}

function getFindByForm(form) {
    if (form != null && form.tagName === "FORM") {
        if (form.getAttribute("findBy") != null && form.getAttribute("findBy") != '') {
            return form.getAttribute("findBy");
        }
    }
    return null;
}

function getActionFromButton(button) {
    var form = null;
    if (button !== null && button.tagName === "BUTTON") {
        if (button.getAttribute("action") !== null && button.getAttribute("action") !== '') {
            form = getForm(button);

            if (button.getAttribute("action") == 'insert') {
                form.setAttribute('do', '1');
            }
            if (button.getAttribute("action") == 'update') {
                form.setAttribute('do', '2');
            }
            if (button.getAttribute("action") == 'delete') {
                form.setAttribute('do', '3');
            }
            if (button.getAttribute("action") == 'find') {
                form.setAttribute('do', '4');
            }
            if (button.getAttribute("action") == 'findAll') {
                form.setAttribute('do', '5');
            }

            return button.getAttribute("action");
        }
    }
    return null;
}

function createTempInputs(form) {
    deleteElement(getElementForm(form, 'token'));
    if (getElementForm(form, 'token') == null && getTokenForm(form) != null && getTokenForm(form) != '') {
        createInputHiddenTemp(form, 'token', getTokenForm(form));
    }
    deleteElement(getElementForm(form, 'model'));
    if (getElementForm(form, 'model') == null && getModelForm(form) != null && getModelForm(form) != '') {
        createInputHiddenTemp(form, 'model', getModelForm(form));
    }
    deleteElement(getElementForm(form, 'action'));
    if (getElementForm(form, 'action') == null && getActionForm(form) != null && getActionForm(form) != '') {
        createInputHiddenTemp(form, 'action', getActionForm(form));
    }
    deleteElement(getElementForm(form, 'findBy'));
    if (getElementForm(form, 'findBy') == null && getFindByForm(form) != null && getFindByForm(form) != '') {
        createInputHiddenTemp(form, 'findBy', getFindByForm(form));
    }
}

function getTD(item) {
    if (item != null) {
        if (item.parentNode.tagName === "TD") {
            return item.parentNode;
        } else {
            return getTD(item.parentNode);
        }
    }
    return null;
}

function getColName(combo) {
    if (combo != null && combo.tagName === "SELECT") {
        if (combo.getAttribute("colname") != null && combo.getAttribute("colname") != '') {
            return combo.getAttribute("colname");
        }
    }
    return null;
}

function getColValue(combo) {
    if (combo != null && combo.tagName === "SELECT") {
        if (combo.getAttribute("colvalue") != null && combo.getAttribute("colvalue") != '') {
            return combo.getAttribute("colvalue");
        }
    }
    return null;
}

function getModelCombo(combo) {
    if (combo != null && combo.tagName === "SELECT") {
        if (combo.getAttribute("model") != null && combo.getAttribute("model") != '') {
            return combo.getAttribute("model");
        }
    }
    return null;
}

function getUrlCombo(combo) {
    if (combo != null && combo.tagName === "SELECT") {
        if (combo.getAttribute("url") != null && combo.getAttribute("url") != '') {
            return combo.getAttribute("url");
        }
    }
    return null;
}

function getSelectedCombo(combo) {
    if (combo != null && combo.tagName === "SELECT") {
        if (combo.getAttribute("selected") != null && combo.getAttribute("selected") != '') {
            return combo.getAttribute("selected");
        }
    }
    return null;
}

function submitAjax(formData, url) {
    $.ajax({
        method: "POST",
        url: url,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            alert('Transaccion: ' + result);
            window.location.reload();
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Hubo un Error de Conexion. Intente Nuevamente.");
        }

    });
}

function setDataForm(myform, json) {
    var attrib = null, values = null, i = null, col = null, item = null;
    if (json != null && myform != null && myform.tagName === "FORM") {
        attrib = Array();
        if (json.length != null) {
            attrib = null;
        } else {
            for (var child in json) {
                json = json[child];
                break;
            }
        }

        if (json.length > 0) {
            values = json[0];
            for (var aux in values) {
                if (isNaN(aux)) {
                    attrib.push("" + aux);
                }
            }
            for (i = 0; i < attrib.length; i++) {
                col = null;
                item = null;
                col = attrib[i];
                item = getElementForm(myform, "" + col);
                if (item != null) {
                    item.value = "";
                    item.value = values[col];
                    if (item.tagName === "SELECT") {
                        item.setAttribute('selected', values[col]);
                        item.selected = values[col];
                    }
                }
            }
        }

    }
}


function getData(element) {
    var myform = null, obj = null, url = null, formData = null;
    myform = getForm(element);
    url = getUrlForm(myform);
    createTempInputs(myform);
    formData = new FormData(myform);
    deleteTemporalElements(myform);
    if (formData != null && url != null && url != '') {
        $.ajax({
            method: "POST",
            url: url,
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result != null && result != '') {
                    try {
                        obj = JSON.parse(result);
                    } catch (e) {
                        obj = null;
                        console.log('Error: ' + result);
                    }
                    if (obj != null) {
                        console.log('Conversion Exitosa a JSON!');
                        setDataForm(myform, obj);
                    }
                } else {
                    alert('Servicio Web Falló!.');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Hubo un Error de Conexion. Intente Nuevamente.");
            }
        }
        );
    }
    
}

function setComboboxOptions(combo, model, json) {
    var option = null;
    var selected = null;
    if (combo != null && model != null && json != null) {

        if (json.length == null) {
            console.log('Objeto JSON');
            for (var child in json) {
                json = json[child];
                break;
            }
        }
        console.log(json);
        selected = combo.getAttribute("selected");

        for (var i = 0; i < json.length; i++) {
            option = document.createElement('option');
            option.setAttribute('id', json[i]['ivalue']);
            option.setAttribute('value', json[i]['ivalue']);
            option.innerHTML = json[i]['iname'];
            if (option.id == selected) {
                option.setAttribute('selected', 'true');
            }
            combo.appendChild(option);
            option = null;
            console.log(json[i]['ivalue'] + ' => ' + json[i]['iname']);
        }
        return true;
    }
    return false;
}

function getComboboxData(element) {
    var url = null;
    var model = null;
    var colname = null;
    var colvalue = null;
    var object = null;
    var vals = null;

    url = getUrlCombo(element);
    model = getModelCombo(element);
    colname = getColName(element);
    colvalue = getColValue(element);
    vals = {
        "model": model,
        "colname": colname,
        "colvalue": colvalue
    };

    if (element != null &&
            url != null && url != '' &&
            model != null && model != '' &&
            colname != null && colname != '' &&
            colvalue != null && colvalue != '') {
        $.ajax({
            method: "POST",
            url: url,
            data: vals,
            success: function (result) {
                console.log(result);
                if (result != null && result != '') {
                    try {
                        object = JSON.parse(result);
                    } catch (e) {
                        object = null;
                        alert('Error: ' + result);
                    }
                    if (object != null) {
                        console.log('Conversion Exitosa a JSON!');
                        setComboboxOptions(element, model, object);
                    }
                } else {
                    alert('Servicio Web Falló!.');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Hubo un Error de Conexion. Intente Nuevamente.");
            }
        }
        );
    }
}


function validateForm(form) {

    var next = true;
    var j = 0;
    var elements = null;
    var item = null;

    if (form != null) {
        elements = form.elements;
        if (elements.length > 0) {
            for (j = 0; j < elements.length; j++) {
                item = null;
                item = elements[j];
                if (item.getAttribute('required') == 'true' && item.getAttribute('disabled') == null) {
                    if (item.value == null || item.value == '') {
                        alert('Campo Vacio: Obligatorio');
                        item.focus();
                        requireElement(item);
                        next = false;
                        break;
                    }

                    if (item.getAttribute('type') == 'text') {
                        if (!validateText(item.value)) {
                            alert('Campo Vacio: Texto');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                    if (item.getAttribute("integer") == 'true') {
                        if (!validateOnlyNumeric(item.value)) {
                            alert('Formato Invalido: Número Entero');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                    if (item.type == 'date' || item.getAttribute('date') == 'true') {
                        if (!isDate(item.value) || !validateDateYYYYMMDD(item.value)) {
                            alert('Formato Invalido: Fecha');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                    if (item.type == 'email' || item.getAttribute('email') == 'true') {
                        if (!validateEmail(item.value)) {
                            alert('Formato Invalido: Email');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                    if (item.getAttribute("type") == 'password') {
                        if (!validatePassword(item.value)) {
                            alert('Formato Invalido: Password');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                    if (item.getAttribute("type") == 'tel') {
                        if (!validateOnlyNumeric(item.value)) {
                            alert('Formato Invalido: Telefono');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                    if (item.getAttribute("decimal") == 'true') {
                        if (!validateNumber(item.value)) {
                            alert('Campo Vacio: Numerico');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                }
            }
        }
    }

    return next;
}

function submitForm(button) {
    var next = false;
    var form = null;
    var url = null;
    var formdata = null;

    getActionFromButton(button);
    form = getForm(button);
    if (form != null) {
        url = getUrlForm(form);
        if (url != null && url != "") {
            next = validateForm(form);
            if (next == true) {
                createTempInputs(form);
                formdata = null;
                formdata = new FormData(form);
                if (formdata != null) {
                    submitAjax(formdata, url);
                }
                deleteTemporalElements(form);

            }
        } else {
            next = false;
            alert("Ruta de Destino Nula.");
        }
    } else {
        next = false;
        alert("No se encontró el Formulario.");
    }
    return next;
}

function submitFormConfirm(button) {
    var r = false;
    r = confirm("Está Seguro?");
    if (r == true) {
        return submitForm(button);
    } else {
        alert("Accion Cancelada.");
        return false;
    }
    return false;
}





    