// lib/pdf.ts

import PDFDocument from "pdfkit";
import getStream from "get-stream";

export async function createQuotePDFBuffer(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  projectType: string;
  budget: string;
  message: string;
  timeline: string;
}) {
  const doc = new PDFDocument();

  doc.fontSize(18).text("Quotation Summary", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Name: ${data.name}`);
  doc.text(`Email: ${data.email}`);
  doc.text(`Phone: ${data.phone}`);
  doc.text(`Service: ${data.service}`);
  doc.text(`Project Type: ${data.projectType}`);
  doc.text(`Budget: ${data.budget}`);
  doc.text(`Timeline: ${data.timeline}`);
  doc.text(`Message: ${data.message}`);
  doc.text(`Generated On: ${new Date().toLocaleString()}`);

  doc.end();

  const buffer = await getStream(doc);
  return buffer;
}
