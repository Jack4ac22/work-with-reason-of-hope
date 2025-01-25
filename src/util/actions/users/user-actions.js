"use server";
import { sendContactMail } from "@/util/lib/mailing/nodemailer";
import registerNewUser from "@/util/db-libraries/users-library/registerNewUser"

const blockedDomains = (process.env.BLOCKED_DOMAINS || "getmoreopportunities.info,growthmarketingnow.info,increasetraffic.shop").split(",");
const blockedWords = (process.env.BLOCKED_WORDS || "growth,marketing,formula,opportunity,profit,eco,crowdfunding").split(",");

function checkLinksForSpam(message, blockedWords) {
  const urlRegex = /https?:\/\/[^\s]+/gi;
  const links = message.match(urlRegex) || [];
  const spamWordsRegex = new RegExp(blockedWords.join("|"), "i");

  for (const link of links) {
    const decodedLink = decodeURIComponent(link);
    if (spamWordsRegex.test(decodedLink)) {
      return true;
    }
  }
  return false;
}

export async function registerUser(prevState, formData) {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const resume = formData.get("resume");
  const roles = formData.getAll("role"); // `getAll` to handle multiple checkboxes
  const agreement = formData.get("agreement");

  const errors = [];

  // Validate Full Name
  if (!fullName || fullName.trim() === "") {
    errors.push({ name: "fullName", message: "Full Name is required - الإسم الكامل مطلوب" });
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailDomain = email?.split("@")[1]?.toLowerCase();
  const emailUsername = email?.split("@")[0]?.toLowerCase();
  if (
    !email ||
    email.trim() === "" ||
    !emailRegex.test(email) ||
    blockedDomains.includes(emailDomain) ||
    blockedWords.some((word) => emailUsername.includes(word) || emailDomain.includes(word))
  ) {
    errors.push({
      name: "email",
      message: "This field is required or contains invalid data - هذا الحقل مطلوب أو يحتوي على بيانات غير صالحة",
    });
  }

  // Validate Resume
  if (!resume || resume.trim() === "" || checkLinksForSpam(resume, blockedWords)) {
    errors.push({
      name: "resume",
      message: "Resume is required and must not contain inappropriate content - السيرة الذاتية مطلوبة ويجب أن لا تحتوي على محتوى غير لائق",
    });
  }

  // Validate Roles
  if (!roles || roles.length === 0) {
    errors.push({
      name: "role",
      message: "At least one role must be selected - يجب اختيار دور واحد على الأقل",
    });
  }

  // Validate Agreement
  if (!agreement) {
    errors.push({
      name: "agreement",
      message: "You must agree to the terms and conditions - يجب الموافقة على الشروط والأحكام",
    });
  }

  if (errors.length > 0) {
    return {
      prevState: {
        fullName,
        email,
        resume,
        roles,
        agreement,
      }, errors
    };
  }

  // Send email or save to the database


  // const response = await sendContactMail({ fullName, email, resume, roles });
  const data = { fullName, email, resume, roles, agreement };
  const newUser = await registerNewUser(data);
  const response = {newUser, message: "User has been registered successfully!"};

  return { prevState, response };
}
