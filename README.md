
# 📖 AI Explainer - Chrome Extension  

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  
[![Made with Chrome Extensions](https://img.shields.io/badge/Made%20with-Chrome%20Extensions-blue)](https://developer.chrome.com/docs/extensions/)  
[![Powered by AI](https://img.shields.io/badge/Powered%20by-AI-purple)](#funcionalidades)  

Extensão para Google Chrome que utiliza **IA** para explicar o significado de palavras e frases selecionadas diretamente no navegador.  
Ideal para estudantes, profissionais e curiosos que querem aprender sem sair da página atual.  

---

## 🚀 Funcionalidades

- ✨ Explicação simples e objetiva de palavras ou frases.  
- 🌍 Suporte a múltiplos idiomas (dependendo do modelo de IA).  
- 📚 Exemplos e analogias para facilitar o entendimento.  
- 🎨 Interface leve, prática e integrada ao Chrome.  

---

## 🖼️ Demonstração

Selecione qualquer palavra ou frase e obtenha a explicação instantânea:  

<img width="1089" height="834" alt="image" src="https://github.com/user-attachments/assets/9ca426b3-185a-4f14-b14e-451bc1e45275" />
  

---

## ⚙️ Instalação

1. Clone este repositório:  

   ```bash
   git clone https://github.com/kouvaxx/AI_Explainer_Chrome_Extension.git
   cd AI_Explainer_Chrome_Extension
````

2. Abra o Chrome e acesse:

   ```
   chrome://extensions/
   ```

3. Ative o **Modo do desenvolvedor** (canto superior direito).

4. Clique em **Carregar sem compactação** e selecione a pasta do projeto.

5. O ícone da extensão aparecerá na barra do navegador.

---

## 📂 Estrutura do Projeto

```
AI_Explainer_Chrome_Extension/
│
├── manifest.json        # Configuração da extensão (nome, permissões, ícones)
├── background.js        # Script de background
├── content_script.js    # Captura seleção de texto e interação com páginas
├── popup/               # Interface popup
│     ├── popup.html
│     ├── popup.js
│     └── popup.css
├── assets/              # Ícones e imagens
├── api/                 # Integração com IA (ex: OpenAI, Gemini, etc.)
│     └── service.js
└── README.md            # Documentação
```

---

## 🔑 Configuração

* Crie uma chave de API do serviço de IA que será utilizado (ex: OpenAI, Gemini).
* Insira a chave no arquivo de configuração correspondente (`service.js` ou `.env`).

Exemplo (OpenAI):

```javascript
const API_KEY = "SUA_CHAVE_AQUI";
```

---

## 🤝 Contribuição

Contribuições são muito bem-vindas!

1. Faça um fork do projeto.
2. Crie uma branch: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'feat: minha nova feature'`.
4. Push para a branch: `git push origin minha-feature`.
5. Abra um Pull Request.

---

## 📜 Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).

---

## 👨‍💻 Autor

Projeto criado por [**Jaisson Bertolini (kouvaxx)**](https://github.com/kouvaxx).

```

---

