chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "explicar-com-ia",
    title: "Explicar com IA",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "explicar-com-ia" && info.selectionText) {
    const selectedText = info.selectionText;

    const data = await chrome.storage.sync.get('geminiApiKey');
    const apiKey = data.geminiApiKey;

    const sendMessageToContentScript = (type, content) => {
      chrome.tabs.sendMessage(tab.id, { type, content });
    };

    if (!apiKey) {
      sendMessageToContentScript('EXPLICACAO_ERRO', 'A chave de API do Gemini não foi configurada. Por favor, clique com o botão direito no ícone da extensão e vá para \'Opções\' para configurá-la.');
      return;
    }

    // CORREÇÃO: URL da API atualizada para o formato correto e modelo mais recente.
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    const prompt = `Explique o seguinte termo de forma simples e direta, em português do Brasil e em no máximo duas frases: "${selectedText}"`;

    try {
      sendMessageToContentScript('EXPLICACAO_CARREGANDO', 'Gerando explicação...');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Erro da API Gemini:', errorBody);
        throw new Error(`A API retornou um erro: ${response.status} ${response.statusText}.`);
      }

      const responseData = await response.json();
      
      const explanation = responseData.candidates[0].content.parts[0].text;
      sendMessageToContentScript('EXPLICACAO_RESULTADO', explanation);

    } catch (error) {
      console.error("Erro ao chamar a API do Gemini:", error);
      sendMessageToContentScript('EXPLICACAO_ERRO', `Ocorreu um erro: ${error.message}`);
    }
  }
});
