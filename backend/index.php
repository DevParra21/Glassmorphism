<?php
    include 'dbConnection.php';

    if(isset($_POST['action']) && !empty($_POST['action'])) {
        $action = $_POST['action'];
        $conn = OpenConnection();

        switch($action) {
            case 'login' :
                $nombreUsuario = $_POST['reqNombreUsuario'];
                $contrasena = $_POST['reqContrasena'];

                IniciarSesion($nombreUsuario, $contrasena);
            break;
            case 'signup' :
                $nombreCompleto = $_POST['reqNombreCompleto'];
                $nombreUsuario = $_POST['reqNombreUsuario'];
                $fechaNacimiento = $_POST['reqFechaNacimiento'];
                $correoElectronico = $_POST['reqCorreoElectronico'];
                $contrasena = $_POST['reqContrasena'];
                Registrar($nombreCompleto, $fechaNacimiento, $nombreUsuario, $correoElectronico, $contrasena);
            break;
        }

        CloseConnection($conn);
    }

    function IniciarSesion($nombreUsuarioP, $contrasenaP)
    {
        //Iniciar Sesión
        echo "Nombre de Usuario: ".$nombreUsuarioP . "\nContraseña: " . $contrasenaP;
        
    }

    function Registrar($nombreCompletoP, $fechaNacimientoP, $nombreUsuarioP, $correoElectronicoP, $contrasenaP)
    {
        //Registro de usuario nuevo
        
        
    }
?>