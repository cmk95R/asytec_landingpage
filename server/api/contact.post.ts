import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, phone, email, message } = body

  if (!name || !phone || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Todos los campos son requeridos' })
  }

  // Acá podés integrar Nodemailer, Resend, SendGrid, etc.
  // Ejemplo con Resend:
  //
  // const { Resend } = await import('resend')
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'web@asytec.com',
  //   to: 'info@asytec.com',
  //   subject: `Nuevo contacto web de ${name}`,
  //   html: `<p><b>Nombre:</b> ${name}</p><p><b>Teléfono:</b> ${phone}</p><p><b>Email:</b> ${email}</p><p><b>Mensaje:</b> ${message}</p>`,
  // })

  console.log('[Contact Form]', { name, phone, email, message })

  return { success: true }
})
