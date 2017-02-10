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
include_once 'Database/SQLDatabase.php';
include_once 'XML/DataSettings.php';

class BaseController {

    public $config = null;
    public $db = null;
    private $token = "0";
    private $model = "model";
    private $action = "select";
    private $findBy = "id";
    private $where = "";
    private $postData = null;
    private $state = 0;
    private $message = '';
    private $data = null;

    public function __construct() {
        $this->config = new DataSettings();
        $code = 1;
        $index = null;
        $index = $this->config->getSettingIndex($code);
        if ($index != null) {
            $this->db = new SQLDatabase($this->config->getHostDB($index), $this->config->getNameDB($index), $this->config->getUserDB($index), $this->config->getPasswordDB($index), 'mysql');
        } else {
            $this->db = new SQLDatabase('localhost', 'myapp', 'root', '', 'mysql');
        }
        $this->connect();
    }

    public function connect() {
        $this->db->connect();
    }

    public function disconnect() {
        $this->db->disconnect();
    }

    public function getLastInsertId($name = null) {
        return $this->db->getLastInsertID($name);
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

    public function setWhere($where) {
        $this->where = $where;
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

    public function getWhere() {
        return $this->where;
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

    public function getPostData() {
        return $this->postData;
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
            if (isset($this->postData['where'])) {
                $this->where = $this->postData['where'];
                unset($this->postData['where']);
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

    public function find($columns = '*') {
        $result = null;
        if (isset($this->db) && isset($this->postData) && isset($this->findBy)) {
            $result = $this->db->selectJSON($columns, $this->model, "" . $this->findBy . "=" . $this->parseWhereParam($this->postData[$this->findBy]));
            return $result;
        }
        return false;
    }

    public function select($table = null, $columns = '*', $where = null) {
        $result = null;
        if ($table != null) {
            $this->model = $table;
        }
        if ($where == null) {
            $where = $this->where;
        }
        if (isset($this->db) && isset($this->model)) {
            $result = $this->db->selectJSON($columns, $this->model, $where);
            return $result;
        }
        return null;
    }

    public function selectWithoutModel($table = null, $columns = '*', $where = null) {
        $json = $this->select($table, $columns, $where);
        $array = json_decode($json, true);
        $array = $array[$this->model];
        $array = json_encode($array);
        return $array;
    }

    public function parseResults($result, $message = '', $state = 0) {
        $array = array();
        $array = ["data" => NULL, "message" => $message, "state" => $state, "error" => $this->db->getErrorMessage(), "lastInsertId" => $this->getLastInsertId()];
        if ($result != NULL) {
            $array = ["data" => $result, "message" => $message, "state" => $state, "error" => null, "lastInsertId" => $this->getLastInsertId()];
        }
        $array = json_encode($array);
        return $array;
    }

    public function execute($print = false) {
        $result = false;
        if (isset($this->action)) {
            if (strcmp($this->action, 'find') == 0 || strcmp($this->action, '0') == 0) {
                $result = $this->find();
                if ($result != null && !is_bool($result)) {
                    $result = $this->parseResults($result, "", 1);
                } else {
                    $result = $this->parseResults($result, "", 0);
                }
            }
            if (strcmp($this->action, 'insert') == 0 || strcmp($this->action, '1') == 0) {
                $result = $this->insert();
                if ($result == true) {
                    $result = $this->parseResults($result, "Registro Exitoso!", 1);
                } else {
                    $result = $this->parseResults($result, "Registro Fallido!", 0);
                }
            }
            if (strcmp($this->action, 'update') == 0 || strcmp($this->action, '2') == 0) {
                $result = $this->update();
                if ($result == true) {
                    $result = $this->parseResults($result, "Actualizacion Exitosa!", 1);
                } else {
                    $result = $this->parseResults($result, "Actualizacion Fallida!", 0);
                }
            }
            if (strcmp($this->action, 'delete') == 0 || strcmp($this->action, '3') == 0) {
                $result = $this->delete();
                if ($result == true) {
                    $result = $this->parseResults($result, "Eliminacion Exitosa!", 1);
                } else {
                    $result = $this->parseResults($result, "Eliminacion Fallida!", 0);
                }
            }
            if (strcmp($this->action, 'findAll') == 0 || strcmp($this->action, '4') == 0) {
                $result = $this->select();
                if (is_array($result)) {
                    $result = $this->parseResults($result, "Consulta Exitosa!", 1);
                } else {
                    $result = $this->parseResults($result, "Consulta Fallida!", 0);
                }
            }
        }
        if ($print == true) {
            if ($result != NULL) {
                echo $result;
            }
        }
        return $result;
    }

    public function getComboboxData($colname = 'colname', $colvalue = 'colvalue', $where = '') {
        $result = null;
        if (isset($this->db) && isset($this->model) && isset($colname) && isset($colvalue)) {
            $result = $this->db->selectJSON($colname . ' as iname, ' . $colvalue . ' as ivalue ', $this->model, $where);
            return $result;
        }
        return null;
    }

    public function getValue($column = 'column', $idname = 'id', $idvalue = '0') {
        $result = null;
        $where = null;
        if (isset($this->db) && isset($this->model) && isset($idname) && isset($idvalue)) {
            $where = '' . $idname . '=' . $this->parseWhereParam($idvalue);
            $result = $this->db->selectJSON($column, $this->model, $where);
            return $result;
        }
        return null;
    }

}

?>