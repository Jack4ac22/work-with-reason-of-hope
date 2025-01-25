"use client";
import { useFormState } from "react-dom";
import { useState } from "react";
import Link from "next/link";

export default function RegistrationForm({ action }) {
  const [state, formAction] = useFormState(action, {});
  const [language, setLanguage] = useState("en");
  const labels = {
    en: {
      fullName: "Full Name",
      email: "Email Address",
      role: "Desired Role",
      proofreader: "Proofreader",
      translator: "Translator",
      editor: "Editor",
      admin: "Admin",
      submit: "Submit",
      resume: "Resume",
      agreement: "I agree to the terms and conditions",
      agreementLinkLabel: "Read terms and conditions",
      agreementLink: "/terms",
      formTitle: "Register new user form.",
      formDescription: "Please fill up the form below. We will contact you shortly to complete your registration.",
    },
    ar: {
      fullName: "الإسم الكامل",
      email: "البريد الإلكتروني",
      role: "الدور المطلوب",
      proofreader: "مصحح لغوي",
      translator: "مترجم",
      editor: "محرر",
      admin: "مشرف",
      submit: "إرسال",
      resume: "السيرة الذاتية",
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
        <div className="min-h-screen p-6 bg-lightShade-100 dark:bg-darkShade-900 flex items-center justify-center" dir={language === "ar" ? "rtl" : "ltr"}>
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <p>{state?.response?.message}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen p-6 bg-lightShade-100 dark:bg-darkShade-900 flex items-center justify-center" dir={language === "ar" ? "rtl" : "ltr"}>
          <div className="container max-w-screen-lg mx-auto">
            <div>
              {/* Language Selector */}
              <div className="mb-4">
                <label className="block text-lightShade-800 dark:text-lightShade-100 font-bold mb-2" htmlFor="language">
                  Language / اللغة
                </label>
                <select
                  id="language"
                  name="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="h-10 border rounded px-4 w-full bg-lightShade-200 dark:bg-darkShade-800 text-lightShade-800 dark:text-lightShade-100"
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>

              {/* Form */}
              <form action={formAction}>
                <div className="bg-lightShade-100 dark:bg-darkShade-800 rounded shadow-lg p-4 px-4 md:p-8 mb-6 text-lightShade-800 dark:text-lightShade-100">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">

                    {/* Form Title and Description */}
                    <div className="">
                      <p className="font-medium text-lg">{currentLabels.formTitle}</p>
                      <p>{currentLabels.formDescription}</p>
                    </div>

                    {/* Form Fields */}

                    <div className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">


                        {/* Full Name */}
                        <div className="md:col-span-5">
                          <label htmlFor="fullName" className="block ">
                            {currentLabels.fullName}
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            className={`h-10 border mt-1 rounded px-4 w-full bg-lightShade-200 dark:bg-darkShade-800 text-lightShade-800 dark:text-lightShade-100 ${getError("fullName") ? "border-error-500" : "border-gray-300 dark:border-gray-700"}`}
                            placeholder={
                              language === "en"
                                ? "Please enter your full name"
                                : "الرجاء إدخال الإسم الكامل"
                            }
                            aria-invalid={!!getError("fullName")}
                            defaultValue={prevState.fullName || ""}
                            lang={language}
                          />
                          {getError("fullName") && (
                            <p className="text-error-500 text-xs mt-1">
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
                            className={`h-10 border mt-1 rounded px-4 w-full bg-lightShade-200 dark:bg-darkShade-800 text-lightShade-800 dark:text-lightShade-100 ${getError("email") ? "border-error-500" : "border-gray-300 dark:border-gray-700"}`}
                            placeholder={
                              language === "en"
                                ? "Please enter your email address"
                                : "الرجاء إدخال البريد الإلكتروني"
                            }
                            aria-invalid={!!getError("email")}
                            defaultValue={prevState.email || ""}
                            lang={language}
                          />
                          {getError("email") && (
                            <p className="text-error-500 text-xs mt-1">
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
                            className={`h-20 border mt-1 rounded px-4 w-full bg-lightShade-200 dark:bg-darkShade-800 text-lightShade-800 dark:text-lightShade-100 ${getError("fullName") ? "border-error-500" : "border-gray-300 dark:border-gray-700"}`}
                            placeholder={
                              language === "en"
                                ? "Please provide a brief resume of your Journey of faith and experiences in the field of translation and proofreading."
                                : "يرجى تقديم سيرة ذاتية موجزة لرحلتك في الإيمان وتجاربك في مجال الترجمة والمراجعة."
                            }
                            aria-invalid={!!getError("resume")}
                            defaultValue={prevState.resume || ""}
                            lang={language}
                          ></textarea>
                          {getError("resume") && (
                            <p className="text-error-500 text-xs mt-1">
                              {getError("resume").message}
                            </p>
                          )}
                        </div>

                        {/* Role Desired */}
                        <div className="md:col-span-5">
                          <label htmlFor="role" className="block my-2">
                            {currentLabels.role}
                          </label>
                          <div className={`grid grid-cols-2 gap-2 border mt-1 rounded px-4 w-full bg-lightShade-200 dark:bg-darkShade-800 text-lightShade-800 dark:text-lightShade-100 ${getError("role") ? "border-error-500" : "border-gray-300 dark:border-gray-700"}`}>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="role"
                                value="proofreader"
                                defaultChecked={prevState.roles?.includes("proofreader")}
                                className="form-checkbox"
                              />
                              <span className="ml-2">{currentLabels.proofreader}</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="role"
                                value="translator"
                                className="form-checkbox"
                                defaultChecked={prevState.roles?.includes("translator")}
                              />
                              <span className="ml-2">{currentLabels.translator}</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="role"
                                value="editor"
                                className="form-checkbox"
                                defaultChecked={prevState.roles?.includes("editor")}
                              />
                              <span className="ml-2">{currentLabels.editor}</span>
                            </label>
                            <label className="flex items-center">
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
                            <p className="text-error-500 text-xs mt-1">
                              {getError("role").message}
                            </p>
                          )}
                        </div>

                        {/* Agreement */}
                        <div className={`md:col-span-5 ${getError("agreement") ? "border rounded border-error-500" : ""}`}>
                          <div className={`flex items-center `}>
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
                            <p className="text-error-500 text-xs mt-1">
                              {getError("agreement").message}
                            </p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-5 text-right">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
