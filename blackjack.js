var pcPontos = 0;
var euPontos = 0;

var contagemAsPc = 0;
var contagemAsEu = 0; 

var verso;
var baralho;

var batida = true; 

window.onload = function() {
    criandoBaralho();
    embaralharCartas();
    iniciar();
}


function criandoBaralho() {
    let tipos = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let naipes = ["P", "O", "C", "E"];
    baralho = [];

    for (let i = 0; i < naipes.length; i++) {
        for (let j = 0; j < tipos.length; j++) {
            baralho.push(tipos[j] + "-" + naipes[i]); 
        }
    }
    // console.log(baralho);

}

function embaralharCartas() {
    for (let i = 0; i < baralho.length; i++) {
        let j = Math.floor(Math.random() * baralho.length);
        let embaralhar = baralho[i];
        baralho[i] = baralho[j];
        baralho[j] = embaralhar;
    }
    // console.log(baralho);
}

function iniciar() {
    verso = baralho.pop();
    pcPontos += valores(verso);
    contagemAsPc += checarAs(verso);
    // console.log(verso);
    // console.log(pcPontos);
    while (pcPontos < 17) {
      
        let imagensCartas = document.createElement("img");
        let cartas = baralho.pop();
        imagensCartas.src = "/Cartas/" + cartas + ".png";
        pcPontos += valores(cartas);
        contagemAsPc += checarAs(cartas);
        document.getElementById("pcCartas").append(imagensCartas);
    }
    // console.log(pcPontos);

    for (let i = 0; i < 2; i++) {
        let imagensCartas = document.createElement("img");
        let cartas = baralho.pop();
        imagensCartas.src = "/Cartas/" + cartas + ".png";
        euPontos += valores(cartas);
        contagemAsEu += checarAs(cartas);
        document.getElementById("euCartas").append(imagensCartas);
    }

    // console.log(euPontos);
    document.getElementById("comprar").addEventListener("click", comprar);
    document.getElementById("parar").addEventListener("click", parar);

}

function comprar() {
    if (!batida) {
        return;
    }

    let imagensCartas = document.createElement("img");
    let cartas = baralho.pop();
    imagensCartas.src = "/Cartas/" + cartas + ".png";
    euPontos += valores(cartas);
    contagemAsEu += checarAs(cartas);
    document.getElementById("euCartas").append(imagensCartas);

    if (ace(euPontos, contagemAsEu) > 21) { 
        batida = false;
    }

}

function parar() {
    pcPontos = ace(pcPontos, contagemAsPc);
    euPontos = ace(euPontos, contagemAsEu);

    batida = false;
    
    document.getElementById("verso").src = "./Cartas/" + verso + ".png";

    let total = "";
    
    if (euPontos > pcPontos && euPontos <= 21) {
        total = "Você ganhou !";
    }
        else if (pcPontos > euPontos && pcPontos <= 21) {
        total = "O Pc ganhou !";
        }
        else if (pcPontos > 21 && euPontos <= 21) {
        total = "Você ganhou !";
        }
        else if (euPontos > 21 && pcPontos <= 21) {
        total = "O Pc ganhou !";
    }else {
        total = "Empate !"
    }
    

    document.getElementById("pcPontos").innerText = pcPontos;
    document.getElementById("euPontos").innerText = euPontos;
    document.getElementById("resultado").innerText = total;
}

function valores(cartas) {
    let data = cartas.split("-"); 
    let valores = data[0];

    if (isNaN(valores)) { 
        if (valores == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(valores);
}

function checarAs(cartas) {
    if (cartas[0] == "A") {
        return 1;
    }
    return 0;

}

function ace(somaDoJogador, jogadorAs) {
    while (somaDoJogador > 21 && jogadorAs > 0) {
        somaDoJogador -= 10;
        jogadorAs -= 1;
    }
    return somaDoJogador;
}

