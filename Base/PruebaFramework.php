<?php
include_once 'BaseController.php';
$bc=new BaseController();
$bc->connect();
$bc->preparePostData();
print_r($_REQUEST);
if($bc->execute()){
    echo 'OK';
}else{
    echo 'Error Fatal.';
}
$bc->disconnect();
?>

