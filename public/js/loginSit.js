var empresa;
var emailEmpresa;
var nombreCEO;
var inicioDirecto = 1;
function newEmpresa(){
    var password = document.getElementById('password').value;
    if(password >= 6){
            inicioDirecto = 0;
            registro();
            firebase.auth().onAuthStateChanged(function(user) {
                firebase.database().ref('/Niveles/').once('value').then(function(snapshot) {
                    var ceo = snapshot.val().CEO;
                    firebase.database().ref('users/' + user.uid).set({
                        administrador   : ceo,
                        nombre          : nombreCEO,
                        puesto          : 'CEO',
                        area            : 'CEO',
                        correo          : emailEmpresa,
                        empresaUID      : user.uid,
                        nombreEmpresa   : empresa
                    });
                    firebase.database().ref('empresa/' + user.uid).set({
                        nombre          : empresa,
                        nombreCEO       : nombreCEO,
                        mision          : 'Misión',
                        activo          :  true,
                        vision          : 'Visión',
                        valores         : 'Valores',
                        responsable     : 'Responsable'
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
function encuentraCoincidencia(){
    var masDeUno = 0;
    firebase.database().ref('empresasPendientes/').on('child_added', function(data) {
       firebase.database().ref('empresasPendientes/'+data.key).once('value').then(function(snapshot) {
            emailEmpresa = document.getElementById('email').value;
            var email2 = snapshot.val().correoCEO;
            nombreCEO = snapshot.val().nombreCEO;
            empresa = data.key;
            if(emailEmpresa == email2){
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
        var administrador = snapshot.val().administrador;
        firebase.database().ref('/Niveles/').once('value').then(function(snapshot) {
            var dios        = snapshot.val().Dios;
            var ceo         = snapshot.val().CEO;
            var directores  = snapshot.val().Directores;
            var jefes       = snapshot.val().Jefes;
            var subordinados= snapshot.val().Subordinados;
            switch(administrador){
                case dios:
                    window.location="https://aleph-b9912.firebaseapp.com/MainAleph.html";
                    break;
                case ceo:
                    window.location="https://aleph-b9912.firebaseapp.com/MainCeo.html";
                    break;
                case directores:
                    break;
                case jefes:
                    break;
                case subordinados:
                    break;
                default:
                    alert('default');
            }
        });
    });
}
