<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/SessionManager.php';
$session = new SessionManager();
if ($session->hasLogin()) {
    if (isset($_POST) && $_POST != null) {
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $result = null;
        $result = $bc->execute(true);
        $result = null;
        $bc->disconnect();
    }
} else {
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>

