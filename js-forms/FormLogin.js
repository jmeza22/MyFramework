jQuery(document).ready(function () {
    document.getElementById("doc_user").value = getUsernameLogin();
    document.getElementById("password_user").value = getPasswordLogin();
    loadComboboxData(document.getElementById("id_enterprise"));
    if (getUserIdLogin() !== null) {
        window.location.href = 'home.html';
    }

}
);

function Send(item) {
    var form = document.getElementById("FormLogin");
    if (validateForm(form)) {
        login(form, null).done(function () {
            setTimeout(function () {
                var enterprise = document.getElementById("id_enterprise");
                setUsernameLogin(document.getElementById("doc_user").value);
                if (enterprise.selected !== undefined && enterprise.selected !== null) {
                    setIdEnterprise(enterprise.selected);
                } else {
                    setIdEnterprise(enterprise.value);
                }
                if (getUserIdLogin() !== null) {
                    window.location.href = 'home.html';
                }
            }, 1);
        });
    }
}