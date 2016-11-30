firebase.auth().onAuthStateChanged(function(user) {
    //aqui pueden ir los permisos o mas especificaciones de sesion
        if (!user){
            //window.location="http://localhost:5000";                        //LOCAL Fs
            window.location="https://prueba-aleph.firebaseapp.com";         //WEB
        }
});
