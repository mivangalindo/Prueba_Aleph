function Desactivar(id){
    var updates = {
        activo: false
      };
    firebase.database().ref('empresaOn/'+id).update(updates);
    location.reload();
}
function Activar(id){
    var updates = {
        activo: true
      };
    firebase.database().ref('empresaOn/'+id).update(updates);
    location.reload();
}
var empresa;
function elimina(id) {
    firebase.database().ref('users/' + id).once('value').then(function(snapshot) {
        empresa = snapshot.val().nombreEmpresa;
        firebase.database().ref('empresasUsers/'+empresa).on('child_added', function (data) {
            firebase.database().ref('deletedUsers/'+data.key).set({
                user         : data.key
            });
        });
    });
    setTimeout(function(){
        firebase.database().ref('empresa/' + id).remove();
        firebase.database().ref('empresasUsers/'+empresa).on('child_added', function (data) {
            firebase.database().ref('users/' + data.key).remove();
        });
        setTimeout(function(){
            firebase.database().ref('empresasUsers/' + empresa).remove();
            alert('Eliminado');
            location.reload();
        }, 1000);
    }, 1000);
}

function table() {
    var baja, color;
    firebase.database().ref('empresa/').on('child_added', function (data) {
        var starCountRef = firebase.database().ref('empresa/' + data.key);
        starCountRef.on('value', function (snapshot) {
            firebase.database().ref('empresaOn/'+data.key).once('value').then(function(snapshoot) {
                if(snapshoot.val().activo){
                    baja = 'Desactivar';
                    color = 'green';
                }else{
                    baja = 'Activar';
                    color = 'yellow';
                }
                drawTable(snapshot.val().nombre, data.key, baja, color);
            });
        });
    });
}

function drawTable(empresa, key, baja, color) {
    var html =
        '<td>' + empresa + '</td>' +
        '<td><button class="ui fluid large '+ color +' submit button" onclick="'+baja+'(this.id)" id="' + key + '">'+ baja+'</button></td>'+
        '<td><button class="ui fluid large red submit button" onclick="elimina(this.id)" id="' + key + '">Elimina</button></td>';
    var table = document.getElementById('table');
    var newUser = document.createElement('tr');
    newUser.innerHTML = html;
    var postElement = table.appendChild(newUser);
}
