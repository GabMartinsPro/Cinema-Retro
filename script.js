// --- Funções do Menu Lateral ---

function abrirMenu() {
    document.getElementById("menuLateral").style.width = "250px";
}

function fecharMenu() {
    document.getElementById("menuLateral").style.width = "0";
}

// --- Funções das Seções (Acordeão) ---

document.addEventListener('DOMContentLoaded', () => {
    const sectionTitles = document.querySelectorAll('.secao-titulo');

    sectionTitles.forEach(title => {
        const h2 = title.querySelector('h2');
        if (!h2.querySelector('.icone-acordeao')) {
            h2.innerHTML += ' <span class="icone-acordeao">▼</span>';
        }

        title.addEventListener('click', () => {
            const section = title.closest('.secao-genero');
            const listaFilmes = section.querySelector('.lista-filmes');

            listaFilmes.classList.toggle('lista-filmes-expandida');
            h2.classList.toggle('expandido');
        });
    });
});

// --- Busca com Dropdown (carrega filmes de filmes.json) ---

let filmes = [];

async function carregarFilmes() {
    try {
        const resposta = await fetch("/filmes.json");
        filmes = await resposta.json();
        console.log("Filmes carregados:", filmes.length);
    } catch (erro) {
        console.error("Erro ao carregar filmes.json:", erro);
    }
}

function inicializarBusca() {
    // Cria dinamicamente o dropdown dentro da barra
    const barraBusca = document.querySelector(".barra-busca");
    if (!barraBusca) return;

    const inputBusca = barraBusca.querySelector("input");
    if (!inputBusca) return;
    inputBusca.id = "barraBusca";

    const dropdown = document.createElement("div");
    dropdown.id = "resultadosBusca";
    dropdown.style.display = "none";
    dropdown.classList.add("dropdown-busca");
    barraBusca.appendChild(dropdown);

    // Evento de digitação
    inputBusca.addEventListener("input", () => {
        const termo = inputBusca.value.toLowerCase();
        dropdown.innerHTML = "";

        if (termo.trim() === "") {
            dropdown.style.display = "none";
            return;
        }

        const resultados = filmes.filter(f =>
            f.nome.toLowerCase().includes(termo)
        );

        if (resultados.length === 0) {
            dropdown.innerHTML = `<div class="resultado-item">Nenhum filme encontrado</div>`;
            dropdown.style.display = "block";
            return;
        }

        resultados.forEach(filme => {
            const item = document.createElement("div");
            item.classList.add("resultado-item");
            item.innerHTML = `
                <img src="${filme.imagem}" alt="${filme.nome}">
                <span>${filme.nome}</span>
            `;
            item.addEventListener("click", () => {
                window.location.href = filme.link;
            });
            dropdown.appendChild(item);
        });

        dropdown.style.display = "block";
    });

    // Fecha dropdown ao clicar fora
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".barra-busca")) dropdown.style.display = "none";
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await carregarFilmes();
    inicializarBusca();
});
