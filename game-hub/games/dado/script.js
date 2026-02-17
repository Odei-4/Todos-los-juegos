let jugadores = [];
let rondaActual = 1;
let totalRondas = 5;

function crearJugadores() {
    const num = parseInt(document.getElementById("numJugadores").value);
    totalRondas = parseInt(document.getElementById("numRondas").value);

    jugadores = [];
    const container = document.getElementById("jugadoresContainer");
    container.innerHTML = "";

    for (let i = 1; i <= num; i++) {
        container.innerHTML += `
            <div class="jugador">
                <input type="text" id="nombre${i}" placeholder="${i}. Jokalariaren izena">
                <input type="number" id="numero${i}" min="1" max="6" placeholder="Zenbakia (1-etik 6-ra)">
            </div>
        `;
        jugadores.push({ nombre: "", puntos: 0 });
    }

    rondaActual = 1;
    actualizarInfo();
}

function tirarDado() {
    if (rondaActual > totalRondas) {
        alert("Torneoa bukatu da..");
        return;
    }

    const dado = document.getElementById("dado");
    dado.classList.add("animar");

    setTimeout(() => {
        dado.classList.remove("animar");
        const resultado = Math.floor(Math.random() * 6) + 1;
        dado.textContent = resultado;

        jugarRonda(resultado);
    }, 500);
}

function jugarRonda(resultadoDado) {
    const numerosElegidos = [];
    let menorDif = 10;
    let ganadores = [];

    jugadores.forEach((jugador, index) => {
        const nombre = document.getElementById(`nombre${index+1}`).value;
        const numero = parseInt(document.getElementById(`numero${index+1}`).value);

        if (!nombre || !numero) {
            alert("Datu guztiak bete behar dira.");
            return;
        }

        if (numerosElegidos.includes(numero)) {
            alert("Ezin dira zenbakiak errepikatu.");
            return;
        }

        numerosElegidos.push(numero);

        const diferencia = Math.abs(resultadoDado - numero);

        if (diferencia < menorDif) {
            menorDif = diferencia;
            ganadores = [index];
        } else if (diferencia === menorDif) {
            ganadores.push(index);
        }

        jugadores[index].nombre = nombre;
    });

    ganadores.forEach(i => jugadores[i].puntos++);

    document.getElementById("resultado").innerHTML =
        `🎲 Zenbakia: ${resultadoDado} <br> 🏆 Irabazlea(k): ${ganadores.map(i => jugadores[i].nombre).join(", ")}`;

    rondaActual++;
    actualizarTabla();
    actualizarInfo();
    guardarDatos();
}

function actualizarTabla() {
    let html = "<h3>🏆 Puntuazio Kopurua</h3>";
    jugadores.forEach(j => {
        html += `<p>${j.nombre}: ${j.puntos} puntu</p>`;
    });
    document.getElementById("tablaPuntos").innerHTML = html;
}

function actualizarInfo() {
    document.getElementById("infoRonda").innerText =
        `Erronda ${totalRondas}etik ${rondaActual}.`;
}

function reiniciarRonda() {
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("dado").textContent = "🎲";
}

function reiniciarJuego() {
    jugadores = [];
    localStorage.clear();
    location.reload();
}

function guardarDatos() {
    localStorage.setItem("juegoDado", JSON.stringify(jugadores));
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Error SW:", err));
}
