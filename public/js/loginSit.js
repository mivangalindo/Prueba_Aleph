var empresa;
var emailEmpresa;
var nombreCEO;
var inicioDirecto = 1;
///////////////EMPRESAS/////////////////
var empleadoKey;
var areaEmpleado;
var correoEmpleado;
var empresaUIDEmpleado;
var nombreEmpleado;
var nombreEmpresaEmpleado;
var puestoEmpleado;
///////////////EMPLEADOS/////////////////
function newEmpresa(){
    var password = document.getElementById('password').value;
    if(password >= 6){
            inicioDirecto = 0;
            registro();
            firebase.auth().onAuthStateChanged(function(user) {
                firebase.database().ref('/niveles/').once('value').then(function(snapshot) {
                    var ceo = snapshot.val().CEO;
                    firebase.database().ref('users/' + user.uid).set({
                        puesto          : ceo,
                        nombre          : nombreCEO,
                        area            : 'CEO',
                        correo          : emailEmpresa,
                        empresaUID      : user.uid,
                        nombreEmpresa   : empresa
                    });
                    firebase.database().ref('empresasUsers/' + empresa + '/' + user.uid).set({
                        nombre          : nombreCEO,
                        uid             : user.uid
                    });
                    firebase.database().ref('empresa/' + user.uid).set({
                        nombre          : empresa,
                        nombreCEO       : nombreCEO,
                        mision          : 'Misión',
                        //activo          :  true,
                        vision          : 'Visión',
                        valores         : 'Valores',
                        responsable     : 'Responsable'
                    });
                    firebase.database().ref('empresaOn/' + user.uid).set({
                        activo          :  true
                    });
                });
            });
            firebase.database().ref('empresasPendientes/'+empresa).remove();
            setTimeout(function(){
                inicioUnico();
            }, 2000);
    }else{
        alert('La contraseña debe contener al menos 6 caracteres.');
    }
}
function newEmpleado(){
    var password = document.getElementById('password').value;
    if(password >= 6){
            inicioDirecto = 0;
            registro();
            firebase.auth().onAuthStateChanged(function(user) {
                    firebase.database().ref('users/' + user.uid).set({
                        area            : areaEmpleado,
                        correo          : correoEmpleado,
                        empresaUID      : empresaUIDEmpleado,
                        nombre          : nombreEmpleado,
                        nombreEmpresa   : nombreEmpresaEmpleado,
                        puesto          : puestoEmpleado
                    });
                if(nombreEmpresaEmpleado == "Aleph"){
                    firebase.database().ref('aleph/' + user.uid).set({
                        nombre          : nombreEmpleado,
                        correo          : correoEmpleado,
                        puesto          : "1",
                        empresaACargoUid: empresaUIDEmpleado
                    });
                }else{
                    firebase.database().ref('empresasUsers/' + nombreEmpresaEmpleado + '/' + user.uid).set({
                        nombre          : nombreEmpleado,
                        uid             : user.uid
                    });
                }
            });
            firebase.database().ref('empleadosPendientes/'+empleadoKey).remove();
            setTimeout(function(){
                inicioUnico();
            }, 2000);
    }else{
        alert('La contraseña debe contener al menos 6 caracteres.');
    }
}
function encuentraCoincidencia(){
    var masDeUno = 0;
    firebase.database().ref('empresasPendientes/').on('child_added', function(data) {
       firebase.database().ref('empresasPendientes/'+data.key).once('value').then(function(snapshot) {
            emailEmpresa = document.getElementById('email').value;
            var email2 = snapshot.val().correoCEO;
            empresa = data.key;
            if(emailEmpresa == email2){
                nombreCEO = snapshot.val().nombreCEO;
                masDeUno = 1;
                $('#handleLogin').hide();
                $('#resetPass').hide();
                $('#registroEmpresa').show();
                $("#registroEmpresa").text('Registro para '+data.key);
                document.getElementById('registroEmpresa').addEventListener('click', newEmpresa, false);
            }else if(masDeUno == 0){
                $('#registroEmpresa').hide();
                $('#handleLogin').show();
                $('#resetPass').show();
            }
        });
    });
    firebase.database().ref('empleadosPendientes/').on('child_added', function(data) {
       firebase.database().ref('empleadosPendientes/'+data.key).once('value').then(function(snapshot) {
            emailEmpresa = document.getElementById('email').value;
            var email2 = snapshot.val().correoEmpleado;
            if(emailEmpresa == email2){
                masDeUno = 1;
                empleadoKey = data.key;
                areaEmpleado = snapshot.val().area;
                correoEmpleado = snapshot.val().correoEmpleado;
                empresaUIDEmpleado = snapshot.val().empresaUID;
                nombreEmpleado = snapshot.val().nombreEmpleado;
                nombreEmpresaEmpleado = snapshot.val().nombreEmpresa;
                puestoEmpleado = snapshot.val().puesto;
                $('#handleLogin').hide();
                $('#resetPass').hide();
                $('#registroEmpleado').show();
                $("#registroEmpleado").text('Registro para '+snapshot.val().nombreEmpleado);
                document.getElementById('registroEmpleado').addEventListener('click', newEmpleado, false);
            }else if(masDeUno == 0){
                $('#registroEmpleado').hide();
                $('#handleLogin').show();
                $('#resetPass').show();
            }
        });
    });
}
function inicioUnico(){
    var user = firebase.auth().currentUser;
    firebase.database().ref('deletedUsers/' + user.uid).once('value').then(function(snapshot) {
        if(user.uid == snapshot.val().user){
            firebase.auth().currentUser.delete().then(function() {
                alert('Tu cuenta ha sido eliminada.');
                firebase.database().ref('deletedUsers/'+user.uid).remove();
            }, function(error) {
              alert('error para borrar');
            });
        }
    });
    firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
        var puesto = snapshot.val().puesto;
        firebase.database().ref('/niveles/').once('value').then(function(snapshot) {
            var dios        = snapshot.val().Dios;
            var ceo         = snapshot.val().CEO;
            var directores  = snapshot.val().Directores;
            var jefes       = snapshot.val().Jefes;
            var subordinados= snapshot.val().Subordinados;
            switch(puesto){
                case dios:
                    window.location="https://aleph-b9912.firebaseapp.com/MainAlephEmpresas.html";
                    break;
                case ceo:
                    window.location="https://aleph-b9912.firebaseapp.com/MainCeo.html";
                    break;
                case directores:
                    window.location="https://aleph-b9912.firebaseapp.com/MainDir.html";
                    break;
                case jefes:
                    window.location="https://aleph-b9912.firebaseapp.com/MainJefe.html";
                    break;
                case subordinados:
                    window.location="https://aleph-b9912.firebaseapp.com/MainSub.html";
                    break;
                default:
                    alert('default');
            }
        });
    });
}
