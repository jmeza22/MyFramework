<?php

//print_r($_POST);
if (isset($_POST)) {
    include_once 'XML/DataSettings.php';
    date_default_timezone_set('America/Bogota');
    $data = new DataSettings();
    $data->cleanMessage();
    $code = $_POST['code'];
    $textconf = $_POST['text'];
    $enterprise = $_POST['enterprise'];
    $welcome = $_POST['welcome'];
    $local = $_POST['local'];
    $remote = $_POST['remote'];
    $hostbd = $_POST['hostdb'];
    $portbd = $_POST['portdb'];
    $userbd = $_POST['userdb'];
    $passbd = $_POST['passworddb'];
    $namebd = $_POST['namedb'];
    $lastdate = date("d") . '-' . date("m") . '-' . date("Y") . ' ' . date("G") . ':' . date("i") . ':' . date("s");

    if (isset($_POST['action'])) {
        if (strcmp($_POST['action'], '0') == 0) {
            echo $data->getSettingJSON($code);
        }
        if (strcmp($_POST['action'], '1') == 0) {
            $data->AddSetting($code, $textconf, $enterprise, $welcome, $local, $remote, $lastdate, $hostbd, $portbd, $userbd, $passbd, $namebd);
            echo $data->getMessage();
        }
        if (strcmp($_POST['action'], '2') == 0) {
            $data->EditSetting($code, $textconf, $enterprise, $welcome, $local, $remote, $lastdate, $hostbd, $portbd, $userbd, $passbd, $namebd);
            echo $data->getMessage();
        }
        if (strcmp($_POST['action'], '3') == 0) {
            $data->DeleteSetting($code);
            echo $data->getMessage();
        }
    }
}
?>