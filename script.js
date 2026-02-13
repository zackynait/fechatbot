// Chatbot Regione Lombardia JavaScript
// Implementazione basata sull'interfaccia mostrata nell'immagine

class ChatbotRegioneLombardia {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.sessionsList = document.getElementById('sessionsList');
        this.suggestedQuestions = document.getElementById('suggestedQuestions');
        this.responseTypeSection = document.getElementById('responseTypeSection');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        this.currentSessionId = 1;
        this.selectedResponseType = 'testo';
        this.sessions = this.loadSessions();
        
        this.initEventListeners();
        this.loadCurrentSession();
    }
    
    initEventListeners() {
        // Invio messaggio
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Nuova conversazione
        this.newChatBtn.addEventListener('click', () => this.createNewChat());
        
        // Domande suggerite
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.closest('.suggestion-btn').dataset.question;
                this.messageInput.value = question;
                this.sendMessage();
            });
        });
        
        // Tipi di risposta
        document.querySelectorAll('.response-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectResponseType(e.target.closest('.response-type-btn').dataset.type);
            });
        });
        
        // Sessioni
        this.sessionsList.addEventListener('click', (e) => {
            const sessionItem = e.target.closest('.session-item');
            if (sessionItem) {
                if (e.target.closest('.btn-delete')) {
                    this.deleteSession(sessionItem.dataset.sessionId);
                } else if (e.target.closest('.btn-icon')) {
                    this.editSession(sessionItem.dataset.sessionId);
                } else {
                    this.loadSession(sessionItem.dataset.sessionId);
                }
            }
        });
    }
    
    loadSessions() {
        const savedSessions = localStorage.getItem('chatbotSessions');
        if (savedSessions) {
            return JSON.parse(savedSessions);
        }
        
        // Sessioni di default
        return {
            1: {
                id: 1,
                title: 'Chat 01/12/2025 - 14:20',
                time: '14:20',
                messages: [
                    {
                        type: 'bot',
                        text: 'Ciao! Come posso esserti utile?',
                        timestamp: '01/12/2025 14:20:29'
                    }
                ]
            },
            2: {
                id: 2,
                title: 'Demo funzionamento chatbot',
                time: '11:16',
                messages: []
            },
            3: {
                id: 3,
                title: 'Chat 01/12/2025 - 11:16',
                time: '11:16',
                messages: []
            },
            4: {
                id: 4,
                title: 'Chatbot esempio',
                time: '10:30',
                messages: []
            }
        };
    }
    
    saveSessions() {
        localStorage.setItem('chatbotSessions', JSON.stringify(this.sessions));
    }
    
    loadCurrentSession() {
        this.loadSession(this.currentSessionId);
    }
    
    loadSession(sessionId) {
        this.currentSessionId = parseInt(sessionId);
        const session = this.sessions[this.currentSessionId];
        
        if (!session) return;
        
        // Aggiorna UI sessioni
        document.querySelectorAll('.session-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-session-id="${sessionId}"]`).classList.add('active');
        
        // Carica messaggi
        this.chatMessages.innerHTML = '';
        session.messages.forEach(msg => {
            this.displayMessage(msg);
        });
        
        // Nascondi suggerimenti se ci sono messaggi
        if (session.messages.length > 1) {
            this.suggestedQuestions.style.display = 'none';
        } else {
            this.suggestedQuestions.style.display = 'flex';
        }
    }
    
    createNewChat() {
        const now = new Date();
        const sessionId = Date.now();
        const timeString = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
        const dateString = now.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
        
        const newSession = {
            id: sessionId,
            title: `Chat ${dateString} - ${timeString}`,
            time: timeString,
            messages: [
                {
                    type: 'bot',
                    text: 'Ciao! Come posso esserti utile?',
                    timestamp: `${dateString} ${timeString}:29`
                }
            ]
        };
        
        this.sessions[sessionId] = newSession;
        this.saveSessions();
        this.addSessionToUI(newSession);
        this.loadSession(sessionId);
    }
    
    addSessionToUI(session) {
        const sessionHtml = `
            <div class="session-item" data-session-id="${session.id}">
                <div class="session-info">
                    <span class="session-title">${session.title}</span>
                    <span class="session-time">${session.time}</span>
                </div>
                <div class="session-actions">
                    <button class="btn-icon" title="Modifica">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-icon btn-delete" title="Elimina">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        this.sessionsList.insertAdjacentHTML('afterbegin', sessionHtml);
    }
    
    deleteSession(sessionId) {
        if (Object.keys(this.sessions).length <= 1) {
            alert('Non puoi eliminare l\'ultima sessione');
            return;
        }
        
        if (confirm('Sei sicuro di voler eliminare questa sessione?')) {
            delete this.sessions[sessionId];
            this.saveSessions();
            
            // Rimuovi dalla UI
            document.querySelector(`[data-session-id="${sessionId}"]`).remove();
            
            // Carica un'altra sessione
            const remainingIds = Object.keys(this.sessions);
            if (remainingIds.length > 0) {
                this.loadSession(remainingIds[0]);
            }
        }
    }
    
    editSession(sessionId) {
        const session = this.sessions[sessionId];
        const newTitle = prompt('Modifica titolo della sessione:', session.title);
        
        if (newTitle && newTitle.trim()) {
            session.title = newTitle.trim();
            this.saveSessions();
            
            // Aggiorna UI
            const sessionElement = document.querySelector(`[data-session-id="${sessionId}"] .session-title`);
            sessionElement.textContent = session.title;
        }
    }
    
    selectResponseType(type) {
        this.selectedResponseType = type;
        
        // Aggiorna UI
        document.querySelectorAll('.response-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-type="${type}"]`).classList.add('active');
    }
    
    sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message) return;
        
        // Aggiungi messaggio utente
        this.addMessage('user', message);
        
        // Pulisci input
        this.messageInput.value = '';
        
        // Nascondi suggerimenti
        this.suggestedQuestions.style.display = 'none';
        
        // Mostra indicatore di digitazione
        this.showTyping();
        
        // Simula risposta del bot
        setTimeout(() => {
            this.hideTyping();
            this.generateBotResponse(message);
        }, 1000 + Math.random() * 1000);
    }
    
    addMessage(type, text) {
        const now = new Date();
        const timestamp = now.toLocaleString('it-IT', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const message = { type, text, timestamp };
        
        // Aggiungi alla sessione corrente
        if (!this.sessions[this.currentSessionId]) {
            this.sessions[this.currentSessionId] = {
                id: this.currentSessionId,
                title: `Chat ${now.toLocaleDateString('it-IT')} - ${now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`,
                time: now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
                messages: []
            };
        }
        
        this.sessions[this.currentSessionId].messages.push(message);
        this.saveSessions();
        
        // Mostra messaggio
        this.displayMessage(message);
    }
    
    displayMessage(message) {
        const messageHtml = `
            <div class="message ${message.type}-message">
                <div class="message-bubble">
                    <p>${this.escapeHtml(message.text)}</p>
                    <span class="timestamp">${message.timestamp}</span>
                </div>
            </div>
        `;
        this.chatMessages.insertAdjacentHTML('beforeend', messageHtml);
        this.scrollToBottom();
    }
    
    generateBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let response = '';
        
        // Risposte predefinite per domande mediche/sanitarie
        if (lowerMessage.includes('pazienti') && lowerMessage.includes('ricoverati')) {
            response = this.generateResponseByType('Nel 2023 sono stati ricoverati circa 2.5 milioni di pazienti nelle strutture sanitarie lombarde. Di questi, il 65% sono stati ricoverati in regime ordinario, il 25% in day hospital e il 10% in regime di pronto soccorso.');
        } else if (lowerMessage.includes('farmaci') && lowerMessage.includes('tipologia')) {
            response = this.generateResponseByType('Lo scorso anno sono state prescritte circa 45 milioni di ricette farmaceutiche. La distribuzione per tipologia è: 40% farmaci di fascia A, 35% fascia C, 15% farmaci ospedalieri e 10% dispositivi medici.');
        } else if (lowerMessage.includes('pazienti') && lowerMessage.includes('monza')) {
            response = this.generateResponseByType('L\'ATS di Monza e Brianza segue circa 900.000 cittadini. Di questi, circa 150.000 sono pazienti cronici, 80.000 sono over 65 con patologie multiple e 25.000 sono pazienti in carico ai servizi di salute mentale.');
        } else if (lowerMessage.includes('medici') || lowerMessage.includes('dottori')) {
            response = this.generateResponseByType('In Regione Lombardia operano circa 35.000 medici, di cui 28.000 medici di medicina generale e 7.000 specialisti. Il rapporto medici-abitanti è di 1 medico ogni 350 abitanti, superiore alla media nazionale.');
        } else if (lowerMessage.includes('ospedali') || lowerMessage.includes('strutture')) {
            response = this.generateResponseByType('La rete ospedaliera lombarda comprende 105 strutture pubbliche e 60 private convenzionate. Ci sono 28.000 posti letto totali, di cui 18.000 in area medica, 7.000 in area chirurgica e 3.000 in area intensiva.');
        } else if (lowerMessage.includes('vaccini') || lowerMessage.includes('vaccinazioni')) {
            response = this.generateResponseByType('Nel 2023 sono state somministrate circa 8 milioni di dosi vaccinali. La copertura vaccinale per i bambini under 16 è del 95%, mentre per gli over 65 la copertura anti-influenzale ha raggiunto il 78%.');
        } else if (lowerMessage.includes('tempi') && lowerMessage.includes('attesa')) {
            response = this.generateResponseByType('I tempi medi di attesa per le prestazioni sanitarie in Lombardia sono: 15 giorni per visite specialistiche, 30 giorni per esami diagnostici, 5 giorni per pronto soccorso codice verde, 2 ore per codice giallo.');
        } else {
            response = this.generateResponseByType('Posso aiutarti con informazioni sui servizi sanitari della Regione Lombardia. Puoi chiedermi di: pazienti ricoverati, farmaci prescritti, ATS di Monza, numero medici, ospedali disponibili, vaccinazioni, tempi di attesa.');
        }
        
        this.addMessage('bot', response);
        
        // Mostra sezione tipo risposta dopo la prima risposta
        if (this.sessions[this.currentSessionId].messages.length > 2) {
            this.responseTypeSection.style.display = 'block';
        }
    }
    
    generateResponseByType(baseResponse) {
        switch (this.selectedResponseType) {
            case 'tabella':
                return this.generateTableResponse(baseResponse);
            case 'grafico':
                return this.generateChartResponse(baseResponse);
            default:
                return baseResponse;
        }
    }
    
    generateTableResponse(text) {
        // Estrai dati dal testo e crea una tabella semplice
        if (text.includes('2.5 milioni')) {
            return `
                <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <h4 style="margin: 0 0 10px 0; color: #333;">Ricoverati 2023 - Dettaglio</h4>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #f5f5f5;">
                            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Regime</th>
                            <th style="padding: 8px; text-align: right; border: 1px solid #ddd;">Pazienti</th>
                            <th style="padding: 8px; text-align: right; border: 1px solid #ddd;">Percentuale</th>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;">Ordinario</td>
                            <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">1.625.000</td>
                            <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">65%</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;">Day Hospital</td>
                            <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">625.000</td>
                            <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">25%</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;">Pronto Soccorso</td>
                            <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">250.000</td>
                            <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">10%</td>
                        </tr>
                    </table>
                </div>
            `;
        }
        return text;
    }
    
    generateChartResponse(text) {
        // Simula una rappresentazione testuale di un grafico
        if (text.includes('2.5 milioni')) {
            return `
                <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0;">
                    <h4 style="margin: 0 0 15px 0; color: #333;">Ricoverati 2023 - Grafico</h4>
                    <div style="display: flex; align-items: end; height: 150px; gap: 20px;">
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                            <div style="width: 60px; height: 97px; background: #8DC63F; border-radius: 4px 4px 0 0;"></div>
                            <span style="margin-top: 5px; font-size: 12px;">65%</span>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                            <div style="width: 60px; height: 38px; background: #6FA631; border-radius: 4px 4px 0 0;"></div>
                            <span style="margin-top: 5px; font-size: 12px;">25%</span>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                            <div style="width: 60px; height: 15px; background: #5A8A28; border-radius: 4px 4px 0 0;"></div>
                            <span style="margin-top: 5px; font-size: 12px;">10%</span>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-around; margin-top: 10px; font-size: 11px; color: #666;">
                        <span>Ordinario</span>
                        <span>Day Hospital</span>
                        <span>Pronto Soccorso</span>
                    </div>
                </div>
            `;
        }
        return text;
    }
    
    showTyping() {
        this.typingIndicator.style.display = 'block';
        this.scrollToBottom();
    }
    
    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inizializza il chatbot quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new ChatbotRegioneLombardia();
    
    // Focus sull'input
    document.getElementById('messageInput').focus();
    
    // Gestione accessibilità
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
});

// Gestione errori
window.addEventListener('error', (e) => {
    console.error('Chatbot error:', e.error);
});

// Supporto per screen reader
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});
