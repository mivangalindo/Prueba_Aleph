
function guardarEmpleado() {
    var empleado = document.getElementById('empleado').value;
    var correoEmpleado = document.getElementById('correoEmpleado').value;
    var empresa = document.getElementById('nombreEmpresa').value;
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
        nombreEmpresa : empresa,//snapshot.val().nombreEmpresa,
        nombreEmpleado: empleado
    });
    document.getElementById('empleado').value = "";
    document.getElementById('correoEmpleado').value = "";
    document.getElementById('nombreEmpresa').value = "";
    alert(empresa);
}


(function () {

    firebase.database().ref('empresa/').on('child_added', function (data) {
        var starCountRef = firebase.database().ref('empresa/' + data.key);
        starCountRef.on('value', function (snapshot) {

            var html = snapshot.val().nombre;
    var dropDownId = document.getElementById('add-empresa');
    var div = document.createElement('div');
    div.className = "item"
    div.innerHTML = html;
    var postElement = dropDownId.appendChild(div);

        });
    });

})();


