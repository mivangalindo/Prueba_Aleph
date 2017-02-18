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
            area          : area,
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
function guardarArea() {
    var coincidencia = false;
    var area = document.getElementById('Area').value;
    if (area.length == 0) {
        alert('Ingresa un área.');
        return;
    }
    //str.replace(/\s/g, '')
    //alert(str);
    area = area.toUpperCase();
    //area.replace(/^\s+|\s+$/gm,'');
    var user = firebase.auth().currentUser;
    firebase.database().ref('empresa/'+ user.uid+'/areas').on('child_added', function (data) {
        firebase.database().ref('empresa/'+ user.uid+'/areas/'+data.key).once('value').then(function(snapshot) {
            if(area == snapshot.val().area)
                coincidencia = true;
        });
    });
    setTimeout(function(){
        if(!coincidencia){
            firebase.database().ref('empresa/' + user.uid+'/areas').push().set({
                    area: area
            });
            alert("¡Área registrada!");
        }
        else
            alert("Área ya registrada, intenta otra vez.")
        document.getElementById('Area').value = "";
    }, 1000);
}
(function () {

    firebase.database().ref('empresa/').on('child_added', function (data) {
        var starCountRef = firebase.database().ref('empresa/' + data.key);
        starCountRef.on('value', function (snapshot) {
            firebase.database().ref('empresaOn/'+data.key).once('value').then(function(snapshoot) {
                if(snapshoot.val().activo){
                    var html = snapshot.val().nombre;
                    var dropDownId = document.getElementById('add-empresa');
                    var div = document.createElement('div');
                    div.className = "item"
                    div.innerHTML = html;
                    var postElement = dropDownId.appendChild(div);
                }
            });
        });
    });

})();
