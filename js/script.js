const EDAD_MAXIMA=80;

$(document).ready(function(){
    
    Inicializar();
    
    $("#lnkSignin").click(function(){
        CambioEscena("#welcomeMessage2","#wndRegistro","#wndInicioSesion","#welcomeMessage");
    });

    $("#lnkSignup").click(function(){
        CambioEscena("#welcomeMessage","#wndInicioSesion","#wndRegistro","#welcomeMessage2");
    });

    
    $("#btnIniciarSesion").click(function(){
        if(ValidarDatosInicioSesion("#tbNombreUsuario","#tbContrasena"))
            console.log("datos validados."); //Enviar HttpRequest
    });

    $("#btnRegistrar").click(function(){
        if(ValidarDatosRegistro("#tbNombreCompletoRegistro","#tbFechaNacimientoRegistro",
        "#tbNombreUsuarioRegistro","#tbContrasenaRegistro"))
            console.log("datos registrados"); //Enviar HttpReq
    });


    //Inputs pierden focus [validar datos login]
    $("#tbNombreUsuario").focusout(function(){
        ValidaDato(this,"#errorNombreUsuario");
    });

    $("#tbContrasena").focusout(function(){
        ValidaDato(this,"#errorContrasena");
    });

    //Inputs pierden focus [validar datos signup]
    $("#tbNombreCompletoRegistro").focusout(function(){
        ValidaDato(this,"#errorNombreCompletoRegistro");
    });

    $("#tbFechaNacimientoRegistro").focusout(function(){
        if(ValidaDato(this,"#errorFechaNacimientoRegistro"))
        {   
            //verificar edad de usuario
            let year = new Date($(this).val()).getFullYear();
            let actualYear = new Date().getFullYear();

            let diff = parseInt(actualYear) - parseInt(year);

            if(diff > EDAD_MAXIMA)
            {
                ElementShake(this);
                AgregarClase(this,"is-danger");
                MostrarErrores("#errorFechaNacimientoRegistro","El mínimo año permitido es " + (parseInt(actualYear) - EDAD_MAXIMA).toString());
            }
            
        }
    });

    $("#tbNombreUsuarioRegistro").focusout(function(){
        ValidaDato(this,"#errorNombreUsuarioRegistro");

        //Validar que no tenga espacios
    });

    $("#tbContrasenaRegistro").focusout(function(){
        ValidaDato(this,"#errorContrasenaRegistro");
    });
});

function OcultarElemento(tag){
    return $(tag).css("display","none");
}

function MostrarElemento(tag){
    $(tag).css("display","");
}

function OcultarErrores(){
    OcultarElemento("#errorNombreUsuario");
    OcultarElemento("#errorContrasena");
    OcultarElemento("#errorNombreCompletoRegistro");
    OcultarElemento("#errorFechaNacimientoRegistro");
    OcultarElemento("#errorNombreUsuarioRegistro");
    OcultarElemento("#errorContrasenaRegistro");
    return true;
}

function MostrarErrores(tag, msjError){
    return $(tag).text(msjError).css("display","");
}

function Inicializar(){
    OcultarErrores();
    OcultarElemento("#welcomeMessage2");
    OcultarElemento("#wndRegistro");
    OcultarElemento("#wndInicioSesion")
    OcultarElemento("#welcomeMessage");

    $("#welcomeMessage").delay(400).fadeIn();
    $("#wndInicioSesion").delay(600).fadeIn();
    return true;
}

function CambioEscena(ocultarTag, ocultarForm, mostrarForm, mostrarTag){
    $(ocultarTag).fadeOut();
    $(ocultarForm).fadeOut();
    $(mostrarForm).delay(800).fadeIn();
    $(mostrarTag).delay(400).fadeIn();
    return true;
}

function ElementShake(tag){

    return $(tag).effect({
                effect:"shake",
                direction:"left",
                distance:3,
                times:3
            });
}

function AgregarClase(tag, nuevaClase){
    return $(tag).addClass(nuevaClase);
}


function EliminarClase(tag, eliminarClase){
    return $(tag).removeClass(eliminarClase);
}



function ValidarDatosInicioSesion(nombreUsuarioP, contrasenaP){
    let error = false;
    
    if(!ValidaDato(nombreUsuarioP, "#errorNombreUsuario"))
        error = true;
    if(!ValidaDato(contrasenaP, "#errorContrasena"))
        error = true;

    return !error;
}

function ValidarDatosRegistro(nombreCompletoP, fechaNacimientoP, nombreUsuarioP, contrasenaP){
    let error = false;

    if(!ValidaDato(nombreCompletoP,"#errorNombreCompletoRegistro"))
        error=true;
    if(!ValidaDato(fechaNacimientoP,"#errorFechaNacimientoRegistro"))
        error = true;
    if(!ValidaDato(nombreUsuarioP,"#errorNombreUsuarioRegistro"))
        error = true;
    if(!ValidaDato(contrasenaP,"#errorContrasenaRegistro"))
        error = true;

    return !error;
}

function ValidaDato(tag, errorTag){
    if($(tag).val() == "" || $(tag).val() == undefined){
        ElementShake(tag);
        AgregarClase(tag,"is-danger");
        MostrarErrores(errorTag, "Campo requerido");
        return false;
    }
    else{
        EliminarClase(tag,"is-danger");
        OcultarElemento(errorTag);
    }
    return true;
}