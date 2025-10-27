// --- Funções do Menu Lateral ---

function abrirMenu() {
    document.getElementById("menuLateral").style.width = "250px";
}

function fecharMenu() {
    document.getElementById("menuLateral").style.width = "0";
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona todos os elementos de título de seção que serão clicáveis
    const sectionTitles = document.querySelectorAll('.secao-titulo');

    sectionTitles.forEach(title => {
        // Encontra o h2 (o texto principal do título)
        const h2 = title.querySelector('h2');

        // Adiciona a seta inicial (▼) ao título
        h2.innerHTML += ' <span class="icone-acordeao">▼</span>';

        // Listenner para cada titulo
        title.addEventListener('click', () => {
            // Encontra o elemento pai (a section)
            const section = title.closest('.secao-genero');

            // Encontra a lista de filmes dentro desta seção
            const listaFilmes = section.querySelector('.lista-filmes');

            // Alterna a classe que expande a lista de filmes
            listaFilmes.classList.toggle('lista-filmes-expandida');

            // Alterna a classe no h2 (ou no span do ícone) para mudar a seta
            h2.classList.toggle('expandido');
        });
    });
});