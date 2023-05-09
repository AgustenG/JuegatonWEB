var allPlayers = [];
fetch(`https://apipost.azurewebsites.net/Jugador`)
    .then((response) => response.json())
    .then((json) => { (this.Jugadores = json) 
        Jugadores.forEach(jugador => {
            if(jugador.puntuacion > 0) allPlayers.push(jugador);
        });
        llenarTabla();
        sortTable(); // Ordenamos por defecto la tabla por puntuación
    }, )

function llenarTabla(){
    var table = document.getElementById("leaderboard"); 
    allPlayers.forEach(player => {
        var fila = document.createElement("tr");
        table.appendChild(fila);
        for (const key in player) {
            if (key =="pais"){
                var tolower = player[key].toLowerCase();
                var row = document.createElement("td");
                var img = document.createElement("img");
                img.src = `4x3/${tolower}.svg`;
                fila.appendChild(row);
                row.appendChild(img);
            }
            if(key=="posicion"){
                var row = document.createElement("td");
                fila.appendChild(row);
            }
            if(key=="nickname" || key=="puntuacion"){
                var component = document.createElement("td");
                component.textContent = player[key];
                fila.appendChild(component);
            }
            if(key=="color"){
                var row = document.createElement("td");
                var avatar = document.createElement("i");
                avatar.classList.add("fa-solid","fa-person-running");
                avatar.style.color = player[key];
                fila.appendChild(row);
                row.appendChild(avatar);
            }

        }
       
    });
}

function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch,count=0;

    table = document.getElementById("myTable");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[3];
        y = rows[i + 1].getElementsByTagName("TD")[3];
        //check if the two rows should switch place:
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    for (i = 1; i < (rows.length); i++) { 
        
        x = rows[i].getElementsByTagName("TD")[4];
        x.textContent = i;
    }


  }