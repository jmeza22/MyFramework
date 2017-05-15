<?php

ob_start();
include_once 'Libraries/Controllers.php';
if ($_POST != null && isset($_POST)) {
    $bc = new BaseController();
    $bc->connect();
    $bc->preparePostData();
    $bc->setModel('StoresApp');
    $bc->setAction('findAll');
    $colname = null;
    $colvalue = null;
    $othervalue = null;
    $colname = 'name_store';
    $colvalue = 'id_store';
    $othervalue = 'doc_store';
    echo $bc->getComboboxData($colname, $colvalue, $othervalue, 'status_store=1');
    $bc->disconnect();
}
ob_end_flush();
?>