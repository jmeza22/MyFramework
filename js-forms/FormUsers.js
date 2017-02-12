jQuery(document).ready(function () {
    getData(document.getElementById("id_user")).done(function () {
        var img=document.getElementById("imagePhoto");
        var nmimg=document.getElementById("photo_user");
        img.src=getWSPath()+'ImageFiles/'+nmimg.value;
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