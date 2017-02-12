<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/MyCrypt.php';
include_once 'Security/SessionManager.php';
include_once 'UploadImage.php';
$session = new SessionManager();
$model = 'UsersApp';
$findBy = 'id_user';
if ($session->hasLogin()) {
    if (isset($_POST) && $_POST != null) {
        $result = null;
        if (strcmp($_POST['password_user'], '') != 0) {
            $crypt = new MyCrypt();
            $_POST['password_user'] = $crypt->crypt($_POST['password_user']);
        } else {
            unset($_POST['password_user']);
        }
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel($model);
        $bc->setFindBy($findBy);
        $result = null;
        $result = $bc->execute(false);
        $pd = null;
        $upload = null;
        $r = json_decode($result, true);
        if (is_array($r) && $r['state'] == 1) {
            $pd = $bc->getPostData();
            $upload = new UploadImage();
            $upload->setURL('../../ImageFiles/');
            $upload->setFileName('imageFile');
            $upload->setPrefix('User');
            $upload->setNewName(date("dmYGis"));
            if ($upload->Upload()) {
                if (['id_user'] == null || ['id_user'] == 0) {
                    $pd['id_user'] = $bc->getLastInsertId();
                }
                $pd['photo_user'] = $upload->getOutputName();
                $bc->setPostData($pd);
                $bc->setAction('update');
                $bc->execute();
            }
        }
        echo $result;
        $result = null;
        $bc->disconnect();
    }
} else {
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>