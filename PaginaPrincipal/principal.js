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
          window.location.href = "../games/patoRunner/patoRunner.html";
        }, 1000);
        break;
      case 4:
        setTimeout(function () {
          window.location.href = "../games/bulletHell/bulletHell.html";
        }, 1000);
        break;
  }
});

function newRandom() {
  let rnd = Math.floor(Math.random() * 4) + 1;
  return rnd;
}
