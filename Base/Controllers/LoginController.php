<?php

ob_start();
include_once 'Libraries/Controllers.php';
$session = new SessionManager();
$model = 'UserAccountsApp';
$findBy = 'id_user';
$action = 'find';
$where = '';
$columns = null;
$user = null;
$password = null;
$enterprise = 1;
$login = null;
$crypt = new MyCrypt();
$sql=null;

if (isset($_POST) && $_POST != null && isset($_POST['token']) && $_POST['token']!=null) {
    
    if(strcmp($_POST['token'], '92a04b22c02d12e8')!=0){
        exit();
    }
    
    if ($_POST['id_enterprise'] != null) {
        $enterprise = $_POST['id_enterprise'];
    }
    
    $result = null;
    $bc = new BaseController();
    $bc->connect();
    $bc->preparePostData();
    $bc->setModel($model);
    $bc->setFindBy($findBy);
    $user = $_POST['nick_user'];
    $pw = $_POST['password_user'];
    $password = $crypt->crypt($pw);
    $sql="SELECT UA.id_user as userid, UA.nickname_account as user, UA.role_account as userrole, concat(U.name_user,' ',U.lastname_user) as fullname "
            . "FROM UserAccountsApp UA INNER JOIN UsersApp U ON UA.id_user=U.id_user INNER JOIN StoresApp S ON UA.id_store=S.id_store "
            . "WHERE UA.nickname_account='$user' and UA.password_account='$password' and UA.id_store=$enterprise and UA.status_account=1 and U.status_user=1 and S.status_store=1";
    
    $result = $bc->selectSimple($sql);
    
    $array = array();
    $array['message'] = '';
    $array['error'] = null;
    $array['status'] = 0;
    $array['data'] = null;
    if ($result == null || strcmp($result, '') == 0 || strcmp($result, '[]') == 0) {
        $array['message'] = 'User / Password Wrong!.';
        $array['status'] = 0;
    } else {
        $array['status'] = 1;
        $login = json_decode($result, true);
        $login = $login[0];
        if (!$session->hasLogin()) {
            $session->setLogin($login['userid'], $login['user'], $login['userrole'], $login['fullname'], $enterprise);
            $array['token'] = $session->getToken();
            $array['data'] = json_encode($login);
        } else {
            $array['status'] = 0;
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
