<?php

ob_start();

include_once 'ClassInvoicing.php';
$session = new SessionManager();
$model = 'InvoicingNumbersApp';
$othermodel = 'InvoicingSettingsApp';
$findBy = 'id_number';
$invoicing = null;
$settings = null;
$idinvoice = null;
$invoice_number = null;
$identerprise = 0;
$result = null;
$data = null;

if ($session->hasLogin()) {
    $identerprise = $session->getEnterpriseID();
    $result = array();
    $result['status'] = 0;
    $result['error'] = null;
    $result['message'] = 'Error in Invoicing Process!.';
    $result['data'] = null;
    $result['lastInsertId'] = null;

    if (isset($_REQUEST) && $_REQUEST != null) {
        if (isset($_REQUEST['action']) && $_REQUEST['action'] != null) {
            if (strcmp($_REQUEST['action'], 'Generate') == 0) {
                if ((strcmp($session->getUserType(), 'AA') == 0 || strcmp($session->getUserType(), 'VN') == 0)) {

                    $invoicing = new Invoicing();
                    $invoicing->connect();
                    $idinvoice = $invoicing->getLastInvoicingSettingsId();
                    $settings = $invoicing->getInvoicingSettings();
                    $invoice_number = $invoicing->getLastInvoiceNumber();
                    if ($settings != null && is_array($settings)) {
                        if (!isset($invoice_number) || $invoice_number == null) {
                            $invoice_number = $settings['lowerlimit_invoicing'];
                        } elseif (is_numeric($invoice_number)) {
                            if ($invoice_number < $settings['upperlimit_invoicing']) {
                                $invoice_number = $invoice_number + 1;
                            } else {
                                $invoice_number = null;
                                $result['message'] = 'Invoicing Settings Finished!';
                            }
                        }
                    } else {
                        $result['message'] = 'Invoicing Settings Not Found!';
                    }

                    if ($invoice_number != null) {
                        $result['status'] = 1;
                        $result['error'] = null;
                        $result['message'] = '';
                        $invoicing->setModel($invoicing->model_numbers);
                        $invoicing->setAction('insert');
                        $array = array();
                        $array['id_number'] = 0;
                        $array['id_invoicing'] = $settings['id_invoicing'];
                        $array['number_number'] = $invoice_number;
                        $array['fullnumber_number'] = $settings['prefix_invoicing'] . $invoice_number;
                        $array['date_number'] = date("Y-m-d G:i:s");
                        $array['statusnumber_number'] = -1;
                        $invoicing->setPostData($array);
                        $invoicing->execute(false);
                        if ($invoicing->getLastInsertId() != null && $invoicing->getLastInsertId() != 0) {
                            $data = array();
                            $data['id_invoice'] = $array['fullnumber_number'];
                            $data = json_encode($data);
                            $result['data'] = $data;
                            $result['lastInsertId'] = $invoicing->getLastInsertId();
                        }
                        
                    }
                } else {
                    $result['message'] = 'Access Denied For Your Account!';
                }
            }
        }
    }
    $result = json_encode($result);
    echo $result;
} else {
    echo $session->getSessionStateJSON();
}
ob_end_flush();
?>