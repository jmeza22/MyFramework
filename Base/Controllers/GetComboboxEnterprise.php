<?php

ob_start();
include_once 'BaseController.php';
if ($_POST != null && isset($_POST)) {
    $bc = new BaseController();
    $bc->connect();
    $bc->preparePostData();
    $bc->setModel('StoreApp');
    $bc->setAction('findAll');
    $colname = null;
    $colvalue = null;
    $colname = $_POST['colname'];
    $colvalue = $_POST['colvalue'];
    echo $bc->getComboboxData($colname, $colvalue, 'state_store=1');
    $bc->disconnect();
}
ob_end_flush();
?>