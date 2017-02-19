alert("Pamela");
function activa(id) {
    firebase.database().ref('empresa/'+id).set({
                first         : false
    });
    firebase.database().ref('empresaOn/' + user.uid).set({
        activo          :  true
    });
    alert('Activado');
    location.reload();
}

function table2() {
    alert("table");
    /*firebase.auth().onAuthStateChanged(function(user) {
        var user = firebase.auth().currentUser;
            firebase.database().ref('empresa/').on('child_added', function (data) {
                var starCountRef = firebase.database().ref('empresa/' + data.key);
                starCountRef.on('value', function (info) {
                    if(info.val().first){
                        alert(info.val().nombre+data.key);
                    }
                });
            });

    });*/
}

function drawTable(empresa, key) {
    var html =
        '<td>' + Empresa + '</td>' +
        '<td>' + Activar + '</td>' +
        '<td><button class="ui fluid large red submit button" onclick="activa(this.id)" id="' + key + '">Elimina</button></td>';
    var table = document.getElementById('table');
    var newUser = document.createElement('tr');
    newUser.innerHTML = html;
    var postElement = table.appendChild(newUser);
}
