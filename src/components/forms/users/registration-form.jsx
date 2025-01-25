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

  const getError = (fieldName) =>
    state?.errors?.find((error) => error.name === fieldName);

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="language">
              Language / اللغة
            </label>
            <select
              id="language"
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="h-10 border rounded px-4 w-full bg-gray-50"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
          <form action={formAction} method="post">
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">{currentLabels.formTitle}</p>
                  <p>{currentLabels.formDescription}</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    {/* Full Name */}
                    <div className="md:col-span-5">
                      <label htmlFor="fullName" className="block text-gray-700">
                        {currentLabels.fullName}
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${getError("fullName") ? "border-red-500" : "border-gray-300"}`}
                        placeholder={
                          language === "en"
                            ? "Please enter your full name"
                            : "الرجاء إدخال الإسم الكامل"
                        }
                        aria-invalid={!!getError("fullName")}
                      />
                      {getError("fullName") && (
                        <p className="text-red-500 text-xs mt-1">
                          {getError("fullName").message}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="md:col-span-5">
                      <label htmlFor="email" className="block text-gray-700">
                        {currentLabels.email}
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${getError("email") ? "border-red-500" : "border-gray-300"}`}
                        placeholder={
                          language === "en"
                            ? "Please enter your email address"
                            : "الرجاء إدخال البريد الإلكتروني"
                        }
                        aria-invalid={!!getError("email")}
                      />
                      {getError("email") && (
                        <p className="text-red-500 text-xs mt-1">
                          {getError("email").message}
                        </p>
                      )}
                    </div>

                    {/* Resume */}
                    <div className="md:col-span-5">
                      <label htmlFor="resume" className="block text-gray-700">
                        {currentLabels.resume}
                      </label>
                      <textarea
                        name="resume"
                        id="resume"
                        className={`h-20  border mt-1 rounded px-4 w-full bg-gray-50 ${getError("fullName") ? "border-red-500" : "border-gray-300"} `}
                        placeholder={
                          language === "en"
                            ? "Please provide a brief resume of your Journey of faith and experiences in the field of translation and proofreading."
                            : "يرجى تقديم سيرة ذاتية موجزة لرحلتك في الإيمان وتجاربك في مجال الترجمة والمراجعة."
                        }
                        aria-invalid={!!getError("resume")}
                      ></textarea>
                      {getError("resume") && (
                        <p className="text-red-500 text-xs mt-1">
                          {getError("resume").message}
                        </p>
                      )}
                    </div>

                    {/* Role Desired */}
                    <div className="md:col-span-5">
                      <label htmlFor="role" className="block text-gray-700 my-2">
                        {currentLabels.role}
                      </label>
                      <div className={`grid grid-cols-2 gap-2 border mt-1 rounded ${getError("role") ? "border-red-500" : "border-gray-300"}`}>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="role"
                            value="proofreader"
                            defaultChecked
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
                          />
                          <span className="ml-2">{currentLabels.translator}</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="role"
                            value="editor"
                            className="form-checkbox"
                          />
                          <span className="ml-2">{currentLabels.editor}</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="role"
                            value="admin"
                            className="form-checkbox"
                          />
                          <span className="ml-2">{currentLabels.admin}</span>
                        </label>
                      </div>
                      {getError("role") && (
                        <p className="text-red-500 text-xs mt-1">
                          {getError("role").message}
                        </p>
                      )}
                    </div>

                    {/* Agreement */}
                    <div className="md:col-span-5">
                      <div className="flex items-center">
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
                        <p className="text-red-500 text-xs mt-1">
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
    </div>
  );
}
