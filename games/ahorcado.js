

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

var palabraCorrecta = "test";//get from database

fetch(`https://localhost:7104/Ahorcado`)
.then((response) => response.json())
.then((json) => {
    (palabraCorrecta = json);
    alert(palabraCorrecta);
}, )
.catch((error) => alert("fallo de conexion."));


//set in-game variables
var score=0;
var intentos=8;
var dividida = palabraCorrecta.split('');
var abiertas=[];
for (let i = 0; i < dividida.length; i++) abiertas.push(false);
var letrasUsadas="";


function CompruebaLetra() {
    
}

var letraBoton = document.getElementById("answerLetra");
letraBoton.addEventListener("click", function () {
    if(intentos>0){
        var letter = document.getElementById("letter").value;
        alert(letter);
        for (let i = 0; i < letrasUsadas.length; i++) {
            if (letrasUsadas[i]==letter) {
                alert("ya has usado esta letra");
                return;
            }
        }
        letrasUsadas += letter;
        let flag = false;
        for (let i = 0; i < dividida.length; i++) {
            
            if (letter == dividida[i]) {
                if (abiertas[i] == false) {
                    abiertas[i] = true;
                    flag = true;
                    score++;
                }
            }
        }
        if (!flag) {
            alert("has fallado, esta letra no está en la palabra");
            intentos--;
        }
        let display="";
        let flags = true;
        for (let i = 0; i < dividida.length; i++) {
            if (abiertas[i]) {
                display += dividida[i];
            }
            else {display += "_"; flags=false}
        }
        //alert(dividida);
        alert(display);
        if(flags){
            alert("has acertado, has completado la palabra");
            intentos=0;
            //you won send data
        }
        else if(intentos==0){
            alert("has fallado, te has quedado sin intentos");
            intentos=0;
            //you lost send data
        }
    }
});

var palabraBoton = document.getElementById("answerPalabra");
palabraBoton.addEventListener("click", function () {
    if(intentos>0){
        var word = document.getElementById("word").value;
        if(word==palabraCorrecta){
            alert("has acertado, la palabra es correcta");
            for(let i=0;i<abiertas.length;i++) score+=5;
            intentos=0;
            //you won send data
        }
        else{
            alert("has fallado, la palabra es incorrecta");
            intentos=0;
            //you lost send data
        }
    }   
});