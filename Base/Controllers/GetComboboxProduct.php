<?php

ob_start();
include_once 'Libraries/Controllers.php';
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
        $othervalue = null;
        $colname = 'name_product';
        $colvalue = 'id_product';
        $othervalue = 'price_product';
        echo $bc->getComboboxData($colname, $colvalue, $othervalue, "status_product=1 and id_store=$enterprise ");
        $bc->disconnect();
    }
}else{
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>