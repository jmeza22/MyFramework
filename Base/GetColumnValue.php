<?php
include_once 'BaseController.php';
$bc=new BaseController();
$bc->connect();
$bc->preparePostData();
if(isset($_POST)){
    if(isset($_POST['idname']) && isset($_POST['idvalue']) && isset($_POST['namecolumn'])){
        echo $bc->getValue($_POST['column'], $_POST['idname'], $_POST['idvalue']);
    }
}

?>