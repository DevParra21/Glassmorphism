<?php
    function OpenConnection(){
        $host = "localhost";
        $user = "root";
        $dbpass = "P21e03e92P";
        $db = "Glassmorphism";

        $m_Conn = new mysqli($host, $user, $dbpass, $db)
            or
        die("Error de conexión: %s\n". $m_Conn->error);

        return $m_Conn;
    }

    function CloseConnection($conexion){
        $conexion->close();
    }


?>