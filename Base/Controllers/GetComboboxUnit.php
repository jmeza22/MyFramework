<?php

ob_start();
include_once 'Libraries/Controllers.php';
$session = new SessionManager();
if ($session->hasLogin()) {
    if ($_POST != null && isset($_POST)) {
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel('MeasurementUnitsApp');
        $bc->setAction('findAll');
        $enterprise=$session->getEnterpriseID();
        $colname = null;
        $colvalue = null;
        $othervalue = null;
        $colname = 'name_unit';
        $colvalue = 'id_unit';
        $othervalue = 'id_unit';
        echo $bc->getComboboxData($colname, $colvalue, $othervalue, "status_unit=1");
        $bc->disconnect();
    }
}else{
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>