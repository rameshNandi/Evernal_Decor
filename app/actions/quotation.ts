"use server";

import nodemailer from "nodemailer";
import crypto from "crypto";
import jsPDF from "jspdf";

// In-memory storage for OTPs (in production, use Redis or database)
const otpStore = new Map<string, { otp: string; expires: number }>();

interface QuotationData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  area?: string;
  category: "residential" | "commercial";
  features: { [key: string]: number };
  style: "basic" | "standard" | "luxury";
}

// Create transporter using environment variables
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

async function generateQuotationPDF(data: QuotationData): Promise<string> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const logoWidth = 40;
  const logoHeight = 20;

  // Color palette
  const colors = {
    primary: "#7f5405", // Bronze
    secondary: "#583804", // Dark brown
    accent: "#8c5c05", // Gold
    textDark: "#040404", // Black
    textMedium: "#475569", // Slate
    textLight: "#949494", // Dusty
    background: "#f8f8f8", // Light gray
    border: "#dddddc", // Quill gray
    warning: "#8c1c13", // Red
    success: "#166534" // Green
  };

  // Calculate totals
  const featuresTotal = Object.values(data.features).reduce((sum, price) => sum + price, 0);
  const styleMultipliers = { basic: 1, standard: 1.5, luxury: 2.2 };
  const styleMultiplier = styleMultipliers[data.style];
  const finalTotal = featuresTotal * styleMultiplier;

  // Add logo
  try {
    const logoUrl = "https://evernaldecor.com/evernal%20decor%200nly%20logo.png";
    const base64Logo = await loadImageAsBase64(logoUrl);
    if (base64Logo) {
      doc.addImage(base64Logo, "PNG", margin, 15, logoWidth, logoHeight);
    }
  } catch (e) {
    console.error("Could not load logo:", e);
  }

  // Header section
  doc.setFillColor(colors.primary);
  doc.rect(0, 0, pageWidth, 12, "F");
  
  // Company info right-aligned
  doc.setTextColor(colors.primary);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("EVERNAL DECOR", pageWidth - margin, 20, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Interior Design Solutions", pageWidth - margin, 25, { align: "right" });
  // doc.text("GSTIN: 22ABCDE1234F1Z5", pageWidth - margin, 30, { align: "right" });

  // Quotation title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colors.secondary);
  doc.text("QUOTATION", pageWidth / 2, 50, { align: "center" });

  // Quotation details
  doc.setFontSize(10);
  doc.setTextColor(colors.textMedium);
  doc.text(`Quotation No: Q-${Math.floor(1000 + Math.random() * 9000)}`, margin, 60);
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, margin, 65);
  doc.text(`Valid Until: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}`, margin, 70);

  // Client and Project Information side by side
  let yPos = 85;
  const columnWidth = (pageWidth - 3 * margin) / 2;
  
  // Client Information (Left Column)
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colors.secondary);
  doc.text("CLIENT INFORMATION", margin, yPos);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(colors.textMedium);
  doc.text(`Name: ${data.name}`, margin, yPos + 8);
  doc.text(`Email: ${data.email}`, margin, yPos + 16);
  if (data.phone) {
    doc.text(`Phone: ${data.phone}`, margin, yPos + 24);
  }

  // Project Information (Right Column)
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colors.secondary);
  doc.text("PROJECT DETAILS", margin + columnWidth + margin, yPos);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(colors.textMedium);
  doc.text(`Category: ${data.category.charAt(0).toUpperCase() + data.category.slice(1)}`, margin + columnWidth + margin, yPos + 8);
  doc.text(`Style: ${data.style.charAt(0).toUpperCase() + data.style.slice(1)}`, margin + columnWidth + margin, yPos + 16);
  doc.text(`Area: ${data.area || 'Not specified'} sq.ft`, margin + columnWidth + margin, yPos + 24);

  // Items table - starts below the taller of the two columns
  yPos += 40; // Adjusted to prevent overlap
  
  // Table header
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colors.secondary);
  doc.text("SERVICES & PRICING", margin, yPos);
  
  yPos += 8;
  doc.setFillColor(colors.primary);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("No.", margin + 5, yPos + 6);
  doc.text("DESCRIPTION", margin + 20, yPos + 6);
  doc.text("AMOUNT", pageWidth - margin - 5, yPos + 6, { align: "right" });
  
  // Table rows
  doc.setTextColor(colors.textDark);
  let rowNumber = 1;
  yPos += 15; // Start first row below header
  
  Object.entries(data.features).forEach(([feature, price]) => {
    // Check if we need a new page (leave 40mm at bottom for totals)
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(9);
    doc.text(rowNumber.toString(), margin + 5, yPos);
    doc.text(feature, margin + 20, yPos);
    doc.text(price.toLocaleString('en-IN'), pageWidth - margin - 5, yPos, { align: "right" });
    
    // Add separator if not last row
    if (rowNumber < Object.keys(data.features).length) {
      doc.setDrawColor(colors.border);
      doc.line(margin, yPos + 4, pageWidth - margin, yPos + 4);
    }
    
    yPos += 8;
    rowNumber++;
  });

  // Summary section
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal:", pageWidth - margin - 40, yPos, { align: "right" });
  doc.text(featuresTotal.toLocaleString('en-IN'), pageWidth - margin - 5, yPos, { align: "right" });
  
  yPos += 7;
  doc.text("Style Multiplier:", pageWidth - margin - 40, yPos, { align: "right" });
  doc.text(`${styleMultiplier}x`, pageWidth - margin - 5, yPos, { align: "right" });
  
  yPos += 10;
  doc.setFillColor(colors.primary);
  doc.rect(margin, yPos - 2, pageWidth - 2 * margin, 12, "F");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("TOTAL PROJECT COST:", pageWidth - margin - 40, yPos + 5, { align: "right" });
  doc.text(finalTotal.toLocaleString('en-IN'), pageWidth - margin - 5, yPos + 5, { align: "right" });

  // Notes
  yPos += 25;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colors.secondary);
  doc.text("NOTES:", margin, yPos);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(colors.textDark);
  const notes = [
    "1. This quotation is valid for 30 days from the date of issue.",
    "2. Prices are subject to change based on final measurements.",
    "3. Any changes in design will affect the final pricing."
  ];
  notes.forEach((note, i) => {
    doc.text(note, margin + 5, yPos + 6 + (i * 6));
  });

  // Footer
  const footerY = 280;
  doc.setFontSize(8);
  doc.setTextColor(colors.textLight);
  doc.text(`© ${new Date().getFullYear()} Evernal Decor. All rights reserved.`, 
    pageWidth / 2, footerY + 10, { align: "center" });

  return doc.output("datauristring").split(",")[1];
}

// Helper to convert remote image URL to base64
async function loadImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("Failed to load image:", err);
    return null;
  }
}

export async function sendOTP(email: string) {
  try {
    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with 10-minute expiration
    otpStore.set(email, {
      otp,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    const transporter = createTransporter();

    const mailOptions = {
      from: `"${process.env.COMPANY_NAME || "Evernal Decor"}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: "Email Verification Code - Evernal Decor Quotation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9;">
          <!-- Header -->
          <div style="background: linear-gradient(to right, #7f5405, #583804); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Email Verification</h1>
          </div>

          <!-- Content -->
          <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #583804; margin-bottom: 20px;">Verify Your Email Address</h2>

            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              Thank you for your interest in our interior design services. Please use the verification code below to proceed with your quotation request:
            </p>

            <!-- OTP Code Box -->
            <div style="background: #fdf6e3; border: 2px solid #8c5c05; border-radius: 10px; padding: 30px; text-align: center; margin: 30px 0;">
              <h3 style="color: #583804; margin-bottom: 15px;">Your Verification Code</h3>
              <div style="font-size: 36px; font-weight: bold; color: #7f5405; letter-spacing: 8px; font-family: monospace;">
                ${otp}
              </div>
            </div>

            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.
            </p>

            <!-- Social Media -->
            <div style="text-align: center; margin: 40px 0 20px;">
              <div style="font-size: 18px; font-weight: 600; color: #583804; margin-bottom: 20px;">
                Follow Our Design Journey
              </div>
              <div>
                <a href="https://www.facebook.com/evernaldecore/" target="_blank" style="margin: 0 8px;">
                  <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" width="24" />
                </a>
                <a href="https://www.instagram.com/evernaldecor_/" target="_blank" style="margin: 0 8px;">
                  <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24" />
                </a>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #2d2d2d; color: #ccc; padding: 24px 20px 16px; text-align: center; border-radius: 0 0 12px 12px;">
            <img src="https://evernaldecor.com/evernal%20decor%200nly%20logo.png" alt="Evernal Decor Logo" width="42" style="margin-bottom: 8px;" />
            <p style="margin: 0 0 6px; font-size: 13px; color: #aaa;">Transforming spaces, creating dreams.</p>
            <p style="margin: 0 0 12px; font-size: 13px; color: #aaa;">
              PS ABACUS, #640, 6th Floor, Plot No: IF/2, A1, N.E Newtown, Kolkata – 700157
            </p>

            <!-- Footer Links -->
            <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin: 10px auto;">
              <tr>
                <td style="padding: 0 10px;">
                  <a href="https://evernaldecor.com" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 13px;">Website</a>
                </td>
                <td style="padding: 0 10px;">
                  <a href="https://evernaldecor.com/contact" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 13px;">Contact</a>
                </td>
                <td style="padding: 0 10px;">
                  <a href="https://evernaldecor.com/privacy" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 13px;">Privacy</a>
                </td>
                <td style="padding: 0 10px;">
                  <a href="https://evernaldecor.com/terms" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 13px;">Terms</a>
                </td>
              </tr>
            </table>

            <p style="color: #999; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Evernal Decor. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Failed to send OTP" };
  }
}

export async function verifyOTP(email: string, inputOtp: string) {
  try {
    const storedData = otpStore.get(email);

    if (!storedData) {
      return { success: false, message: "OTP not found or expired" };
    }

    if (Date.now() > storedData.expires) {
      otpStore.delete(email);
      return { success: false, message: "OTP has expired" };
    }

    if (storedData.otp !== inputOtp) {
      return { success: false, message: "Invalid OTP" };
    }

    // OTP is valid, remove it from store
    otpStore.delete(email);

    return { success: true, message: "Email verified successfully" };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, message: "Failed to verify OTP" };
  }
}

async function sendLeadNotification(data: QuotationData) {
  try {
    const transporter = createTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

    const featuresTotal = Object.values(data.features).reduce(
      (sum, price) => sum + price,
      0
    );
    const styleMultipliers = { basic: 1, standard: 1.5, luxury: 2.2 };
    const styleMultiplier = styleMultipliers[data.style];
    const finalTotal = featuresTotal * styleMultiplier;

    const featuresListHtml = Object.entries(data.features)
      .map(
        ([feature, price]) => `<li>${feature} - ₹${price.toLocaleString()}</li>`
      )
      .join("");

    const mailOptions = {
      from: `"Evernal Decor" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `🔥 New Lead: ${data.category.charAt(0).toUpperCase() + data.category.slice(1)} Project - ₹${finalTotal.toLocaleString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f9f9f9;">
          <!-- HEADER -->
          <div style="background: linear-gradient(to right, #dc2626, #b91c1c); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🔥 NEW LEAD ALERT</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Quotation Request Generated</p>
          </div>

          <!-- MAIN CARD -->
          <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            
            <!-- Value Badge -->
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
              <h2 style="color: #92400e; margin: 0 0 10px; font-size: 24px;">High-Value Lead: ₹${finalTotal.toLocaleString()}</h2>
              <p style="color: #b45309; font-size: 16px; margin: 0;">Immediate follow-up recommended</p>
            </div>

            <!-- Client & Project Info Grid -->
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 30px;">
              <div style="flex: 1; min-width: 280px; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h3 style="color: #1e293b; font-size: 18px; margin-bottom: 15px;">👤 Client Details</h3>
                <p style="margin: 5px 0; color: #475569;"><strong>Name:</strong> ${data.name}</p>
                <p style="margin: 5px 0; color: #475569;"><strong>Email:</strong> ${data.email}</p>
                ${data.phone ? `<p style="margin: 5px 0; color: #475569;"><strong>Phone:</strong> ${data.phone}</p>` : ""}
                ${data.company ? `<p style="margin: 5px 0; color: #475569;"><strong>Company:</strong> ${data.company}</p>` : ""}
              </div>

              <div style="flex: 1; min-width: 280px; background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <h3 style="color: #166534; font-size: 18px; margin-bottom: 15px;">🏢 Project Info</h3>
                <p style="margin: 5px 0; color: #15803d;"><strong>Category:</strong> ${data.category.charAt(0).toUpperCase() + data.category.slice(1)}</p>
                <p style="margin: 5px 0; color: #15803d;"><strong>Style:</strong> ${data.style.charAt(0).toUpperCase() + data.style.slice(1)}</p>
                <p style="margin: 5px 0; color: #15803d;"><strong>Features:</strong> ${Object.keys(data.features).length} selected</p>
                ${data.area ? `<p style="margin: 5px 0; color: #15803d;"><strong>Area:</strong> ${data.area} sq.ft</p>` : ""}
              </div>
            </div>

            <!-- Pricing Summary -->
            <div style="background: #fefce8; border: 1px solid #fde047; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
              <h3 style="color: #a16207; margin-bottom: 15px; font-size: 18px;">💰 Pricing Breakdown</h3>
              <div>
                <h4 style="color: #92400e; margin: 0 0 10px;">Selected Features:</h4>
                <ul style="padding-left: 20px; color: #a16207; margin: 0 0 15px;">
                  ${featuresListHtml}
                </ul>
              </div>
              <div style="border-top: 2px solid #fbbf24; padding-top: 15px;">
                <p style="margin: 5px 0; color: #92400e;"><strong>Subtotal:</strong> ₹${featuresTotal.toLocaleString()}</p>
                <p style="margin: 5px 0; color: #92400e;"><strong>Style Multiplier:</strong> ${styleMultiplier}x (${data.style})</p>
                <p style="margin: 15px 0 0; font-size: 20px; font-weight: bold; color: #78350f;">
                  <strong>TOTAL: ₹${finalTotal.toLocaleString()}</strong>
                </p>
              </div>
            </div>

            <!-- CTA -->
            <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 25px; text-align: center;">
              <h3 style="color: #1d4ed8; margin-bottom: 15px;">⚡ Action Required</h3>
              <p style="color: #1e40af; font-size: 16px;">
                This lead has completed email verification and received their quotation.
                <br><strong>Follow up within 24 hours for best conversion rates!</strong>
              </p>
              <div style="margin-top: 20px;">
                <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(to right, #3b82f6, #1d4ed8); color: white; padding: 12px 24px; border-radius: 6px; font-weight: bold; text-decoration: none;">
                  Contact: ${data.email}
                </a>
                ${data.phone ? `
                <a href="tel:${data.phone}" style="display: inline-block; background: linear-gradient(to right, #10b981, #059669); color: white; padding: 12px 24px; border-radius: 6px; font-weight: bold; text-decoration: none; margin-left: 10px;">
                  Call: ${data.phone}
                </a>
                ` : ""}
              </div>
            </div>

            <!-- Timestamp -->
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                Lead generated on ${new Date().toLocaleString()} | Evernal Decor
              </p>
            </div>
          </div>

          <!-- Social Section -->
          <div style="text-align: center; margin: 40px 0 20px;">
            <div style="font-size: 18px; font-weight: 600; color: #583804; margin-bottom: 15px;">
              Follow Our Design Journey
            </div>
            <div>
              <a href="https://www.facebook.com/evernaldecore/" target="_blank" style="margin: 0 8px;">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" width="24" />
              </a>
              <a href="https://www.instagram.com/evernaldecor_/" target="_blank" style="margin: 0 8px;">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24" />
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #2d2d2d; color: #ccc; padding: 24px 20px 16px; text-align: center; border-radius: 0 0 12px 12px;">
            <img src="https://evernaldecor.com/evernal%20decor%200nly%20logo.png" alt="Evernal Decor Logo" width="42" style="margin-bottom: 8px;" />
            <p style="margin: 0 0 6px; font-size: 13px; color: #aaa;">Transforming spaces, creating dreams.</p>
            <p style="margin: 0 0 12px; font-size: 13px; color: #aaa;">
              PS ABACUS, #640, 6th Floor, Plot No: IF/2, A1, N.E Newtown, Kolkata – 700157
            </p>

            <!-- Footer Links -->
            <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin: 10px auto;">
              <tr>
                <td style="padding: 0 10px;">
                  <a href="https://evernaldecor.com" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 13px;">Website</a>
                </td>
                <td style="padding: 0 10px;">
                  <a href="https://evernaldecor.com/contact" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 13px;">Contact</a>
                </td>
                <td style="padding: 0 10px;">
                  <a href="https://evernaldecor.com/privacy" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 13px;">Privacy</a>
                </td>
                <td style="padding: 0 10px;">
                  <a href="https://evernaldecor.com/terms" style="color: rgba(255,255,255,0.7); text-decoration: none; font-size: 13px;">Terms</a>
                </td>
              </tr>
            </table>

            <p style="color: #999; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Evernal Decor. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Lead notification sent to admin");
  } catch (error) {
    console.error("Error sending lead notification:", error);
  }
}

export async function sendQuotationEmail(data: QuotationData) {
  try {
    const transporter = createTransporter();

    // Generate PDF
    const pdfBase64 = await generateQuotationPDF(data);

    // Calculate totals for email
    const featuresTotal = Object.values(data.features).reduce(
      (sum, price) => sum + price,
      0
    );
    const styleMultipliers = { basic: 1, standard: 1.5, luxury: 2.2 };
    const styleMultiplier = styleMultipliers[data.style];
    const finalTotal = featuresTotal * styleMultiplier;
    const gstPercentage = 18;
    const gstAmount = finalTotal * (gstPercentage / 100);
    const grandTotal = finalTotal + gstAmount;

    // Generate features list with prices for email
    const featuresListHtml = Object.entries(data.features)
      .map(
        ([feature, price]) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">${feature}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold; color: #583804;">₹${price.toLocaleString()}</td>
        </tr>
      `
      )
      .join("");

    const mailOptions = {
      from: `"Evernal Decor" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Your Interior Design Quotation - ${data.category.charAt(0).toUpperCase() + data.category.slice(1)} Project`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 5px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(to right, #7f5405, #583804); padding: 40px; text-align: center; border-radius: 15px 15px 0 0;">
            <img src="https://evernaldecor.com/evernal%20decor%200nly%20logo.png" alt="Evernal Decor Logo" width="120" style="margin-bottom: 15px;">
            <h1 style="color: white; margin: 0; font-size: 32px;">Professional Quotation</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px;">Interior Design Services</p>
          </div>
          
          <div style="background: white; padding: 40px; border-radius: 0 0 15px 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 40px;">
              <h2 style="color: #583804; margin-bottom: 20px; font-size: 24px;">Dear ${data.name},</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6;">
                Thank you for your interest in our interior design services. Please find below your detailed quotation for your ${data.category} project.
                A PDF copy is also attached for your records.
              </p>
            </div>

            <!-- Client Information -->
            <div style="background: #fdf6e3; border-left: 4px solid #8c5c05; padding: 25px; margin: 30px 0; border-radius: 0 10px 10px 0;">
              <h3 style="color: #583804; margin-bottom: 15px; font-size: 20px;">Client Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #7f5405; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #583804;">${data.name}</td>
                </tr>
                ${data.company ? `
                <tr>
                  <td style="padding: 8px 0; color: #7f5405; font-weight: bold;">Company:</td>
                  <td style="padding: 8px 0; color: #583804;">${data.company}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #7f5405; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0; color: #583804;">${data.email}</td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 8px 0; color: #7f5405; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px 0; color: #583804;">${data.phone}</td>
                </tr>
                ` : ""}
                ${data.address ? `
                <tr>
                  <td style="padding: 8px 0; color: #7f5405; font-weight: bold;">Address:</td>
                  <td style="padding: 8px 0; color: #583804;">${data.address}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <!-- Project Details -->
            <div style="margin: 40px 0;">
              <h3 style="color: #583804; margin-bottom: 20px; font-size: 20px;">Project Details</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef;">
                  <h4 style="color: #7f5405; margin: 0 0 10px 0;">Category</h4>
                  <p style="color: #583804; font-weight: bold; margin: 0; text-transform: capitalize;">${data.category}</p>
                </div>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef;">
                  <h4 style="color: #7f5405; margin: 0 0 10px 0;">Style Package</h4>
                  <p style="color: #583804; font-weight: bold; margin: 0; text-transform: capitalize;">${data.style}</p>
                </div>
                ${data.area ? `
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef;">
                  <h4 style="color: #7f5405; margin: 0 0 10px 0;">Area</h4>
                  <p style="color: #583804; font-weight: bold; margin: 0;">${data.area} sq.ft</p>
                </div>
                ` : ''}
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef;">
                  <h4 style="color: #7f5405; margin: 0 0 10px 0;">Quotation Date</h4>
                  <p style="color: #583804; font-weight: bold; margin: 0;">${new Date().toLocaleDateString('en-IN')}</p>
                </div>
              </div>
            </div>

            <!-- Features & Pricing -->
            <div style="margin: 40px 0;">
              <h3 style="color: #583804; margin-bottom: 20px; font-size: 20px;">Selected Features & Pricing</h3>
              <div style="background: white; border: 2px solid #8c5c05; border-radius: 10px; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: linear-gradient(to right, #7f5405, #583804);">
                      <th style="padding: 15px; text-align: left; color: white; font-size: 16px;">Feature</th>
                      <th style="padding: 15px; text-align: right; color: white; font-size: 16px;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${featuresListHtml}
                    <tr style="background: #fdf6e3;">
                      <td style="padding: 15px; font-weight: bold; color: #583804; border-top: 2px solid #8c5c05;">Subtotal</td>
                      <td style="padding: 15px; text-align: right; font-weight: bold; color: #583804; border-top: 2px solid #8c5c05;">₹${featuresTotal.toLocaleString()}</td>
                    </tr>
                    <tr style="background: #fdf6e3;">
                      <td style="padding: 15px; font-weight: bold; color: #7f5405;">GST (${gstPercentage}%)</td>
                      <td style="padding: 15px; text-align: right; font-weight: bold; color: #7f5405;">₹${gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Total Investment -->
            <div style="background: linear-gradient(to right, #8c5c05, #d4af37); padding: 30px; border-radius: 15px; text-align: center; margin: 40px 0;">
              <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px; opacity: 0.9;">Grand Total</h3>
              <div style="color: white; font-size: 42px; font-weight: bold; margin: 0;">₹${grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              <p style="color: rgba(255,255,255,0.8); margin: 15px 0 0 0; font-size: 14px;">*Prices are inclusive of design, materials, and installation</p>
            </div>

            <!-- Next Steps -->
            <div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 10px; padding: 25px; margin: 40px 0;">
              <h3 style="color: #2e7d32; margin-bottom: 15px; font-size: 20px;">Next Steps</h3>
              <ul style="color: #388e3c; margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>Review the quotation details carefully</li>
                <li>Contact us to discuss any modifications or questions</li>
                <li>Schedule a consultation to finalize the project scope</li>
                <li>Upon agreement, we'll proceed with detailed planning and execution</li>
              </ul>
            </div>

            <!-- Contact Information -->
            <div style="text-align: center; margin: 40px 0; padding: 30px; background: #f8f9fa; border-radius: 10px;">
              <h3 style="color: #583804; margin-bottom: 20px;">Ready to Get Started?</h3>
              <p style="color: #666; margin-bottom: 25px; font-size: 16px;">
                Our team is excited to bring your vision to life. Contact us to discuss your project in detail.
              </p>
              <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <a href="mailto:info@evernaldecor.com" style="display: inline-block; background: linear-gradient(to right, #7f5405, #583804); color: white; padding: 15px 30px; border-radius: 25px; text-decoration: none; font-weight: bold;">
                  Email Us
                </a>
                <a href="tel:+919876543210" style="display: inline-block; background: linear-gradient(to right, #10b981, #059669); color: white; padding: 15px 30px; border-radius: 25px; text-decoration: none; font-weight: bold;">
                  Call Us
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="margin-top: 50px; padding-top: 30px; border-top: 2px solid #eee; text-align: center;">
              <p style="color: #999; font-size: 14px; margin: 0 0 10px 0;">
                This quotation is valid for 30 days from the date of issue.
              </p>
              <p style="color: #999; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Evernal Decor. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Evernal_Quotation_${data.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`,
          content: pdfBase64,
          encoding: "base64",
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    // Send lead notification to admin
    await sendLeadNotification(data);

    return {
      success: true,
      message: "Quotation sent successfully",
      pdfBase64: pdfBase64,
    };
  } catch (error) {
    console.error("Error sending quotation:", error);
    return { success: false, message: "Failed to send quotation" };
  }
}