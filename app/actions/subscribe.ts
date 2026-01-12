'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function handleSubscription(email: string) {
  await resend.emails.send({
    from: 'Everal Decor <noreply@evernaldecor.com>',
    to: [process.env.CONTACT_RECEIVER_EMAIL!],
    subject: 'New Newsletter Subscriber',
    html: `<p><strong>Email:</strong> ${email}</p>`,
  })
}
