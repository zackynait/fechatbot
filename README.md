# Chatbot Pubblica Amministrazione

Frontend Chatbot per servizi della Pubblica Amministrazione con design system SDUILE e Bootstrap Italia.

## Caratteristiche

- **Design System SDUILE**: Conforme alle linee guida della Pubblica Amministrazione italiana
- **Bootstrap Italia**: Utilizza il framework UI ufficiale della PA
- **Responsive Design**: Ottimizzato per desktop, tablet e mobile
- **Accessibilità**: Conforme alle linee guida WCAG 2.1 AA
- **Chat Intelligente**: Risposte predefinite per servizi comuni
- **Interfaccia Moderna**: Design pulito e professionale

## Tecnologie Utilizzate

- **HTML5**: Semantica e accessibilità
- **CSS3**: Bootstrap Italia + stili personalizzati
- **JavaScript ES6+**: Logica del chatbot
- **Bootstrap Italia 2.8.5**: Framework UI della PA

## Struttura del Progetto

```
fechatbot/
├── index.html              # Pagina principale
├── css/
│   └── style.css          # Stili personalizzati
├── js/
│   └── chatbot.js         # Logica del chatbot
├── assets/
│   └── images/
│       └── bot-avatar.png # Avatar del bot
├── package.json           # Dipendenze e script
└── README.md             # Documentazione
```

## Installazione

### Prerequisiti
- Node.js (opzionale, per lo sviluppo locale)
- Un browser web moderno

### Setup Rapido

1. Clona o scarica il progetto
2. Apri `index.html` in un browser web

### Sviluppo Locale (opzionale)

Se hai Node.js installato:

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

## Funzionalità del Chatbot

### Servizi Supportati
- **CUD**: Certificazione Unica
- **Patente**: Documenti e procedure
- **Bonus Edilizi**: Ecobonus, Bonus Ristrutturazione
- **SPID**: Sistema Pubblico di Identità Digitale
- **Carta d'Identità**: Richiesta e rinnovo
- **Passaporto**: Documentazione e procedure
- **IMU**: Imposta Municipale Unica
- **IRPEF**: Dichiarazione dei redditi

### Funzionalità Interattive
- Messaggi suggeriti
- Azioni rapide
- Copia risposte
- Feedback utente
- Pulizia chat
- Indicatore di digitazione

## Accessibilità

Il progetto è progettato per essere accessibile:

- Navigazione da tastiera
- Screen reader friendly
- Contrast ratio adeguato
- Tag ARIA appropriati
- Focus management

## Personalizzazione

### Aggiungere Nuove Risposte

Modifica l'oggetto `responses` in `js/chatbot.js`:

```javascript
this.responses = {
    'nuova_chiave': 'La tua risposta personalizzata',
    // ... altre risposte
};
```

### Modificare Stili

I stili personalizzati sono in `css/style.css`. Per modifiche al layout principale, modifica le classi Bootstrap Italia.

### Branding

Cambia logo e colori modificando:
- Header in `index.html`
- Variabili CSS in `css/style.css`
- Asset in `assets/images/`

## Browser Supportati

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Licenza

MIT License

## Contributi

Per contribuire al progetto:

1. Fai fork del repository
2. Crea un branch feature
3. Apri una Pull Request

## Supporto

Per assistenza tecnica o domande:
- Controlla la documentazione
- Apri un issue nel repository

---

**Progetto sviluppato secondo le linee guida della Pubblica Amministrazione Italiana**
