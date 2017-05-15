<?php

/**
 * Description of UploadImageController
 *
 * @author JOSEMEZA
 */
include_once 'Libraries/Controllers.php';
$upload = null;
if (isset($_REQUEST) && $_REQUEST != null) {
    $upload = new UploadImage();
    $upload->setFileName('imageFile');
    $upload->setPrefix($_REQUEST['prefix_image']);
    $upload->setNewName($_REQUEST['name_image']);
    if($upload->Upload()){
        echo 'Imagen Subida con Exito';
    }
}
?>