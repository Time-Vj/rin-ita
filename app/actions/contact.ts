"use server"

import { Resend } from "resend"

const resend = new Resend("")

interface ContactFormData {
  nome: string
  cognome: string
  email: string
  telefono?: string
  messaggio: string
}

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    // Estrai i dati dal form
    const data: ContactFormData = {
      nome: formData.get("nome") as string,
      cognome: formData.get("cognome") as string,
      email: formData.get("email") as string,
      telefono: (formData.get("telefono") as string) || "",
      messaggio: formData.get("messaggio") as string,
    }

    // Validazione base
    if (!data.nome || !data.cognome || !data.email || !data.messaggio) {
      return {
        success: false,
        message: "Tutti i campi obbligatori devono essere compilati.",
      }
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: "Inserisci un indirizzo email valido.",
      }
    }

    // Template HTML per l'email
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #40a644, #eee42c); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #40a644; }
            .value { margin-top: 5px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            .test-notice { background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="test-notice">
              <strong>🧪 MODALITÀ TEST</strong><br>
              Questa è una email di test per il sito Rinnova Italia. In produzione verrà inviata a commerciale@rinnovaitalia.it
            </div>
            
            <div class="header">
              <h2>🏠 Nuovo Contatto da Rinnova Italia</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nome e Cognome:</div>
                <div class="value">${data.nome} ${data.cognome}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${data.email}</div>
              </div>
              
              ${
                data.telefono
                  ? `
                <div class="field">
                  <div class="label">Telefono:</div>
                  <div class="value">${data.telefono}</div>
                </div>
              `
                  : ""
              }
              
              <div class="field">
                <div class="label">Messaggio:</div>
                <div class="value" style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #40a644;">
                  ${data.messaggio.replace(/\n/g, "<br>")}
                </div>
              </div>
              
              <div class="footer">
                <p>Questo messaggio è stato inviato dal modulo contatti del sito web Rinnova Italia.</p>
                <p>Data e ora: ${new Date().toLocaleString("it-IT")}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Invia email di test alla tua email
    const { data: emailData, error } = await resend.emails.send({
      from: "Test Rinnova Italia <onboarding@resend.dev>",
      to: ["vulnet.sej@gmail.com"],
      subject: `🧪 [TEST] Nuovo contatto da ${data.nome} ${data.cognome}`,
      html: htmlTemplate,
      replyTo: data.email,
    })

    if (error) {
      console.error("Errore invio email:", error)
      return {
        success: false,
        message: "Si è verificato un errore durante l'invio del messaggio. Riprova più tardi.",
      }
    }

    // Email di conferma al cliente
    const confirmationTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #40a644, #eee42c); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .highlight { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #40a644; margin: 20px 0; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; }
            .contact-info { background: white; padding: 15px; border-radius: 8px; margin-top: 20px; }
            .test-notice { background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="test-notice">
              <strong>🧪 MODALITÀ TEST</strong><br>
              Questa è una email di test. In produzione il sistema sarà completamente funzionante.
            </div>
            
            <div class="header">
              <h2>🏠 Grazie per averci contattato!</h2>
            </div>
            <div class="content">
              <p>Ciao <strong>${data.nome}</strong>,</p>
              
              <p>Grazie per aver contattato <strong>Rinnova Italia</strong>! Abbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.</p>
              
              <div class="highlight">
                <h3>Il tuo messaggio:</h3>
                <p><em>"${data.messaggio}"</em></p>
              </div>
              
              <p>Il nostro team di esperti in efficienza energetica esaminerà la tua richiesta e ti contatterà entro <strong>24 ore</strong> per fornirti tutte le informazioni di cui hai bisogno.</p>
              
              <div class="contact-info">
                <h4>I nostri contatti:</h4>
                <p>📍 <strong>Indirizzo:</strong> Piazzale Clodio 9, 00195 Roma</p>
                <p>📞 <strong>Telefono:</strong> +39 06 1234 5678</p>
                <p>✉️ <strong>Email:</strong> commerciale@rinnovaitalia.it</p>
                <p>🕒 <strong>Orari:</strong> Lun-Ven 9:00-18:00, Sab 9:00-13:00</p>
              </div>
              
              <div class="footer">
                <p>Questo è un messaggio automatico di conferma. Non rispondere a questa email.</p>
                <p><strong>Rinnova Italia</strong> - Efficienza, Sostenibilità, Innovazione</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Invia email di conferma al cliente
    await resend.emails.send({
      from: "Test Rinnova Italia <onboarding@resend.dev>",
      to: [data.email],
      subject: "✅ [TEST] Conferma ricezione messaggio - Rinnova Italia",
      html: confirmationTemplate,
    })

    return {
      success: true,
      message:
        "✅ Messaggio di test inviato con successo! Controlla la casella postale per vedere l'email ricevuta. Il cliente ha ricevuto la conferma.",
    }
  } catch (error) {
    console.error("Errore nel form di contatto:", error)
    return {
      success: false,
      message: "Si è verificato un errore imprevisto. Riprova più tardi o contattaci direttamente.",
    }
  }
}
