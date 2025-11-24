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

