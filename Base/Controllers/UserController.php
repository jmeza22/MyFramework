<?php
ob_start();
include_once 'BaseController.php';
include_once 'Security/MyCrypt.php';
$model = 'UsersApp';
$findBy = 'id_user';
if (isset($_POST) && $_POST!=null) {
    $result = null;
    $crypt=new MyCrypt();
    $_POST['password_user']=$crypt->crypt($_POST['password_user']);
    $bc = new BaseController();
    $bc->connect();
    $bc->preparePostData();
    $bc->setModel($model);
    $bc->setFindBy($findBy);
    $result = $bc->execute(false);
    echo $result;
    $result = null;
    $bc->disconnect();
}
ob_end_flush();
?>