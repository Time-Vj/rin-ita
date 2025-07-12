# Configurazione Email per Rinnova Italia

## Setup Resend

1. **Registrati su Resend**: Vai su [resend.com](https://resend.com) e crea un account
2. **Ottieni API Key**: Nel dashboard, vai su "API Keys" e crea una nuova chiave
3. **Configura dominio**: Aggiungi il dominio `rinnovaitalia.it` nelle impostazioni
4. **Verifica DNS**: Configura i record DNS richiesti da Resend

## Variabili d'ambiente

Crea un file `.env.local` nella root del progetto:

\`\`\`env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=commerciale@rinnovaitalia.it
COMPANY_NAME=Rinnova Italia
\`\`\`

## Funzionalità Email

### Email all'azienda
- Riceve tutti i contatti dal sito
- Template HTML professionale
- Include tutti i dati del form
- Reply-to impostato sull'email del cliente

### Email di conferma al cliente
- Conferma automatica di ricezione
- Template brandizzato Rinnova Italia
- Include informazioni di contatto
- Promessa di risposta entro 24 ore

## Test del sistema

1. Compila il form sul sito
2. Verifica che arrivi l'email a `commerciale@rinnovaitalia.it`
3. Controlla che il cliente riceva la conferma
4. Testa con email diverse per verificare la validazione

## Alternative a Resend

Se preferisci altri servizi:

- **SendGrid**: Sostituisci Resend con `@sendgrid/mail`
- **Nodemailer + Gmail**: Per setup più semplice
- **EmailJS**: Per invio diretto dal frontend
- **Formspree**: Servizio esterno senza codice

## Monitoraggio

- Dashboard Resend per statistiche invii
- Log degli errori in console
- Feedback utente tramite messaggi di stato
