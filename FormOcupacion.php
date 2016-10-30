<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Registro de Ocupaciones</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Voltaire' rel='stylesheet' type='text/css'>
        <link href="css/styles.css" rel="stylesheet">

        <!-- Bootstrap Core CSS -->
        <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <script type="text/javascript" src="js/jquery-2.1.1.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script>
        <script type="text/javascript" src="js/Validator.js"></script>

    </head>
    <body>

        <div class="panel panel-primary" style="width: 50% !important;">
            <div class="panel-heading">Registro Ocupacion</div>
            <form class="panel-body" method="POST" autocomplete="false" url="Base/PruebaFramework.php" model="ocupacion" findBy="id_ocupacion" >
                <input type="hidden" integer="true" name="id_ocupacion" id="id_persona" value="0" required="true" maxlength="30" min="0" class="form-control">


                <div class="row">
                    <div class="col-sm-12">
                        <label>Nombre</label>
                        <input type="text" name="nombre_ocupacion" id="nombre_ocupacion" value="" required="true" maxlength="100" class="form-control" title="Nombre Completo">
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-sm-12">
                        <label>Descripcion</label>
                        <textarea type="text" name="descripcion_ocupacion" id="descripcion_ocupacion" maxlength="1000" required="true" style="min-width: 100%; min-height: 100px;" placeholder="Escriba aquí una descripcion corta." ></textarea>
                    </div>
                </div>

                
                <center>
                    <button id="Guardar" name="Guardar" type="button" action="insert" onclick="submitForm(this);" class="btn btn-primary" >Guardar</button>        
                </center>
            </form>
        </div>
        
        <?php
        // put your code here
        ?>

    </body>
</html>
