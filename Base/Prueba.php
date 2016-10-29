<?php
include_once 'SQLDatabase.php';
$bd=new SQLDatabase('localhost', 3306, 'testphp', 'root', '', 'mysql');
$bd->connect();
$stmt= null;
$json=null;
$model=null;
$res=false;
$array= null;

if(isset($_POST['model'])){
    $model=$_POST['model'];
    
    $array=$_POST;
    print_r($array);
    unset($array['GuardarPersona']);
    unset($array['model']);
    unset($array['action']);
    $res=$bd->insertStmt($model, $array); 
    if($res){
        echo 'OK';
    }  else {
        echo 'Hubo un Error!.';
    }
}

if(isset($_REQUEST['ListarPersona'])){
    $json=$bd->selectJSON("*", "personas");
    echo $json;
}

$bd->disconnect();
?>
