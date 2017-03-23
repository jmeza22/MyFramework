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
        $bc->setModel('ProductCategoriesApp');
        $bc->setAction('findAll');
        $enterprise=$session->getEnterpriseID();
        $colname = null;
        $colvalue = null;
        $othervalue = null;
        $colname = 'name_category';
        $colvalue = 'id_category';
        $othervalue = 'description_category';
        echo $bc->getComboboxData($colname, $colvalue, $othervalue, "status_category=1 and id_store=$enterprise ");
        $bc->disconnect();
    }
}else{
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>