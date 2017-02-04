<?php
include_once 'BaseController.php';
$bc=new BaseController();
$bc->connect();
$bc->preparePostData();
if(isset($_POST)){
    echo $bc->getDataTable();
}
$bc->disconnect();
$bc=null;
?>

