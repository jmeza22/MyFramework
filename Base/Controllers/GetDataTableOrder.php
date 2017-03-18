<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/SessionManager.php';
$session = new SessionManager();
$bc = null;
$model = "OrdersApp";
$modeluser = "CustomersApp";
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
        $sql = "SELECT oo.*, fullname_customer as name_user FROM $model OO INNER JOIN $modeluser CC on OO.doc_customer=CC.doc_customer WHERE OO.state_order=1 and OO.id_store = '$enterprise' order by OO.id_order desc";
        $result = $bc->selectSimple($sql);
        echo $result;
        $bc->disconnect();
        $bc = null;
    }
}
ob_end_flush();
?>