// Seleciona o formulário
const form = document.getElementById('contactForm');
// Seleciona o elemento para exibir mensagens de status
const statusMessage = document.getElementById('statusMessage');

// URL do seu Web App do Google Apps Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbwQ5EgDxpluv63jgF78FCNJlgxSJoZy5TUTJT2kDUWHt_s70PQzGSOXr7eG2d2ePzVp/exec';

// Adiciona um event listener para o evento de envio do formulário
form.addEventListener('submit', function(event) {
    // Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // Crie um iframe temporário (técnica para contornar o CORS)
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Crie um formulário dentro do iframe
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const iframeForm = iframeDocument.createElement('form');
    iframeForm.method = 'POST';
    iframeForm.action = scriptURL;
    
    // Adicione campos ao formulário
    const nameField = iframeDocument.createElement('input');
    nameField.name = 'name';
    nameField.value = name;
    iframeForm.appendChild(nameField);
    
    const emailField = iframeDocument.createElement('input');
    emailField.name = 'email';
    emailField.value = email;
    iframeForm.appendChild(emailField);
    
    // Adicione o formulário ao iframe e envie
    iframeDocument.body.appendChild(iframeForm);
    
    // Exiba mensagem de "enviando"
    statusMessage.textContent = 'Enviando dados...';
    statusMessage.className = 'status-message';
    statusMessage.style.display = 'block';
    statusMessage.style.backgroundColor = '#FFA500';
    
    // Envie o formulário
    iframeForm.submit();
    
    // Limpe o formulário original
    form.reset();
    
    // Aguarde um momento e depois exiba mensagem de sucesso
    setTimeout(() => {
        statusMessage.textContent = 'Dados enviados com sucesso!';
        statusMessage.className = 'status-message success';
        
        // Remova a mensagem após 3 segundos
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 3000);
    }, 1500);
    
    // Remova o iframe após um tempo
    setTimeout(() => {
        iframe.remove();
    }, 5000);
});