<?php

ob_start();
include_once 'Libraries/Controllers.php';
$session = new SessionManager();
$model = 'SalesInvoicesApp';
$findBy = 'id_invoice';
$identerprise = null;
$pd = null;
if ($session->hasLogin() && $session->CheckToken()) {
    if (isset($_POST) && $_POST != null) {
        $result = null;
        $identerprise = $session->getEnterpriseID();
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $pd = array();
        $pd = $bc->getPostData();
        $pd['id_store'] = $identerprise;
        $bc->setPostData($pd);
        $bc->setModel($model);
        $bc->setFindBy($findBy);
        if ((strcmp($bc->getAction(), 'delete') == 0) && (strcmp($session->getUserType(), 'AA') != 0)) {
            $bc->setAction(null);
        }
        $result = $bc->execute(false);
        echo $result;
        $result = null;
        $bc->disconnect();
    }
} else {
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>