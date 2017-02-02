function Desactivar(id){
    var updates = {
        activo: false
      };
    firebase.database().ref('empresa/'+id).update(updates);
    location.reload();
}
function Activar(id){
    var updates = {
        activo: true
      };
    firebase.database().ref('empresa/'+id).update(updates);
    location.reload();
}
function elimina(id) {
    firebase.database().ref('empresa/' + id).remove();
    firebase.database().ref('users/' + id).remove();
    firebase.database().ref('deletedUsers/'+id).set({
        user         : id
    });
    location.reload();
    alert('Eliminado');
}

function table() {
    var baja, color;
    firebase.database().ref('empresa/').on('child_added', function (data) {
        var starCountRef = firebase.database().ref('empresa/' + data.key);
        starCountRef.on('value', function (snapshot) {
            if(snapshot.val().activo){
                baja = 'Desactivar';
                color = 'green';
            }else{
                baja = 'Activar';
                color = 'yellow';
            }
            drawTable(snapshot.val().nombre, data.key, baja, color);
        });
    });
}

function drawTable(empresa, key, baja, color) {
    var html =
        '<td>' + empresa + '</td>' +
        '<td><button class="ui fluid large '+ color +' submit button" onclick="'+baja+'(this.id)" id="' + key + '">'+ baja+'</button></td>'+
        '<td><button class="ui fluid large red submit button" onclick="elimina(this.id)" id="' + key + '">Elimina</button></td>';
    var table = document.getElementById('table');
    var newUser = document.createElement('tr')
    newUser.innerHTML = html;
    var postElement = table.appendChild(newUser);
}
