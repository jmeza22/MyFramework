<?php

ob_start();
include_once 'Libraries/Controllers.php';
$session = new SessionManager();
$model = 'SalesInvoiceDetailsApp';
$findBy = 'id_invoicedetail';
$action = 'replace';
$json = null;
$array = null;
$row = null;
if ($session->hasLogin()) {
    if (isset($_REQUEST) && $_REQUEST != null) {
        $result = null;
        $bc = new BaseController();
        $bc->connect();
        $bc->beginTransaction();
        $bc->preparePostData();
        $bc->setModel($model);
        $bc->setFindBy($findBy);
        $bc->setAction($action);
        $json = $bc->getPostData();
        $array = json_decode($json['json'], true);
        for ($i = 0; $i < count($array); $i++) {
            $row = $array[$i];
            $row['status_invoicedetail']=1;
            $row['date_invoicedetail']=date('Y-m-d G:i:s');
            unset($row['name_product']);
            unset($row['id_unit']);
            $bc->setPostData($row);
            $result = $bc->execute(false);
            $result = json_decode($result, true);
            if($result['status']==0){
                $i=0;
                break;
            }
        }
        $result = json_encode($result);
        if ($i + 1 == count($array)) {
            $bc->commit();
        }else{
            $bc->rollback();
        }
        echo $result;
        $result = null;
        $bc->disconnect();
    }
} else {
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>