"use server";
import {
  transporter,
  getMailOptionsNoCC,
  getMailHtmlTemplate,
  getMailTextTemplate,
} from "@/lib/util/mailing/nodemailer";
import { logError } from "@/lib/db-libraries/logs/db-logs";

const templates_folder_path = "/src/lib/util/mailing/templates";

/**
 * Sends a registration confirmation email to a new user.
 * @param {Object} data - The registration data for the email.
 * @param {string} data.email_verification_token - The unique token for verifying the user's email.
 * @param {string} data.jwt_token - The JWT token for authentication purposes via SearchParams.
 * @param {string} data.email - The recipient's email address.
 * @param {string} [data.title] - The optional email subject title.
 * @returns {Promise<Object|Error>} - Returns an info object from Nodemailer if successful, or an error object if the request fails.
 */
export const sendRegisterationMail = async (data) => {
  const template_html_string = getMailHtmlTemplate(
    "registeration",
    templates_folder_path
  );
  const template_text_string = getMailTextTemplate(
    "registeration",
    templates_folder_path
  );
  const { email_verification_token, jwt_token, email, title } = data;
  const mailOptions = getMailOptionsNoCC(email);
  const html = template_html_string
    .replaceAll("${email_verification_token}", email_verification_token)
    .replaceAll("${jwt_token}", jwt_token)
    .replaceAll("${url}", process.env.NEXT_PUBLIC_URL);
  const text = template_text_string
    .replaceAll("${email_verification_token}", email_verification_token)
    .replaceAll("${jwt_token}", jwt_token)
    .replaceAll("${url}", process.env.NEXT_PUBLIC_URL);
  try {
    const info = await transporter.sendMail({
      ...mailOptions,
      subject: title || "Registration Confirmation - تأكيد تسجيل الحساب",
      text: text,
      html: html,
    });
    return info;
  } catch (error) {
    await logError("Email request failed", error);
    return error;
  }
};
