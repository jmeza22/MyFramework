<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/SessionManager.php';
$session = new SessionManager();
$bc = null;
$model = "OrdersApp";
$modeluser = "UsersApp";
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
        $sql = "SELECT oo.*, concat(uu.name_user,' ',uu.lastname_user) as name_user FROM $model oo INNER JOIN $modeluser uu on oo.id_user=uu.id_user WHERE state_order=1 and id_store = '$enterprise' order by id_order desc";
        $result = $bc->selectSimple($sql);
        echo $result;
        $bc->disconnect();
        $bc = null;
    }
}
ob_end_flush();
?>