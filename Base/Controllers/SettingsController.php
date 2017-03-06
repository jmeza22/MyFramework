<?php

if (isset($_POST) && $_POST != null) {
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
    $lastdate = date("Y-m-d G:i:s");

    if (isset($_POST['action'])) {
        if (strcmp($_POST['action'], 'find') == 0) {
            echo $data->getSettingJSON($code);
        }
        if (strcmp($_POST['action'], 'insert') == 0) {
            $data->AddSetting($code, $textconf, $enterprise, $welcome, $local, $remote, $lastdate, $hostbd, $portbd, $userbd, $passbd, $namebd);
            echo $data->getLogJSON();
        }
        if (strcmp($_POST['action'], 'update') == 0) {
            $data->EditSetting($code, $textconf, $enterprise, $welcome, $local, $remote, $lastdate, $hostbd, $portbd, $userbd, $passbd, $namebd);
            echo $data->getLogJSON();
        }
        if (strcmp($_POST['action'], 'delete') == 0) {
            $data->DeleteSetting($code);
            echo $data->getLogJSON();
        }
    }
}
?>