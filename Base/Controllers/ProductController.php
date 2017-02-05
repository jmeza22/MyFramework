<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/SessionManager.php';
include_once 'UploadImage.php';
$session = new SessionManager();
if ($session->hasLogin()) {
    if (isset($_POST) && $_POST != null) {
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $result = null;
        $result = $bc->execute(false);
        $pd = null;
        $upload = null;
        $r = json_decode($result, true);
        if (is_array($r) && $r['state'] == 1) {
            $pd = $bc->getPostData();
            $upload = new UploadImage();
            $upload->setURL('../../ImageFiles/');
            $upload->setFileName('imageFile');
            $upload->setPrefix('Product');
            $upload->setNewName(date("dmYGis"));
            if ($upload->Upload()) {
                $pd['id_product'] = $bc->getLastInsertId();
                $pd['photo_product'] = $upload->getOutputName();
                $bc->setPostData($pd);
                $bc->setAction('update');
                $bc->execute();
            }
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