/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function localStorage() {
    if (window.sessionStorage && window.localStorage) {
        return true;
    } else {
        console.log('Your Device is not Compatible with Local Storage.');
        return false;
    }
}

function saveWebServicePath(path) {
    if (localStorage()) {
        if (path !== null) {
            var localSt = window.localStorage;
            localSt.setItem("WebServicePath", path);
            return true;
        }
    }
    return null;
}

function getWebServicePath() {
    if (localStorage()) {
        var localSt = window.localStorage;
        var path = null;
        path = localSt.getItem("WebServicePath");
        return path;
    }
    return null;
}



function saveDataLogin(username, password) {
    if (localStorage()) {
        if (username !== null && password !== null && username !== '' && password !== '') {
            var localSt = window.localStorage;
            localSt.setItem("UsernameLogin", username);
            localSt.setItem("PasswordLogin", password);
            return true;
        }
    }
    return false;
}

function getUsernameLogin() {
    if (localStorage()) {
        var localSt = window.localStorage;
        var username = null;
        username = localSt.getItem("UsernameLogin");
        return username;
    }
    return null;
}

function getPasswordLogin() {
    if (localStorage()) {
        var localSt = window.localStorage;
        var password = null;
        password = localSt.getItem("PasswordLogin");
        return password;
    }
    return null;
}

function setUserIdSession(userid) {
    if (localStorage()) {
        if (userid !== null && userid !== '') {
            var sessionSt = window.sessionStorage;
            sessionSt.setItem("UserIdSession", userid);
            return true;
        }
    }
    return false;
}

function setUserRoleSession(userrole) {
    if (localStorage()) {
        if (userrole !== null && userrole !== '') {
            var sessionSt = window.sessionStorage;
            sessionSt.setItem("UserRoleSession", userrole);
            return true;
        }
    }
    return false;
}

function setUsernameSession(username) {
    if (localStorage()) {
        if (username !== null && username !== '') {
            var sessionSt = window.sessionStorage;
            sessionSt.setItem("UsernameSession", username);
            return true;
        }
    }
    return false;
}

function setPasswordSession(password) {
    if (localStorage()) {
        if (password !== null && password !== '') {
            var sessionSt = window.sessionStorage;
            sessionSt.setItem("PasswordSession", password);
            return true;
        }
    }
    return false;
}

function getUserIdSession() {
    if (localStorage()) {
        var sessionSt = window.sessionStorage;
        var userid = null;
        userid = sessionSt.getItem("UserIdSession");
        return userid;
    }
    return null;
}

function getUserRoleSession() {
    if (localStorage()) {
        var sessionSt = window.sessionStorage;
        var userrole = null;
        userrole = sessionSt.getItem("UserRoleSession");
        return userrole;
    }
    return null;
}

function getUsernameSession() {
    if (localStorage()) {
        var sessionSt = window.sessionStorage;
        var username = null;
        username = sessionSt.getItem("UsernameSession");
        return username;
    }
    return null;
}

function getPasswordSession() {
    if (localStorage()) {
        var sessionSt = window.sessionStorage;
        var password = null;
        password = sessionSt.getItem("PasswordSession");
        return password;
    }
    return null;
}
