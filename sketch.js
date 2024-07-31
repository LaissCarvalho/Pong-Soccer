let alturaRaqueteOponente = 95;

// Pontuação
let minhaPontuacao = 0;
let pontuacaoOponente = 0;

function preload() {
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
  campo = loadImage("campo.jpg");
  bola = loadImage("bolaPong.png");
}

function setup() {
  createCanvas(600, 400);

  // Botão play
  botaoX = width / 2 - botaoLargura / 2;
  botaoY = height / 2 - botaoAltura / 2;
  botaoCor = color(255, 0, 0);

  // Posição inicial da raquete do oponente
  xRaqueteOponente = width - larguraRaqueteOponente - 15;
  yRaqueteOponente = height / 2 - alturaRaqueteOponente / 2;
}
function draw() {
  if (!jogoEmAndamento) {
    telaDeInicio();
  } else {
    // Plano de fundo é desenhado apenas quando o jogo está em andamento
    background(campo);
    // Executa o jogo
    mostrarBola();
    moverBola();
    verificarColisaoBorda();
    mostrarMinhaRaquete();
    moverMinhaRaquete();
    verificarColisaoMinhaRaquete();
    mostrarRaqueteOponente();
    moverRaqueteOponente();
    verificarColisaoRaqueteOponente();
    mostrarPontuacao();
  }
}

function mousePressed() {
  if (
    !jogoEmAndamento &&
    mouseX > botaoX &&
    mouseX < botaoX + botaoLargura &&
    mouseY > botaoY &&
    mouseY < botaoY + botaoAltura
  ) {
    // Se o botão de play for clicado, inicia o jogo
    jogoEmAndamento = true;
    // Inicia a trilha sonora
    trilha.loop();
  }
}

function telaDeInicio() {
  background(0);
  // Desenha o botão de play
  fill(botaoCor);
  rect(botaoX, botaoY, botaoLargura, botaoAltura);
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("PLAY", botaoX + botaoLargura / 2, botaoY + botaoAltura / 2);
  // Texto abaixo do botão de play
  textSize(16);
  text("Clique para começar a partida", width / 2, botaoY + botaoAltura + 20);
}

function mostrarBola() {
  image(bola, xBola, yBola, diametroBola, diametroBola);
}

function moverBola() {
  yBola += velocidadeYBola;
  xBola += velocidadeXBola;
}

function verificarColisaoBorda() {
  if (xBola > width - diametroBola || xBola < 0) {
    velocidadeXBola *= -1;
    // Adicionar pontuação ao lado oposto
    if (xBola < 0) {
      pontuacaoOponente++;
      // Reproduzir o som quando o oponente marca um ponto
      ponto.play();
    } else {
      minhaPontuacao++;
      // Reproduzir o som quando você marca um ponto
      ponto.play();
    }
  }

  if (yBola + diametroBola > height || yBola < 0) {
    velocidadeYBola *= -1;
  }
}

function mostrarMinhaRaquete() {
  rect(xMinhaRaquete, yMinhaRaquete, larguraMinhaRaquete, alturaMinhaRaquete);
}

function moverMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yMinhaRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yMinhaRaquete += 10;
  }
}

function verificarColisaoMinhaRaquete() {
  if (
    xBola + diametroBola > xMinhaRaquete &&
    xBola < xMinhaRaquete + larguraMinhaRaquete &&
    yBola + diametroBola > yMinhaRaquete &&
    yBola < yMinhaRaquete + alturaMinhaRaquete
  ) {
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function verificarColisaoRaqueteOponente() {
  if (
    xBola < xRaqueteOponente + larguraRaqueteOponente &&
    xBola + diametroBola > xRaqueteOponente &&
    yBola < yRaqueteOponente + alturaRaqueteOponente &&
    yBola + diametroBola > yRaqueteOponente
  ) {
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function mostrarRaqueteOponente() {
  rect(
    xRaqueteOponente,
    yRaqueteOponente,
    larguraRaqueteOponente,
    alturaRaqueteOponente
  );
}

function moverRaqueteOponente() {
  if (yBola > yRaqueteOponente + alturaRaqueteOponente / 2) {
    yRaqueteOponente += 4;
  } else if (yBola < yRaqueteOponente + alturaRaqueteOponente / 2) {
    yRaqueteOponente -= 5;
  }
}

function mostrarPontuacao() {
  // Define a cor preta
  fill(0);
  // Remove o contorno do retângulo
  noStroke();
  let caixaX = width / 2 - 50;
  let caixaY = 5;
  let caixaLargura = 100;
  let caixaAltura = 40;
  // Desenha a caixa preta com uma pequena sombra
  fill(100);
  // Desenha a sombra
  rect(caixaX + 3, caixaY + 3, caixaLargura, caixaAltura);
  // Cor da caixa preta
  fill(0);
  // Desenha a caixa preta
  rect(caixaX, caixaY, caixaLargura, caixaAltura);
  // Define a cor do texto como branca
  fill(255);
  textSize(32);
  // Alinhar texto ao centro da caixa preta
  textAlign(CENTER, CENTER);
  // Posição x centralizada na caixa preta
  let textoX = caixaX + caixaLargura / 2;
  // Posição y centralizada na caixa preta
  let textoY = caixaY + caixaAltura / 2;
  // Efeito de piscar para a pontuação
  if (frameCount % 60 < 30) {
    // Ajuste fino para o texto não ficar exatamente no meio
    text(minhaPontuacao, textoX - 30, textoY);
    text(pontuacaoOponente, textoX + 30, textoY);
  }
}
