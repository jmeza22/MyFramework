<?php
include_once 'BaseController.php';
//print_r($_POST);
$result=null;
$bc=new BaseController();
$bc->connect();
$bc->preparePostData();
$result=$bc->execute(true);
$result=null;
$bc->disconnect();
?>

