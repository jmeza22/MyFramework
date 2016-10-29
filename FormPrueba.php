
<html>
    <head>
        <meta charset="UTF-8">
        <title>Registro de Usuarios</title>
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

        <script type="text/javascript">
            jQuery(document).ready(function () {
                var item = document.getElementById("id_persona");
                //getData(item);
            }
            );
        </script>

    </head>
    <body>

        <div class="panel panel-primary" style="width: 50% !important;">
            <div class="panel-heading">Registro Persona</div>
            <form class="panel-body" method="POST" autocomplete="false" url="Base/PruebaFramework.php" model="personas" findBy="id_persona" >
                <input type="hidden" integer="true" name="id_persona" id="id_persona" value="0" required="true" maxlength="30" min="0" class="form-control">


                <div class="row">
                    <div class="col-sm-6">
                        <label>Nombres</label>
                        <input type="text" name="nombre_persona" id="nombre_persona" value="" required="true" maxlength="50" class="form-control" title="Nombre Completo">
                    </div>

                    <div class="col-sm-6">
                        <label>Apellidos</label>
                        <input type="text" name="apellido_persona" id="apellido_persona" value="" required="true" maxlength="100" class="form-control" >
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <label>Fecha Nacimiento</label>
                        <input type="date" date="true" name="fechanacimiento_persona" id="fechanacimiento_persona" value="" placeholder="1992-04-22" maxlength="10" class="form-control" required="true">
                    </div>
                    <div class="col-sm-6">
                        <label>Email</label>
                        <input type="email" name="email_persona" id="email_persona" value="" maxlength="100"  class="form-control">
                    </div>
                </div>

                <center>
                    <button id="Guardar" name="Guardar" type="button" action="update" onclick="submitForm(this);" class="btn btn-primary" >Guardar</button>        
                </center>
            </form>
        </div>

        <div class="panel panel-default" style="width: 50% !important;">
            <div class="panel-heading">Listado Personas</div>
            <div class="panel-body">
                <div>
                    <form method="POST" autocomplete="false" id="List" >
                        <input type="hidden" name="url" id="url" value="Base/Prueba.php" required="true" disabled="true" >
                        <input type="hidden" name="ListarPersona" id="ListarPersona" value="Listar" required="true" >
                        <center>
                            <button id="Listar" name="Listar" type="button" onclick="submitForm(this);" class="btn btn-success" >Guardar</button>        
                        </center>
                    </form>
                    <table id="table-list" border="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Fec. Nac</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </body>
</html>
