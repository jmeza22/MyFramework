jQuery(document).ready(function () {
    document.getElementById("doc_user").value = getUsernameLogin();
    document.getElementById("password_user").value = getPasswordLogin();
}
);

function Send(item) {
    var form = document.getElementById("FormLogin");
    if (validateForm(form)) {
        login(form, 'home.html').done(function () {
            setTimeout(function () {
                setUsernameLogin(document.getElementById("doc_user").value);
                setPasswordLogin(document.getElementById("password_user").value);
            }, 200);
        });
    }
}