const form = document.getElementById("form-busca");
const inputBusca = document.getElementById("buscar-filme");
const filmesEmBreve = document.querySelectorAll("#em-breve .filme-card");
const mensagem = document.getElementById("nenhum-resultado");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const termo = inputBusca.value.toLowerCase().trim();
  let encontrados = 0;

  filmesEmBreve.forEach(filme => {
    const titulo = filme.querySelector(".titulo-filme").textContent.toLowerCase();

    if (titulo.includes(termo)) {
      filme.style.display = "block";
      encontrados++;
    } else {
      filme.style.display = "none";
    }
  });

  // Exibe ou esconde mensagem
  if (encontrados === 0) {
    mensagem.style.display = "block";
  } else {
    mensagem.style.display = "none";
  }

  // Se apagou a busca, mostra tudo
  if (termo === "") {
    filmesEmBreve.forEach(filme => filme.style.display = "block");
    mensagem.style.display = "none";
  }
});

// Lista oficial dos filmes
const filmes = [
  { titulo: "Titanic", votos: 0 },
  { titulo: "Jurassic Park", votos: 0 },
  { titulo: "De Volta para o Futuro", votos: 0 },
  { titulo: "Star Wars: A Ameaça Fantasma", votos: 0 },
  { titulo: "Batman", votos: 0 }
];


// Renderizar filmes dentro da votação
function renderFilmes() {
  const lista = document.getElementById("lista-filmes-votar");
  lista.innerHTML = "";

  filmes.forEach((f, i) => {
    const item = document.createElement("div");
    item.className = "filme-item";

    const nome = document.createElement("span");
    nome.textContent = f.titulo;

    const botao = document.createElement("button");
    botao.textContent = "Votar";
    botao.onclick = () => {
      filmes[i].votos++;
      renderRanking();
    };

    item.appendChild(nome);
    item.appendChild(botao);
    lista.appendChild(item);
  });
}


// Renderizar ranking parcial
function renderRanking() {
  const ranking = document.getElementById("ranking-votar");

  ranking.innerHTML = filmes
    .map(f => `<p>${f.titulo}: <strong>${f.votos}</strong> voto(s)</p>`)
    .join("");
}


// Abrir/fechar votação
document.getElementById("toggleVotacao").onclick = () => {
  const sec = document.getElementById("votacaoSection");

  if (sec.style.display === "none") {
    sec.style.display = "block";
    toggleVotacao.textContent = "▼ Votar no Filme do Mês";
  } else {
    sec.style.display = "none";
    toggleVotacao.textContent = "▶ Votar no Filme do Mês";
  }
};


// Inicialização
renderFilmes();
renderRanking();

let tempoRestante = 20; // tempo para o professor testar
let intervalo;
let votacaoEncerrada = false;

// Inicia o timer
function iniciarTemporizador() {
  const temp = document.getElementById("temporizador");
  temp.textContent = `Tempo restante: ${tempoRestante}s`;

  intervalo = setInterval(() => {
    tempoRestante--;
    temp.textContent = `Tempo restante: ${tempoRestante}s`;

    if (tempoRestante <= 0) {
      clearInterval(intervalo);
      encerrarVotacao();
    }
  }, 1000);
}


// Encerra votação oficialmente
function encerrarVotacao() {
  votacaoEncerrada = true;

  // Desabilitar todos os botões
  const botoes = document.querySelectorAll("#lista-filmes-votar button");
  botoes.forEach(btn => btn.disabled = true);

  // Determinar o vencedor
  const vencedor = filmes.reduce((maisVotado, atual) =>
    atual.votos > maisVotado.votos ? atual : maisVotado
  );

  // Mostrar ganhador
  const vencedorBox = document.getElementById("vencedor-final");
  vencedorBox.innerHTML = `
    <h2>Votação encerrada!</h2>
    <p>Filme vencedor: <strong>${vencedor.titulo}</strong> com ${vencedor.votos} voto(s).</p>
  `;
}


// Iniciar o temporizador quando a votação abrir
document.getElementById("toggleVotacao").onclick = () => {
  const sec = document.getElementById("votacaoSection");

  if (sec.style.display === "none") {
    sec.style.display = "block";
    toggleVotacao.textContent = "▼ Votar no Filme do Mês";

    if (!intervalo) {
      iniciarTemporizador();
    }
  } else {
    sec.style.display = "none";
    toggleVotacao.textContent = "▶ Votar no Filme do Mês";
  }
};
