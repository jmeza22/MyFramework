<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Invoicing
 *
 * @author JOSEMEZA
 */
include_once 'Libraries/Controllers.php';

class Invoicing extends BaseController {

    public $model_settings = 'InvoicingSettingsApp';
    public $findby_settings = 'id_invoicing';
    public $model_numbers = 'InvoicingNumbersApp';
    public $findby_numbers = 'id_number';
    public $number = null;
    private $enterprise = 0;
    private $controller = null;
    private $session = null;

    public function __construct() {
        parent::__construct();
        $this->session = new SessionManager();
        $this->enterprise = $this->session->getEnterpriseID();
    }

    public function getLastInvoicingSettingsId() {
        $array = null;
        $result = null;
        $SQL = "SELECT MAX($this->findby_settings) as id_invoicing FROM $this->model_settings WHERE startdate_invoicing <= NOW() and id_store=$this->enterprise";
        $array = $this->selectAssocArray($SQL);
        if ($array != null && is_array($array)) {
            if (is_array($array[0])) {
                $array = $array[0];
            }
        }
        if (isset($array['id_invoicing']) && $array['id_invoicing'] != null) {
            $result = $array['id_invoicing'];
        }
        return $result;
    }

    public function getInvoicingSettings() {
        $array = null;
        $id = $this->getLastInvoicingSettingsId();
        $this->setModel($this->model_settings);
        $this->setFindBy($this->findby_settings);
        $this->setAction('find');
        $aux = array();
        $aux[$this->findby_settings] = $id;
        $this->setPostData($aux);
        $array = $this->find();
        if ($array != null) {
            $array = json_decode($array, true);
            if (is_array($array)) {
                if (is_array($array[0])) {
                    $array = $array[0];
                }
            }
        }
        return $array;
    }

    public function getLastInvoiceNumber() {
        $result = null;
        $id_invoicing = $this->getLastInvoicingSettingsId();
        $SQL = "SELECT MAX(number_number) as invoice_number FROM $this->model_numbers WHERE date_number <= NOW() and id_invoicing=$id_invoicing";
        $array = $this->selectAssocArray($SQL);
        if ($array != null && is_array($array)) {
            if (is_array($array[0])) {
                $array = $array[0];
            }
        }
        if (isset($array['invoice_number']) && $array['invoice_number'] != null) {
            $result = $array['invoice_number'];
        }
        return $result;
    }

}
