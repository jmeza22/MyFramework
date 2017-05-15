<?php

ob_start();
include_once 'Libraries/Controllers.php';
$session = new SessionManager();
$model = 'OrderDetailsApp';
$findBy = 'id_detail';
$bc = null;
$product = null;
$datedetail = date("Y-m-d G:i:s");
$pricedetail = null;
$pd = null;
if ($session->hasLogin() && $session->CheckToken()) {
    if (isset($_POST) && $_POST != null) {
        $result = null;
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel($model);
        $bc->setFindBy($findBy);
        $pd = $bc->getPostData();
        if (strcmp($session->getUserType(), 'AA') != 0 && strcmp($session->getUserType(), 'VN') != 0) {
            if (strcmp($bc->getAction(), 'insert') == 0 || strcmp($bc->getAction(), 'update') == 0) {
                $product = new BaseController();
                $product->connect();
                $array = array();
                $array['id_product'] = $pd['id_product'];
                $product->setModel('ProductsApp');
                $product->setFindBy('id_product');
                $product->setPostData($array);
                $product = $product->find('price_product');
                $product = json_decode($product, true);
                $product = $product['ProductsApp'][0];
                $pricedetail = $product['price_product'];
                $pd['price_detail'] = $pricedetail;
            } elseif (strcmp($bc->getAction(), 'delete') == 0 || strcmp($bc->getAction(), 'updatestate') == 0) {
                $bc->setAction(null);
            }
        }
        $pd['date_detail'] = $datedetail;
        $bc->setPostData($pd);
        $result = $bc->execute();
        echo $result;
        $result = null;
        $bc->disconnect();
    }
} else {
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>