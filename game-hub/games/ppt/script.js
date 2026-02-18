let jugando = false;

const opciones = ["piedra", "papel", "tijera"];

document.querySelectorAll(".choice").forEach(btn => {
    btn.addEventListener("click", () => jugar(btn.dataset.value));
});

function emoji(opcion){
    if(opcion === "piedra") return "✊";
    if(opcion === "papel") return "✋";
    if(opcion === "tijera") return "✌️";
}

function determinarGanador(jugador, maquina){
    if(jugador === maquina) return "empate";

    if(
        (jugador === "piedra" && maquina === "tijera") ||
        (jugador === "tijera" && maquina === "papel") ||
        (jugador === "papel" && maquina === "piedra")
    ){
        return "jugador";
    }

    return "maquina";
}

function jugar(eleccionJugador){

    if(jugando) return;
    jugando = true;

    const nombre = document.getElementById("playerName").value.trim();
    if(!nombre){
        alert("Sartu zure izena");
        jugando = false;
        return;
    }

    const manoJugador = document.getElementById("manoJugador");
    const manoMaquina = document.getElementById("manoMaquina");

    const eleccionMaquina = opciones[Math.floor(Math.random() * 3)];

    // Animación tipo "shake"
    let contador = 0;
    const animacion = setInterval(()=>{
        manoJugador.style.transform = `translateY(${contador % 2 === 0 ? -10 : 10}px)`;
        manoMaquina.style.transform = `translateY(${contador % 2 === 0 ? 10 : -10}px)`;
        contador++;
    },100);

    setTimeout(()=>{
        clearInterval(animacion);
        manoJugador.style.transform = "translateY(0)";
        manoMaquina.style.transform = "translateY(0)";

        manoJugador.textContent = emoji(eleccionJugador);
        manoMaquina.textContent = emoji(eleccionMaquina);

        const ganador = determinarGanador(eleccionJugador, eleccionMaquina);
        let texto = "";

        if(ganador === "empate"){
            texto = "Enpate 🤝";
        }else if(ganador === "jugador"){
            texto = "Iarabazten du " + nombre + " 🎉";
        }else{
            texto = "Irabazten du Makina 🤖";
        }

        document.getElementById("resultado").innerText = texto;

        jugando = false;

    },1500);
}

/* Service Worker */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}
