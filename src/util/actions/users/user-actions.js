"use server";
import { sendContactMail } from "@/util/lib/mailing/nodemailer";
import registerNewUser from "@/util/db-libraries/users-library/registerNewUser"
import findUserByfield from "@/util/db-libraries/users-library/findUser"
import { decodeJWT } from "@/util/lib/jwt/jwt";

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
  const response = { newUser, message: "User has been registered successfully!" };

  return { prevState, response };
}

export async function activateUser(prevState, formData) {
  const password = formData.get("password");
  const verifyPassword = formData.get("verifyPassword");
  const userName = formData.get("userName");
  const token = formData.get("token");
  const errors = [];
  let user = null;

  const tokenContent = decodeJWT(token);
  if (!tokenContent) {
    errors.push({
      name: "token",
      message: "Invalid token - توكن غير صالح.",
    });
  }

  if (tokenContent.email) {
    user = await findUserByfield("email", tokenContent.email);
    if (!user) {
      errors.push({
        name: "token",
        message: "Invalid token - توكن غير صالح.",
      });
    }
  }



  if (!password || password.trim() === "") {
    errors.push({
      name: "password",
      message: "Password is required - كلمة السر مطلوبة.",
    });
  }

  if (password !== verifyPassword) {
    errors.push({
      name: "password",
      message: "Password must match - كلمة السر يجب ان تتطابق.",
    }, {
      name: "verifyPassword",
      message: "Password must match - كلمة السر يجب ان تتطابق.",
    });
  }

  // passwprd minimum 8 chars 
  if(password.trim().length < 8){
    errors.push({
      name: "password",
      message: "Password must be at least 8 characters - كلمة السر يجب ان تكون على الاقل 8 حروف.",
    });
  }



  // username is optional but it should be unique

  if (userName) {
    const existingUser = await findUserByfield("username", userName);
    if (existingUser) {
      errors.push({
        name: "username",
        message: "Username already exists - الاسم المستخدم موجود بالفعل.",
      });
    }
  }
  

  // check the validity of the token

  // check if the user exists

  // check the user is not already activated



  if (errors.length > 0) {
    return {
      prevState: {
        password,
        verifyPassword,
        userName,
        token,
      }, errors
    };
  }
  const data = { password, token, user };

  console.log(data);


  const response = { message: "User has been activated successfully!" };
  return { prevState, response };
}