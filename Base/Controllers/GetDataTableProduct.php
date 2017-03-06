<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/SessionManager.php';
$session = new SessionManager();
$bc = null;
$model = "ProductsApp";
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
        $sql = "SELECT pp.* FROM $model pp WHERE state_product=1 and id_store = '$enterprise' order by id_product desc";
        $result = $bc->selectSimple($sql);
        echo $result;
        $bc->disconnect();
        $bc = null;
    }
}
ob_end_flush();
?>