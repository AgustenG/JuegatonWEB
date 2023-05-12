let buton = document.getElementById("boton");

rnd = newRandom();

// localStorage.setItem(`boton${count++}`, JSON.stringify(object));
buton.addEventListener("click", function () {
  switch (rnd) {
    case 1:
      setTimeout(function () {
        window.location.href = "../games/wordle/wordle.html";
      }, 1000);
      break;
    case 2:
      setTimeout(function () {
        window.location.href = "../games/ahorcado/ahorcado.html";
      }, 1000);
      break;
    case 3:
      setTimeout(function () {
        window.location.href = "../games/patoRunner/patorunner.html";
      }, 1000);
      break;
    case 4:
      setTimeout(function () {
        window.location.href = "../games/bulletHell/bulletHell.html";
      }, 1000);
      break;
      case 5:
        setTimeout(function () {
          window.location.href = "../games/invaders/invaders.html";
        }, 1000);
        break;
  }
});

var allPlayers = [];
const playersNeeded = 3;

fetch(`https://apipost.azurewebsites.net/Jugador`)
  .then((response) => response.json())
  .then((json) => {
    this.Jugadores = json;
    if (!(Jugadores.length < playersNeeded)) {
      var numerosAleatorios = [];
      for (let i = 0; i < 3; i++) {
        var numeroAleatorio = Math.floor(Math.random() * Jugadores.length);
        if (!numerosAleatorios.includes(numeroAleatorio)) {
          numerosAleatorios.push(numeroAleatorio);
        } else {
          i--;
        }
      }
      var arrayJugadores = [];
      numerosAleatorios.forEach((num) => {
        arrayJugadores.push(Jugadores[num]);
      });
      CreateJugadors(arrayJugadores);
    }
  });

var nickName = localStorage.getItem("jugador");

fetch(`https://apipost.azurewebsites.net/Jugador/${nickName}`)
  .then((response) => response.json())
  .then((json) => {
    this.jugador = json;
    document.querySelector(".fa-person-running").style.color = jugador.color;
  })
  .catch((error) => console.log(error));

function CreateJugadors(arrayJugadores) {
  let players = document.querySelectorAll(".playerTr");
  var count = 0;
  arrayJugadores.forEach((jugador) => {
    var name = document.createElement("td");
    var pais = document.createElement("td");
    var puntuacion = document.createElement("td");
    name.textContent = jugador.nickname;
    players[count].appendChild(name);
    var img = document.createElement("img");
    img.src = `../Leaderboard/4x3/${jugador.pais}.svg`;
    if (jugador.pais == "") img.src = "../Leaderboard/4x3/default.png";
    pais.appendChild(img);
    players[count].appendChild(pais);
    puntuacion.textContent = jugador.puntuacion;
    players[count].appendChild(puntuacion);
    count++;
  });
}

function newRandom() {
  let rnd = Math.floor(Math.random() * 5) + 1;
  return rnd;
}

function checkUser() {
  var nickName = window.localStorage.getItem("jugador");
  if (nickName == null || nickName == undefined || nickName == "") {
    window.location.href = "../index.html";
  }
}
