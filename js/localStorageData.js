/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function LocalStorageStatus() {
    if (window.sessionStorage && window.localStorage) {
        return true;
    } else {
        console.log('Your Device is not Compatible with Local Storage.');
        return false;
    }
    return false;
}

function saveWebServicePath(path) {
    if (LocalStorageStatus()) {
        if (path !== null) {
            LocalStorageStatus().setItem("WebServicePath", path);
            return true;
        }
    }
    return null;
}

function getWebServicePath() {
    if (LocalStorageStatus()) {
        var localSt = localStorage;
        var path = null;
        path = localStorage.getItem("WebServicePath");
        return path;
    }
    return null;
}


function setUsernameLogin(username) {
    if (LocalStorageStatus()) {
        if (username !== null && username !== '') {
            localStorage.setItem("UsernameLogin", "" + username);
            return true;
        }
    }
    return false;
}

function setPasswordLogin(password) {
    if (LocalStorageStatus()) {
        if (password !== null && password !== '') {
            localStorage.setItem("PasswordLogin", "" + password);
            return true;
        }
    }
    return false;
}

function setUserIdLogin(userid) {
    if (LocalStorageStatus()) {
        if (userid !== null && userid !== '') {
            localStorage.setItem("UserIdLogin", userid);
            return true;
        }
    }
    return false;
}

function getUsernameLogin() {
    if (LocalStorageStatus()) {
        var username = null;
        username = localStorage.getItem("UsernameLogin");
        return username;
    }
    return null;
}

function getPasswordLogin() {
    if (LocalStorageStatus()) {
        var password = null;
        password = localStorage.getItem("PasswordLogin");
        return password;
    }
    return null;
}

function getUserIdLogin() {
    if (LocalStorageStatus()) {
        var userid = null;
        userid = localStorage.getItem("UserIdLogin");
        return userid;
    }
    return null;
}

function setUserIdSession(userid) {
    if (LocalStorageStatus()) {
        if (userid !== null && userid !== '') {
            sessionStorage.setItem("UserIdSession", userid);
            return true;
        }
    }
    return false;
}

function setUserRoleSession(userrole) {
    if (LocalStorageStatus()) {
        if (userrole !== null && userrole !== '') {
            sessionStorage.setItem("UserRoleSession", userrole);
            return true;
        }
    }
    return false;
}

function setUsernameSession(username) {
    if (LocalStorageStatus()) {
        if (username !== null && username !== '') {
            sessionStorage.setItem("UsernameSession", username);
            return true;
        }
    }
    return false;
}

function setPasswordSession(password) {
    if (LocalStorageStatus()) {
        if (password !== null && password !== '') {
            sessionStorage.setItem("PasswordSession", password);
            return true;
        }
    }
    return false;
}

function getUserIdSession() {
    if (LocalStorageStatus()) {
        var userid = null;
        userid = sessionStorage.getItem("UserIdSession");
        return userid;
    }
    return null;
}

function getUserRoleSession() {
    if (LocalStorageStatus()) {
        var userrole = null;
        userrole = sessionStorage.getItem("UserRoleSession");
        return userrole;
    }
    return null;
}

function getUsernameSession() {
    if (LocalStorageStatus()) {
        var username = null;
        username = sessionStorage.getItem("UsernameSession");
        return username;
    }
    return null;
}

function getPasswordSession() {
    if (LocalStorageStatus()) {
        var password = null;
        password = sessionStorage.getItem("PasswordSession");
        return password;
    }
    return null;
}

function setLocalPOST(post) {
    if (LocalStorageStatus()) {
        if (post !== null) {
            localStorage.removeItem("POST");
            localStorage.setItem("POST", post);
            return true;
        }
    }
    return false;
}

function getLocalPOST() {
    if (LocalStorageStatus()) {
        var post = null;
        post = localStorage.getItem("POST");
        if (post == null) {
            console.log("LocalPOST is null");
        }
        return post;
    }
    return null;
}

function setSessionPOST(post) {
    if (LocalStorageStatus()) {
        if (post !== null) {
            sessionStorage.removeItem("POSTData");
            sessionStorage.setItem("POSTData", post);
            return true;
        }
    }
    return false;
}

function getSessionPOST() {
    if (LocalStorageStatus()) {
        var post = null;
        post = sessionStorage.getItem("POSTData");
        if (post == null) {
            console.log("SessionPOST is null. Try LocalPOST");
            post = getLocalPOST();
            setSessionPOST(post);
        }
        return post;
    }
    return null;
}

function setPOST(pname, pvalue) {
    if (LocalStorageStatus()) {
        if (pname !== null && pvalue !== null) {
            var post = null;
            var element = null;
            post = getSessionPOST();
            if (post !== null && post !== '' && post !== 'undefined' && post !== '[]') {
                post = JSON.parse(post);
            } else {
                post = null;
                post = new Array();
            }
            if (post !== null) {
                element = new Object();
                element[pname] = pvalue;
                post.push(element);
                post = JSON.stringify(post);
                console.log('Datos: ' + post);
                setSessionPOST(post);
                return true;
            }
        }
    }
    return false;
}

function getPOST(pname) {
    if (LocalStorageStatus()) {
        if (pname !== null) {
            var post = null;
            var pvalue = null;
            post = getSessionPOST();
            if (post !== null && post !== '' && post !== 'undefined' && post !== '[]') {
                post = JSON.parse(post);
                if (post !== null) {
                    for (var i = 0; i < post.length; i++) {
                        if (Object.keys(post[i])[0] == pname) {
                            pvalue = post[i][pname];
                            console.log("Found: " + pname);
                        }
                    }
                }
            }
            return pvalue;
        }
    }
    return null;
}

function unsetPOST(pname) {
    if (LocalStorageStatus()) {
        if (pname !== null) {
            var post = null;
            post = getSessionPOST();
            if (post !== null && post !== '' && post !== 'undefined' && post !== '[]') {
                post = JSON.parse(post);
                if (post !== null) {
                    for (var i = 0; i < post.length; i++) {
                        if (Object.keys(post[i])[0] == pname) {
                            post[i] = null;
                            post.splice(i, 1);
                        }
                    }
                }
            }
            post = JSON.stringify(post);
            setSessionPOST(post);
            return true;
        }
    }
    return false;
}

function resetPOST(){
    if (LocalStorageStatus()) {
        sessionStorage.removeItem("POSTData");
        return true;
    }
    return false;
}

function nullPOST() {
    if (LocalStorageStatus()) {
        sessionStorage.removeItem("POSTData");
        localStorage.removeItem("POST");
        return true;
    }
    return false;
}

function savePOST(){
    setLocalPOST(getSessionPOST());
}

    