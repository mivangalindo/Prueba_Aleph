firebase.auth().onAuthStateChanged(function(user) {
    //aqui pueden ir los permisos o mas especificaciones de sesion
        if (!user){
            //window.location="http://localhost:5000";                        //LOCAL Fs
            window.location="https://aleph-b9912.firebaseapp.com/Sit.html";
        }
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
});
