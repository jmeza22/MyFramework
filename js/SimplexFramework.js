/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery(document).ready(function () {
    createAjaxLoading();
    AjaxLoading();
    getIdFromGET();
    setTokenForms();
});

function noContextMenu() {
    document.oncontextmenu = function () {
        return false;
    };
    document.oncopy = function () {
        return false;
    };
    document.oncut = function () {
        return false;
    };
}

function noBackButton() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button";
    window.onhashchange = function () {
        window.location.hash = "no-back-button";
    };
}

function getCurrentTime() {
    var hh = new Date().getHours();
    var mm = new Date().getMinutes();
    var ss = new Date().getSeconds();
    var text = '';
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (ss < 10) {
        ss = '0' + ss;
    }
    text = '' + hh + ':' + mm + ':' + ss;
    console.log(text);
    return text;
}

function getCurrentDate() {
    var Y = new Date().getFullYear();
    var M = new Date().getMonth();
    var D = new Date().getDate();
    var text = '';
    M = M + 1;
    if (M < 10) {
        M = '0' + M;
    }
    if (D < 10) {
        D = '0' + D;
    }
    text = '' + Y + '-' + M + '-' + D;
    console.log(text);
    return text;
}

function getDateTimeString() {
    var text = '';
    var date = getCurrentDate();
    var time = getCurrentTime();
    date = date.split('-').join('');
    date = date.split('/').join('');
    time = time.split(':').join('');
    text = date + time;
    return text;
}

function clearForm(form) {
    if (form !== null && form.tagName === "FORM") {
        form.reset();
    }
}

function GET(key) {
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

function getErrorMessage() {
    var message = 'Connection Error!.';
    return message;
}

function showNotification(text) {
    var notifications = document.getElementById("notification");
    if (text !== null || text !== "") {
        notifications.value = text;
        notifications.innerHTML = text;
    }
    return notifications;
}

function AjaxLoading() {
    $(document).on("ajaxStart", function () {
        showAjaxLoading();
    }).on("ajaxStop", function () {
        hideAjaxLoading();
    });
}

function createAjaxLoading() {
    var maindiv = null;
    var subdiv = null;
    var imgload = null;
    var text = null;

    maindiv = document.createElement("div");
    subdiv = document.createElement("div");
    imgload = document.createElement("img");
    text = document.createElement("p");

    maindiv.setAttribute("id", "AjaxLoading");
    maindiv.setAttribute("class", "AjaxLoading");
    maindiv.setAttribute("style", "display:none;");
    subdiv.setAttribute("id", "SubLoading");
    subdiv.setAttribute("class", "SubLoading");
    subdiv.setAttribute("style", "display: inline-block;");
    imgload.setAttribute("id", "ImageLoading");
    imgload.setAttribute("class", "ImageLoading");
    imgload.setAttribute("src", "css/loadingAnimation.gif");
    text.setAttribute("class", "TextLoading");
    text.innerHTML = '...CARGANDO...';

    maindiv.appendChild(subdiv);
    subdiv.appendChild(imgload);
    subdiv.appendChild(text);
    document.body.appendChild(maindiv);
}

function showAjaxLoading() {
    var loading = null;
    loading = document.getElementById("AjaxLoading");
    if (loading !== null) {
        loading.style = "display: block; text-align: center;";
        return true;
    }
    return false;
}

function hideAjaxLoading() {
    var loading = null;
    loading = document.getElementById("AjaxLoading");
    if (loading !== null) {
        loading.style = "display: none;";
        return true;
    }
    return false;
}

function getWSPath() {
    var path = null;
    if (LocalStorageStatus()) {
        path = localStorage.getItem("WebServicePath");
        if (path === null) {
            console.log("WebServicePath is null");
        } else {
            return path;
        }
    }
    return "http://localhost/MyFramework/";
}

function setTokenForms() {
    var myforms = null;
    var token = null;
    try {
        myforms = document.forms;
        token = localStorage.getItem('TokenLogin');
        for (var i = 0; i < myforms.length; i++) {
            if (myforms[i] !== null && token !== null) {
                myforms[i].setAttribute('token', token);
            }
        }
        return true;
    } catch (e) {

    }
    return false;
}

function getTitle(Obj) {
    if (Obj !== null) {
        if (Obj.getAttribute('title') !== null) {
            return Obj.getAttribute('title');
        }
    }
    return '';
}

function getPlaceholder(Obj) {
    if (Obj !== null) {
        if (Obj.getAttribute('placeholder') !== null) {
            return Obj.getAttribute('placeholder');
        }
    }
    return '';
}

function hideElement(element) {
    if (element !== null) {
        element.style = 'visibility: hidden; display: none;';
        return true;
    }
    return false;
}

function disableElement(element) {
    if (element !== null) {
        element.setAttribute('disable', 'true');
        return true;
    }
    return false;
}

function getForm(item) {
    if (item !== null) {

        if (item.tagName === "FORM") {
            return item;
        }
        if (item.parentNode.tagName === "FORM") {
            console.log('Formulario Encontrado: ' + item.parentNode);
            return item.parentNode;
        } else {
            return getForm(item.parentNode);
        }
    }
    console.log('No Se Encontró Formulario!.');
    return null;
}

function disabledForm(item) {
    var form = null;
    if (item !== null) {
        form = getForm(item);
        for (var i = 0; i < document.forms.length; i++) {
            if (form === document.forms[i]) {
                form = document.forms[i];
                for (var j = 0; j < form.elements.length; j++) {
                    form.elements[j].setAttribute('disabled', 'disabled');
                }
            }
        }
        return true;
    }
    return false;
}

function resetForm(item) {
    var form = null;
    if (item !== null) {
        form = getForm(item);
        for (var i = 0; i < document.forms.length; i++) {
            if (form === document.forms[i]) {
                form = document.forms[i];
                for (var j = 0; j < form.elements.length; j++) {
                    if (form.elements[j].tagName !== "BUTTON") {
                        form.elements[j].value = "";
                    }
                }
            }
        }
        return true;
    }
    return false;
}

function readOnlyForm(item) {
    var form = null;
    if (item !== null) {
        form = getForm(item);
        for (var i = 0; i < document.forms.length; i++) {
            if (form === document.forms[i]) {
                form = document.forms[i];
                for (var j = 0; j < form.elements.length; j++) {
                    form.elements[j].setAttribute('readonly', 'readonly');
                    console.log(form.elements[j].tagName);
                    if (form.elements[j].tagName === "SELECT") {
                        var newitem = document.createElement('INPUT');
                        newitem.setAttribute('type', 'hidden');
                        newitem.setAttribute('id', form.elements[j].getAttribute('id'));
                        newitem.setAttribute('name', form.elements[j].getAttribute('name'));
                        newitem.setAttribute('value', form.elements[j].getAttribute('value'));
                        newitem.value = form.elements[j].value;
                        form.appendChild(newitem);
                        form.elements[j].setAttribute('disabled', 'disabled');
                    }
                    if (form.elements[j].tagName === "BUTTON" ||
                            (form.elements[j].tagName === "INPUT" &&
                                    (
                                            form.elements[j].getAttribute('type') === 'button' ||
                                            form.elements[j].getAttribute('type') === 'submit' ||
                                            form.elements[j].getAttribute('type') === 'reset')
                                    )
                            ) {
                        form.elements[j].setAttribute('disabled', 'disabled');
                    }
                }
                break;
                return true;
            }
        }
    }
    return false;
}

function getElementDocument(id) {
    var item = null;
    if (id !== null && id !== '') {
        item = document.getElementById(id);
        return item;
    }
    return null;
}

function getElement(parent, id) {
    var j = 0;
    var elements = null;

    if (parent !== null && id !== null && id !== '') {
        if (parent.tagName === "FORM") {
            elements = parent.elements;
            if (elements.length > 0) {
                for (j = 0; j < elements.length; j++) {
                    if (elements[j].getAttribute("id") === id) {
                        console.log("Found: " + elements[j].getAttribute("id"));
                        return elements[j];
                    }
                }
            }
        }
    }
    return getElementDocument(id);
}

function getOptionByValue(parent, value) {
    var j = 0;
    var elements = null;

    if (parent !== null && value !== null && value !== '') {
        if (parent.tagName === "SELECT" || parent.tagName === "DATALIST") {
            elements = parent.childNodes;
            if (elements.length > 0) {
                for (j = 0; j < elements.length; j++) {
                    if (elements[j].value === value) {
                        console.log("Found: " + elements[j].getAttribute("id"));
                        return elements[j];
                    }
                }
            }
        }
    }
    return null;
}

function createInputHidden(form, name, value) {
    var element = null;
    if (form !== null && form.tagName === "FORM" && name !== null) {
        element = document.createElement('input');
        element.setAttribute('type', 'hidden');
        element.setAttribute('id', name);
        element.setAttribute('name', name);
        element.setAttribute('value', value);
        form.appendChild(element);
        console.log('Creado Input ' + name);
        return true;
    }
    return false;
}

function createInputHiddenTemp(form, name, value) {
    var element = null;
    if (createInputHidden(form, name, value)) {
        element = getElement(form, name);
        if (element !== null) {
            element.setAttribute('temp', 'true');
            console.log('Input Oculto ' + name);
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
            if (elements[j].getAttribute("temp") === 'true') {
                deleteElement(elements[j]);
                exists = true;
            }
        }
        return exists;
    }
    return false;
}

function getActionButton(item) {
    var form = null;
    if (item !== null) {
        form = getForm(item);
        if (form !== null && form.tagName === "FORM") {
            for (var j = 0; j < form.elements.length; j++) {
                if (form.elements[j] !== null && (form.elements[j].tagName === "BUTTON" || form.elements[j].tagName === "INPUT")) {
                    if (form.elements[j].getAttribute('action') !== null) {
                        console.log('Action Button: ' + form.elements[j].id);
                        return form.elements[j];
                    }
                }
            }
        }
    }
    return null;
}


function getActionFromButton(button) {
    var form = null;
    if (button === null || (button.tagName !== "BUTTON" && button.tagName !== "INPUT")) {
        button = getActionButton(button);
    }
    if (button !== null && (button.tagName === "BUTTON" || button.tagName === "INPUT")) {
        if (button.getAttribute("action") !== null && button.getAttribute("action") !== '') {
            form = getForm(button);

            if (button.getAttribute("action") === 'find') {
                form.setAttribute('do', 'find');
            }
            if (button.getAttribute("action") === 'insert') {
                form.setAttribute('do', 'insert');
            }
            if (button.getAttribute("action") === 'update') {
                form.setAttribute('do', 'update');
            }
            if (button.getAttribute("action") === 'delete') {
                form.setAttribute('do', 'delete');
            }
            if (button.getAttribute("action") === 'findall') {
                form.setAttribute('do', 'findall');
            }
            if (button.getAttribute("action") === 'updatestate') {
                form.setAttribute('do', 'updatestate');
            }
            console.log("action: " + button.getAttribute("action"));
            return button.getAttribute("action");
        }
    }
    return null;
}

function createTempInputs(form) {
    deleteElement(getElement(form, 'token'));
    if (getElement(form, 'token') === null && getToken(form) !== null && getToken(form) !== '') {
        createInputHiddenTemp(form, 'token', getToken(form));
    }
    deleteElement(getElement(form, 'model'));
    if (getElement(form, 'model') === null && getModel(form) !== null && getModel(form) !== '') {
        createInputHiddenTemp(form, 'model', getModel(form));
    }
    deleteElement(getElement(form, 'action'));
    if (getElement(form, 'action') === null && getActionForm(form) !== null && getActionForm(form) !== '') {
        createInputHiddenTemp(form, 'action', getActionForm(form));
    }
    deleteElement(getElement(form, 'findBy'));
    if (getElement(form, 'findBy') === null && getFindBy(form) !== null && getFindBy(form) !== '') {
        createInputHiddenTemp(form, 'findBy', getFindBy(form));
    }
}

function getTD(item) {
    if (item !== null) {
        if (item.parentNode.tagName === "TD") {
            return item.parentNode;
        } else {
            return getTD(item.parentNode);
        }
    }
    return null;
}

function getColNameCombobox(combo) {
    if (combo !== null && (combo.tagName === "SELECT" || combo.tagName === "DATALIST")) {
        if (combo.getAttribute("colname") !== null && combo.getAttribute("colname") !== '') {
            return combo.getAttribute("colname");
        }
    }
    return null;
}

function getColValueCombobox(combo) {
    if (combo !== null && (combo.tagName === "SELECT" || combo.tagName === "DATALIST")) {
        if (combo.getAttribute("colvalue") !== null && combo.getAttribute("colvalue") !== '') {
            return combo.getAttribute("colvalue");
        }
    }
    return null;
}

function getOtherValueCombobox(combo) {
    if (combo !== null && (combo.tagName === "SELECT" || combo.tagName === "DATALIST")) {
        if (combo.getAttribute("othervalue") !== null && combo.getAttribute("othervalue") !== '') {
            return combo.getAttribute("othervalue");
        }
    }
    return null;
}

function getActionForm(form) {
    if (form !== null && form.tagName === "FORM") {
        if (form.getAttribute("do") !== null && form.getAttribute("do") !== '') {
            return form.getAttribute("do");
        }
    }
    return null;
}

function getModel(element) {
    if (element !== null && (element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "DATALIST" || element.tagName === "TABLE" || element.tagName === "FORM")) {
        if (element.getAttribute("model") !== null && element.getAttribute("model") !== '') {
            return element.getAttribute("model");
        }
    }
    return null;
}

function getURL(element) {
    if (element !== null && (element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "DATALIST" || element.tagName === "TABLE" || element.tagName === "FORM")) {
        if (element.getAttribute("url") !== null && element.getAttribute("url") !== '') {
            return getWSPath() + element.getAttribute("url");
        }
    }
    return null;
}

function getToken(element) {
    if (element !== null && (element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "DATALIST" || element.tagName === "TABLE" || element.tagName === "FORM")) {
        if (element.getAttribute("token") !== null && element.getAttribute("token") !== '') {
            return element.getAttribute("token");
        }
    }
    return null;
}

function getFindBy(element) {
    if (element !== null && (element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "DATALIST" || element.tagName === "TABLE" || element.tagName === "FORM")) {
        if (element.getAttribute("findby") !== null && element.getAttribute("findby") !== '') {
            return element.getAttribute("findby");
        }
    }
    return null;
}

function getFindByValue(element) {
    if (element !== null && (element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "DATALIST" || element.tagName === "TABLE" || element.tagName === "FORM")) {
        if (element.getAttribute("findbyvalue") !== null && element.getAttribute("findbyvalue") !== '') {
            return element.getAttribute("findbyvalue");
        }
    }
    return null;
}

function getOrderTable(element) {
    if (element.tagName === "TABLE") {
        if (element.getAttribute("ordertable") !== null && element.getAttribute("ordertable") !== '') {
            return element.getAttribute("ordertable");
        }
    }
    return null;
}

function getSelectedOption(element) {
    if (element !== null && (element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "DATALIST" || element.tagName === "TABLE")) {
        if (element.getAttribute("selected") !== null && element.getAttribute("selected") !== '') {
            return element.getAttribute("selected");
        }
    }
    return null;
}

function submitAjax(formData, url, header, reload) {
    var promise = null;
    console.log('Trying Submit!.');
    promise = $.ajax({
        method: "POST",
        url: url,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result, status) {
            if (result !== null && result !== '') {
                try {
                    result = JSON.parse(result);
                } catch (e) {
                    console.log(result);
                }
            }
            if (result !== null && result !== '') {
                if (result.error !== null && result.error !== undefined && result.error !== '') {
                    console.error(result.error);
                }
                if (result.message !== null && result.message !== undefined && result.message !== '') {
                    alert(result.message);
                }
                if (result.data !== null && result.data !== undefined && result.data !== '') {
                    console.log('Data: ' + result.data);
                }
                if (result.lastInsertId !== null && result.lastInsertId !== undefined && result.lastInsertId !== '') {
                    try {
                        console.log('LastId: ' + result.lastInsertId);
                        sessionStorage.setItem('LastInsertId', result.lastInsertId);
                    } catch (e) {
                        console.log('Hubo error con el lastInsertId.');
                    }
                }
                if (result.state !== null && result.state !== undefined && result.state === 1) {
                    console.log('Submit OK!.');
                    if (reload === true) {
                        window.location.reload();
                    }
                } else {
                    console.error('Hubo error - Submit!.');
                }
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Hubo un Error de Conexion. Intente Nuevamente.");
        }

    });
    return promise;
}

function setDataForm(myform, json) {
    var columns = null, values = null, col = null, item = null;
    if (json !== null && myform !== null && myform.tagName === "FORM") {
        columns = Array();
        if (Object.keys(json).length === 1 && Object.keys(json)[0] === getModel(myform)) {
            for (var child in json) {
                json = json[child];
                break;
            }
        }
        if (json !== null) {
            values = json;
            if (json.length === 1 || json.length > 1) {
                values = json[0];
            }
            for (var aux in values) {
                if (isNaN(aux)) {
                    columns.push("" + aux);
                }
            }

            for (var j = 0; j < columns.length; j++) {
                col = null;
                item = null;
                col = columns[j];
                item = getElement(myform, "" + col);
                if (item !== null) {
                    item.value = "";
                    item.value = values[col];
                    if (values[col] === null) {
                        item.value = '';
                    }
                    if (item.value === '[object Object]') {
                        item.value = '';
                    }
                    if (item.getAttribute('type') !== null && item.getAttribute('type') === 'password') {
                        item.value = '';
                    }
                    if (item.tagName === "SELECT") {
                        item.setAttribute('selected', values[col]);
                        item.selected = values[col];
                    }

                }
            }
            console.log('Set Data Form OK!.');
            return true;
        }

    }
    return false;
}

function getData(element) {
    var promise = null;
    var myform = null, object = null, url = null, formData = null;
    myform = getForm(element);
    myform.setAttribute("do", "find");
    url = getURL(myform);
    createTempInputs(myform);
    formData = new FormData(myform);
    deleteTemporalElements(myform);
    console.log('Loading Data Form!');
    if (formData !== null && url !== null && url !== '') {
        promise = $.ajax({
            method: "POST",
            url: url,
            data: formData,
            processData: false,
            contentType: false,
            success: function (result, status) {
                if (result !== null && result !== '') {
                    try {
                        result = JSON.parse(result);
                        console.log('Conversion Exitosa a JSON - Get Data Form!.');
                    } catch (e) {
                        console.log('Conversion Fallida a JSON - Get Data Form!.');
                        console.log(result);
                    }
                }
                if (result !== null && result !== '') {
                    if (result.message !== null && result.message !== undefined && result.message !== '') {
                        alert(result.message);
                    }
                    if (result.data !== null && result.data !== undefined && result.data !== '') {
                        object = result.data;
                        try {
                            object = JSON.parse(object);
                            setDataForm(myform, object);
                        } catch (e) {
                            console.log("Error de Conversion JSON (Data) - Get Data Form!.");
                        }
                    }

                } else {
                    alert('Servicio Web Falló!.');
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

function setComboboxOptions(combo, json) {
    var option = null;
    var selected = null;
    if (combo !== null && json !== null) {
        if (Object.keys(json).length === 1 && Object.keys(json)[0] === getModel(combo)) {
            for (var child in json) {
                json = json[child];
                break;
            }
        }
        selected = combo.getAttribute("selected");
        for (var i = 0; i < json.length; i++) {
            option = document.createElement('option');
            option.setAttribute('id', json[i]['ivalue']);
            option.setAttribute('value', json[i]['ivalue']);
            option.setAttribute('othervalue', json[i]['iothervalue']);
            option.innerHTML = json[i]['iname'];
            if (selected !== null && option.id === selected) {
                option.setAttribute('selected', 'selected');
            }
            combo.appendChild(option);
            option = null;
        }
        console.log('Set ComboBox OK!.');
        return true;
    }
    return false;
}

function loadComboboxData(element) {
    var promise = null;
    var url = null;
    var model = null;
    var colname = null;
    var colvalue = null;
    var othervalue = null;
    var object = null;
    var vals = null;

    url = getURL(element);
    model = getModel(element);
    colname = getColNameCombobox(element);
    colvalue = getColValueCombobox(element);
    othervalue = getOtherValueCombobox(element);
    vals = {
        "model": model,
        "action": 'findAll',
        "colname": colname,
        "colvalue": colvalue,
        "othervalue": othervalue
    };
    console.log('Loading ComboboxData!');
    if (element !== null &&
            url !== null && url !== '' &&
            model !== null && model !== '' &&
            colname !== null && colname !== '' &&
            colvalue !== null && colvalue !== '') {
        console.log('Cargando Opciones para ' + element.id);
        promise = $.ajax({
            method: "POST",
            url: url,
            data: vals,
            success: function (result, status) {
                if (result !== null && result !== '') {
                    try {
                        result = JSON.parse(result);
                        console.log('Conversion Exitosa a JSON - Load Combobox!.');
                    } catch (e) {
                        console.log('Conversion Fallida a JSON - Load Combobox!.');
                        console.log(result);
                    }
                }
                if (result !== null && result !== '') {
                    object = result;
                    setComboboxOptions(element, object);
                } else {
                    console.error('Servicio Web Falló!.');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Hubo un Error de Conexion. Intente Nuevamente.");
            }
        }
        );
    }
    return promise;
}

function clearTableData(element) {
    var TRs = null;
    if (element !== null && element.tagName === "TABLE") {
        if (element.getElementsByTagName('TR') !== null) {
            TRs = element.getElementsByTagName('TR');
            for (var i = 0; i < TRs.length; i++) {
                if (TRs[i] !== null && TRs[i] !== undefined) {
                    if (TRs[i].getAttribute('rowSample') !== null) {
                        hideElement(TRs[i]);
                    }
                    if (TRs[i].getAttribute('rowHead') === null && TRs[i].getAttribute('rowSample') === null) {
                        deleteElement(TRs[i]);
                        if (i > 0) {
                            i = i - 1;
                        }
                    }
                }
            }
        }
        return true;
    }
    return false;
}

function createDataTable(element) {
    var xtable = null;
    var tableId = null;
    var ordertable = getOrderTable(element);
    if (element !== null && element.tagName === "TABLE") {
        tableId = '#' + element.getAttribute('id');
        try {
            if (ordertable !== null && isNaN(ordertable) === false) {
                xtable = $(tableId).DataTable({
                    "order": [[ordertable, "desc"]]
                });
            } else {
                xtable = $(tableId).DataTable();
            }
            console.log('DataTable Created: ' + tableId + '');
        } catch (e) {
            console.error(e);
            null;
        }
    }
    return xtable;
}

function destroyDataTable(element) {
    var result = false;
    var tableId = null;
    if (element !== null && element.tagName === "TABLE") {
        tableId = '#' + element.getAttribute('id');
        try {
            if ($.fn.DataTable.isDataTable(tableId)) {
                $(tableId).DataTable().destroy();
                console.log('DataTable Destroyed: ' + tableId + '');
                result = true;
            }
        } catch (e) {
            null;
        }
    }
    return result;
}

function setTableData(element, json, dynamic) {
    var TRs = null;
    var rowSample = null;
    var newrow = null;
    var thead = null;
    var tbody = null;
    var values = null;
    var columns = null;
    var col = null;
    var xtable = null;

    if (element !== null && element.tagName === "TABLE" && json !== null) {
        destroyDataTable(element);
        if (element.getElementsByTagName('THEAD') !== null) {
            thead = element.getElementsByTagName('THEAD')[0];
            thead.setAttribute('id', 'thead' + '_' + element.id);
        }
        if (element.getElementsByTagName('TBODY') !== null) {
            tbody = element.getElementsByTagName('TBODY')[0];
            tbody.setAttribute('id', 'tbody' + '_' + element.id);
        }
        if (element.getElementsByTagName('TR') !== null) {
            TRs = element.getElementsByTagName('TR');
        }
        for (var i = 0; i < TRs.length; i++) {
            if (TRs[i].getAttribute('rowSample') !== null) {
                rowSample = TRs[i].innerHTML;
                break;
            }
        }
        clearTableData(element);
        if (Object.keys(json).length === 1 && Object.keys(json)[0] === getModel(element)) {
            for (var child in json) {
                json = json[child];
                break;
            }
        }

        if (json.length > 0) {
            values = json[0];
            columns = Array();
            for (var aux in values) {
                if (isNaN(aux)) {
                    columns.push("" + aux);
                }
            }

            for (var i = 0; i < json.length; i++) {
                newrow = null;
                newrow = document.createElement('TR');
                newrow.setAttribute('rowID', i);
                newrow.innerHTML = rowSample;
                for (var j = 0; j < columns.length; j++) {
                    col = columns[j];
                    newrow.innerHTML = newrow.innerHTML.split('{{' + col + '}}').join(json[i][col]);
                }
                tbody.appendChild(newrow);
            }

            if (dynamic === true) {
                console.log('DataTable Dinamico!.');
                xtable = createDataTable(element);
            }
            console.log('Set TableData OK!.');
            return true;
        }
    }
    return false;
}

function loadTableData(element, dynamic) {
    var promise = null;
    var url = null;
    var model = null;
    var findby = null;
    var findbyvalue = null;
    var vals = null;
    var object = null;
    url = getURL(element);
    model = getModel(element);
    findby = getFindBy(element);
    findbyvalue = getFindByValue(element);
    vals = {
        "model": model,
        "action": 'findAll',
        "findBy": findby,
        "findbyvalue": findbyvalue
    };
    console.log('Loading TableData');

    if (element !== null && element.tagName === "TABLE") {
        promise = $.ajax({
            method: "POST",
            url: url,
            data: vals,
            success: function (result, status) {
                if (result !== null && result !== '') {
                    try {
                        result = JSON.parse(result);
                        console.log('Conversion Exitosa a JSON - Load TableData!');
                    } catch (e) {
                        console.log('Conversion Fallida a JSON - Load TableData!');
                        console.log(result);
                    }
                }
                if (result !== null && result !== '') {
                    object = result;
                    setTableData(element, object, dynamic);
                } else {
                    console.log('Servicio Web Falló!.');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(textStatus);
                console.error("Hubo un Error de Conexion. Intente Nuevamente.");
            }
        }
        );
    }
    return promise;
}

function setNameFieldsValue(object, namefield1, namefield2, namefield3) {
    var field1 = null;
    var field2 = null;
    var field3 = null;

    if (object === null && object !== undefined) {
        return false;
    } else {
        if (object['data'] !== null && object['data'] !== undefined) {
            object = object['data'];
        }
        if (Object.keys(object).length === 1) {
            if (object[0] !== null && object[0] !== undefined) {
                object = object[0];
            }
        }
    }

    if (namefield1 !== null) {
        if (namefield1.tagName === 'INPUT') {
            field1 = namefield1;
        } else {
            field1 = getElementDocument(namefield1);
        }
        if (field1 !== null) {
            field1.value = 'NOT FOUND';
            if (object[field1.id] !== null && object[field1.id] !== undefined) {
                field1.value = object[field1.id];
            }
        }
    }

    if (namefield2 !== null) {
        if (namefield2.tagName === 'INPUT') {
            field2 = namefield2;
        } else {
            field2 = getElementDocument(namefield2);
        }
        if (field2 !== null) {
            field2.value = 'NOT FOUND';
            if (object[field2.id] !== null && object[field2.id] !== undefined) {
                field2.value = object[field2.id];
            }
        }
    }

    if (namefield3 !== null) {
        if (namefield3.tagName === 'INPUT') {
            field3 = namefield3;
        } else {
            field3 = getElementDocument(namefield3);
        }
        if (field3 !== null) {
            field3.value = 'NOT FOUND';
            if (object[field3.id] !== null && object[field3.id] !== undefined) {
                field3.value = object[field3.id];
            }
        }
    }
    console.log('Set NameFieldsValue OK!.');
    return true;
}

function loadNameFromId(field, namefield1, namefield2, namefield3) {
    var promise = null;
    var url = null;
    var model = null;
    var findby = null;
    var id = null;
    var vals = null;
    var object = null;
    if (field !== null) {
        if (field.tagName === null || field.tagName === undefined) {
            field = document.getElementById(field);
        }
        url = getURL(field);
        model = getModel(field);
        findby = field.name;
        id = field.value;
    }
    vals = {
        "model": model,
        "action": 'find',
        "findBy": findby
    };
    vals[findby] = id;
    console.log('Loading NameFromId!');
    if (field !== null && namefield1 !== null) {
        promise = $.ajax({
            method: "POST",
            url: url,
            data: vals,
            success: function (result, status) {
                if (result !== null && result !== '') {
                    try {
                        result = JSON.parse(result);
                        console.log('Conversion Exitosa a JSON - Load Name From Id!');
                    } catch (e) {
                        console.log('Conversion Fallida a JSON - Load Name From Id!');
                        console.log(result);
                    }
                }
                if (result !== null && result !== '') {
                    if (result.data !== null && result.data !== undefined) {
                        try {
                            object = result.data;
                            object = JSON.parse(object);
                            setNameFieldsValue(object, namefield1, namefield2, namefield3);
                        } catch (e) {
                        }
                    }
                } else {
                    console.log('Servicio Web Falló!.');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(textStatus);
                console.error("Hubo un Error de Conexion. Intente Nuevamente.");
            }
        }
        );
    }
}

function autoLoadNameFromId(idfield, namefield1, namefield2, namefield3) {
    var field = null;
    if (idfield !== null) {
        field = document.getElementById(idfield);
        field.onchange = function () {
            loadNameFromId(field, namefield1, namefield2, namefield3);
        };
    }
}

function setLogin(data) {
    if (data !== null) {
        try {
            if (data['user'] !== null) {
                localStorage.setItem("UsernameLogin", "" + data['user']);
                console.log('UsernameLogin Almacenado');
            } else {
                localStorage.removeItem("UsernameLogin");
            }
            if (data['userrole'] !== null) {
                localStorage.setItem("UserRoleLogin", "" + data['userrole']);
                console.log('UserRoleLogin Almacenado');
            } else {
                localStorage.removeItem("UserRoleLogin");
            }
            if (data['userid'] !== null) {
                localStorage.setItem("UserIdLogin", "" + data['userid']);
                console.log('UserIdLogin Almacenado');
            } else {
                localStorage.removeItem("UserIdLogin");
            }
            return true;
        } catch (e) {
            console.log('No se pudo Iniciar Variables de Sesion!.');
        }
    }
    return false;
}

function setToken(token) {
    try {
        if (token !== null) {
            localStorage.setItem("TokenLogin", "" + token);
            console.log('TokenLogin Almacenado ' + token);
            return true;
        } else {
            localStorage.removeItem("TokenLogin");
        }
    } catch (e) {
        console.log('No se pudo Iniciar Token!. ' + token);
    }
    return false;
}

function login(element, destinationPage) {
    var form = null;
    var url = null;
    var formData = null;
    var promise = null;
    var object = null;
    if (element !== null) {
        form = getForm(element);
        url = getURL(form);
    }
    formData = new FormData(form);
    if (form !== null) {
        promise = $.ajax({
            method: "POST",
            url: url,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (result, status) {
                if (result !== null) {
                    if (result.message !== null && result.message !== '') {
                        alert(result.message);
                    }
                    if (result.error !== null && result.error !== '') {
                        console.error(result.error);
                    }
                    if (result.state === 1) {
                        try {
                            object = JSON.parse(result.data);
                            console.log('Conversion Exitosa a JSON - Login!');
                        } catch (e) {
                            console.error("Error de Conversion JSON - Login");
                        }
                        setLogin(object);
                        if (result.token !== null && result.token !== '') {
                            setToken(result.token);
                        }
                        if (destinationPage !== null) {
                            window.location.href = destinationPage;
                        }
                    }

                }
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Hubo un Error de Conexion. Intente Nuevamente.");
            }

        });
    } else {
        console.error("No se encontró el Formulario.");
    }
    return promise;
}

function logout(url, destinationPage, token) {
    var promise = null;
    var object = null;
    var vals = null;
    vals = {
        "model": 'logout',
        "action": 'logout',
        "token": token
    };
    if (url !== null) {
        promise = $.ajax({
            method: "POST",
            url: url,
            data: vals,
            dataType: 'json',
            success: function (result, status) {
                if (result !== null && result !== '') {
                    if (result.message !== null && result.message !== '') {
                        console.log(result.message);
                    }
                    if (result.error !== null && result.error !== '') {
                        console.error(result.error);
                    }
                    if (result.data !== null) {
                        try {
                            object = JSON.parse(result.data);
                            console.log('Conversion Exitosa a JSON - Logout!');
                        } catch (e) {
                            console.error("Error de Conversion JSON - Logout");
                        }
                        setLogin(object);
                        setToken(null);
                        if (destinationPage !== null) {
                            window.location.href = destinationPage;
                        }
                    }

                } else {
                    console.log('Servicio Web Falló!.');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(textStatus);
                console.error("Hubo un Error de Conexion. Intente Nuevamente.");
            }
        }
        );
    }
}

function submitForm(element, reload) {
    var next = false;
    var form = null;
    var url = null;
    var formdata = null;
    var promise = null;
    getActionFromButton(element);

    if (element !== null) {
        form = getForm(element);
    }

    if (form !== null) {
        deleteTemporalElements(form);
        url = getURL(form);
        if (url !== null && url !== "") {
            createTempInputs(form);
            formdata = null;
            formdata = new FormData(form);
            if (formdata !== null) {
                promise = submitAjax(formdata, url, null, reload);
            }
            deleteTemporalElements(form);

        } else {
            next = false;
            console.error("Ruta de Destino Nula.");
        }
    } else {
        next = false;
        console.error("No se encontró el Formulario.");
    }
    return promise;
}

function submitFormConfirm(button, reload) {
    var r = false;
    r = confirm("Está Seguro(a)?");
    if (r === true) {
        return submitForm(button, reload);
    } else {
        console.log("Accion Cancelada.");
        return false;
    }
    return false;
}

function sendValue(form1, field1, form2, field2) {
    var findby1 = null;
    var findby2 = null;
    var valid1 = null;
    var valid2 = null;
    if (form1 !== null && form2 !== null) {
        form1 = getForm(form1);
        form2 = getForm(form2);

        if (form1.tagName === "FORM" && form2.tagName === "FORM") {
            if (field1 !== null && field1 !== '') {
                valid1 = getElement(form1, field1);
            } else {
                findby1 = getFindBy(form1);
                valid1 = getElement(form1, findby1);
            }
            if (field2 !== null && field2 !== '') {
                valid2 = getElement(form2, field2);
            } else {
                findby2 = getFindBy(form2);
                valid2 = getElement(form2, findby2);
            }
            if (valid1 !== null && valid2 !== null) {
                valid2.value = valid1.value;
            }
        }
    }
}

function setNameFromDataList(idfield, idfieldname, idothervalue) {
    if (idfield !== null && idfieldname !== null) {

        var field = null;
        var fieldTarget = null;
        var fieldOther = null;
        var datalist = null;
        var valuefield = null;
        var selected = null;

        if (document.getElementById(idfield) !== null) {
            field = document.getElementById(idfield);
        }
        if (field.getAttribute('list') !== null && field.getAttribute('list') !== '') {
            datalist = field.getAttribute('list');
        }
        if (document.getElementById(datalist) !== null) {
            datalist = document.getElementById(datalist);
        }
        if (document.getElementById(idfieldname) !== null) {
            fieldTarget = document.getElementById(idfieldname);
        }
        if (document.getElementById(idothervalue) !== null) {
            fieldOther = document.getElementById(idothervalue);
        }

        valuefield = field.value;
        if (datalist !== null && valuefield !== null) {
            selected = getOptionByValue(datalist, valuefield);
        }

        if (selected !== null) {
            if (selected.innerHTML !== null && selected.innerHTML !== '') {
                fieldTarget.value = selected.innerHTML;
            }
            if (fieldOther !== null && selected.getAttribute('othervalue') !== null) {
                fieldOther.value = selected.getAttribute('othervalue');
            }
        }

        if (valuefield === null || valuefield === '') {
            fieldTarget.value = '';
        }

    }
}

function autoNameFromDataList(idfield, idfieldname, idothervalue) {
    var field = null;
    if (idfield !== null) {
        field = document.getElementById(idfield);
        field.oninput = function () {
            setNameFromDataList(idfield, idfieldname, idothervalue);
        };
        field.onchange = function () {
            setNameFromDataList(idfield, idfieldname, idothervalue);
        };
        field.onfocus = function () {
            setNameFromDataList(idfield, idfieldname, idothervalue);
        };
    }

}

function getIdFromGET() {
    var frms = document.forms;
    var form = null;
    var findby = null;
    var id = null;
    var result = false;
    var button = null;
    for (var i = 0; i < frms.length; i++) {
        if (frms[i].getAttribute('findBy') !== null && frms[i].getAttribute('findBy') !== '' && frms[i].getAttribute('mainform') !== null && frms[i].getAttribute('mainform') === 'true') {
            form = frms[i];
            findby = form.getAttribute('findBy');
            for (var j = 0; j < form.elements.length; j++) {
                if (form.elements[j].getAttribute('save') !== null) {
                    button = form.elements[j];
                }
                if (form.elements[j].id === findby || form.elements[j].name === findby) {
                    id = form.elements[j];
                    if (GET(findby) !== null) {
                        id.value = GET(findby);
                        result = true;
                    }
                }
                if (button !== null) {
                    if (GET('action') !== null) {
                        button.setAttribute('action', GET('action'));
                    } else if (GET('action') === 'view') {
                        form.elements[j].setAttribute("readonly", "readonly");
                        form.elements[j].setAttribute("disabled", "disabled");
                    }
                }
            }
        }
    }

    return result;
}
