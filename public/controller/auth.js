function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        alert("Sesión cerrada.")

      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Ingresa un correo');
          return;
        }
        if (password.length < 4) {
          alert('Ingresa una cotraseña');
          return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Contraseña incorrecta');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          window.open("http://localhost:5000/main.html");
        });
      }
}
function registro(){
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Ingresa un correo para registrarte.');
        return;
      }
      if (password.length < 4) {
        alert('Ingresa una contraseña.');
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('La contraseña es muy debil.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
}
function sendPasswordReset() {
      var email = document.getElementById('email').value;
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        alert('¡Correo para cambiar contraseña enviado!');
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
      });
    }
function sendPasswordReset() {
      var email = document.getElementById('email').value;
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        alert('¡Correo para cambiar contraseña enviado!');
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
      });
    }
function initApp() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //alert('sesion');
          // User is signed in.
          /*var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;*/
            window.location="https://prueba-aleph.firebaseapp.com/main.html";       //WEB
           // window.location="http://localhost:5000/main.html";                      //LOCAL
        }else{

        }
      });
      document.getElementById('handleLogin').addEventListener('click', toggleSignIn, false);
      document.getElementById('registrar').addEventListener('click', registro, false);
      document.getElementById('resetPass').addEventListener('click', sendPasswordReset, false);

}
    window.onload = function() {
      initApp();
    };
