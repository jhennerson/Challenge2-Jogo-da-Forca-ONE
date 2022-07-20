var palavras = ['ALURA', 'ORACLE', 'HTML', 'JAVASCRIPT', 'CSS'];

function adicionarPalavra() {
    palavras = getCookies();
    var palavraInput = document.getElementById("nova");
    var novaPalavra = palavraInput.value.toUpperCase();
    if(palavras.includes(novaPalavra)) {
        alert("Desculpe, essa palavra já está na lista...");
    } else {
        setCookie(novaPalavra);
        alert("Palavra adicionada à lista!");
    }
}

function setCookie(nomeValorCookie) {
    document.cookie = nomeValorCookie + "=" + (nomeValorCookie || "") + '' + "; " + 'path=/';
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

palavras.forEach((palavra) => {
    setCookie(palavra);
})