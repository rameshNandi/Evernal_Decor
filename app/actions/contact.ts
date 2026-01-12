"use server";

import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  projectType: string;
  budget: string;
  message: string;
  timeline: string;
}

export async function sendContactForm(formData: ContactFormData) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Main email to admin
    const adminMailOptions = {
      from: `Evernal Decor <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🎨 New Design Inquiry - ${formData.service}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Design Inquiry - Evernal Decor</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    }

    body {
      background-color: #f9f8f6;
      padding: 20px 0;
      line-height: 1.6;
      color: #3a3a3a;
    }

    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(88, 56, 4, 0.08);
    }

    .email-header {
      background: linear-gradient(135deg, #583804 0%, #3a2a03 100%);
      padding: 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .header-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('https://evernaldecor.com/pattern.png') center/cover;
      opacity: 0.1;
    }

    .header-content {
      position: relative;
      z-index: 2;
    }

    .logo {
      height: 60px;
      width: auto;
      margin-bottom: 15px;
    }

    .header-title {
      color: #ffffff;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }

    .header-subtitle {
      color: rgba(255,255,255,0.9);
      font-size: 14px;
      font-weight: 400;
    }

    .email-body {
      padding: 30px;
    }

    .section-title {
      color: #583804;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 25px;
      position: relative;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 2px;
      background: #8c5c05;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 15px;
      margin-bottom: 30px;
    }

    .detail-item {
      background: #fafaf9;
      border: 1px solid #e8e2d6;
      border-radius: 6px;
      padding: 18px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .detail-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(88, 56, 4, 0.08);
    }

    .detail-icon {
      width: 24px;
      height: 24px;
      margin-bottom: 10px;
      opacity: 0.8;
    }

    .detail-label {
      font-size: 12px;
      font-weight: 600;
      color: #8c5c05;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }

    .detail-value {
      color: #3a3a3a;
      font-size: 15px;
      font-weight: 500;
    }

    .message-section {
      background: #f8f7f4;
      border-left: 4px solid #8c5c05;
      border-radius: 0 6px 6px 0;
      padding: 20px;
      margin: 30px 0;
    }

    .message-label {
      font-size: 12px;
      font-weight: 600;
      color: #8c5c05;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }

    .message-content {
      color: #3a3a3a;
      font-size: 15px;
      line-height: 1.7;
    }

    .action-section {
      text-align: center;
      margin: 35px 0;
    }

    .btn {
      display: inline-block;
      padding: 12px 28px;
      margin: 0 8px;
      text-decoration: none;
      border-radius: 4px;
      font-size: 15px;
      font-weight: 500;
      transition: all 0.3s ease;
      min-width: 140px;
    }

    .btn-primary {
      background: #583804;
      color: white;
      border: 1px solid #583804;
    }

    .btn-primary:hover {
      background: #6e4a0a;
      border-color: #6e4a0a;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(88, 56, 4, 0.15);
    }

    .btn-secondary {
      background: white;
      color: #583804;
      border: 1px solid #8c5c05;
    }

    .btn-secondary:hover {
      background: #f5f2ec;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(88, 56, 4, 0.1);
    }

    .social-section {
      text-align: center;
      margin: 40px 0 30px;
    }

    .social-title {
      font-size: 16px;
      font-weight: 500;
      color: #583804;
      margin-bottom: 20px;
      position: relative;
      display: inline-block;
    }

    .social-title::before,
    .social-title::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 40px;
      height: 1px;
      background: #e0d6c2;
    }

    .social-title::before {
      left: -50px;
    }

    .social-title::after {
      right: -50px;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 0;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      text-decoration: none;
      transition: all 0.3s ease;
      margin: 0 8px;
    }

    .social-icon {
      width: 18px;
      height: 18px;
      transition: all 0.3s ease;
    }

    .social-link:hover .social-icon {
      transform: scale(1.2);
    }

    .signature-section {
      background: #f8f7f5;
      padding: 25px;
      text-align: center;
      margin-top: 20px;
      border-radius: 6px;
    }

    .signature-text {
      margin: 0;
      font-size: 14px;
      color: #3a3a3a;
    }

    .signature-name {
      margin: 5px 0 0;
      font-size: 16px;
      font-weight: 600;
      color: #8c5c05;
    }

    .footer {
      background: #2a2a2a;
      color: white;
      padding: 30px;
      text-align: center;
    }

    .footer-logo {
      height: 40px;
      width: auto;
      margin-bottom: 15px;
      opacity: 0.8;
    }

    .footer-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 15px;
    }

    .footer-text {
      font-size: 13px;
      opacity: 0.7;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 20px;
    }

    .footer-link {
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      font-size: 12px;
      transition: color 0.3s ease;
    }

    .footer-link:hover {
      color: #e0d6c2;
    }

    @media (max-width: 600px) {
      .email-header {
        padding: 25px 20px;
      }
      
      .details-grid {
        grid-template-columns: 1fr;
      }
      
      .btn {
        display: block;
        width: 100%;
        margin: 10px 0;
      }
      
      .social-title::before,
      .social-title::after {
        width: 20px;
      }
      
      .social-title::before {
        left: -30px;
      }
      
      .social-title::after {
        right: -30px;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <div class="header-overlay"></div>
      <div class="header-content">
        <img src="https://evernaldecor.com/evernal%20decor%200nly%20logo.png" alt="Evernal Decor" class="logo">
        <h1 class="header-title">New Project Inquiry</h1>
        <p class="header-subtitle">${formData.service} Request</p>
      </div>
    </div>

    <div class="email-body">
      <h2 class="section-title">Client Information</h2>

      <div class="details-grid">
        <div class="detail-item">
          <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" class="detail-icon" alt="Name icon">
          <div class="detail-label">Full Name</div>
          <div class="detail-value">${formData.name}</div>
        </div>

        <div class="detail-item">
          <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" class="detail-icon" alt="Email icon">
          <div class="detail-label">Email</div>
          <div class="detail-value">${formData.email}</div>
        </div>

        <div class="detail-item">
          <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" class="detail-icon" alt="Phone icon">
          <div class="detail-label">Phone</div>
          <div class="detail-value">${formData.phone || "Not provided"}</div>
        </div>

        <div class="detail-item">
          <img src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png" class="detail-icon" alt="Service icon">
          <div class="detail-label">Service</div>
          <div class="detail-value">${formData.service}</div>
        </div>

        <div class="detail-item">
          <img src="https://cdn-icons-png.flaticon.com/512/2936/2936719.png" class="detail-icon" alt="Project icon">
          <div class="detail-label">Project Type</div>
          <div class="detail-value">${formData.projectType || "Not specified"}</div>
        </div>

        <div class="detail-item">
          <img src="https://cdn-icons-png.flaticon.com/512/2942/2942813.png" class="detail-icon" alt="Budget icon">
          <div class="detail-label">Budget</div>
          <div class="detail-value">${formData.budget || "Not specified"}</div>
        </div>

        <div class="detail-item">
          <img src="https://cdn-icons-png.flaticon.com/512/2693/2693507.png" class="detail-icon" alt="Timeline icon">
          <div class="detail-label">Timeline</div>
          <div class="detail-value">${formData.timeline || "Not specified"}</div>
        </div>
      </div>

      <div class="message-section">
        <div class="message-label">Client Message</div>
        <div class="message-content">
          ${formData.message || "No message provided"}
        </div>
      </div>

      <div class="action-section">
        <a href="mailto:${formData.email}" class="btn btn-primary">Reply via Email</a>
        ${formData.phone ? `<a href="tel:${formData.phone}" class="btn btn-secondary">Call Client</a>` : ""}
      </div>

    
  </div>
</body>
</html>
`,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: `Evernal Decor <${process.env.SMTP_USER}>`,
      to: formData.email,
      subject: "✨ Thank you for contacting Evernal Decor!",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Thank You - Evernal Decor</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f3f0; color:#583804;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff; border:1px solid #e0d6c2; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Top Bar -->
          <tr>
            <td style="background-color:#fff4e8; padding:12px 20px; border-bottom:1px solid #e0d6c2; font-size:14px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="color:#8c5c05;">📐 Project Inquiry</td>
                  <td align="right"><a href="https://evernaldecor.com" style="color:#8c5c05; text-decoration:none; font-weight:bold;">Evernal Decor</a></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td align="center" bgcolor="#583804" style="padding:40px 20px; color:#fff;">
              <img src="https://evernaldecor.com/evernal%20decor%200nly%20logo.png" alt="Evernal Decor Logo" width="80" style="display:block; margin-bottom:20px;">
              <h1 style="margin:0; font-size:26px;">Thank You!</h1>
              <p style="margin:8px 0 0; font-size:16px;">We've received your design inquiry</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td align="center" style="padding:40px 30px 10px;">
              <p style="font-size:18px; font-weight:600;">Hello ${formData.name}!</p>
            </td>
          </tr>

          <!-- Highlight Box -->
          <tr>
            <td style="padding:0 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f5; border-left:4px solid #8c5c05; padding:20px; margin:20px 0;">
                <tr>
                  <td>
                    <h3 style="margin:0 0 10px; font-size:16px;">Your Inquiry is Confirmed</h3>
                    <p style="margin:0; font-size:14px;">
                      We've received your request for <strong>${formData.service}</strong> and our design team will review it carefully.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:0 30px;">
              <p style="font-size:15px; line-height:1.6;">
                Thank you for choosing Evernal Decor. Our team will contact you within <strong>24 hours</strong> with a personalized consultation.
              </p>
              <p style="font-size:15px; line-height:1.6;">
                Meanwhile, explore our portfolio and follow us on social media.
              </p>
            </td>
          </tr>

          <!-- CTA Buttons -->
          <tr>
            <td align="center" style="padding:30px;">
              <a href="https://evernaldecor.com/portfolio" style="background:#583804; color:#fff; text-decoration:none; padding:12px 24px; margin:5px; display:inline-block; border-radius:4px;">View Portfolio</a>
              <a href="https://evernaldecor.com/services" style="border:1px solid #8c5c05; color:#583804; text-decoration:none; padding:12px 24px; margin:5px; display:inline-block; border-radius:4px;">Our Services</a>
            </td>
          </tr>

          <!-- Social Icons -->
          <tr>
            <td align="center" style="padding:20px;">
              <p style="font-size:16px; font-weight:600;">Follow Our Design Journey</p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td><a href="https://www.facebook.com/evernaldecore/"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" width="32" style="margin:0 6px;"></a></td>
                  <td><a href="https://www.instagram.com/evernaldecor_/"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="32" style="margin:0 6px;"></a></td>
                  <td><a href="https://twitter.com/evernaldecor"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="32" style="margin:0 6px;"></a></td>
                  <td><a href="https://www.linkedin.com/company/evernaldecor"><img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" width="32" style="margin:0 6px;"></a></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td align="center" style="padding:20px; background:#f8f7f5;">
              <p style="margin:0; font-size:14px;">Warm regards,</p>
              <p style="margin:5px 0 0; font-size:16px; font-weight:600; color:#8c5c05;">The Evernal Decor Team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" bgcolor="#583804" style="padding:20px; color:#fff;">
              <h3 style="margin:0; font-size:16px;">Evernal Decor</h3>
              <p style="font-size:12px; opacity:0.8; line-height:1.5; margin:10px 0;">
                © ${new Date().getFullYear()} Evernal Decor. All rights reserved.<br>
                Sent in response to your inquiry.
              </p>
              <p style="font-size:12px;">
                <a href="https://evernaldecor.com" style="color:#e0d6c2; text-decoration:none; margin:0 5px;">Website</a> |
                <a href="https://evernaldecor.com/contact" style="color:#e0d6c2; text-decoration:none; margin:0 5px;">Contact</a> |
                <a href="https://evernaldecor.com/privacy-policy" style="color:#e0d6c2; text-decoration:none; margin:0 5px;">Privacy</a> |
                <a href="https://evernaldecor.com/terms-conditions" style="color:#e0d6c2; text-decoration:none; margin:0 5px;">Terms</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>

`,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
}
