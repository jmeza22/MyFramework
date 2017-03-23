<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/SessionManager.php';
$session = new SessionManager();
$bc = null;
$model = "UsersApp";
$result = null;
$sql = null;
$enterprise=null;
if ($session->hasLogin()) {
    if (isset($_POST) && $_POST !== null) {
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel($model);
        $enterprise=$session->getEnterpriseID();
        $sql = "SELECT U.*, UA.role_account FROM UsersApp U INNER JOIN UserAccountsApp UA ON U.id_user=UA.id_user WHERE U.status_user=1 and UA.id_store = '$enterprise' order by id_user desc";
        $result = $bc->selectSimple($sql);
        echo $result;
        $bc->disconnect();
        $bc = null;
    }
}
ob_end_flush();
?>