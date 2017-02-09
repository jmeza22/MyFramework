<?php

ob_start();
include_once 'BaseController.php';
$bc = null;
$bc = new BaseController();
$bc->connect();
$bc->preparePostData();
$bc->setModel('PlacesApp');
echo $bc->selectWithoutModel();
$bc->disconnect();
$bc = null;
ob_end_flush();
?>