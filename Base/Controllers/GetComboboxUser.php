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
        $bc->setModel('UsersApp');
        $bc->setAction('findAll');
        $colname = null;
        $colvalue = null;
        $colname = "concat(name_user,' ',lastname_user)";
        $colvalue = $_POST['colvalue'];
        echo $bc->getComboboxData($colname, $colvalue, 'state_user=1');
        $bc->disconnect();
    }
}else{
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>