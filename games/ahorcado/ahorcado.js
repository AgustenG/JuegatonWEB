var palabraCorrecta = "";
var setWor = document.getElementById("wordDiv");
var score = 100;

fetch(`https://apipost.azurewebsites.net/ahorcado`)
  .then((response) => response.json())
  .then((json) => {
    (palabraCorrecta = json[Math.floor(Math.random() * json.length)].palabra)
    console.log(palabraCorrecta);
   //preparamos el escenario con la imagen y los mensajes base
    var setMes = document.getElementById("messageSop");
    var mes = document.createElement("p");
    mes.setAttribute("id", "message");
    mes.setAttribute("class", "messoge");
    setMes.appendChild(mes);
    mes.textContent = "Bienvenido al ahorcado";
  
    var imgDiv = document.getElementById("divImg");
    var img = document.createElement("img");
    img.setAttribute("id", "horca");
    img.src = "./../../Resources/ahorcado/ahorcado1.png";
    imgDiv.appendChild(img);
 
   //Mostramos los huecos que tendrá la palabra
    createDivsForWord();
    checkLetters();
  })
  .catch((error) => console.log(error));

function createDivsForWord() {
  for (var i = 0; i < palabraCorrecta.length; i++) {
    let divLetter = document.createElement("div");
    divLetter.classList.add("letra");
    divLetter.classList.add(i);
    setWor.appendChild(divLetter);
  }
}

function checkLetters() {
  var letras = document.querySelectorAll(".letra");
  var letraBoton = document.getElementById("answerLetra");
  var intentos = 7;
  var letrasUsadas = "";

  // EVENTO CUANDO EL USUARIO INTRODUCE 1 LETRA
  letraBoton.addEventListener("click", function () {
    if (intentos > 0) {
      var letra = document.getElementById("letter").value.toLowerCase();

      //detecta si ya se ha introducido la letra
      for (let i = 0; i < letrasUsadas.length; i++) {
        if (letrasUsadas[i] == letra) {
          document.getElementById("message").textContent = "Ya la has usado, " + intentos + " intentos";
          return;
        }
      }
      //en caso de no haberla introducido antes la añade a la lista de usadas
      letrasUsadas += letra;

      let flag = false;
      for (let i = 0; i < palabraCorrecta.length; i++) {
        //mira si la letra está en la palabra y da puntación si la encuentra
        if (letra == palabraCorrecta[i]) {
          document.getElementById("message").textContent = intentos + " intentos";
          flag = true;
          break;
        }
      }
      for (let i = 0; i < palabraCorrecta.length; i++) {
        if (letra == palabraCorrecta[i]) letras[i].textContent = letra.toUpperCase(); // Printa las letras correctas
      }
      //si no encuentra la letra avisa y quita una vida
      if (!flag) {
        intentos--;
        let res = 8 - intentos;
        document.getElementById("horca").src ="./../../Resources/ahorcado/ahorcado" + res + ".png";
        document.getElementById("message").textContent = intentos + " intentos";
        score -= 10;
        if (intentos == 0) score = 0;
      }
      var userAnswer = "";
      letras.forEach((div) => {
        userAnswer += div.textContent;
      });
      //si no quedan letras por descubrir termina la partida
      if (userAnswer == palabraCorrecta.toUpperCase()) {
        document.getElementById("message").textContent ="Ganaste!";
        intentos = 0;
        //you won send data
        returnPrincipal();
      }
      //si no quedan intentos también termina la partida
      else if (intentos == 0) {
        document.getElementById("message").textContent = "Moriste";
        intentos = 0;
        returnPrincipal();
      }
    }
    console.log(score);
  });


  // EVENTO CUANDO EL USUARIO INTRODUCE UNA PALABRA
  var palabraBoton = document.getElementById("answerPalabra");
  palabraBoton.addEventListener("click", function () {
    if (intentos > 0) {
      var word = document.getElementById("word").value.toLowerCase();
      //si el jugador acierta automaticamente gana y recibe puntos de bonus por cada letra sin descubrir
      if (word == palabraCorrecta) {
        document.getElementById("message").textContent = "HAS GANADO!";
          updateScore();
          returnPrincipal();
      }
      //si falla pierde la partida
      else {
        document.getElementById("message").innerHTML =
          "Esa no es la palabra!";
        document.getElementById("horca").src = "./../../Resources/ahorcado/ahorcado8.png";
        intentos = 0;
        //you lost send data
        updateScore();
        returnPrincipal();
      }
    }
  });
}
function returnPrincipal() {
    var letras = document.querySelectorAll(".letra");
    document.querySelector("#letterAnswer").style.display="none";
   document.querySelector("#wordAnswer").style.display="none";
    document.getElementById("return").style.display = "block";
    let i = 0;
    letras.forEach((div) => {
     div.textContent = palabraCorrecta[i++].toUpperCase();
  });
}
function updated(nickName, actualizarPuntos) {
  var puntosFinales;
  fetch(`https://apipost.azurewebsites.net/Jugador/${nickName}`)
    .then((response) => response.json())
    .then((json) => {
      this.posts = json;
      puntosFinales =
        parseInt(this.posts.puntuacion) + parseInt(actualizarPuntos);
      let url = `https://apipost.azurewebsites.net/Jugador/${puntosFinales} ${nickName}`;
      let put = {
        method: "PUT",
        // body: JSON.stringify(text),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(url, put)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    })
    .catch((error) => console.log(error));
}
document.getElementById("return").addEventListener("click", function (event) {
    event.preventDefault();
    setTimeout(function () {
      window.location.href = "../../PaginaPrincipal/principal.html";
    }, 2000);
    localStorage.removeItem("puntos");
  });

function updateScore(){
  localStorage.setItem("puntos", score);
  let actualizarPuntos = localStorage.getItem("puntos");
  let nickName = localStorage.getItem("jugador");
  updated(nickName, actualizarPuntos);
}
