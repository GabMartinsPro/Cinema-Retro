document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona todos os elementos que terão o efeito de luz
    const sections = document.querySelectorAll('.retro-light-section');

    // 2. Define as opções do Intersection Observer
    const observerOptions = {
        root: null, // A viewport
        threshold: 0.1, // Aciona ao ver 10% do elemento
        rootMargin: '0px 0px -50px 0px' 
    };

    // 3. Função a ser executada quando um elemento é intersectado
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ao entrar na viewport, adiciona a classe 'active' para ACENDER
                entry.target.classList.add('active');
            } else {
                // Remove a classe 'active' ao sair da tela
                entry.target.classList.remove('active'); 
            }
        });
    };

    // 4. Cria e Inicia o Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observa cada seção de gênero
    sections.forEach(section => {
        observer.observe(section);
    });
});