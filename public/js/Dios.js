firebase.auth().onAuthStateChanged(function(user) {
    //aqui pueden ir los permisos o mas especificaciones de sesion
        if (!user){
            //window.location="http://localhost:5000";                        //LOCAL Fs
            window.location="https://aleph-b9912.firebaseapp.com";
        }else{
            firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                var nivel = snapshot.val().administrador;
                firebase.database().ref('/Niveles/').once('value').then(function(snapshot) {
                    var dios        = snapshot.val().Dios;
                    var ceo         = snapshot.val().CEO;
                    var directores  = snapshot.val().Directores;
                    var jefes       = snapshot.val().Jefes;
                    var subordinados= snapshot.val().Subordinados;
                    if(nivel > dios){
                        window.location="https://aleph-b9912.firebaseapp.com/Sit.html";
                    }
                });
            });
        }
});
