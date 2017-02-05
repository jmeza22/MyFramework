<?php

/**
 * Description of UploadImageController
 *
 * @author JOSEMEZA
 */
include_once 'Security/SetsAndHeaders.php';
include_once 'UploadImage.php';
$upload = null;
if (isset($_POST) && $_POST != null) {
    $upload = new UploadImage();
    $upload->setFileName('imageFile');
    $upload->setPrefix('Photo');
    $upload->setNewName(date("dmYhGis"));
    if($upload->Upload()){
        echo 'Imagen Subida con Exito';
    }
}
?>