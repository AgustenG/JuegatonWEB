

//string base con la palabra
//array de chars con la palabra dividida para hacer el display
//array de bools con la misma longitud
//al recibir la letra hace for para revisar si está
//si la encuentra pone el bool de la posicion a true para que se vea
//hace print del array de chars, con espacios vacios en las que no tienen el bool a true
//si el jugador pone una letra que ya tiene el bool en true, le avisa (no cuenta como fallo)





//get word from database
/*
SELECT *
FROM Ahorcado
ORDER BY random()
LIMIT 1;*/

var palabraCorrecta = "t";//get from database
var dividida = palabraCorrecta.split('');
var temp="____________________________"
var len = 5;
fetch(`https://apipost.azurewebsites.net/ahorcado`)
.then((response) => response.json())
.then((json) => {
    (palabraCorrecta = json[1].palabra, dividida = palabraCorrecta.split(''),len=palabraCorrecta.length);
}, )
.catch((error) => console.log("fallo de conexion."));


//set in-game variables
var score=0;
var intentos=7;

var letrasUsadas = "";
var setImg = document.getElementById("imagenSop");
var img = document.createElement("img");
img.setAttribute("id", "horca");
img.style.height = '450px';
img.style.width = '450px';
//img.style.objectPosition = '15% 15%';
//img.style.objectPosition = '15% 15%';
img.src = "./../../ahorcado img/ahorcado1.jpg";
setImg.appendChild(img);
var setMes = document.getElementById("messageSop");
var setWor = document.getElementById("wordSop");
var wor = document.createElement("p");
wor.setAttribute("id", "palabra");
wor.setAttribute("class", "ans")
for (let i = 0; i < 2; i++)
    wor.innerHTML += "|";
for (let i = 0; i < len;i++)
    wor.innerHTML += temp[i];
for (let i = 0; i < 2; i++)
    wor.innerHTML += "|";
setWor.appendChild(wor);
var mes = document.createElement("p");
mes.setAttribute("id", "message")
mes.setAttribute("class","messoge")
mes.innerHTML = "Bienvenido al ahorcado. Tienes 7 intentos";
setMes.appendChild(mes);

function CompruebaLetra() {
    
}

var letraBoton = document.getElementById("answerLetra");
letraBoton.addEventListener("click", function () {
    
    if(intentos>0){
        var letter = document.getElementById("letter").value;
        for (let i = 0; i < letrasUsadas.length; i++) {
            if (letrasUsadas[i] == letter) {
                document.getElementById("message").innerHTML = "ya has usado esta letra, te quedan " + intentos + " intentos";
                return;
            }
        }
        letrasUsadas += letter;
        let flag = false;
        for (let i = 0; i < dividida.length; i++) {
            
            if (letter == dividida[i]) {
                    document.getElementById("message").innerHTML = "has acertado, esta letra está en la palabra, te quedan " + intentos + " intentos";
                    flag = true;
                    score++;
            }

        }
        if (!flag) {

            intentos--;
            let res = 8 - intentos;
            document.getElementById("horca").src = "./../../ahorcado img/ahorcado" + res + ".jpg";
            document.getElementById("message").innerHTML = "has fallado, esta letra no está en la palabra, te quedan "+intentos+" intentos";
        }
        let display="";
        let flags = true;


        for (let i = 0; i < 2; i++)
            display+= "|";
        for (let i = 0; i < dividida.length; i++) {
            let flagm = false;
            for (let j = 0; j < letrasUsadas.length; j++) {
                if (letrasUsadas[j] == dividida[i]) {
                    flagm = true;
                }
            }
            if (flagm) {
                display += dividida[i];
            }
            else {display += "_"; flags=false}
        }
        for (let i = 0; i < 2; i++)
            display += "|";

        //alert(dividida);
        document.getElementById("palabra").innerHTML = display;
        if(flags){
            document.getElementById("message").innerHTML = "has acertado, has completado la palabra";
            intentos=0;
            //you won send data
        }
        else if(intentos==0){
            document.getElementById("message").innerHTML = "has fallado, te has quedado sin intentos";
            intentos = 0;
            document.getElementById("palabra").innerHTML = "||"+palabraCorrecta+"||";
            //you lost send data
        }
    }
});

var palabraBoton = document.getElementById("answerPalabra");
palabraBoton.addEventListener("click", function () {
    if(intentos>0){
        var word = document.getElementById("word").value;
        if (word == palabraCorrecta) {
            document.getElementById("palabra").innerHTML = "||" + palabraCorrecta + "||";
            document.getElementById("message").innerHTML = "has acertado, la palabra es correcta";
            for(let i=0;i<abiertas.length;i++) score+=5;
            intentos = 0;
            //you won send data
        }
        else {
            document.getElementById("palabra").innerHTML = "||" + palabraCorrecta + "||";
            document.getElementById("message").innerHTML = "has fallado, la palabra es incorrecta";
            document.getElementById("horca").src = "./../../ahorcado img/ahorcado8.jpg";
            intentos = 0;
            //you lost send data
        }
    }   
});