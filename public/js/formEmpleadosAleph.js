    /*var app = angular.module('selectEmpleadosAleph', []);
    app.controller('myCtrl', function($scope) {
        firebase.database().ref('empresa/').on('child_added', function (data) {
          firebase.database().ref('empresa/' + data.key).once('value').then(function(snapshot) {

          });
        });
        $scope.cars = [
            {model : "Fiat 500", color : "white"},
            {model : "Volvo XC90", color : "black"}
        ];
    });*/
function guardarEmpleado() {
    var empleado = document.getElementById('empleado').value;
    var correoEmpleado = document.getElementById('correoEmpleado').value;
    var empresa = document.getElementById('selectEmpresa'.valuel);
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
