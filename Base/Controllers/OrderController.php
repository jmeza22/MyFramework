<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/SessionManager.php';
$session = new SessionManager();
$model = 'OrdersApp';
$findBy = 'id_order';
if ($session->hasLogin() && $session->CheckToken()) {
    if (isset($_POST) && $_POST != null) {
        $result = null;
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel($model);
        $bc->setFindBy($findBy);
        if ((strcmp($bc->getAction(), 'delete') == 0) && strcmp($session->getUserType(), 'AA') != 0) {
            $bc->setAction(null);
        }
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