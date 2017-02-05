<?php
ob_start();
include_once 'BaseController.php';
$bc = new BaseController();
$bc->connect();
$bc->preparePostData();
if (isset($_POST)) {
    if (isset($_POST['colname']) && isset($_POST['colvalue'])) {
        echo $bc->getComboboxData($_POST['colname'], $_POST['colvalue'], '');
    }
}
ob_end_flush();
?>