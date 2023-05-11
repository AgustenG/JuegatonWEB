// Funcion para obtener las cookies
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

// Funcion que consume la URI del jugador e indica si la contraseña escrita por el usuario es correcta
function Login(nickName) 
{
const message = document.getElementById('login-message');
  //Método GET por defecto
  fetch(`https://apipost.azurewebsites.net/Jugador/${nickName}`)
    .then((response) => response.json())
    .then((json) => {
        (this.posts = json)
        if(document.getElementById("passwd").value==this.posts.password){
           localStorage.setItem("jugador",nickName);
            localStorage.setItem("contraseña",this.posts.password);
            PaginaPrincipal();
        } else{
            message.innerText = 'Contraseña incorrecta. Vuelve a intentarlo.';
        }
    }, )
    .catch((error) =>  message.innerText = 'El usuario o la contraseña no existen');
}

// Procedimiento que te envia al juego
function PaginaPrincipal(){
    window.location.href = "../PaginaPrincipal/principal.html"; 
}

function Registrarse(){
    const message = document.getElementById('register-message');
    const message2 = document.getElementById('succesful-register-message');
    // Creamos una instancia de la clase Jugador, con los datos introducidos por el usuario
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var nickname = document.getElementById("newNick").value;
    var passwd = document.getElementById("newPasswd").value;
    var country = document.getElementById("country").value;
    var color = document.getElementById("color").value;
    
    var player = new Jugador(name,surname,nickname,passwd,country,color)
    //Método POST para enviar informacion
    let url="https://apipost.azurewebsites.net/Jugador";
    let post = {
        method: 'POST',
        body: JSON.stringify(player),
        headers:{
            'Content-Type':'application/json'
        }
    }
    console.log(post);
   fetch(url, post)
     .then((response) => response.json())
     .then((json)=> {
        (this.posts = json)
        message2.innerText = 'Usuario registrado correctamente';
        localStorage.setItem("jugador",nickname);
        localStorage.setItem("contraseña",passwd);
        PaginaPrincipal();
     }, )
     .catch((error) =>  console.log(error));
    
}
function CheckLogin(){

    nickName = localStorage.getItem("jugador");
    if (localStorage.getItem("jugador")!=null || localStorage.getItem("jugador")!=undefined){
        fetch(`https://apipost.azurewebsites.net/Jugador/${nickName}`)
        .then((response) => response.json())
        .then((json) => {
          if(localStorage.getItem("contraseña")==json.password){
            
          } })
        .catch((error) =>  console.log(error));
    }


  
}



