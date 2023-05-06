// Funcion para obtener las cookies
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

// Funcion que consume la URI del jugador e indica si la contraseña escrita por el usuario es correcta
function Login(nickName) 
{
  //Método GET por defecto
  fetch(`https://localhost:7104/Jugador/${nickName}`)
    .then((response) => response.json())
    .then((json) => {
        (this.posts = json)
        if(document.getElementById("passwd").value==this.posts.password){
            alert("Te has logeado correctamente");
            PaginaPrincipal();
        } else{
            alert("Contraseña incorrecta");
        }
    }, )
    .catch((error) => alert("Usuario no existe."));
}

// Procedimiento que te envia al juego
function PaginaPrincipal(){
    window.location.href = "./juego.html"; 
}

function Registrarse(){
    // Creamos una instancia de la clase Jugador, con los datos introducidos por el usuario
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var nickname = document.getElementById("newNick").value;
    var passwd = document.getElementById("newPasswd").value;
    var country = document.getElementById("country").value;
    var color = document.getElementById("color").value;
    
    var player = new Jugador(name,surname,nickname,passwd,country,color)
    console.log(player);
    //Método POST para enviar informacion
    let url="https://localhost:7104/Jugador";
    let post = {
        method: 'POST',
        body: JSON.stringify(player),
        headers:{
            'Content-Type':'application/json'
        }
    }
   fetch(url, post)
     .then((response) => response.json())
     .catch((error) => alert("Este nickname ya esta siendo usado"));
    
}




