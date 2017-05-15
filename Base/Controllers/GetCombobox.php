<?php

ob_start();
include_once 'Libraries/Controllers.php';
$session = new SessionManager();
if ($session->hasLogin()) {
    if ($_POST != null && isset($_POST)) {
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setAction('findAll');
        $colname = null;
        $colvalue = null;
        $othervalue = null;
        $colname = $_POST['colname'];
        $colvalue = $_POST['colvalue'];
        $othervalue = $_POST['othervalue'];
        echo $bc->getComboboxData($colname, $colvalue, $othervalue, '');
        $bc->disconnect();
    }
}
ob_end_flush();
?>