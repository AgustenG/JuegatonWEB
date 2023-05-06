const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

//Cuando se le de al botón para registrarse, el wrapper recibirá el atributo active y cambiarán de sitio
registerLink.addEventListener("click", ()=>{
wrapper.classList.add('active');

});
//Cuando se le de al botón de iniciar sesión se eliminará el atributo active del wrapper.
loginLink.addEventListener("click", ()=>{
  wrapper.classList.remove('active');
  
  });


const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    Login(document.getElementById("nick").value);
});

const registForm = document.getElementById("regist-form");
registForm.addEventListener("submit", function (event) {
    event.preventDefault();
    Registrarse();
});

// Función para pedir el color y cambiarlo en el usuario
function reColor() {
	var fontColor = document.getElementById("color").value;
	var emot = document.getElementById("emo");
	if (fontColor) {
		emot.style.color = fontColor;
	}
}
// Creación de una variable para cambiar el color del usuario
var color = document.getElementById("color");

// Evento que cambiará el color del usuario cuando este use el botón aplicar
color.addEventListener("input", function (event) {
	var colorStickman = document.getElementById("color").value;
	//Guardado de la configuración escogida por el usuario
	reColor();
});

