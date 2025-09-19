// Salva as opções no chrome.storage
function save_options() {
  const apiKey = document.getElementById('apiKey').value;
  chrome.storage.sync.set({
    'geminiApiKey': apiKey
  }, () => {
    // Atualiza o status para que o usuário saiba que as opções foram salvas.
    const status = document.getElementById('status');
    status.textContent = 'Chave de API salva com sucesso!';
    setTimeout(() => {
      status.textContent = '';
    }, 2000);
  });
}

// Carrega a chave de API salva no chrome.storage
function restore_options() {
  chrome.storage.sync.get('geminiApiKey', (data) => {
    document.getElementById('apiKey').value = data.geminiApiKey || '';
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
