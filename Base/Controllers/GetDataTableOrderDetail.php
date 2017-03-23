<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/SessionManager.php';
$session = new SessionManager();
$bc = null;
$model = "OrderDetailsApp";
$modelproduct = "ProductsApp";
$findby = "id_order";
$findbyvalue= null;
$sql = '';
$result = null;
if ($session->hasLogin()) {
    if (isset($_POST) && $_POST != null) {
        if (isset($_POST['findbyvalue']) && $_POST['findbyvalue'] != null) {
            $findbyvalue=$_POST['findbyvalue'];
            $bc = new BaseController();
            $bc->connect();
            $bc->preparePostData();
            $bc->setModel($model);
            $sql = "SELECT dd.*, pp.name_product FROM $model dd INNER JOIN $modelproduct pp on dd.id_product=pp.id_product WHERE status_detail=1 and $findby = $findbyvalue order by date_detail desc";
            $result = $bc->selectSimple($sql);
            echo $result;
            $bc->disconnect();
            $bc = null;
        }
    }
}
ob_end_flush();
?>