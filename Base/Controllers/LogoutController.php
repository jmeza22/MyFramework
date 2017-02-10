<?php
ob_start();
include_once 'Security/SessionManager.php';
$session = new SessionManager();
$session->logout();
echo $session->getSessionStateJSON();
ob_end_flush();
?>