/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery(document).ready(function () {
    createAjaxLoading();
    AjaxLoading();
    getIdGET();
    setTokenForms();
});

function noContextMenu() {
    document.oncontextmenu = function () {
        return false;
    };
    document.oncopy = new Function("return false");
    document.oncut = new Function("return false");
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
    var D = new Date().getDay();
    var text = '';
    M = M + 1;
    D = D + 1;
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
        loading.style = "display: block;";
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
            return item.parentNode;
        } else {
            return getForm(item.parentNode);
        }
    }
    return null;
}

function getElementDocument(id) {
    var item = null;
    if (id !== null && id !== '') {
        item = document.getElementById(id);
        return item;
    }
    return null;
}

function getElementForm(form, id) {
    var j = 0;
    var elements = null;

    if (form !== null && id !== null && id !== '') {
        if (form.tagName === "FORM") {
            elements = form.elements;
            if (elements.length > 0) {
                for (j = 0; j < elements.length; j++) {
                    if (elements[j].getAttribute("id") === id) {
                        console.log("Found: " + elements[j].getAttribute("id"))
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
        element = getElementForm(form, name);
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


function getUrlForm(form) {
    if (form !== null && form.tagName === "FORM") {
        if (form.getAttribute("url") !== null && form.getAttribute("url") !== '') {
            return getWSPath() + form.getAttribute("url");
        }
    }
    return null;
}

function getTokenForm(form) {
    if (form !== null && form.tagName === "FORM") {
        if (form.getAttribute("token") !== null && form.getAttribute("token") !== '') {
            return form.getAttribute("token");
        }
    }
    return null;
}

function getModelForm(form) {
    if (form !== null && form.tagName === "FORM") {
        if (form.getAttribute("model") !== null && form.getAttribute("model") !== '') {
            return form.getAttribute("model");
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

function getFindByForm(form) {
    if (form !== null && form.tagName === "FORM") {
        if (form.getAttribute("findBy") !== null && form.getAttribute("findBy") !== '') {
            return form.getAttribute("findBy");
        }
    }
    return null;
}

function getActionFromButton(button) {
    var form = null;
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
            if (button.getAttribute("action") === 'findAll') {
                form.setAttribute('do', 'findAll');
            }
            console.log("action: " + button.getAttribute("action"));
            return button.getAttribute("action");
        }
    }
    return null;
}

function createTempInputs(form) {
    deleteElement(getElementForm(form, 'token'));
    if (getElementForm(form, 'token') === null && getTokenForm(form) !== null && getTokenForm(form) !== '') {
        createInputHiddenTemp(form, 'token', getTokenForm(form));
    }
    deleteElement(getElementForm(form, 'model'));
    if (getElementForm(form, 'model') === null && getModelForm(form) !== null && getModelForm(form) !== '') {
        createInputHiddenTemp(form, 'model', getModelForm(form));
    }
    deleteElement(getElementForm(form, 'action'));
    if (getElementForm(form, 'action') === null && getActionForm(form) !== null && getActionForm(form) !== '') {
        createInputHiddenTemp(form, 'action', getActionForm(form));
    }
    deleteElement(getElementForm(form, 'findBy'));
    if (getElementForm(form, 'findBy') === null && getFindByForm(form) !== null && getFindByForm(form) !== '') {
        createInputHiddenTemp(form, 'findBy', getFindByForm(form));
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

function getColName(combo) {
    if (combo !== null && combo.tagName === "SELECT") {
        if (combo.getAttribute("colname") !== null && combo.getAttribute("colname") !== '') {
            return combo.getAttribute("colname");
        }
    }
    return null;
}

function getColValue(combo) {
    if (combo !== null && combo.tagName === "SELECT") {
        if (combo.getAttribute("colvalue") !== null && combo.getAttribute("colvalue") !== '') {
            return combo.getAttribute("colvalue");
        }
    }
    return null;
}

function getModelCombo(combo) {
    if (combo !== null && combo.tagName === "SELECT") {
        if (combo.getAttribute("model") !== null && combo.getAttribute("model") !== '') {
            return combo.getAttribute("model");
        }
    }
    return null;
}

function getUrlCombo(combo) {
    if (combo !== null && combo.tagName === "SELECT") {
        if (combo.getAttribute("url") !== null && combo.getAttribute("url") !== '') {
            return getWSPath() + combo.getAttribute("url");
        }
    }
    return null;
}

function getSelectedCombo(combo) {
    if (combo !== null && combo.tagName === "SELECT") {
        if (combo.getAttribute("selected") !== null && combo.getAttribute("selected") !== '') {
            return combo.getAttribute("selected");
        }
    }
    return null;
}

function getModelTable(element) {
    if (element !== null && element.tagName === "TABLE") {
        if (element.getAttribute("model") !== null && element.getAttribute("model") !== '') {
            return element.getAttribute("model");
        }
    }
    return null;
}

function getUrlTable(element) {
    if (element !== null && element.tagName === "TABLE") {
        if (element.getAttribute("url") !== null && element.getAttribute("url") !== '') {
            return getWSPath() + element.getAttribute("url");
        }
    }
    return null;
}

function submitAjax(formData, url, header, reload) {
    var promise = null;
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
                if (result.lastInsertId !== null && result.lastInsertId !== '') {
                    try{
                        console.log('LastId: '+result.lastInsertId);
                        sessionStorage.setItem('LastInsertId',result.lastInsertId);
                    }catch(e){
                        console.log('Hubo error con el lastInsertId.');
                    }
                }
                if (reload === true) {
                    window.location.reload();
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
        if (Object.keys(json).length === 1 && Object.keys(json)[0] === getModelForm(myform)) {
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
                item = getElementForm(myform, "" + col);
                if (item !== null) {
                    item.value = "";
                    item.value = values[col];
                    if (values[col] === null) {
                        item.value = '';
                    }
                    if (item.value === '[object Object]') {
                        item.value = '';
                    }
                    if(item.getAttribute('type')!==null && item.getAttribute('type')==='password'){
                        item.value = '';
                    }
                    if (item.tagName === "SELECT") {
                        item.setAttribute('selected', values[col]);
                        item.selected = values[col];
                    }
                    
                }
            }
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
    url = getUrlForm(myform);
    createTempInputs(myform);
    formData = new FormData(myform);
    deleteTemporalElements(myform);
    if (formData !== null && url !== null && url !== '') {
        promise = $.ajax({
            method: "POST",
            url: url,
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function (result, status) {
                if (result !== null && result !== '') {
                    if (result.message !== null && result.message !== '') {
                        alert(result.message);
                    }
                    if (result.data !== null && result.data !== '') {
                        object = result.data;
                        try {
                            object = JSON.parse(object);
                            console.log('Conversion Exitosa a JSON - Get Values!');
                            setDataForm(myform, object);
                        } catch (e) {
                            console.error("Error de Conversion JSON - Get Values");
                        }
                    }

                } else {
                    alert('Servicio Web Falló!.');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Sin Respuesta.");
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
        if (Object.keys(json).length === 1 && Object.keys(json)[0] === getModelCombo(combo)) {
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
            option.innerHTML = json[i]['iname'];
            if (option.id === selected) {
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

function loadComboboxData(element) {
    var promise = null;
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
        "action": 0,
        "colname": colname,
        "colvalue": colvalue
    };

    if (element !== null &&
            url !== null && url !== '' &&
            model !== null && model !== '' &&
            colname !== null && colname !== '' &&
            colvalue !== null && colvalue !== '') {
        promise = $.ajax({
            method: "POST",
            url: url,
            data: vals,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if (result !== null && result !== '') {
                    object = result;
                    setComboboxOptions(element, object);
                    console.log('Conversion Exitosa a JSON - Get Combobox!');
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
                        disableElement(TRs[i]);
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


function setTableData(element, json) {
    var TRs = null;
    var rowSample = null;
    var newrow = null;
    var tbody = null;
    var values = null;
    var columns = null;
    var col = null;
    var xtable = null;
    clearTableData(element);
    if (element !== null && element.tagName === "TABLE" && json !== null) {
        if (Object.keys(json).length === 1 && Object.keys(json)[0] === getModelTable(element)) {
            for (var child in json) {
                json = json[child];
                break;
            }
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
        if (element.getElementsByTagName('TBODY') !== null) {
            tbody = element.getElementsByTagName('TBODY')[0];
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
                    newrow.innerHTML = newrow.innerHTML.replace('{{' + col + '}}', json[i][col]);
                }
                tbody.appendChild(newrow);
            }
            return true;
        }
    }
    return false;
}

function loadTableData(element) {
    clearTableData(element);
    var promise = null;
    var url = null;
    var model = null;
    var vals = null;
    var object = null;
    url = getUrlTable(element);
    model = getModelTable(element);
    console.log(getWSPath());
    vals = {
        "model": model,
        "action": 0
    };

    if (element !== null && element.tagName === "TABLE" && (element.getAttribute('loadDataTable') !== null)) {
        promise = $.ajax({
            method: "POST",
            url: url,
            data: vals,
            dataType: 'json',
            success: function (result, status) {
                if (result !== null && result !== '') {
                    object = result;
                    setTableData(element, object);
                    console.log('Conversion Exitosa a JSON - Get DataTable!');
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

function setLogin(data) {
    if (data !== null) {
        try {
            if (data['user'] !== null) {
                localStorage.setItem("UsernameLogin", "" + data['user']);
                console.log('UsernameLogin Almacenado');
            }
            if (data['userrole'] !== null) {
                localStorage.setItem("UserRoleLogin", "" + data['userrole']);
                console.log('UserRoleLogin Almacenado');
            }
            if (data['userid'] !== null) {
                localStorage.setItem("UserIdLogin", "" + data['userid']);
                console.log('UserIdLogin Almacenado');
            }
            return true;
        } catch (e) {
            console.log('No se pudo Iniciar Variables de Sesion!.');
        }
    }
    return false;
}

function setToken(token) {
    if (token !== null) {
        try {
            localStorage.setItem("TokenLogin", "" + token);
            console.log('TokenLogin Almacenado ' + token);
            return true;
        } catch (e) {
            console.log('No se pudo Iniciar Token!. ' + token);
        }
    }
    return false;
}

function login(element, page) {
    var next = false;
    var form = null;
    var url = null;
    var formData = null;
    var promise = null;
    var object = null;
    if (element !== null && page !== null && page !== '') {
        form = getForm(element);
        url = getUrlForm(form);
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
                            console.log('Conversion Exitosa a JSON - Get Values!');
                        } catch (e) {
                            console.error("Error de Conversion JSON - Get Values");
                        }
                        setLogin(object[getModelForm(form)][0]);
                        if (result.token !== null && result.token !== '') {
                            setToken(result.token);
                        }
                        if (page !== null) {
                            window.location.href = page;
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

function submitForm(element, reload) {
    var next = false;
    var form = null;
    var url = null;
    var formdata = null;
    var promise = null;
    getActionFromButton(element);

    if (element !== null && element.tagName !== "FORM") {
        form = getForm(element);
    }

    if (form !== null) {
        deleteTemporalElements(form);
        url = getUrlForm(form);
        if (url !== null && url !== "") {

            createTempInputs(form);
            formdata = null;
            formdata = new FormData(form);
            if (formdata !== null) {
                promise = submitAjax(formdata, url, null, false);
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

function submitFormConfirm(button) {
    var r = false;
    r = confirm("Está Seguro?");
    if (r === true) {
        return submitForm(button);
    } else {
        alert("Accion Cancelada.");
        return false;
    }
    return false;
}

function getIdGET() {
    var frms = document.forms;
    var form = null;
    var findby = null;
    var id = null;
    var result = false;
    var item = null;
    for (var i = 0; i < frms.length; i++) {
        if (frms[i].getAttribute('findBy') !== null && frms[i].getAttribute('findBy') !== '' && frms[i].getAttribute('mainform') !== null && frms[i].getAttribute('mainform') === 'true') {
            form = frms[i];
            findby = form.getAttribute('findBy');
            for (var j = 0; j < form.elements.length; j++) {
                if (form.elements[j].getAttribute('save') !== null) {
                    item = form.elements[j];
                }
                if (form.elements[j].id === findby || form.elements[j].name === findby) {
                    id = form.elements[j];
                    if (GET(findby) !== null) {
                        console.log("FindBy Form GET: " + findby);
                        id.value = GET(findby);
                        result = true;
                    }
                }
                if (GET('action') === 'view') {
                    form.elements[j].setAttribute("readonly", "readonly");
                    if (form.elements[j].type === 'select-one' || form.elements[j].type === 'button' || form.elements[j].type === 'submit' || form.elements[j].type === 'reset' || form.elements[j].type === 'radio' || form.elements[j].type === 'range') {
                        form.elements[j].setAttribute("disabled", "disabled");
                    }
                }
            }
        }
    }
    if (item !== null) {
        if (GET('action') !== null) {
            item.setAttribute('action', GET('action'));
            console.log("Action GET: " + GET('action'));
        }
        if (GET('update') !== null && GET('update') !== '') {
            item.setAttribute('action', GET('update'));
        }
    }
    return result;
}
