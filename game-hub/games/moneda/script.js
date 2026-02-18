document.getElementById("lanzarBtn").addEventListener("click", lanzar);

let isSpinning = false;

document.getElementById("lanzarBtn").addEventListener("click", lanzar);

function lanzar(){

    if(isSpinning) return;
    isSpinning = true;

    const p1 = document.getElementById("p1").value.trim();
    const p2 = document.getElementById("p2").value.trim();
    const choice1 = document.getElementById("choice1").value;
    const choice2 = document.getElementById("choice2").value;

    if(!p1 || !p2){
        alert("Sartu izenak");
        isSpinning = false;
        return;
    }

    if(choice1 === choice2){
        alert("Ezin dute berdina jarri");
        isSpinning = false;
        return;
    }

    const coin = document.getElementById("coin");

    const resultado = Math.random() < 0.5 ? "Aurpegi" : "Gurutze";

    const spinsY = 360 * (5 + Math.floor(Math.random()*5));
    const spinsX = 360 * (5 + Math.floor(Math.random()*5));

    let finalRotationY = spinsY;
    let finalRotationX = spinsX;

    if(resultado === "Gurutze"){
        finalRotationY += 180;
    }

    coin.style.transform = `rotateX(${finalRotationX}deg) rotateY(${finalRotationY}deg)`;

    setTimeout(()=>{
        let ganador = choice1 === resultado ? p1 : p2;

        document.getElementById("resultado").innerText =
            "Erantzuna: " + resultado.toUpperCase() +
            " | Irabazten du: " + ganador;

        isSpinning = false;

    },2500);
}
