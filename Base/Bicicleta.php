<?php

class Bicicleta {
    private $Modelo=0;
    private $Precio=0.0;
    private $NumVelocidades=1;
    private $Velocidad=0;
    
    public function __construct() {
        
    }
    
    public function setModelo($modelo) {
        $this->Modelo=$modelo;
    }
    public function setPrecio($precio) {
        $this->Precio=$precio;
    }
    public function setNumVelocidades($numvel) {
        $this->NumVelocidades=$numvel;
    }
    public function setVelocidad($vel) {
        $this->Velocidad=$vel;
    }
    
    public function getModelo() {
        return $this->Modelo;
    }
    
    public function getPrecio() {
        return $this->Precio;
    }
    
    public function getNumVelocidades() {
        return $this->NumVelocidades;
    }
    
    public function getVelocidad() {
        return $this->Velocidad;
    }
    
    public function Acelerar() {
        $vel=0;
        $vel=  $this->Velocidad+1;
        $this->Velocidad=$vel;
        return true;
    }
    
    public function Detener() {
        $this->Velocidad=0;
        return true;
    }
    
    public function ConsultarVelocidad() {
        echo 'La Velocidad es: '.$this->Velocidad.' Kms/H';
    }
    
}


?>
