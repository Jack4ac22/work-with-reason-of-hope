"use client";
import { useActionState } from "react";
import { useState } from "react";
import Link from "next/link";

export default function RegistrationForm({ action }) {
  const [state, formAction] = useActionState(action, {});
  const [language, setLanguage] = useState("en");
  const labels = {
    en: {
      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      email: "Email Address",
      emailPlaceholder: "Enter your email address",
      role: "Desired Role",
      proofreader: "Proofreader",
      translator: "Translator",
      editor: "Editor",
      admin: "Admin",
      submit: "Submit",
      resume: "Resume",
      resumePlaceholder: "Please provide a brief resume of your Journey of faith and experiences in the field of translation and proofreading.",
      agreement: "I agree to the terms and conditions",
      agreementLinkLabel: "Read terms and conditions",
      agreementLink: "/terms",
      formTitle: "Register new user form.",
      formDescription: "Please fill up the form below. We will contact you shortly to complete your registration.",
    },
    ar: {
      fullName: "الإسم الكامل",
      fullNamePlaceholder: "ادخل اسمك الكامل",
      email: "البريد الإلكتروني",
      emailPlaceholder: "ادخل بريدك الإلكتروني",
      role: "الدور المطلوب",
      proofreader: "مصحح لغوي",
      translator: "مترجم",
      editor: "محرر",
      admin: "مشرف",
      submit: "إرسال",
      resume: "السيرة الذاتية",
      resumePlaceholder: "يرجى تقديم سيرة ذاتية موجزة لرحلتك في الإيمان وتجاربك في مجال الترجمة والمراجعة.",
      agreement: "أوافق على الشروط والأحكام",
      agreementLinkLabel: "قراءة الشروط والأحكام",
      agreementLink: "/terms",
      formTitle: "نموذج تسجيل مستخدم جديد.",
      formDescription: "يرجى ملء النموذج أدناه. سنتصل بك قريبًا لإتمام تسجيلك.",
    },
  };

  const currentLabels = labels[language];
  const prevState = state?.prevState || {};


  const getError = (fieldName) =>
    state?.errors?.find((error) => error.name === fieldName);

  return (
    <>
      {state?.response ? (
        <div className="form-container" dir={language === "ar" ? "rtl" : "ltr"}>
          <div className="form-wrapper">
            <div>
              <p>{state?.response?.message}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="form-container" dir={language === "ar" ? "rtl" : "ltr"}>
          <div className="form-wrapper">
            <div>
              {/* Language Selector */}
              <div className="mb-4">
                <label className="form-label" htmlFor="language">
                  Language / اللغة
                </label>
                <select
                  id="language"
                  name="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="h-10 form-input"
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>

              {/* Form */}
              <form action={formAction}>
                <div className="form-card text-lightShade-800 dark:text-lightShade-100">
                  <div className="form-grid">

                    {/* Form Title and Description */}
                    <div className="">
                      <p className="font-medium text-lg">{currentLabels.formTitle}</p>
                      <p>{currentLabels.formDescription}</p>
                    </div>

                    {/* Form Fields */}

                    <div className="lg:col-span-2">
                      <div className="form-fields-grid">


                        {/* Full Name */}
                        <div className="md:col-span-5">
                          <label htmlFor="fullName" className="block ">
                            {currentLabels.fullName}
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            className={`h-10 form-input ${getError("fullName") ? "form-input-error" : "form-input-border"}`}
                            placeholder={
                              language === "en"
                                ? currentLabels.fullNamePlaceholder
                                : currentLabels.fullNamePlaceholder
                            }
                            aria-invalid={!!getError("fullName")}
                            defaultValue={prevState.fullName || ""}
                            lang={language}
                          />
                          {getError("fullName") && (
                            <p className="form-error-message">
                              {getError("fullName").message}
                            </p>
                          )}
                        </div>

                        {/* Email Address */}
                        <div className="md:col-span-5">
                          <label htmlFor="email" className="block">
                            {currentLabels.email}
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className={`h-10 form-input ${getError("email") ? "form-input-error" : "form-input-border"}`}
                            placeholder={
                              language === "en"
                                ? currentLabels.emailPlaceholder
                                : currentLabels.emailPlaceholder
                            }
                            aria-invalid={!!getError("email")}
                            defaultValue={prevState.email || ""}
                            lang={language}
                          />
                          {getError("email") && (
                            <p className="form-error-message">
                              {getError("email").message}
                            </p>
                          )}
                        </div>

                        {/* Resume */}
                        <div className="md:col-span-5">
                          <label htmlFor="resume" className="block">
                            {currentLabels.resume}
                          </label>
                          <textarea
                            name="resume"
                            id="resume"
                            className={`h-20 form-input  ${getError("fullName") ? "form-input-error" : "form-input-border"}`}
                            placeholder={
                              language === "en"
                                ? currentLabels.resumePlaceholder
                                : currentLabels.resumePlaceholder
                            }
                            aria-invalid={!!getError("resume")}
                            defaultValue={prevState.resume || ""}
                            lang={language}
                          ></textarea>
                          {getError("resume") && (
                            <p className="form-error-message">
                              {getError("resume").message}
                            </p>
                          )}
                        </div>

                        {/* Role Desired */}
                        <div className="md:col-span-5">
                          <label htmlFor="role" className="block my-2">
                            {currentLabels.role}
                          </label>
                          <div className={`form-checkboxes-container ${getError("role") ? "form-input-error" : "form-input-border"}`}>
                            <label className="form-checkbox-container">
                              <input
                                type="checkbox"
                                name="role"
                                value="proofreader"
                                defaultChecked={prevState.roles?.includes("proofreader")}
                                className="form-checkbox"
                              />
                              <span className="ml-2">{currentLabels.proofreader}</span>
                            </label>
                            <label className="form-checkbox-container">
                              <input
                                type="checkbox"
                                name="role"
                                value="translator"
                                className="form-checkbox"
                                defaultChecked={prevState.roles?.includes("translator")}
                              />
                              <span className="ml-2">{currentLabels.translator}</span>
                            </label>
                            <label className="form-checkbox-container">
                              <input
                                type="checkbox"
                                name="role"
                                value="editor"
                                className="form-checkbox"
                                defaultChecked={prevState.roles?.includes("editor")}
                              />
                              <span className="ml-2">{currentLabels.editor}</span>
                            </label>
                            <label className="form-checkbox-container">
                              <input
                                type="checkbox"
                                name="role"
                                value="admin"
                                className="form-checkbox"
                                defaultChecked={prevState.roles?.includes("admin")}
                              />
                              <span className="ml-2">{currentLabels.admin}</span>
                            </label>
                          </div>
                          {getError("role") && (
                            <p className="form-error-message">
                              {getError("role").message}
                            </p>
                          )}
                        </div>

                        {/* Agreement */}
                        <div className={`md:col-span-5 ${getError("agreement") ? "border rounded form-input-error" : ""}`}>
                          <div className={`form-checkbox-container `}>
                            <input
                              type="checkbox"
                              id="agreement"
                              name="agreement"
                              className="form-checkbox"
                            />
                            <label htmlFor="agreement" className="ml-2">
                              {currentLabels.agreement}
                            </label>
                          </div>
                          <p className="text-sm text-blue-500">
                            <Link href={currentLabels.agreementLink} target="_blank">
                              {currentLabels.agreementLinkLabel}
                            </Link>
                          </p>
                          {getError("agreement") && (
                            <p className="form-error-message">
                              {getError("agreement").message}
                            </p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-5 text-right">
                          <button
                            className="form-button"
                            type="submit"
                          >
                            {currentLabels.submit}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>)}
    </>
  );
}
