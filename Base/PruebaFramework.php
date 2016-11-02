<?php
include_once 'BaseController.php';
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

