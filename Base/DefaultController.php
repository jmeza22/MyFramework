<?php
include_once 'BaseController.php';
//print_r($_POST);
$result=null;
$bc=new BaseController();
$bc->connect();
$bc->preparePostData();
$result=$bc->execute(true);
if(!is_bool($result)){
    echo $result;
}
$result=null;
$bc->disconnect();
?>

