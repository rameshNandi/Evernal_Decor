"use client";

import { useState } from "react";
import { sendContactForm } from "@/app/actions/contact"; // ✅ correct import

export default function QuotationForm() {
  const [quotationData, setQuotationData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await sendContactForm({
      ...quotationData,
      includePDF: true, // ✅ place it here
    });

    if (res.success) {
      // ✅ Optional: Show a success message popup
      alert("Message sent! PDF quote has been emailed.");
    } else {
      alert("Something went wrong: " + res.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* your input fields like quotationData.name etc. */}
      <button type="submit">Send Message</button>
    </form>
  );
}
