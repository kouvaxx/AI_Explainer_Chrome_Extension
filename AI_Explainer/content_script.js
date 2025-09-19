// content_script.js

// Listener para mensagens vindas do background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "EXPLICAR_TEXTO") {
    handleExplanationRequest(request.text);
    return true; // Indica que a resposta será enviada de forma assíncrona
  }
});

// Função para lidar com a requisição de explicação
async function handleExplanationRequest(selectedText) {
  // Pega a posição do texto selecionado para posicionar a janela
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  try {
    // Verifica se a API de IA está disponível
    if (window.ai && (await window.ai.canCreateTextSession()) === "readily") {
      const session = await window.ai.createTextSession();
      const prompt = `Explique o seguinte termo de forma simples e direta, em português do Brasil e em no máximo duas frases: "${selectedText}"`;
      
      // Mostra um indicador de "carregando"
      const loadingPopup = displayFloatingWindow("Gerando explicação...", rect);

      const explanation = await session.prompt(prompt);
      
      // Remove o popup de carregando e mostra a explicação
      loadingPopup.remove();
      displayFloatingWindow(explanation, rect);

      session.destroy();
    } else {
      displayFloatingWindow("A API de IA não está disponível ou habilitada neste navegador.", rect);
    }
  } catch (error) {
    console.error("Erro ao processar a explicação com IA:", error);
    displayFloatingWindow("Ocorreu um erro ao gerar a explicação.", rect);
  }
}

// Função para criar e exibir a janela flutuante
function displayFloatingWindow(content, rect) {
  // Remove qualquer janela anterior
  const existingExplainer = document.getElementById('ia-explicador-container');
  if (existingExplainer) {
    existingExplainer.remove();
  }

  const container = document.createElement('div');
  container.id = 'ia-explicador-container';
  
  const contentDiv = document.createElement('div');
  contentDiv.id = 'ia-explicador-content';
  contentDiv.innerHTML = content;

  const closeButton = document.createElement('button');
  closeButton.id = 'ia-explicador-close';
  closeButton.innerText = 'X';
  closeButton.onclick = () => container.remove();

  container.appendChild(closeButton);
  container.appendChild(contentDiv);
  document.body.appendChild(container);

  // Posiciona a janela abaixo do texto selecionado
  container.style.position = 'absolute';
  container.style.top = `${window.scrollY + rect.bottom + 5}px`;
  container.style.left = `${window.scrollX + rect.left}px`;

  // Adiciona um listener para fechar ao clicar fora
  setTimeout(() => {
    document.addEventListener('click', function onClickOutside(event) {
      if (!container.contains(event.target)) {
        container.remove();
        document.removeEventListener('click', onClickOutside);
      }
    });
  }, 0);

  return container; // Retorna o container para poder removê-lo (ex: no loading)
}
