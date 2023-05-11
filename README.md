# JuegatonWEB

Este repositorio pertenece al Grupo 6 de DAMv1A del ITB, Curso 2022-2023, formado por [Agustin Garibotto](agustin.garibotto.7e6@itb.cat), [Olav Martos](olav.martos.7e4@itb.cat), [Yanick Garcia](
yanick.garcia.7e6@itb.cat) y [Joan Aguayo](joan.aguayo.7e6@itb.cat).

Este repositorio pertenece al proyecto de fin de curso en el que tuvimos dos semanas para hacer el proyecto.

Para este proyecto teniamos que hacer tres cosas: una Base de datos, una API y una pagina web que se conecte a dicha API.

Este repositorio se trata del repositorio de la pagina web donde los usuarios se pueden registrar/iniciar sesion, jugar, modificar sus datos, ver el leaderboard y cerrar sesion.

Esta web se trata de una colección de minijuegos donde los usuarios pueden registrarse e iniciar sesión, para poder jugar a los distintos juegos que tenemos.

![Login](/Resources/documentacion/login.png)

![Register](/Resources/documentacion/register.png)

## Otras secciones de la Web

Toda la pagina no se centra solo en juegos, tenemos distintas paginas que no tienen que ver con jugar.

Tenemos la pagina principal donde en una parte podemos una pequeña tabla con tres jugadores aleatorios donde se muestran tres partes del jugador: su nickname, su puntuacion y su pais.

![Mini tabla de jugadores](/Resources/documentacion/minitabla.png)

Luego tenemos otra pagina que se trata de un Leaderboard donde podemos ver el nickname del jugador, su pais, el personaje que tiene, su puntuacion y la posicion que tiene

![Leaderboard Img](/Resources/documentacion/leaderboard.png)

Y para finalizar tenemos una pagina donde el usuario puede hacer tres cosas:

1. Cerrar sesion
2. Modificar sus datos
3. Borrar su cuenta

![EditUser](/Resources/documentacion/edituser.png)

## Juegos de la Juegaton

Para nuestro proyecto hemos obtado por distintos juegos que otorgan una determinada puntuacion y la suman a la del usuario que esta jugando

Tenemos cinco juegos: Wordle, Ahorcado, Pato Runner, Space Invader y un Bullet Hell.

### <u>**Wordle**</u>

Fue el primer juego que creamos y uno de los más faciles de entender.

El jugador inicia con 100 puntos. Por cada intento que falle se le reduciran 10.

Si el jugador pierde todos sus intentos no obtendra ningun punto pero si el jugador acierta en el ultimo se lleva los 50. Y si el jugador gana a la primera se lleva los 100 puntos.

El Wordle se juega de la siguiente forma: se elige una palabra de forma aleatoria de cinco letras. Por cada letra que el jugador acierte se podra en verde.

Si la letra escrita por el jugador esta en la palabra pero esta en otra posicion se pintara de amarillo

Si la letra esta en gris, la palabra no contiene esa letra:

![Wordle Exemple](/Resources/documentacion/wordle.png)

### <u>**Ahorcado**</u>

El siguiente juego que creamos se trata del ahorcado.

Al igual que el Wordle, se elije una palabra de forma aleatoria y tienes siete intentos para adivinar la palabra, por cada letra que no aciertes ira apareciendo un stickman poco a poco y si pierdes tus intentos el stickman sera ahorcado.

![Ahorcado Exemple](/Resources/documentacion/ahorcado.png)

### <u>**Pato Runner**</u>

Hicimos otro juego que se trata de un infinite runner algo extraño. Esta basado en el Chrome Dino solo que con partes modificadas.

Y una de las modificaciones es la gestion de puntuaciones. Aqui una tabla con las relaciones

| Chrome Dino | Pato Runner |
| --- | --- |
| 100 puntos | 10 puntos |
| 200 puntos | 20 puntos |
| 300 puntos | 30 puntos |
| 400 puntos | 40 puntos |
| 500 puntos | 50 puntos |
| 600 puntos | 60 puntos |
| 700 puntos | 70 puntos |
| 800 puntos | 80 puntos |
| 900 puntos | 90 puntos |
| 1000 puntos | 100 puntos |
| 1100 puntos | 0 puntos |

Tal como podemos ver cuando el jugador ha obtenido 100 puntos de nuestro pato runner obtiene el maximo numero de puntos que el juego puede darle.

![Pato Runner](/Resources/documentacion/patorunner.png)

### <u>**Juegaton Invaders**</u>

Es el Space Invaders pero para nuestra plataforma, este juego es el que más puntuacion puedes obtener si logras acabar con todos los invasores

![Juegaton Invaders](/Resources/documentacion/invaders.png)

### <u>**Bullet Hell**</u>

Y por ultimo tenemos un Bullet Hell

![Bullet Hell](/Resources/documentacion/bullethell.png)
