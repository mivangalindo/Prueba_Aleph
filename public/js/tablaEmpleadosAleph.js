function elimina(id) {
    firebase.database().ref('deletedUsers/'+id).set({
                user         : id
    });
    firebase.database().ref('users/' + id).remove();
    firebase.database().ref('aleph/'+id).remove();
    alert('Eliminado');
    location.reload();
}
function table() {
    var baja, color;
    firebase.auth().onAuthStateChanged(function(user) {
        var user = firebase.auth().currentUser;

            firebase.database().ref('aleph/').on('child_added', function (data) {
                var starCountRef = firebase.database().ref('aleph/' + data.key);
                starCountRef.on('value', function (info) {
                    if(data.key != "ceo"){
                        drawTable(info.val().nombre, data.key);
                    }
                });
            });

    });
}
function drawTable(empleado, key) {
    var html =
        '<td>' + empleado + '</td>' +
        '<td><button class="ui fluid large red submit button" onclick="elimina(this.id)" id="' + key + '">Elimina</button></td>';
    var table = document.getElementById('table');
    var newUser = document.createElement('tr');
    newUser.innerHTML = html;
    var postElement = table.appendChild(newUser);
}
