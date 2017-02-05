<?php
ob_start();
include_once 'BaseController.php';
$model = 'OrderDetailsApp';
$findBy = 'id_detail';
if (isset($_POST)) {
    $result = null;
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