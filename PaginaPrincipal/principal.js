let gameButton = document.getElementById("btn1");
let gameButtons = document.querySelectorAll(".circle");
let count=0;
gameButtons.forEach((buton) => {
  rnd = newRandom();
  buton.addEventListener("click", function () {
    switch (rnd) {
      case 1:
        buton.classList.add('disabled');
        let object = {
          butonId:buton.getAttribute("id"),
          jugado:true
        }
        localStorage.setItem(`boton${count++}`,JSON.stringify(object))
        setTimeout(function(){
          window.location.href = "../games/wordle/wordle.html";
       },2000)
        break;
      case 2:
        window.location.href = "../games/ahorcado/ahorcado.html";
        if (localStorage.getItem("Jugado")) {
          gameButtons[0].disabled = true;
        }
        break;
    }
  });
});

function verificarBotonesDesactivados() {
  // Verificar cada botón si tiene la clase disabled


 let button = JSON.parse(localStorage.getItem('boton0')).butonId;
 let bool = JSON.parse(localStorage.getItem('boton0')).jugado;

 console.log(button);
 
 if(bool) {
  let desactivarBoton =  document.getElementById(button);
  desactivarBoton.disabled=true;
  desactivarBoton.classList.add('disabled');
 
 }
}

function newRandom() {
  let rnd = Math.floor(Math.random() * 2) + 1;
  console.log(rnd);
  return rnd;
}
