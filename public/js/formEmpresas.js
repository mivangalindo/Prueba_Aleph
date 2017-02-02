function guardarEmpresa() {
    var empresa = document.getElementById('empresa').value;
    var nombreceo = document.getElementById('nombreCEO').value;
    var correoceo = document.getElementById('correoCEO').value;
    if (empresa.length == 0) {
        alert('Ingresa una empresa para registrarte.');
        return;
    }
    if (correoceo.length == 0) {
        alert('Ingresa un correo para el CEO de ' + empresa + '.');
        return;
    }
    if (nombreceo.length == 0) {
        alert('Ingresa un nombre para el CEO de ' + empresa + '.');
        return;
    }
    var database = firebase.database();
    firebase.database().ref('empresasPendientes/' + empresa + '/').set({
        correoCEO: correoceo,
        nombreCEO: nombreceo
    });
    document.getElementById('empresa').value = "";
    document.getElementById('nombreCEO').value = "";
    document.getElementById('correoCEO').value = "";
}
