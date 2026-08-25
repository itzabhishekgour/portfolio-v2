import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 1. Send Email Notification via Web3Forms
    const emailPromise = fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "a735db9d-d886-4202-b25a-df38d21c3b1d",
        name: name,
        email: email,
        message: message,
        to_email: "mrasgour1004@gmail.com",
        from_name: "Abhishek Gour Portfolio",
        subject: `Portfolio Contact from ${name}`,
      }),
    });

    // 2. Append to Google Sheets Webhook
    const sheetWebhookUrl =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbwmTeAD_dnsmvqIOhH2Mjw7OMBPNExBcPTfQVZEf6jtbgY17kch899_hC5TPyNR2WNnew/exec";

    const sheetPromise = fetch(sheetWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    await Promise.allSettled([emailPromise, sheetPromise]);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully and logged!",
    });
  } catch (error) {
    console.error("Contact API Route Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process message request." },
      { status: 500 }
    );
  }
}
