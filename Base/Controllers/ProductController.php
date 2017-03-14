<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/SessionManager.php';
$session = new SessionManager();
$model = 'ProductsApp';
$findBy = 'id_product';
$pd=null;
if ($session->hasLogin()) {
    if (isset($_POST) && $_POST != null) {
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel($model);
        $bc->setFindBy($findBy);
        $pd=$bc->getPostData();
        if(isset($pd['sku_product']) && strcmp($pd['sku_product'], '')==0){
            $pd['sku_product']=null;
        }
        if(isset($pd['id_category']) && strcmp($pd['id_category'], '')==0){
            $pd['id_category']=null;
        }
        if(isset($pd['parent_id_product']) && strcmp($pd['parent_id_product'], '')==0){
            $pd['parent_id_product']=null;
        }
        $bc->setPostData($pd);
        $result = null;
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