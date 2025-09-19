// content_script.js

// Adiciona um listener para mensagens enviadas pelo service worker (background.js).
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "EXPLICACAO_GERADA" || message.type === "ERRO") {
    const textoParaExibir = message.type === "ERRO" ? message.message : message.explanation;
    exibirJanelaFlutuante(textoParaExibir);
  }
});

/**
 * Cria e exibe a janela flutuante com o texto da explicação.
 * @param {string} texto - O conteúdo a ser exibido na janela.
 */
function exibirJanelaFlutuante(texto) {
  // Remove qualquer janela anterior para evitar sobreposição.
  const janelaExistente = document.getElementById("ia-explicador-janela");
  if (janelaExistente) {
    janelaExistente.remove();
  }

  // Cria os elementos da janela flutuante.
  const janela = document.createElement("div");
  janela.id = "ia-explicador-janela";

  const botaoFechar = document.createElement("button");
  botaoFechar.id = "ia-explicador-fechar";
  botaoFechar.innerHTML = "&times;"; // Símbolo 'X'
  botaoFechar.onclick = () => janela.remove();

  const conteudo = document.createElement("p");
  conteudo.textContent = texto;

  // Monta a estrutura da janela.
  janela.appendChild(botaoFechar);
  janela.appendChild(conteudo);

  // Adiciona a janela ao corpo da página.
  document.body.appendChild(janela);

  // --- Lógica de Posicionamento ---
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect(); // Coordenadas do texto selecionado

    // Posiciona a janela abaixo do texto selecionado.
    // window.scrollY é usado para ajustar a posição em páginas com rolagem.
    janela.style.top = `${rect.bottom + window.scrollY + 8}px`;
    janela.style.left = `${rect.left + window.scrollX}px`;

    // Ajusta a posição se a janela sair da tela.
    const janelaRect = janela.getBoundingClientRect();
    if (janelaRect.right > window.innerWidth) {
        janela.style.left = `${window.innerWidth - janelaRect.width - 10}px`;
    }
  }
  
  // --- Lógica para fechar ao clicar fora ---
  setTimeout(() => {
    const clickForaHandler = (event) => {
      // Se o clique não foi dentro da janela, remove-a.
      if (!janela.contains(event.target)) {
        janela.remove();
        document.removeEventListener('click', clickForaHandler);
      }
    };
    document.addEventListener('click', clickForaHandler);
  }, 100); // Pequeno delay para não capturar o clique que abriu o menu.
}