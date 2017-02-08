function guardarEmpleado() {
    var empleado = document.getElementById('empleado').value;
    var puesto = document.getElementById('puesto').value;
    var area = document.getElementById('area').value;
    var correoEmpleado = document.getElementById('correoEmpleado').value;
    var user = firebase.auth().currentUser;
    //alert(empleado+" "+puesto+" "+correoEmpleado +" "+user.uid);
    if (empleado.length == 0) {
        alert('Ingresa una empresa para registrarte.');
        return;
    }
    if (correoEmpleado.length == 0) {
        alert('Ingresa un correo para' + empleado + '.');
        return;
    }
    if (area == "---") {
        alert('Ingresa un área para ' + empleado + '.');
        return;
    }
    if (puesto == "---") {
        alert('Ingresa un puesto para ' + empleado + '.');
        return;
    }
    var database = firebase.database();
    firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
        firebase.database().ref('empleadosPendientes/').push().set({
            correoEmpleado: correoEmpleado,
            puesto        : puesto,
            area        : area,
            empresaUID    : user.uid,
            nombreEmpresa : snapshot.val().nombreEmpresa,
            nombreEmpleado: empleado
        });
    });
    document.getElementById('empleado').value = "";
    document.getElementById('correoEmpleado').value = "";
    document.getElementById('puesto').value = "";
    document.getElementById('area').value = "";
}
