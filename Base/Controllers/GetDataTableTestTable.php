<?php

ob_start();
include_once 'Libraries/Controllers.php';
$model = 'TestTableApp';
$where = "status_testtable=1";
$bc = null;
if ($_REQUEST !== null && isset($_REQUEST)) {
    $bc = new BaseController();
    $bc->connect();
    $bc->setAction('findAll');
    $bc->setModel($model);
    echo $bc->selectWithoutModel($model, '*', $where);
    $bc->disconnect();
    $bc = null;
}
ob_end_flush();
?>