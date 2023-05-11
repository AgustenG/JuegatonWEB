// Variables
var edit = document.getElementById("regist-form");
var confirm = document.getElementById("confirm");
var color = document.getElementById("color");
var nickName = localStorage.getItem("jugador");
var deleteBtn = document.getElementById("delete-account");
var confirmDelete = document.getElementById("confirmDelete");

// Función para pedir el color y cambiarlo en el usuario
function reColor() {
    var fontColor = document.getElementById("color").value;
    var emot = document.getElementById("emo");
    if (fontColor) {
        emot.style.color = fontColor;
    }
}

// Evento que cambiará el color del usuario cuando este use el botón aplicar
color.addEventListener("input", function(event) {
    var colorStickman = document.getElementById("color").value;
    //Guardado de la configuración escogida por el usuario
    reColor();
});

// PUT
// Mostramos el area de confirmación
edit.addEventListener("submit", function(event) {
    event.preventDefault();
    confirm.style.display = "block";
    confirmDelete.style.display = "none";
})

// Confirmamos los cambios
confirm.addEventListener("submit", function(event) {
    event.preventDefault();
    const message = document.getElementById('confirm-message');
    const message2 = document.getElementById('succesful-confirm-message');
    fetch(`https://apipost.azurewebsites.net/Jugador/${nickName}`)
        .then((response) => response.json())
        .then((json) => {
            (this.posts = json)
            console.log(this.posts);
            if (document.getElementById("confirmNick").value == nickName && document.getElementById("confirmPasswd").value == this.posts.password) {
                myWindow = window.open("", "", "width=50, height=60");
                myWindow.document.write("<p>Volviendo a la página principal</p>");
                updateChanges(message2);
                setTimeout(function() {
                    myWindow.close();
                    window.location.href = "../../PaginaPrincipal/principal.html";
                }, 2000)
            } else {
                message.innerText = "Usuario o contraseña incorrecta";
            }
        }, )
        .catch((error) => message.innerText = 'El usuario o la contraseña no existen');
})

function updateChanges(message2) {
    // Creamos una instancia de la clase Jugador, con los nuevos datos introducidos por el usuario
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var nickname = document.getElementById("newNick").value;
    var passwd = document.getElementById("newPasswd").value;
    var country = document.getElementById("country").value;
    var color = document.getElementById("color").value;

    var player = new Jugador(name, surname, nickname, passwd, country, color)
    console.log(player);

    localStorage.setItem("jugador", nickname);
    localStorage.setItem("contraseña", passwd)
    fetch(`https://apipost.azurewebsites.net/Jugador/${nickName}`)
        .then((response) => response.json())
        .then((json) => {
            (this.posts = json)
            message2.innerText = 'Datos cambiados correctamente';
            let url = `https://apipost.azurewebsites.net/Jugador/${puntosFinales} ${nickName}`;
            let put = {
                method: 'PUT',
                body: JSON.stringify(player),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(put);
            // fetch(url, put)
            //     .then((response) => response.json())
            //     .then((data) => console.log(data))
            //     .catch((error) => console.error(error));
        }, )
        .catch((error) => console.log(error));
}

// DELETE
deleteBtn.addEventListener("click", function(event) {
    event.preventDefault();
    confirmDelete.style.display = "block";
    confirm.style.display = "none";
})

confirmDelete.addEventListener("submit", function(event) {
    event.preventDefault();
    const message = document.getElementById('delete-message');
    const message2 = document.getElementById('succesful-delete-message');
    fetch(`https://apipost.azurewebsites.net/Jugador/${nickName}`)
        .then((response) => response.json())
        .then((json) => {
            (this.posts = json)
            console.log(this.posts);
            if (document.getElementById("deletedNick").value == nickName && document.getElementById("deletedPasswd").value == this.posts.password) {
                myWindow = window.open("", "", "width=50, height=60");
                myWindow.document.write("<p>Volviendo a la página principal</p>");
                deleteUser(message2);
                setTimeout(function() {
                    myWindow.close();
                    window.location.href = "../../PaginaPrincipal/principal.html";
                }, 2000)
            } else {
                message.innerText = "Usuario o contraseña incorrecta";
            }
        }, )
        .catch((error) => message.innerText = 'El usuario o la contraseña no existen');
})

function deleteUser(message2) {

    message2.innerText = "Jugador eliminado satisfactoriamente";
    localStorage.clear();
    // fetch('https://apipost.azurewebsites.net/Jugador/${nickName}', {
    //     method: 'DELETE',
    //   })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Error al eliminar el recurso');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('Recurso eliminado exitosamente', data);
    //     message2.innerText = "Jugador eliminado satisfactoriamente";
    //     localStorage.clear();
    //   })
    //   .catch(error => {
    //     console.error('Error al eliminar el recurso', error);
    //   });
}