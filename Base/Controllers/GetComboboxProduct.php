<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/SessionManager.php';
$session = new SessionManager();
$enterprise=null;
if ($session->hasLogin()) {
    if ($_POST != null && isset($_POST)) {
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel('ProductsApp');
        $bc->setAction('findAll');
        $enterprise=$session->getEnterpriseID();
        $colname = null;
        $colvalue = null;
        $colname = "concat(name_product,' $',price_product)";
        $colvalue = $_POST['colvalue'];
        echo $bc->getComboboxData($colname, $colvalue, "state_product=1 and id_store=$enterprise ");
        $bc->disconnect();
    }
}else{
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>