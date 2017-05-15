<?php

ob_start();
include_once 'Libraries/Controllers.php';
$session = new SessionManager();
$id = null;
$bcf = null;
$othermodel = 'UsersApp';
$otherfindBy = 'id_user';
$bc = null;
$model = 'CustomersApp';
$findBy = 'doc_customer';
$result = null;
$array = array();
$pd = null;

if ($session->hasLogin() && $session->CheckToken()) {
    if (isset($_POST) && $_POST != null) {
        if (isset($_POST['id_user']) && $_POST['id_user'] != null) {
            $id = $_POST['id_user'];
            $pd['id_user']=$id;
        }
        $bcf = new BaseController();
        $bcf->connect();
        $bcf->preparePostData();
        $bcf->setModel($othermodel);
        $bcf->setFindBy($otherfindBy);
        $bcf->setAction('find');
        $bcf->setPostData($pd);
        $result = $bcf->execute(false);
        $bcf->disconnect();
        $array = json_decode($result, true);
        if (isset($array['data'])) {
            $array = $array['data'];
            $array = json_decode($array, true);
            $array = $array['UsersApp'];
            $array = $array[0];
            $pd = array();
            $pd['id_user'] = $id;
            $pd['doctype_customer'] = $array['doctype_user'];
            $pd['doc_customer'] = $array['doc_user'];
            $pd['fullname_customer'] = $array['name_user'] . ' ' . $array['lastname_user'];
            $pd['address_customer'] = $array['address_user'];
            $pd['phone_customer'] = $array['phone_user'];
            $pd['email_customer'] = $array['email_user'];
        }
        $bc = new BaseController();
        $bc->connect();
        $bc->preparePostData();
        $bc->setModel($model);
        $bc->setFindBy($findBy);
        $bc->setAction('insert');
        $bc->setPostData($pd);
        $result = $bc->execute(false);
        $bc->disconnect();
        echo $result;
        $result = null;
    }
} else {
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>