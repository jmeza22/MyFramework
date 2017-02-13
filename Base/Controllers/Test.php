<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/MyCrypt.php';
$bc = null;
$bc = new BaseController();
$bc->connect();
$bc->preparePostData();
$bc->setModel('PlacesApp');
//echo $bc->selectWithoutModel();
$bc->disconnect();
$bc = null;
$crypt = new MyCrypt();
echo $crypt->crypt("2204.jjmm");
ob_end_flush();
?>