// Definição das variáveis globais do jogo
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 10;
var criaMoscaTempo = 1500;

// Definição da dificuldade do jogo, com base na escolha do usuário
var dificuldade = window.location.search;
dificuldade = dificuldade.replace('?', '');
// Diminui o tempo de criação das moscas com base na dificuldade;
if (dificuldade === 'facil') {
    criaMoscaTempo = 1500;
} else if (dificuldade === 'normal') {
    criaMoscaTempo = 1000;
} else if (dificuldade === 'dificil') {
    criaMoscaTempo = 750;
}

// Ajusta o tamanho máximo da tela do jogo sempre que ela é redimensionada
function ajustaTamanhoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

ajustaTamanhoJogo();

// Definição do cronometro que limita o tempo necessário para vencer o jogo
var cronometro = setInterval(function () {
    tempo -= 1;

    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(jogo);
        window.location.href = "vitoria.html";
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    }

}, 1000)

// Função responsável pela criação das moscas em posições aleatórias.
function randomPosition() {

    // Verifica se existe uma mosca já criada e a remove
    if (document.getElementById('mosca')) {
        document.getElementById('mosca').remove();

        // Cada vez que uma mosca é removida, o jogador perde uma vida, se perder as 3, o jogo acaba
        if (vidas > 3) {
            window.location.href = "gameover.html";
        } else {
            document.getElementById('v' + vidas).src = "../img/coracao_vazio.png";
            vidas++;
        }
    }

    // Gera a posição aleatória para criar a mosca
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    // Verifica se a posição é negativa e a corrige, para evitar criação de moscas fora da tela de jogo
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    // Cria o elemento img da mosca e define seus parâmetros
    var mosca = document.createElement('img');
    mosca.src = "../img/mosca.png"
    mosca.className = randomSize() + " " + randomSide();
    mosca.style.left = posicaoX + 'px';
    mosca.style.top = posicaoY + 'px';
    mosca.style.position = 'absolute';
    mosca.id = 'mosca';
    mosca.onclick = function () {
        this.remove();
    }
    document.body.appendChild(mosca);
}

// Define um tamanho aleátorio para as moscas
function randomSize() {
    var classe = Math.floor(Math.random() * 3);

    switch (classe) {
        case 0:
            return 'mosca1';
        case 1:
            return 'mosca2';
        case 2:
            return 'mosca3';
    }
}

// Define para que lado a mosca está olhando
function randomSide() {
    var lado = Math.floor(Math.random() * 2);

    switch (lado) {
        case 0:
            return 'lado1';
        case 1:
            return 'lado2';
    }
}

// Função responsável por iniciar o jogo, envia a dificuldade para o script por meio de um falso GET;
function iniciarJogo() {
    var dificuldade = document.getElementById('nivel').value;

    if (dificuldade === '') {
        alert('Selecione uma dificuldade para iniciar o jogo');
        return false;
    }

    window.location.href = 'app.html?' + dificuldade;
}