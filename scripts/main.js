const caracteresPermitidos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var palavras = [];
var palavraCorreta = "";
var letras = [];
var letrasIncorretas = [];
var letrasCorretas = [];
var erros = 6;

var tabuleiro = document.getElementById('forca').getContext('2d');

var cookiesString = getCookies();

cookiesString.forEach((valor) => {
    palavras.push(valor);
});

desenharForca();
escreverTracinhos(escolherPalavraSecreta());

document.onkeydown = (e) => {
    letra = e.key.toUpperCase();
    if(caracteresPermitidos.includes(letra)) {
        if((letrasCorretas.includes(letra.toUpperCase()) || letrasIncorretas.includes(letra.toUpperCase())) && letrasIncorretas.length < 6) {
            alert("Ops! essa letra já foi...");
            return;
        } else {
                if(palavraSecreta.includes(letra)) {
                    adicionarLetraCorreta(palavraSecreta.indexOf(letra));
                    for(let i = 0; i < palavraSecreta.length; i++) {
                        if(palavraSecreta[i] === letra) {
                            letrasCorretas.push(letra.toUpperCase());
                            escreverLetraCorreta(i);
                        }
                    }
                }           
            else if(letrasIncorretas.length < 6 && letrasCorretas.length < palavraSecreta.length) {
                letrasIncorretas.push(letra.toUpperCase());
                adicionarLetraIncorreta(letra);
                escreverLetraIncorreta(letra,erros);
                desenharBoneco(erros);                
            }
        }
    }
    statusJogo();  
}

function escolherPalavraSecreta() {
    var palavra = palavras[Math.floor(Math.random() * palavras.length)]
    palavraSecreta = palavra;
    return palavra;    
}

function escreverTracinhos() {  
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.LineJoin = "round";
    tabuleiro.strokeStyle = "#0A3871";
    tabuleiro.beginPath();
    var eixo = 600/palavraSecreta.length;
    for(let i = 0; i < palavraSecreta.length; i++) {
        tabuleiro.moveTo(136 + (eixo * i), 540);
        tabuleiro.lineTo(186 + (eixo * i), 540);
    }
    tabuleiro.stroke();
    tabuleiro.closePath();
} 

function escreverLetraCorreta(indice) {
    tabuleiro.font = 'bold 52px Inter';    
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.LineJoin = "round";
    tabuleiro.fillStyle = "#0A3871";
    var eixo = 600/palavraSecreta.length;
    tabuleiro.fillText(palavraSecreta[indice], 144 + (eixo * indice), 520);
    tabuleiro.stroke();
}

function escreverLetraIncorreta(letra, erros) {
    tabuleiro.font = 'lighter 40px Inter';    
    tabuleiro.lineWidth = 4;
    tabuleiro.lineCap = "round";
    tabuleiro.LineJoin = "round";
    tabuleiro.fillStyle = "#495057";
    tabuleiro.fillText(letra, 50 + (40 * (10 - erros)), 610, 40);
    tabuleiro.stroke();
}

function adicionarLetraCorreta(indice) {
    palavraCorreta += palavraSecreta[indice].toUpperCase();
}

function adicionarLetraIncorreta(letra) {
    if(palavraSecreta.indexOf(letra) <= 0) {
        erros -= 1;
    }
}

function desenharForca() {
    tabuleiro.lineWidth = 6;
    tabuleiro.lineCap = "round";
    tabuleiro.LineJoin = "round";
    tabuleiro.strokeStyle = "#0A3871";

    tabuleiro.moveTo(250, 400);
    tabuleiro.lineTo(550, 400);    
    tabuleiro.stroke();

    tabuleiro.moveTo(330, 400);
    tabuleiro.lineTo(330, 10);
    tabuleiro.stroke();

    tabuleiro.moveTo(330, 10);
    tabuleiro.lineTo(490, 10);
    tabuleiro.stroke();

    tabuleiro.moveTo(490, 10);
    tabuleiro.lineTo(490, 65);
    tabuleiro.stroke();
}

function desenharBoneco(erros) {
    tabuleiro.strokeStyle = "#0A3871";
    
    if(erros < 6) {
        tabuleiro.beginPath();
        tabuleiro.arc(490, 100, 35, 0, 2 * 3.14);
        tabuleiro.stroke();
    }
    if(erros < 5) {
        tabuleiro.moveTo(490, 134);
        tabuleiro.lineTo(490, 290);
        tabuleiro.stroke();
    }
    if(erros < 4) {
        tabuleiro.moveTo(490, 138);
        tabuleiro.lineTo(530, 200);
        tabuleiro.stroke();
    }
    if(erros < 3) {
        tabuleiro.moveTo(490, 138);
        tabuleiro.lineTo(450, 198);
        tabuleiro.stroke();
    }
    if(erros < 2) {
        tabuleiro.moveTo(490, 288);
        tabuleiro.lineTo(530, 358);
        tabuleiro.stroke();
    }
    if(erros < 1) {
        tabuleiro.moveTo(490, 288);
        tabuleiro.lineTo(450, 358);
        tabuleiro.stroke();
    }
}

function jogarNovamente() {
    window.location.reload();
}

function statusJogo() {
    if(letrasIncorretas.length == 6) {
        alert("Você perdeu, é uma pena!\n" + "\nA palavra correta era: " + palavraSecreta);
        setTimeout(() => {
            for(let i = 0; i < palavraSecreta.length; i++) {
                escreverLetraCorreta(i);
            }
        }, 1000);        
        return false;
    }
    if(letrasCorretas.length == palavraSecreta.length) {
        alert("Parabéns, você ganhou!");
        return true;
    }
}

function getCookies(){
    var pares = document.cookie.split(";");
    var cookies = [];
    for (var i=0; i<pares.length; i++){
      var par = pares[i].split("=");
      cookies[i] = unescape(par.slice(1).join('='));
    }
    return cookies;
}