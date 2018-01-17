<?php

ob_start();
include_once 'Libraries/Controllers.php';
$bc = null;
$result = null;
$model = "TestTableApp";
$findBy = "id_testtable";
$rowcount = 0;
$data = null;
$postdata = null;
$count = 0;
$i = 0;
if (isset($_POST) && $_POST != null) {
    $bc = new BaseController();
    $bc->connect();
    $bc->preparePostData();
    $bc->setModel($model);
    $bc->setFindBy($findBy);
    $bc->setAction('replace');
    $bc->beginTransaction();
    if (isset($_POST['id_testtable'])) {

        $data = array();
        $postdata = $bc->getPostData();
        $count = count($_POST['id_testtable']);

        if ($count >= 1) {
            //print_r($postdata);
            $postdata = $bc->parseMultiRows($postdata);
            $count = count($postdata);
            for ($i = 0; $i < $count; $i++) {
                $bc->setPostData($postdata[$i]);
                $result = $bc->execute(false);
                if ($bc->getRowCount() > 0) {
                    $rowcount++;
                } else {
                    break;
                }
            }
        }
    }
    if ($rowcount == $count) {
        $bc->commit();
    } else {
        $bc->rollback();
    }
    echo $result;
    $result = null;
    $bc->disconnect();
}

ob_end_flush();
?>