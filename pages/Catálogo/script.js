// --- Funções do Menu Lateral --- //

function abrirMenu() {
    document.getElementById("menuLateral").style.width = "250px";
}

function fecharMenu() {
    document.getElementById("menuLateral").style.width = "0";
}

// Função utilitária: normaliza texto //
function normalizeText(str) {
  return String(str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos //
    .replace(/[^\w\s,]/g, '')        // remove pontuação (exceto vírgula) //
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

//  Função principal da busca (chamada no botão) //
function buscarGenero() {
  const termoRaw = document.getElementById('buscaGenero').value;
  const termo = normalizeText(termoRaw);

  const filmes = Array.from(document.querySelectorAll('.card-filme'));

  // Caso o campo esteja vazio, mostrar tudo e remover destaque //
  if (!termo) {
    filmes.forEach(filme => {
      filme.style.display = '';
      filme.classList.remove('destaque');
    });
    return;
  }

  filmes.forEach(filme => {
    const generosBrutos = filme.dataset.genero || '';
    const normalizado = normalizeText(generosBrutos);

    // Divide por vírgula quando tiver mais de um gênero //
    const generos = normalizado
      .split(',')
      .map(g => g.trim())
      .filter(Boolean);

    // Verifica se o gênero pesquisado combina com algum do card //
    const match = generos.some(g => 
      g === termo || 
      g.includes(termo) || 
      termo.includes(g)
    );

    if (match) {
      filme.style.display = '';
      filme.classList.add('destaque');
    } else {
      filme.style.display = 'none';
      filme.classList.remove('destaque');
    }
  });
}



// Dispara a busca enquanto o usuário digita //
document.getElementById("buscaGenero").addEventListener("input", buscarGenero);

