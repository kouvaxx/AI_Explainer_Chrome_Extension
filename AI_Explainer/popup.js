document.addEventListener('DOMContentLoaded', () => {
  const settings = {
    fontSize: '16px', // Padrão
    backgroundColor: '#fdfdfd', // Padrão
  };

  const fontButtons = document.querySelectorAll('#font-size-options button');
  const colorSwatches = document.querySelectorAll('#color-options .color-swatch');

  // Função para atualizar a classe 'active' nos botões
  const updateActiveClass = (elements, value) => {
    elements.forEach(el => {
      if (el.dataset.value === value) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  };

  // Carrega as configurações salvas e atualiza a UI
  chrome.storage.sync.get(['fontSize', 'backgroundColor'], (result) => {
    settings.fontSize = result.fontSize || settings.fontSize;
    settings.backgroundColor = result.backgroundColor || settings.backgroundColor;

    updateActiveClass(fontButtons, settings.fontSize);
    updateActiveClass(colorSwatches, settings.backgroundColor);
  });

  // Adiciona listeners para os botões de tamanho de fonte
  fontButtons.forEach(button => {
    button.addEventListener('click', () => {
      const newSize = button.dataset.value;
      chrome.storage.sync.set({ fontSize: newSize }, () => {
        updateActiveClass(fontButtons, newSize);
      });
    });
  });

  // Adiciona listeners para as amostras de cor
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const newColor = swatch.dataset.value;
      // Determina a cor do texto com base na cor de fundo para garantir a legibilidade
      const newTextColor = newColor === '#333333' ? '#f1f3f4' : '#202124';
      
      chrome.storage.sync.set({
        backgroundColor: newColor,
        textColor: newTextColor
      }, () => {
        updateActiveClass(colorSwatches, newColor);
      });
    });
  });

  // Abre a página de opções completa em uma nova aba
  const optionsLink = document.querySelector('.about-section a');
  if (optionsLink) {
    optionsLink.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: e.target.href });
    });
  }
});
