<?php

ob_start();
include_once 'BaseController.php';
include_once 'Security/MyCrypt.php';
include_once 'Security/SessionManager.php';
$session = new SessionManager();
$model = 'UsersApp';
$findBy = 'id_user';
$action = 'login';
$where = '';
$columns = null;
$user = null;
$password = null;
$login = null;
$crypt = new MyCrypt();

if (isset($_POST) && $_POST != null) {
    $result = null;
    $bc = new BaseController();
    $bc->connect();
    $bc->preparePostData();
    $bc->setModel($model);
    $bc->setFindBy($findBy);
    $user = $_POST['doc_user'];
    $pw = $_POST['password_user'];
    $password = $crypt->crypt($pw);
    $columns = 'id_user as userid, doc_user as user, role_user as userrole';
    $where = "doc_user='$user' and password_user='$password'";
    $result = $bc->select($columns, $where);
    $array = array();
    $array['message'] = '';
    $array['error'] = '';
    $array['state'] = 0;
    $array['data'] = null;
    if ($result == null || strcmp($result, '') == 0 || strcmp($result, '[]') == 0) {
        $array['message'] = 'User / Password Wrong!.';
        $array['state'] = 0;
    } else {
        $array['state'] = 1;
        $login = json_decode($result, true);
        $login = $login[$model];
        $login = $login[0];
        if (!$session->hasLogin()) {
            $session->setLogin($login['userid'], $login['user'], $login['userrole']);
            $array['token'] = $session->getToken();
            $array['data'] = $result;
        }else{
            $array['state'] = 0;
            $array['message'] = 'You have a Active Session!.';
        }
    }
    $array = json_encode($array);
    echo $array;

    $result = null;
    $array = null;
    $bc->disconnect();
}
ob_end_flush();
?>
