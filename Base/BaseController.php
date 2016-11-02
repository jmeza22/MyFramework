<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BaseController
 *
 * @author JOSEMEZA
 */
include_once 'SQLDatabase.php';

class BaseController {

    public $db = null;
    private $token = "0";
    private $model = "model";
    private $action = "select";
    private $findBy = "id";
    private $postData = null;

    public function __construct() {
        $this->db = new SQLDatabase('localhost', 'testphp', 'root', '', 'mysql');
        $this->connect();
    }

    public function connect() {
        $this->db->connect();
    }

    public function disconnect() {
        $this->db->disconnect();
    }

    public function setToken($token) {
        $this->token = $token;
    }

    public function setModel($model) {
        $this->model = $model;
    }

    public function setAction($action) {
        $this->action = $action;
    }

    public function setFindBy($findBy) {
        $this->findBy = $findBy;
    }

    public function getToken() {
        return $this->token;
    }

    public function getModel() {
        return $this->model;
    }

    public function getAction() {
        return $this->action;
    }

    public function getFindBy() {
        return $this->findBy;
    }

    private function parseWhereParam($param) {
        if (is_nan($param)) {
            return "'" . $param . "'";
        } else {
            return $param;
        }
        return null;
    }

    public function setPostData($postData = null) {
        if ($postData != null && is_array($postData)) {
            $this->postData = $postData;
            return true;
        } else {
            if (isset($_POST)) {
                $this->postData = $_POST;
                return true;
            }
        }
        return false;
    }

    public function preparePostData() {
        if ($this->postData == null || !isset($this->postData)) {
            $this->setPostData();
        }
        if (isset($this->postData) && is_array($this->postData)) {
            if (isset($this->postData['url'])) {
                unset($this->postData['url']);
            }
            if (isset($this->postData['token'])) {
                $this->token = $this->postData['token'];
                unset($this->postData['token']);
            }
            if (isset($this->postData['model'])) {
                $this->model = $this->postData['model'];
                unset($this->postData['model']);
            }
            if (isset($this->postData['action'])) {
                $this->action = $this->postData['action'];
                unset($this->postData['action']);
            }
            if (isset($this->postData['findBy'])) {
                $this->findBy = $this->postData['findBy'];
                unset($this->postData['findBy']);
            }
            return true;
        }
        return false;
    }

    public function insert() {
        if (isset($this->db) && isset($this->postData)) {
            if ($this->db->insertStmt($this->model, $this->postData)) {
                return true;
            }
        }
        return false;
    }

    public function update() {
        if (isset($this->db) && isset($this->postData) && isset($this->findBy)) {
            if ($this->db->updateStmt($this->model, $this->postData, "" . $this->findBy . "=" . $this->parseWhereParam($this->postData[$this->findBy]))) {
                return true;
            }
        }
        return false;
    }

    public function delete() {
        if (isset($this->db) && isset($this->postData) && isset($this->findBy)) {
            if ($this->db->deleteStmt($this->model, "" . $this->findBy . "=" . $this->parseWhereParam($this->postData[$this->findBy]))) {
                return true;
            }
        }
        return false;
    }

    public function select() {
        $result = null;
        if (isset($this->db) && isset($this->postData) && isset($this->findBy)) {
            $result = $this->db->selectJSON("*", $this->model, "" . $this->findBy . "=" . $this->parseWhereParam($this->postData[$this->findBy]));
            return $result;
        }
        return false;
    }

    public function execute($print = false, $messageSuccess = 'OK', $messageError = 'Error Found!') {
        $result = false;
        if (isset($this->action)) {
            if (strcmp($this->action, 'insert') == 0 || strcmp($this->action, '1') == 0) {
                $result = $this->insert();
            }
            if (strcmp($this->action, 'update') == 0 || strcmp($this->action, '2') == 0) {
                $result = $this->update();
            }
            if (strcmp($this->action, 'delete') == 0 || strcmp($this->action, '3') == 0) {
                $result = $this->delete();
            }
            if (strcmp($this->action, 'find') == 0 || strcmp($this->action, '4') == 0) {
                $result = $this->select();
            }
            if (strcmp($this->action, 'findAll') == 0 || strcmp($this->action, '5') == 0) {
                $result = $this->select();
            }
        }
        if ($print == true) {
            if ($result === true) {
                echo $messageSuccess;
            }
            if ($result === false) {
                echo $messageError;
            }
        }
        return $result;
    }

    public function getComboboxData($colname, $colvalue, $where = '') {
        $result = null;
        if (isset($this->db) && isset($this->model) && isset($colname) && isset($colvalue)) {
            $result = $this->db->selectJSON($colname . ' as iname, ' . $colvalue . ' as ivalue ', $this->model, $where);
            return $result;
        }
        return null;
    }

}

?>