<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/SessionManager.php';
$session = new SessionManager();
if ($session->hasLogin()) {
    if ($_POST != null && isset($_POST)) {
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel('ProductsApp');
        $bc->setAction('findAll');
        $colname = null;
        $colvalue = null;
        $colname = $_POST['colname'];
        $colvalue = $_POST['colvalue'];
        echo $bc->getComboboxData($colname, $colvalue, 'state_product=1');
        $bc->disconnect();
    }
}else{
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>