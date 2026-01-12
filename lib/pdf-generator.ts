export function generateQuotationPDF(formData: any) {
  // Create a comprehensive HTML content for the PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Evernal Decor - Project Quotation</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #8c5c05; padding-bottom: 20px; }
        .logo { font-size: 28px; font-weight: bold; color: #583804; margin-bottom: 10px; }
        .subtitle { color: #7f5405; font-size: 16px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 18px; font-weight: bold; color: #583804; margin-bottom: 15px; border-bottom: 1px solid #dddddc; padding-bottom: 5px; }
        .info-row { margin-bottom: 10px; }
        .label { font-weight: bold; color: #7f5405; display: inline-block; width: 150px; }
        .value { color: #333; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #949494; }
        .estimate { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px; }
        .features-list { margin-left: 20px; }
        .total-price { font-size: 24px; font-weight: bold; color: #8c5c05; text-align: center; padding: 20px; background-color: #f0f0f0; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Evernal Decor</div>
        <div class="subtitle">Premium Interior Design Services</div>
        <div style="margin-top: 10px; font-size: 14px;">
          PS ABACUS, #640, 6th Floor, Plot No: II E/23, AA IIE, Newtown, Kolkata- 700161<br>
          Phone: +91 8697891111 | Website: www.evernaldecor.com
        </div>
      </div>

      <div class="section">
        <div class="section-title">Project Quotation</div>
        <div class="info-row">
          <span class="label">Date:</span>
          <span class="value">${new Date().toLocaleDateString()}</span>
        </div>
        <div class="info-row">
          <span class="label">Quote ID:</span>
          <span class="value">ED-${Date.now()}</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Client Information</div>
        <div class="info-row">
          <span class="label">Name:</span>
          <span class="value">${formData.name || "N/A"}</span>
        </div>
        <div class="info-row">
          <span class="label">Email:</span>
          <span class="value">${formData.email || "N/A"}</span>
        </div>
        <div class="info-row">
          <span class="label">Phone:</span>
          <span class="value">${formData.phone || "N/A"}</span>
        </div>
      </div>

  
      <div class="section">
        <div class="section-title">Project Details</div>
        <div class="info-row">
          <span class="label">Category:</span>
          <span class="value">${formData.category || "N/A"}</span>
        </div>
        <div class="info-row">
          <span class="label">Style:</span>
          <span class="value">${formData.style || "N/A"}</span>
        </div>
        <div class="info-row">
          <span class="label">Selected Features:</span>
        </div>
        <div class="features-list">
          ${Object.entries(formData.features || {})
            .map(([feature, price]) => `<div>• ${feature}: ₹${(price as number).toLocaleString()}</div>`)
            .join("")}
        </div>
      </div>

      <div class="total-price">
        Total Project Cost: ₹${(formData.totalPrice || 0).toLocaleString()}
      </div>

      <div class="estimate">
        <div class="section-title">Terms & Conditions</div>
        <ul>
          <li>This quotation is valid for 30 days from the date of issue</li>
          <li>50% advance payment required to commence work</li>
          <li>Final payment due upon project completion</li>
          <li>Prices include design, materials, and installation</li>
          <li>Any additional work will be charged separately</li>
          <li>Project timeline: 6-12 weeks depending on scope</li>
        </ul>
      </div>

      <div class="section">
        <div class="section-title">Next Steps</div>
        <ol>
          <li>Schedule a complimentary consultation call</li>
          <li>Site visit and detailed requirements gathering</li>
          <li>Concept development and design proposal</li>
          <li>Contract signing and project commencement</li>
        </ol>
      </div>

      <div class="footer">
        <p>Thank you for choosing Evernal Decor for your interior design needs.</p>
        <p>© 2024 Evernal Decor. All rights reserved.</p>
      </div>
    </body>
    </html>
  `

  // Create a blob and download
  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `Evernal-Decor-Quote-${Date.now()}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
