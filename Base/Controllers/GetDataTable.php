<?php

ob_start();
include_once 'Libraries/Controllers.php';
$session = new SessionManager();
$bc = null;
if ($session->hasLogin()) {
    $bc = new BaseController();
    $bc->connect();
    $bc->preparePostData();
    if (isset($_POST)) {
        echo $bc->selectWithoutModel();
    }
    $bc->disconnect();
    $bc = null;
}
ob_end_flush();
?>