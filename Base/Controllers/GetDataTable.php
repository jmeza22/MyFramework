<?php
ob_start();
include_once 'BaseController.php';
$bc=new BaseController();
$bc->connect();
$bc->preparePostData();
if(isset($_POST)){
    echo $bc->select();
}
$bc->disconnect();
$bc=null;
ob_end_flush();
?>