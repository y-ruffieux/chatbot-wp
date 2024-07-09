document.addEventListener('DOMContentLoaded', function() {
    var chatHistory = document.getElementById('chat-history');
    var chatInput = document.getElementById('chat-input');
    var sendMessageBtn = document.getElementById('send-message');

    sendMessageBtn.addEventListener('click', function() {
        var userMessage = chatInput.value.trim();
        if (userMessage === '') {
            return;
        }

        // Afficher le message de l'utilisateur dans l'historique
        var userMessageDiv = document.createElement('div');
        userMessageDiv.textContent = 'Vous : ' + userMessage;
        userMessageDiv.style.marginBottom = '10px';
        chatHistory.appendChild(userMessageDiv);

        // Envoyer la requête au chatbot via fetch
        fetch('http://localhost:8000/hospital-rag-agent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            // Afficher la réponse du chatbot dans l'historique
            var botResponseDiv = document.createElement('div');
            botResponseDiv.textContent = 'Chatbot : ' + data.output;
            botResponseDiv.style.marginBottom = '10px';
            chatHistory.appendChild(botResponseDiv);

            // Effacer l'entrée de l'utilisateur après envoi
            chatInput.value = '';
        })
        .catch(error => {
            console.error('Erreur :', error);
            // Afficher l'erreur dans l'historique
            var errorDiv = document.createElement('div');
            errorDiv.textContent = 'Erreur : ' + error;
            errorDiv.style.color = 'red';
            errorDiv.style.marginBottom = '10px';
            chatHistory.appendChild(errorDiv);
        });
    });
});