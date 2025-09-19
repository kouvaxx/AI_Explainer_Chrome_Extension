// background.js

// Adiciona um listener para o evento de instalação da extensão.
// Isso garante que o menu de contexto seja criado apenas uma vez.
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "explicar-com-ia",
    title: "Explicar com IA",
    contexts: ["selection"] // Só aparece quando há texto selecionado
  });
});

// Adiciona um listener para o evento de clique no item do menu de contexto.
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  // Verifica se o clique foi no nosso item de menu e se há texto selecionado.
  if (info.menuItemId === "explicar-com-ia" && info.selectionText) {
    const textoSelecionado = info.selectionText;

    try {
      // Verifica se a API de IA está disponível no navegador.
      if (window.ai && await window.ai.canCreateTextSession()) {
        // Cria uma sessão com o modelo de IA.
        const session = await window.ai.createTextSession();

        // Monta o prompt otimizado conforme solicitado.
        const prompt = `Explique o seguinte termo de forma simples e direta, em português do Brasil e em no máximo duas frases: "${textoSelecionado}"`;

        // Envia o prompt para o modelo e aguarda a resposta.
        const respostaIA = await session.prompt(prompt);

        // Envia a resposta para o content_script da aba onde o texto foi selecionado.
        chrome.tabs.sendMessage(tab.id, {
          type: "EXPLICACAO_GERADA",
          explanation: respostaIA
        });
        
        // Destroi a sessão para liberar recursos.
        session.destroy();

      } else {
        // Caso a API não esteja disponível, envia uma mensagem de erro.
        chrome.tabs.sendMessage(tab.id, {
          type: "ERRO",
          message: "A API de IA não está disponível ou habilitada neste navegador."
        });
      }
    } catch (error) {
      // Em caso de qualquer outro erro, envia uma mensagem de erro.
      console.error("Erro ao processar a explicação com IA:", error);
      chrome.tabs.sendMessage(tab.id, {
        type: "ERRO",
        message: "Ocorreu um erro ao gerar a explicação."
      });
    }
  }
});