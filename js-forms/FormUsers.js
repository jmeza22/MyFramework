jQuery(document).ready(function () {
    getData(document.getElementById("id_user")).done(function () {
    });
    document.getElementById("imageFile").onchange(function(){
        alert('ok');
        document.getElementById("photo_user").value=showMyImage(this);
    });
});

function Send(item) {
    var form = getForm(item);
    if (validateForm(form)) {
        submitForm(item, false).done(function () {
            setTimeout(function () {
                document.getElementById("password_user").value = '';
                if (getLastInsertId() !== null && getLastInsertId() !== 0) {
                    setPOST('id_user', getLastInsertId());
                    window.location.reload();
                }
            }, 200);
        });
    }
}