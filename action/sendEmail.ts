"use server";

import { validateString } from "@/lib/utils";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["cby371@gmail.com"],
      subject: "Message from contact from",
      replyTo: senderEmail as string,
      text: message as string,
    });
  } catch (error) {
    console.log(error);
  }
};
