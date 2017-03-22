<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/SessionManager.php';
$session = new SessionManager();
$model = 'MeasurementUnitsApp';
$findBy = 'id_unit';
if ($session->hasLogin() && $session->CheckToken()) {
    if (isset($_POST) && $_POST != null) {
        $result = null;
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel($model);
        $bc->setFindBy($findBy);
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