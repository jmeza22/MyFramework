
<html>
    <head>
        <meta charset="UTF-8">
        <title>Registro de Usuarios</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="Jose Meza">

        <link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Voltaire' rel='stylesheet' type='text/css'>
        <link href="css/styles.css" rel="stylesheet">

        <!-- Bootstrap Core CSS -->
        <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="bootstrap/css/bootstrap.css" type="text/css"/>

        <script type="text/javascript" src="js/jquery-2.1.1.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script>
        <script type="text/javascript" src="js/Validator.js"></script>
        <script type="text/javascript" src="js/localStorageData.js"></script>
        <script type="text/javascript" src="js/SimplexFramework.js"></script>



    </head>
    <body>

        <div class="panel panel-primary" style="width: 50% !important;">
            <div class="panel-heading">Registro Persona</div>
            <form class="panel-body" method="POST" autocomplete="false" url="Base/PruebaFramework.php" model="personas" findBy="id_persona" do="4" >
                <input type="hidden" integer="true" name="id_persona" id="id_persona" value="0" required="required" maxlength="30" min="0" class="form-control">


                <div class="row">
                    <div class="col-sm-6">
                        <label>Nombres</label>
                        <input type="text" name="nombre_persona" id="nombre_persona" value="" required="required" maxlength="50" class="form-control" title="Nombre Completo">
                    </div>

                    <div class="col-sm-6">
                        <label>Apellidos</label>
                        <input type="text" name="apellido_persona" id="apellido_persona" value="" required="required" maxlength="100" class="form-control" >
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <label>Fecha Nacimiento</label>
                        <input type="date" date="true" name="fechanacimiento_persona" id="fechanacimiento_persona" value="" placeholder="1992-04-22" maxlength="10" class="form-control">
                    </div>
                    <div class="col-sm-6">
                        <label>Email</label>
                        <input type="email" name="email_persona" id="email_persona" value="" maxlength="100"  class="form-control">
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <label>Ocupacion</label>
                        <select name="ocupacion_persona" id="ocupacion_persona" required="required" url="Base/Combobox.php" model="ocupacion" colvalue="id_ocupacion" colname="nombre_ocupacion" selected="0" class="form-control" style="width: 100%; min-width: 100%;" >
                            <option value="0" disabled="disabled" >Ninguna</option> 
                        </select>
                    </div>
                </div>

                <center>
                    <button id="Guardar" name="Guardar" type="button" action="update" onclick="Send(this);" class="btn btn-primary" >Guardar</button>        
                </center>
                <center>
                    <input type="reset" class="btn btn-danger" value="Borrar" > 
                </center>
            </form>
        </div>



        <script type="text/javascript">
            jQuery(document).ready(function () {
                
                resetPOST();
                var idpersona = document.getElementById("id_persona");
                var valid = getPOST('id_persona');
                if (valid !== null) {
                    idpersona.value = valid;
                }
                var combo1 = document.getElementById("ocupacion_persona");
                getComboboxData(combo1);
                getData(idpersona);
            }
            );

            function Send(item) {
                var form = getForm(item);
                if (validateForm(form)) {
                    submitForm(item);
                }
            }


        </script>
    </body>
</html>
