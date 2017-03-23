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
        $bc->setModel('PlacesApp');
        $bc->setAction('findAll');
        $enterprise=$session->getEnterpriseID();
        $colname = null;
        $colvalue = null;
        $othervalue = null;
        $colname = 'description_place';
        $colvalue = 'id_place';
        $othervalue = 'number_place';
        echo $bc->getComboboxData($colname, $colvalue, $othervalue, "status_place=1 and id_store=$enterprise ");
        $bc->disconnect();
    }
}else{
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>