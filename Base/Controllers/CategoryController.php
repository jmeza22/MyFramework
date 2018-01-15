<?php

ob_start();
include_once 'Libraries/Controllers.php';
$session = new SessionManager();
$model = 'ProductCategoriesApp';
$findBy = 'id_category';
$bc = null;
$result = null;
if ($session->hasLogin() && $session->CheckToken()) {
    if (isset($_POST) && $_POST != null) {
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel($model);
        $bc->setFindBy($findBy);
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