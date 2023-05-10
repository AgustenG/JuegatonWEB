// Variables
const secret = [];
var intentoMax = 5;
var intentoActual = 0;
var comprobar = document.getElementById("check");
const wordUser = document.querySelector("#word");
var backPage = document.getElementById("return");
let puntos = 100;


palabraSecreta();

// Funcion que recibe un json de la API y elige una palabra random de ese JSON y la guarda en caracteres separados en la array secret
function palabraSecreta() {
    fetch("https://apipost.azurewebsites.net/wordle")
        .then((response) => response.json())
        .then((json) => {
            const randomIndex = Math.floor(Math.random() * json.length);
            if (json[randomIndex].palabra_Id === randomIndex + 1) {
                const palabraElegida = json[randomIndex].palabra;
                secret.push(...palabraElegida.split(''));
                console.log(`Tu palabra es: ${secret}`);
            } else {
                console.log(`No se encontró ninguna palabra con el índice ${randomIndex + 1}`);
            }
        })
        .catch((error) => console.error(error));

}

// Le añadimos un evento al input del usuario por si al terminar de escribir pulsa ENTER en lugar del boton Comprobar
wordUser.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        comprobar.dispatchEvent(new Event("click"));
    }
})

// Boton para volver a la pagina principal y mandar la puntuacion
backPage.addEventListener("click", function(event) {
    event.preventDefault();

    localStorage.setItem('puntos', puntos);  
    let actualizarPuntos = localStorage.getItem("puntos");
    let nickName = localStorage.getItem("jugador");

    myWindow = window.open("","","width=50, height=60");
    myWindow.document.write("<p>Volviendo a la página principal</p>");
    updated(nickName, actualizarPuntos);
     setTimeout(function(){
        myWindow.close(); 
        window.location.href = "../../PaginaPrincipal/principal.html";
     },2000)
    localStorage.removeItem("puntos");


  
})


function updated(nickName,actualizarPuntos) {
    var puntosFinales;
    fetch(`https://apipost.azurewebsites.net/Jugador/${nickName}`)
    .then((response) => response.json())
    .then((json) => {
        (this.posts = json)
        puntosFinales = parseInt(this.posts.puntuacion) + parseInt(actualizarPuntos);
        let url  = `https://apipost.azurewebsites.net/Jugador/${puntosFinales} ${nickName}`;
        let put ={
            method:'PUT',
            // body: JSON.stringify(text),
            headers: {
                'Content-Type':'application/json'
            }
        }
        fetch(url, put)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }, )
    .catch((error) =>  console.log(error));
}   



/*  
    Cuando el usuario escriba su palabra y le de al boton se realizara una serie de comprovaciones:
    1. Si la palabra del usuario tiene exactamente cinco letras
    2. Si la palabra es igual a la palabra secreta
*/
comprobar.addEventListener("click", function() {
    var wordUser = document.querySelector("#word");
    var charSplit = String(wordUser.value.toLowerCase()).split("");
    var msg = document.querySelector("#info");

    IsCorrect(charSplit, secret, msg);
    wordUser.value = "";

})

// Funcion que comprueba si la longitud de la palabra del usuario es igual a cinco o no
function CheckLength(charSplit, msg) {
    if (charSplit.length != 5) {
        msg.textContent = "Error: la longitud de su palabra es inferior a 5";
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
                msg.textContent = "Intento: " + (intentoActual) + "/" + parseInt(intentoMax+1);
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
        divAnswer[i].textContent = secret[i].toUpperCase();
    }

    if (intentoActual == 0) puntos = 100;
    else if (intentoActual < intentoMax) {
        let i = 0;
        do {
            puntos -= 10;
            i++;
        } while (i != intentoActual);
    } else puntos = 0;



    backPage.style.display = "block";
    comprobar.style.display = "none";
    wordUser.disabled = true;
}

// Funcion que comprueba si cada letra coincide con la letra de la palabra secreta o no.
function calculWordle(charSplit, divFila, seccionResult) {
    let nonGuessedLetters = [...secret];
    let guessedWrongPos = [...secret];
    for (let i = 0; i < charSplit.length; i++) {
        if (charSplit[i] === secret[i]) {
            let index = nonGuessedLetters.indexOf(charSplit[i]);
            nonGuessedLetters.splice(index, 1);
        }
    }
    for (let i = 0; i < charSplit.length; i++) {
        let color = 'DarkGray';
        if (charSplit[i] === secret[i]) {
            color = 'DarkGreen';
        } else if (secret.includes(charSplit[i]) && nonGuessedLetters.includes(charSplit[i]) && guessedWrongPos.includes(charSplit[i])) {
            color = 'yellow';
            let index = guessedWrongPos.indexOf(charSplit[i]);
            guessedWrongPos.splice(index, 1);
        }
        AssingDivResult(divFila, seccionResult, color, charSplit[i]);
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
    divLetter.textContent = char.toUpperCase();
}