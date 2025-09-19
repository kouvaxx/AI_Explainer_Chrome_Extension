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
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Verifica se o clique foi no nosso item de menu e se há texto selecionado.
  if (info.menuItemId === "explicar-com-ia" && info.selectionText) {
    // Envia o texto selecionado para o content script da aba ativa.
    chrome.tabs.sendMessage(tab.id, {
      type: "EXPLICAR_TEXTO",
      text: info.selectionText
    });
  }
});
