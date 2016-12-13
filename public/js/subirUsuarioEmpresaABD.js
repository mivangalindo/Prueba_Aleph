var database = firebase.database();

function addEmpleado(){
    writeUserData(document.getElementById('nombre').value,
                  document.getElementById('apellido').value,
                  document.getElementById('puesto').value);

    document.getElementById('nombre').value = "";
    document.getElementById('apellido').value = "";
    document.getElementById('puesto').value = "";
}
function addEmpresa(){
    writeEmpresaData(document.getElementById('nombreE').value,
                  document.getElementById('giro').value,
                  document.getElementById('rfc').value);

    document.getElementById('nombreE').value = "";
    document.getElementById('giro').value = "";
    document.getElementById('rfc').value = "";
}

function writeUserData(nombre, apellido, puesto) {
    var user = firebase.auth().currentUser;
      firebase.database().ref('users/'+user.uid).push().set({
        username: nombre,
        lastname: apellido,
        ocupacion : puesto
      });
}
function writeEmpresaData(nombreE, giro, rfc) {
    var user = firebase.auth().currentUser;
      firebase.database().ref('empresa/'+user.uid).push().set({
        usernameE: nombreE,
        giro: giro,
        rfc : rfc
      });
}
document.getElementById('Empleado').addEventListener('click', addEmpleado, false);
document.getElementById('Empresa').addEventListener('click', addEmpresa, false);
