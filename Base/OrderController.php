<?php
include_once 'BaseController.php';
$model='OrdersApp';
$findBy='id_order';
if(isset($_POST)){
$result=null;
$bc=new BaseController();
$bc->connect();
$bc->preparePostData();
$bc->setModel($model);
$bc->setFindBy($findBy);
$result=$bc->execute(false);

if(!is_bool($result)){
    echo $result;
}
$result=null;
$bc->disconnect();
}
?>