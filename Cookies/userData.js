window.addEventListener("beforeunload", function () {
	window.opener.postMessage("ventana_cerrada", "*");
});

//Creación y duración de las cookies
function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

//Guardado de la configuración escogida por el usuario
function saveConfig() {
	var name = document.getElementById("name").value;
	var surname = document.getElementById("surname").value;
    var nick = document.getElementById("nick").value;
    var pwd = document.getElementById("passwd").value;
    var colorStickman = document.getElementById("color").value;

	setCookie("name", name, 1);
	setCookie("surname", surname, 1);
    setCookie("nick", nick, 1);
    setCookie("pwd", pwd, 1);
    setCookie("colorStickman", colorStickman, 1);
	setCookie("visited", true, 1);
	window.close();
}

// Event listener para el submit del formulario de configuración
var dataForm = document.getElementById("data-form");
dataForm.addEventListener("submit", function (event) {
    event.preventDefault();
	saveConfig();
	reColor();
});

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

//función para pedir el color y cambiarlo en el usuario
function reColor() {
	var fontColor = document.getElementById("color").value;
	var emot = document.getElementById("emo");
	if (fontColor) {
		emot.style.color = fontColor;
	}
}

//Creación de una variable para cambiar el color del usuario
var color = document.getElementById("changeColor");

//Evento que cambiará el color del usuario cuando este use el botón aplicar
color.addEventListener("click", function (event) {
	var colorStickman = document.getElementById("color").value;
	//Guardado de la configuración escogida por el usuario
	reColor();
});