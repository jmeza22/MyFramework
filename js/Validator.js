
function goToElement(Obj) {
    if (Obj !== null) {
        Obj.focus();
        return true;
    }
    return false;
}

function requireElement(Obj) {
    if (Obj !== null) {
        Obj.style = '';
        goToElement(Obj);
        return true;
    }
    return false;
}

function trim(text) {
    var exp = /^\s+|\s+$/g;
    return text.replace(exp, "");
}

function validateOnlyNumeric(text) {
    var pattern = /^\d*$/;
    if (!text.search(pattern)) {
        return true;
    } else {
        return false;
    }
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
    if (text === null || text === "" || /^\s+$/.test(text)) {
        return false;
    }
    return true;
}

function validateForm(form) {

    var next = true;
    var j = 0;
    var elements = null;
    var item = null;

    if (form !== null && form.tagName === "FORM") {
        elements = form.elements;
        if (elements.length > 0) {
            for (j = 0; j < elements.length; j++) {
                item = null;
                item = elements[j];
                if ((item.getAttribute('required') === 'true' || item.getAttribute('required') === 'required') && item.getAttribute('disabled') === null) {
                    if (item.value === null || item.value === '') {
                        alert('Campo Vacio: Obligatorio');
                        item.focus();
                        requireElement(item);
                        next = false;
                        break;
                    }

                    if (item.getAttribute('type') === 'text') {
                        if (!validateText(item.value)) {
                            alert('Campo Vacio: Texto');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                    if (item.getAttribute("integer") === 'true') {
                        if (!validateOnlyNumeric(item.value)) {
                            alert('Formato Invalido: Número Entero');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                    if (item.type === 'date' || item.getAttribute('date') === 'true') {
                        if (!isDate(item.value) || !validateDateYYYYMMDD(item.value)) {
                            alert('Formato Invalido: Fecha');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                    if (item.type === 'email' || item.getAttribute('email') === 'true') {
                        if (!validateEmail(item.value)) {
                            alert('Formato Invalido: Email');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                    if (item.getAttribute("type") === 'password') {
                        if (!validatePassword(item.value)) {
                            alert('Formato Invalido: Password');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                    if (item.getAttribute("type") === 'tel') {
                        if (!validateOnlyNumeric(item.value)) {
                            alert('Formato Invalido: Telefono');
                            item.focus();
                            next = false;
                            break;
                        }
                    }
                    if (item.getAttribute("decimal") === 'true') {
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

 