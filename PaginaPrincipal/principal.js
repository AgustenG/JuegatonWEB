let gameButtons = document.querySelectorAll(".circle");
var count=1;
gameButtons.forEach((buton) => {
  rnd = newRandom();
  let object = {
    butonId:buton.getAttribute("id"),
    jugado:false
  }
  localStorage.setItem(`boton${count++}`,JSON.stringify(object))
  buton.addEventListener("click", function () {
    switch (rnd) {
      case 1:
        setTimeout(function(){
          var item = JSON.parse(localStorage.getItem(buton.getAttribute("id")))
          console.log(item);
          item.jugado=true;
          localStorage.setItem(`${item.butonId}`,JSON.stringify(item));
          window.location.href = "../games/wordle/wordle.html";
          
       },2000)
        break;
      case 2:
        setTimeout(function(){
          var item = JSON.parse(localStorage.getItem(buton.getAttribute("id")))
          console.log(item);
          item.jugado=true;
          localStorage.setItem(`${buton.getAttribute("id")}`,JSON.stringify(item));
          window.location.href = "../games/ahorcado/ahorcado.html";
       },2000)
        break;
    }
  });
});

function verificarBotonesDesactivados() {
  // Verificar cada botón si tiene la clase disabled
  for (let i = 0; i < 10; i++) {
    let button = JSON.parse(localStorage.getItem(`boton${i}`)).butonId;
    let bool = JSON.parse(localStorage.getItem(`boton${i}`)).jugado;
    if(bool) {
      let desactivarBoton =  document.getElementById(button);
      desactivarBoton.disabled=true;
      desactivarBoton.classList.add('disabled');
     
     }

  }
}

function newRandom() {
  let rnd = Math.floor(Math.random() * 2) + 1;
  console.log(rnd);
  return rnd;
}
