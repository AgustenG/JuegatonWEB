// Variables
const secret = [];
var intentoMax = 5;
var intentoActual = 0;
var comprobar = document.getElementById("check");


palabraSecreta();

// Funcion que elige una palabra random del documento JSON y la guarda en caracteres separados
function palabraSecreta() {
    fetch("https://localhost:7104/Wordle")
        .then((response) => response.json())
        .then((json) => {
            const randomIndex = Math.floor(Math.random() * json.length);
            if (json[randomIndex].palabra_Id === randomIndex + 1) {
                const palabraElegida = json[randomIndex].palabra;
                secret.push(...palabraElegida.split(''));
            } else {
                console.log(`No se encontró ninguna palabra con el índice ${randomIndex + 1}`);
            }
        })
        .catch((error) => console.error(error));

}

/*  
    Cuando el usuario escriba su palabra y le de al boton se realizara una serie de comprovaciones:
    1. Si la palabra del usuario tiene exactamente cinco letras
    2. Si la palabra es igual a la palabra secreta
*/
comprobar.addEventListener("click", function() {
    var wordUser = document.querySelector("#word").value;
    var charSplit = String(wordUser).split("");
    var msg = document.querySelector("#info");

    IsCorrect(charSplit, secret, msg);

})

// Funcion que comprueba si la longitud de la palabra del usuario es igual a cinco o no
function CheckLength(charSplit, msg) {
    if (charSplit.length != 5) {
        msg.textContent = "Error: longitud incorrecta";
        return false;
    }
    return true;
}

// Funcion para comprovar si se cumplen todas las condiciones
function IsCorrect(charSplit, secret, msg) {
    if (CheckLength(charSplit, msg)) {
        var divFila = document.createElement("div");
        divFila.setAttribute("class", "rowResult w100 flex wrap");
        var seccionResult = document.querySelector("#result");
        calculWordle(charSplit, divFila, seccionResult);

        // Mensajes
        if (charSplit == String(secret)) {
            msg.textContent = "¡¡Has ganado!!";
            showAnswer(charSplit, secret);
        } else {
            if (intentoActual < intentoMax) {
                intentoActual++;
                msg.textContent = "Intento: " + (intentoActual) + "/" + intentoMax;
            } else {
                msg.textContent = "Has perdido. La respuesta correcta aparecera arriba: ";
                showAnswer(charSplit, secret);
            }
        }
    }
}

// Funcion que muestra la palabra secreta en la parte superior
function showAnswer(charSplit, secret) {
    let divAnswer = document.getElementsByClassName("cel flex");
    for (i = 0; i < charSplit.length; i++) {
        divAnswer[i].textContent = secret[i];
    }
}

// Funcion que comprueba si cada letra coincide con la letra de la palabra secreta o no.
function calculWordle(charSplit, divFila, seccionResult) {
    for (i = 0; i < charSplit.length; i++) {
        var position = 0;
        if (secret[i] == charSplit[i]) {
            AssingDivResult(divFila, seccionResult, "green", charSplit[i]);
        } else if (secret[i] != charSplit[i]) {
            for (j = 0; j < charSplit.length; j++) {
                if (secret[j] == charSplit[j]) { position++; }
            }
            if (position != 0) {
                AssingDivResult(divFila, seccionResult, "yellow", charSplit[i]);
            } else {
                AssingDivResult(divFila, seccionResult, "grey", charSplit[i]);
            }
        }
    }
}

// Mostramos en la parte de abajo todos las letras que ha ido introduciendo en la parte de abajo
// Si el cuadrado es de color verde: esa letra es correcta
// Si el cuadrado es de color amarillo: la palabra contiene esa letra pero no esta en la posicion correcta.
// Si el cuadrado es de color gris: la palabra no contiene esa letra
// Todo dependiendo de la funcion calculWordle()
function AssingDivResult(divFila, seccionResult, color, char) {
    let divColor = document.createElement("div");
    let divLetter = document.createElement("div");

    divColor.setAttribute("class", "w20");
    divLetter.setAttribute("class", "celResult flex");

    divColor.appendChild(divLetter);
    divFila.appendChild(divColor);
    seccionResult.appendChild(divFila);

    divLetter.style.backgroundColor = color;
    divLetter.textContent = char;
}