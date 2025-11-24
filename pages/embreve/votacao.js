// Filmes participantes
const filmes = [
  "Titanic",
  "Jurassic Park",
  "De Volta para o Futuro",
  "Star Wars: A Ameaça Fantasma",
  "Batman"
];

// Tempo de votação (exemplo: 2 minutos p/ professor testar)
let tempoRestante = 120; // segundos — depois você aumenta para 7 dias

// Exibe lista com botões
const listaFilmes = document.getElementById("lista-filmes");
listaFilmes.innerHTML = filmes
  .map(
    filme => `
  <div class="filme-item">
    <span>${filme}</span>
    <button onclick="votar('${filme}')">Votar</button>
  </div>`
  )
  .join("");

// Registrar voto
function votar(filme) {
  let votos = JSON.parse(localStorage.getItem("votos")) || {};
  votos[filme] = (votos[filme] || 0) + 1;
  localStorage.setItem("votos", JSON.stringify(votos));
  atualizarRanking();
  alert(`✅ Voto registrado para ${filme}!`);
}

// Exibir ranking
function atualizarRanking() {
  const votos = JSON.parse(localStorage.getItem("votos")) || {};
  const rankingDiv = document.getElementById("ranking");

  // ordenar por votos
  const ordenado = Object.entries(votos).sort((a, b) => b[1] - a[1]);

  rankingDiv.innerHTML = ordenado.length
    ? ordenado
        .map((item, i) => `${i + 1}º — ${item[0]} (${item[1]} votos)`)
        .join("<br>")
    : "Nenhum voto ainda 😶";
}

atualizarRanking();

// Temporizador
function atualizarTemporizador() {
  const tempo = document.getElementById("temporizador");

  if (tempoRestante <= 0) {
    tempo.innerHTML = "<strong>⛔ Votação Encerrada!</strong>";
    document.querySelectorAll(".filme-item button").forEach(btn => {
      btn.disabled = true;
    });
    return;
  }

  const min = Math.floor(tempoRestante / 60);
  const seg = tempoRestante % 60;

  tempo.innerHTML = `⏳ Tempo restante: ${min}m ${seg}s`;

  tempoRestante--;
}

setInterval(atualizarTemporizador, 1000);
atualizarTemporizador();

const votacaoSection = document.getElementById("votacaoSection");
const abrirBtn = document.getElementById("abrirVotacao");
const fecharBtn = document.getElementById("fecharVotacao");

abrirBtn.addEventListener("click", () => {
  votacaoSection.style.display = "block";
  window.scrollTo({ top: votacaoSection.offsetTop, behavior: "smooth" });
});

fecharBtn.addEventListener("click", () => {
  votacaoSection.style.display = "none";
});

