<?php

ob_start();
include_once 'Libraries/Controllers.php';
$session = new SessionManager();
$model='InvoicingSettingsApp';
$findBy='id_invoicing';
if ($session->hasLogin()) {
    if (isset($_POST) && $_POST != null) {
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel($model);
        $bc->setFindBy($findBy);
        $result = null;
        $result = $bc->execute(false);
        echo $result;
        $result = null;
        $bc->disconnect();
    }
} else {
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>