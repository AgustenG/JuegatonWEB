// Variables de login
const btnRegister = document.getElementById("register");
const btnLogin = document.getElementById("login");
const registerDiv = document.querySelector(".register");
const loginDiv = document.querySelector(".login");

// Ocultamos el formulario de login y mostramos el de registro
btnRegister.addEventListener("click", function (event) {
  registerDiv.style.display = "block";
  loginDiv.style.display = "none";
});

// Ocultamos el formulario de registro y mostramos el de ogin
btnLogin.addEventListener("click", function (event) {
  registerDiv.style.display = "none";
  loginDiv.style.display = "block";
});

// Cuando se le da al boton de submit en el login se enviara el nick a la funcion Login()
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
var color = document.getElementById("changeColor");

// Evento que cambiará el color del usuario cuando este use el botón aplicar
color.addEventListener("click", function (event) {
	var colorStickman = document.getElementById("color").value;
	//Guardado de la configuración escogida por el usuario
	reColor();
});