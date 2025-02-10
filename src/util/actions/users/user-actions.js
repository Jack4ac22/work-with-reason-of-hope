"use server";
import { sendRegisterationMail } from "@/util/lib/mailing/templates/registeration/registeration-email.js";
import registerNewUser from "@/util/db-libraries/users-library/users-events/db-register-new-user"
import findUserByfield from "@/util/db-libraries/users-library/users-events/db-find-user"
import { decodeJWT } from "@/util/lib/jwt/jwt";

const blockedDomains = (process.env.BLOCKED_DOMAINS || "getmoreopportunities.info,growthmarketingnow.info,increasetraffic.shop").split(",");
const blockedWords = (process.env.BLOCKED_WORDS || "growth,marketing,formula,opportunity,profit,eco,crowdfunding").split(",");

/**
 * Checks for spam links in a given message.
 * @param {string} message - The message content to scan for spam links.
 * @param {string[]} blockedWords - List of words considered as spam.
 * @returns {boolean} True if spam is found, otherwise false.
 */
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

/**
 * Registers a new user with validation and generates verification tokens.
 * @param {Object} prevState - Previous state of the form.
 * @param {FormData} formData - Submitted form data.
 * @returns {Object} Updated state with success message or errors.
 */
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
  const user = await findUserByfield("email", email);
  if (user) {
    errors.push({
      name: "email",
      message: "This email is already registered - هذا البريد الالكتروني مسجل بالفعل",
      action: "login",
    });
  }
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


  // const response = await sendContactMail({ fullName, email, resume, roles });
  const data = { fullName, email, resume, roles, agreement };
  const newUser = await registerNewUser(data);
  const response = { newUser, message: "User has been registered successfully!" };

  try {
    sendRegisterationMail({ email, email_verification_token: newUser.email_verification_token, jwt_token: newUser.jwt_token });
  } catch (error) {
    console.log(error);
    // log errors to logs table

  }

  return { prevState, response };
}

/**
 * Activates a user account by validating the token and setting a new password.
 * 
 * @param {Object} prevState - The previous state of the form.
 * @param {FormData} formData - The form data submitted by the user.
 * @returns {Object} The updated state with success message or errors.
 */
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
  if (password.trim().length < 8) {
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


  // check the user is not already activated

  if (user) {
    if (user.is_active) {
      errors.push({
        name: "user",
        message: "User is already activated - المستخدم مفعل بالفعل.",
        action: "login",
      });
    }
  }



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


  const response = { message: "User has been activated successfully!" };
  return { prevState, response };
}