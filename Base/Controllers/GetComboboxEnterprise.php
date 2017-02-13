<?php

ob_start();
include_once 'BaseController.php';
if ($_POST != null && isset($_POST)) {
    $bc = new BaseController();
    $bc->connect();
    $bc->preparePostData();
    $bc->setModel('StoresApp');
    $bc->setAction('findAll');
    $colname = null;
    $colvalue = null;
    $colname = 'name_store';
    $colvalue = 'id_store';
    echo $bc->getComboboxData($colname, $colvalue, 'state_store=1');
    $bc->disconnect();
}
ob_end_flush();
?>