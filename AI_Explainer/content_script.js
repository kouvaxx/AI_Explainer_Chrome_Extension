// content_script.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const selection = window.getSelection();
  let rect;
  if (selection && selection.rangeCount > 0) {
    rect = selection.getRangeAt(0).getBoundingClientRect();
  } else {
    rect = { top: 10, bottom: 10, left: window.innerWidth / 2, right: window.innerWidth / 2, width: 0, height: 0 };
  }

  switch (request.type) {
    case 'EXPLICACAO_CARREGANDO':
    case 'EXPLICACAO_RESULTADO':
    case 'EXPLICACAO_ERRO':
      displayFloatingWindow(request.content, rect);
      break;
  }
  
  return true;
});

// Função para criar e exibir a janela flutuante com estilos customizáveis
function displayFloatingWindow(content, rect) {
  // Pega as configurações de estilo do storage
  chrome.storage.sync.get(['fontSize', 'backgroundColor', 'textColor'], (settings) => {
    const fontSize = settings.fontSize || '16px';
    const backgroundColor = settings.backgroundColor || '#fdfdfd';
    const textColor = settings.textColor || '#202124';

    // Remove qualquer janela anterior
    const existingExplainer = document.getElementById('ia-explicador-container');
    if (existingExplainer) {
      existingExplainer.remove();
    }

    const container = document.createElement('div');
    container.id = 'ia-explicador-container';
    
    // Aplica os estilos customizados
    container.style.fontSize = fontSize;
    container.style.backgroundColor = backgroundColor;
    container.style.color = textColor;

    const contentDiv = document.createElement('div');
    contentDiv.id = 'ia-explicador-content';
    contentDiv.innerHTML = content;

    const closeButton = document.createElement('button');
    closeButton.id = 'ia-explicador-close';
    closeButton.innerText = 'X';
    closeButton.style.color = textColor; // Garante que o X seja visível em fundos escuros
    closeButton.onclick = () => container.remove();

    container.appendChild(closeButton);
    container.appendChild(contentDiv);
    document.body.appendChild(container);

    container.style.position = 'absolute';
    container.style.top = `${window.scrollY + rect.bottom + 10}px`;
    container.style.left = `${window.scrollX + rect.left}px`;

    setTimeout(() => {
      document.addEventListener('click', function onClickOutside(event) {
        if (!container.contains(event.target)) {
          container.remove();
          document.removeEventListener('click', onClickOutside);
        }
      });
    }, 0);
  });
}
