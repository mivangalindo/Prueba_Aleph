firebase.auth().onAuthStateChanged(function(user) {
    //aqui pueden ir los permisos o mas especificaciones de sesion
        firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
            firebase.database().ref('empresaOn/' + snapshot.val().empresaUID).once('value').then(function(data) {
            //firebase.database().ref('empresa/' + snapshot.val().empresaUID).on('child_changed', function(data) {
                if(data.val().activo){
                    if (!user){
                        //window.location="http://localhost:5000";                        //LOCAL Fs
                        window.location="https://aleph-b9912.firebaseapp.com";
                    }
                }else{
                    firebase.auth().signOut();
                    window.location="https://aleph-b9912.firebaseapp.com";
                    alert('Lo siento tu cuenta fue desactivada.')
                }
            });
            firebase.database().ref('empresaOn/' + snapshot.val().empresaUID).on('child_changed', function(data) {
                if(data.val().activo){
                    if (!user){
                        //window.location="http://localhost:5000";                        //LOCAL Fs
                        window.location="https://aleph-b9912.firebaseapp.com";
                    }
                }else
                    if(!data.val().activo){
                        firebase.auth().signOut();
                        window.location="https://aleph-b9912.firebaseapp.com";
                        alert('Lo siento tu cuenta fue desactivada.')
                    }
            });
    });
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
