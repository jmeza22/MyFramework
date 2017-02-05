<?php

ob_start();
include_once 'SetsAndHeaders.php';
session_start();

class SessionManager {

    private $lock = true;
    private $timezone = "America/Bogota";
    private $website = null;

    function __construct() {
        $this->website = "" . $_SERVER["SERVER_NAME"];
    }

    function getTimeZone() {
        return $this->timezone;
    }

    function getHost() {
        return $this->website;
    }

    function isSecurityOn() {
        return $this->lock;
    }

    function hasLogin() {
        if (isset($_SESSION['iduser'])) {
            return true;
        } else {
            return false;
        }
    }

    function GenerateToken() {
        $_SESSION['tokenme'] = md5(uniqid(rand() * 9204, true));
    }

    function GenerateTokenSingUp() {
        $_SESSION['tokensingup'] = md5(uniqid(rand() * 2204, true));
    }

    function getToken() {
        if (isset($_SESSION['tokenme'])) {
            return $_SESSION['tokenme'];
        }
        return 0;
    }

    function getTokenSingUp() {
        if (isset($_SESSION['tokensingup'])) {
            return $_SESSION['tokensingup'];
        }
        return '';
    }

    function CheckToken() {
        if (isset($_REQUEST['token']) && $_REQUEST['token'] != NULL && $_REQUEST['token'] != '' && isset($_SESSION['tokenme']) && $_REQUEST['token'] == $_SESSION['tokenme']) {
            return true;
        }
        return false;
    }

    function CheckTokenSingUp() {
        echo $_REQUEST['token'] . '<br>';
        echo $_SESSION['tokensingup'];
        if (isset($_REQUEST['token']) && $_REQUEST['token'] != NULL && $_REQUEST['token'] != '' && $this->getTokenSingUp() != '' && $_REQUEST['token'] == $_SESSION['tokensingup']) {
            return true;
        }
        return false;
    }

    function CleanTokenSingUp() {
        $_SESSION['tokensingup'] = null;
    }

    function setLogin($iduser, $user, $type) {
        if ($iduser != null && $user != null) {
            $_SESSION['mytime'] = time();
            $_SESSION['iduser'] = $iduser;
            $_SESSION['nickname'] = $user;
            $_SESSION['typeuser'] = $type;
            $this->GenerateToken();
            return true;
        } else {
            return false;
        }
    }

    function logout() {
        $_SESSION['mytime'] = null;
        $_SESSION['iduser'] = null;
        $_SESSION['typeuser'] = null;
        $_SESSION['tokenme'] = null;
        session_unset();
        session_destroy();
    }

    function TimeOff() {
        if (isset($_SESSION['mytime'])) {
            $timeoff = $_SESSION['mytime'] + 900;
            if (time() > $timeoff) {
                $this->logout();
                return true;
            } else {
                return false;
            }
        }
    }

    function setLastActionTime() {
        $_SESSION['mytime'] = time();
    }

    function getUserType() {
        if (isset($_SESSION['typeuser'])) {
            return $_SESSION['typeuser'];
        }
        return 0;
    }

    function getUserID() {
        if (isset($_SESSION['iduser'])) {
            return $_SESSION['iduser'];
        }
        return 0;
    }

    function getNickname() {
        if (isset($_SESSION['nickname'])) {
            return $_SESSION['nickname'];
        }
        return '';
    }

    function getSessionStateJSON() {
        $array = array();
        $array['message'] = 'You must be login.';
        $array['error'] = null;
        $array['data'] = null;
        $array['state'] = 0;
        if ($this->hasLogin()) {
            $array['message'] = 'You have a Active Session.';
            $array['state'] = 1;
        }
        $array = json_encode($array);
        return $array;
    }

    function AccessControl() {
        
    }

}

ob_end_flush();
?>