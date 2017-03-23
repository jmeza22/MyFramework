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
        $bc->setModel('CustomersApp');
        $bc->setAction('findAll');
        $colname = null;
        $colvalue = null;
        $othervalue = null;
        $colname = "fullname_customer";
        $colvalue = 'doc_customer';
        $othervalue = 'id_user';
        echo $bc->getComboboxData($colname, $colvalue, $othervalue, 'status_customer=1');
        $bc->disconnect();
    }
}else{
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>