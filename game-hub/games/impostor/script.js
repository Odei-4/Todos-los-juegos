let roles = [];
let jokalariActual = 0;
let palabraSecreta = "";

const palabras = [
    "Ondartza", "Mendia", "Txakurra", "Katua", "Pizza", "Egazkina", "Patata", "Gotzone", "Elvira", "Fútbola",
    "Saskibaloia", "Ordenagailua", "Teléfonoa", "Liburua", "Elurra", "Izozkia", "Txokolatea", "Jatetxea", "Parkea", "Museoa",
    "Supermermerkatua", "Bankua", "Irakaslea", "Medicua", "Polizia (Txakurrak)", "Suhiltzailea", "Pirata", "Erregea (Chupa bote)", "Dragoia", "Robota",
    "Carrero", "Planeta", "Eguzkia", "Hilargia", "Gaua", "Irla", "Basamortua", "Dani otxoa", "Zuhaitza", "Gaztelua",
    "Fantasma", "Juan carlos", "PP", "Zombi", "Ninja", "Samurai", "Pailazoa", "Zirkua", "Trena", "Jose antonio"

];

const btnGenerar = document.getElementById("btnGenerar");
const btnVerRol = document.getElementById("btnVerRol");
const btnSiguiente = document.getElementById("btnSiguiente");
const modoPalabra = document.getElementById("modoPalabra");
const palabraManualInput = document.getElementById("palabraManual");

modoPalabra.addEventListener("change", () => {
    if (modoPalabra.value === "manual") {
        palabraManualInput.classList.remove("oculto");
    } else {
        palabraManualInput.classList.add("oculto");
    }
});

btnGenerar.addEventListener("click", generarJuego);

btnVerRol.addEventListener("mousedown", mostrarRol);
btnVerRol.addEventListener("touchstart", mostrarRol);

btnVerRol.addEventListener("mouseup", ocultarRol);
btnVerRol.addEventListener("mouseleave", ocultarRol);
btnVerRol.addEventListener("touchend", ocultarRol);

btnSiguiente.addEventListener("click", siguienteJugador);

function generarJuego() {

    let jokalari = parseInt(document.getElementById("jokalari").value);
    let inpostoreak = parseInt(document.getElementById("inpostoreak").value);

    if (!jokalari || !inpostoreak) {
        alert("Introduce valores válidos");
        return;
    }

    if (inpostoreak >= jokalari) {
        alert("Inpostore jokalari baino gutxiago egon behar dira");
        return;
    }

    if (modoPalabra.value === "manual") {
        palabraSecreta = palabraManualInput.value.trim();

        if (!palabraSecreta) {
            alert("Idatzi hitz egoki bat");
            return;
        }
    } else {
        palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    }

    roles = [];

    for (let i = 0; i < jokalari - inpostoreak; i++) {
        roles.push(palabraSecreta);
    }

    for (let i = 0; i < inpostoreak; i++) {
        roles.push("IMPOSTOREA");
    }

    roles.sort(() => Math.random() - 0.5);

    jokalariActual = 0;

    document.getElementById("config").classList.add("oculto");
    document.getElementById("juego").classList.remove("oculto");
    document.getElementById("numeroJugador").innerText = jokalariActual + 1;
}

function mostrarRol() {
    document.getElementById("rol").innerText = roles[jokalariActual];
}

function ocultarRol() {
    document.getElementById("rol").innerText = "";
}

function siguienteJugador() {
    jokalariActual++;

    if (jokalariActual < roles.length) {
        document.getElementById("numeroJugador").innerText = jokalariActual + 1;
    } else {
        alert("Jokalari guztiak bere rol-a daukate");
        location.reload();
    }
}
