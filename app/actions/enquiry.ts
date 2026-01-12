'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEnquiry(name: string, email: string, message: string) {
  await resend.emails.send({
    from: 'Everal Decor <noreply@evernaldecor.com>',
    to: [process.env.CONTACT_RECEIVER_EMAIL!],
    subject: `New Enquiry from ${name}`,
    html: `
      <h2>General Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  })
}
