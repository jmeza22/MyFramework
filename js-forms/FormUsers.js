jQuery(document).ready(function () {
    var user = document.getElementById("id_user");
    var myform = document.getElementById("form0");
    var action = null;
    if (getUserIdLogin() !== null) {
        user.value = getUserIdLogin();
        document.getElementById('save').setAttribute('action', 'update');
    }
    if(getPOST('action')!==null && getPOST('id_user')!==null){
        user.value=getPOST('id_user');
        action=getPOST('action');
        document.getElementById('save').setAttribute('action', action);
        unsetPOST('action');
        unsetPOST('id_user');
    }
    getData(document.getElementById("id_user")).done(function () {
        var img = document.getElementById("imagePhoto");
        var nmimg = document.getElementById("photo_user");
        img.src = getWSPath() + 'Base/Controllers/ImageFiles/' + nmimg.value;
    });
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item, false).done(function () {
            setTimeout(function () {
                if (getLastInsertId() !== null && getLastInsertId() !== 0) {
                    setPOST('id_user', getLastInsertId());
                    window.location.reload();
                }
            }, 200);
        });
    }
}