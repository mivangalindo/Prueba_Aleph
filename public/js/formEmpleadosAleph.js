function guardarEmpleado() {
    var empleado = document.getElementById('empleado').value;
    var correoEmpleado = document.getElementById('correoEmpleado').value;
    var user = firebase.auth().currentUser;
    if (empleado.length == 0) {
        alert('Ingresa una empresa para registrarte.');
        return;
    }
    if (correoEmpleado.length == 0) {
        alert('Ingresa un correo para' + empleado + '.');
        return;
    }
    var database = firebase.database();
    firebase.database().ref('empleadosPendientes/').push().set({
        correoEmpleado: correoEmpleado,
        puesto        : "1",//puesto,
        area          : "CEO",//area,
        empresaUID    : "uidCambiable",//user.uid,
        nombreEmpresa : "Aleph",//snapshot.val().nombreEmpresa,
        nombreEmpleado: empleado
    });
    document.getElementById('empleado').value = "";
    document.getElementById('correoEmpleado').value = "";
}
/*function selectEmpresa() {
    firebase.database().ref('empresa/').on('child_added', function (data) {
        var starCountRef = firebase.database().ref('empresa/' + data.key);
        starCountRef.on('value', function (snapshot) {
            //alert(snapshot.val().nombre);
            drawSelect(snapshot.val().nombre, data.key);
        });
    });
}
function drawSelect(empresa, key) {
    /*var html =empresa;
    var table = document.getElementById('selectEmpresas');
    var newUser = document.createElement('option');*
    document.getElementById('selectEmpresas').innerHTML = "f";
    //var postElement = table.appendChild(newUser);
}*/
