import { Resend } from 'resend'

// Initialiser Resend seulement si la clé API est configurée
const getResend = () => {
  const apiKey = import.meta.env.VITE_RESEND_API_KEY
  if (!apiKey || apiKey === '') {
    return null
  }
  return new Resend(apiKey)
}

// Configuration
const ADMIN_EMAIL = 'contact@modernizehub.com'
const FROM_EMAIL = 'Modernize Hub <onboarding@resend.dev>' // À changer avec votre domaine vérifié

/**
 * Vérifier si le service d'email est configuré
 */
const isEmailConfigured = () => {
  return !!import.meta.env.VITE_RESEND_API_KEY
}

/**
 * Envoyer un email à l'admin lors d'une nouvelle demande de devis
 */
export const sendAdminNotification = async (lead) => {
  if (!isEmailConfigured()) {
    console.warn('⚠️ Resend non configuré. Les emails ne seront pas envoyés.')
    return { success: false, error: 'Email service not configured' }
  }

  const resend = getResend()
  if (!resend) {
    return { success: false, error: 'Resend API key not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `🔥 Nouvelle demande de devis - ${lead.name}`,
      html: generateAdminEmailTemplate(lead),
      text: generateAdminEmailText(lead),
    })

    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email admin:', error)
      return { success: false, error }
    }

    console.log('✅ Email admin envoyé avec succès')
    return { success: true, data }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email admin:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Envoyer un email de confirmation au prospect
 */
export const sendConfirmationEmail = async (lead) => {
  if (!isEmailConfigured()) {
    console.warn('⚠️ Resend non configuré. Les emails ne seront pas envoyés.')
    return { success: false, error: 'Email service not configured' }
  }

  if (!lead.email) {
    console.warn('⚠️ Pas d\'email pour le prospect, email de confirmation non envoyé.')
    return { success: false, error: 'No email provided' }
  }

  const resend = getResend()
  if (!resend) {
    return { success: false, error: 'Resend API key not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [lead.email],
      subject: '✅ Votre demande de devis a bien été reçue - Modernize Hub',
      html: generateConfirmationEmailTemplate(lead),
      text: generateConfirmationEmailText(lead),
    })

    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error)
      return { success: false, error }
    }

    console.log('✅ Email de confirmation envoyé avec succès')
    return { success: true, data }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Envoyer les deux emails (admin + confirmation)
 */
export const sendLeadEmails = async (lead) => {
  const results = {
    admin: await sendAdminNotification(lead),
    confirmation: await sendConfirmationEmail(lead),
  }

  return results
}

// ========== TEMPLATES EMAIL ==========

/**
 * Template HTML pour l'email admin
 */
const generateAdminEmailTemplate = (lead) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://modernizehub.com'
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande de devis</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #D9FF00 0%, #000000 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #000; margin: 0; font-size: 28px;">🔥 Nouvelle Demande de Devis</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #000; margin-top: 0;">Informations du prospect :</h2>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr>
        <td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 150px;">Nom :</td>
        <td style="padding: 10px; background: #ffffff;">${lead.name || 'Non renseigné'}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Email :</td>
        <td style="padding: 10px; background: #ffffff;">
          <a href="mailto:${lead.email}" style="color: #D9FF00; text-decoration: none;">${lead.email || 'Non renseigné'}</a>
        </td>
      </tr>
      ${lead.phone ? `
      <tr>
        <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Téléphone :</td>
        <td style="padding: 10px; background: #ffffff;">
          <a href="tel:${lead.phone}" style="color: #000; text-decoration: none;">${lead.phone}</a>
        </td>
      </tr>
      ` : ''}
      ${lead.budget ? `
      <tr>
        <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Budget :</td>
        <td style="padding: 10px; background: #ffffff; color: #D9FF00; font-weight: bold;">${lead.budget}</td>
      </tr>
      ` : ''}
    </table>
    
    ${lead.message ? `
    <div style="margin: 20px 0;">
      <h3 style="color: #000; margin-bottom: 10px;">Message :</h3>
      <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #D9FF00; border-radius: 5px;">
        <p style="margin: 0; white-space: pre-wrap;">${lead.message}</p>
      </div>
    </div>
    ` : ''}
    
    <div style="margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 5px;">
      <p style="margin: 0; font-size: 14px; color: #666;">
        <strong>Type :</strong> ${lead.type === 'quote' ? 'Demande de devis' : 'Rendez-vous'}<br>
        <strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}
      </p>
    </div>
    
    <div style="margin-top: 30px; text-align: center;">
      <a href="${siteUrl}/admin" 
         style="display: inline-block; background: #D9FF00; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
        Voir dans l'espace admin
      </a>
    </div>
  </div>
  
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
    <p>Modernize Hub - Système de notification automatique</p>
  </div>
</body>
</html>
  `
}

/**
 * Template texte pour l'email admin
 */
const generateAdminEmailText = (lead) => {
  return `
🔥 Nouvelle Demande de Devis

Informations du prospect :
- Nom : ${lead.name || 'Non renseigné'}
- Email : ${lead.email || 'Non renseigné'}
${lead.phone ? `- Téléphone : ${lead.phone}` : ''}
${lead.budget ? `- Budget : ${lead.budget}` : ''}

${lead.message ? `Message :\n${lead.message}\n` : ''}

Type : ${lead.type === 'quote' ? 'Demande de devis' : 'Rendez-vous'}
Date : ${new Date().toLocaleString('fr-FR')}
  `.trim()
}

/**
 * Template HTML pour l'email de confirmation prospect
 */
const generateConfirmationEmailTemplate = (lead) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://modernizehub.com'
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Demande reçue</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #D9FF00 0%, #000000 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #000; margin: 0; font-size: 28px;">✅ Demande Reçue !</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; color: #000;">Bonjour <strong>${lead.name || 'Cher prospect'}</strong>,</p>
    
    <p>Merci pour votre demande de devis ! Nous avons bien reçu votre message et nous vous recontacterons dans les <strong>24 heures</strong>.</p>
    
    <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #D9FF00; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #000;">Récapitulatif de votre demande :</h3>
      <p><strong>Type :</strong> Demande de devis</p>
      ${lead.budget ? `<p><strong>Budget :</strong> ${lead.budget}</p>` : ''}
      <p><strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}</p>
    </div>
    
    <div style="margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #D9FF00 0%, #000000 100%); border-radius: 5px; color: #000;">
      <h3 style="margin-top: 0;">🎯 Prochaines étapes :</h3>
      <ol style="margin: 10px 0; padding-left: 20px;">
        <li>Notre équipe analyse votre demande</li>
        <li>Nous vous contactons sous <strong>24h</strong> pour discuter de votre projet</li>
        <li>Vous recevez un devis personnalisé</li>
      </ol>
    </div>
    
    <p>En attendant, n'hésitez pas à consulter notre <a href="${siteUrl}/#portfolio" style="color: #D9FF00; text-decoration: none; font-weight: bold;">portfolio</a> pour voir nos réalisations.</p>
    
    <p style="margin-top: 30px;">À très bientôt,<br>
    <strong style="color: #D9FF00;">L'équipe Modernize Hub</strong></p>
  </div>
  
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
    <p>Modernize Hub - Agence de création web professionnelle</p>
    <p>Vous avez reçu cet email car vous avez soumis une demande sur notre site.</p>
  </div>
</body>
</html>
  `
}

/**
 * Template texte pour l'email de confirmation
 */
const generateConfirmationEmailText = (lead) => {
  return `
✅ Demande Reçue !

Bonjour ${lead.name || 'Cher prospect'},

Merci pour votre demande de devis ! Nous avons bien reçu votre message et nous vous recontacterons dans les 24 heures.

Récapitulatif de votre demande :
- Type : Demande de devis
${lead.budget ? `- Budget : ${lead.budget}` : ''}
- Date : ${new Date().toLocaleString('fr-FR')}

Prochaines étapes :
1. Notre équipe analyse votre demande
2. Nous vous contactons sous 24h pour discuter de votre projet
3. Vous recevez un devis personnalisé

À très bientôt,
L'équipe Modernize Hub

Modernize Hub - Agence de création web professionnelle
  `.trim()
}
