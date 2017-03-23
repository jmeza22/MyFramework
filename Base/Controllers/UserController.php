<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/MyCrypt.php';
include_once 'Security/SessionManager.php';
include_once 'UploadImage.php';
$session = new SessionManager();
$model = 'UsersApp';
$findBy = 'id_user';
$photo = 'User';
$array = null;
$crypt = null;
$atate = null;
$enterprise = null;
if ($session->hasLogin() && $session->CheckToken()) {
    if (isset($_POST) && $_POST != null) {
        $result = null;
        $pd = null;
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel($model);
        $bc->setFindBy($findBy);
        $pd = $bc->getPostData();
        $upload = null;
        $upload = new UploadImage();
        $upload->setURL('ImageFiles/');
        $upload->setFileName('imageFile');
        $upload->setPrefix('User');
        $upload->setNewName(date("dmYGis"));
        if(isset($pd['email_user']) && strcmp($pd['email_user'], '')==0){
            unset($pd['email_user']);
        }
        if ($upload->Upload()) {
            $pd['photo_user'] = $upload->getOutputName();
        } else {
            unset($pd['photo_user']);
        }
        if (isset($pd['id_store'])) {
            $enterprise = $pd['id_store'];
            unset($pd['id_store']);
        }
        $bc->setPostData($pd);
        $result = $bc->execute(false);
        $state = json_decode($result, true);
        $state = $state['state'];

        if (strcmp($bc->getAction(), 'insert') == 0 && $state == 1) {
            $crypt = new MyCrypt();
            $array = array();
            $array['id_user'] = $bc->getLastInsertId();
            $array['id_store'] = $enterprise;
            $array['role_account'] = 'NN';
            $array['nickname_account'] = $pd['doc_user'];
            $array['password_account'] = $crypt->crypt('0000');
            $array['updated_account'] = date('Y-m-d G:i:s');
            $array['status_account'] = 1;
            $bc->setModel('UserAccountsApp');
            $bc->setAction('insert');
            $bc->execute();
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