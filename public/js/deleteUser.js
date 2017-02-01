firebase.database().ref('deletedUsers/' + user.uid).once('value').then(function(snapshot) {
    if(user.uid == snapshot.val().user){
        alert(user.uid);
        firebase.auth().currentUser.delete().then(function() {
            alert('Tu cuenta ha sido eliminada.');
            firebase.database().ref('deletedUsers/'+user.uid).remove();
        }, function(error) {
          alert('error para borrar');
        });
    }
});
