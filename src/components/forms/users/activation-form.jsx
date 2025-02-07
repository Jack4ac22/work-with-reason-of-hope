"use client";
import { useFormState } from "react-dom";
import { useState } from "react";
import { useSearchParams } from 'next/navigation';


export default function ActivationForm({ action }) {
  const [state, formAction] = useFormState(action, {});
  const [language, setLanguage] = useState("en");
  const searchParam = useSearchParams();
  console.log(searchParam.get('token'));
  const token = searchParam.get('token');
  console.log(token);
  const labels = {
    en: {
      password: "Password",
      verifyPassword: "Verify Password",
      userName: "chose a username",
      submit: "Activate Account",
      formTitle: "Activate Your Account",
      formDescription: "Please set a new password to activate your account.",
    },
    ar: {
      password: "كلمة المرور",
      verifyPassword: "تأكيد كلمة المرور",
      userName: "اختر اسم المستخدم",
      submit: "تفعيل الحساب",
      formTitle: "تفعيل حسابك",
      formDescription: "يرجى تعيين كلمة مرور جديدة لتفعيل حسابك.",
    },
  };

  const currentLabels = labels[language];
  const prevState = state?.prevState || {};

  const getError = (fieldName) =>
    state?.errors?.find((error) => error.name === fieldName);

  return (
    <div className="min-h-screen p-6 bg-lightShade-100 dark:bg-darkShade-900 flex items-center justify-center" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container max-w-screen-lg mx-auto">
        <div>
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

          {/* TODO: check if token has errors or invalid token to display request a new token form. */}

          <form action={formAction}>
            <div className="bg-lightShade-100 dark:bg-darkShade-800 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-lightShade-800 dark:text-lightShade-100">
                  <p className="font-medium text-lg">{currentLabels.formTitle}</p>
                  <p>{currentLabels.formDescription}</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    {/* Password */}
                    <div className="md:col-span-5">
                      <label htmlFor="password" className="block text-lightShade-800 dark:text-lightShade-100">
                        {currentLabels.password}
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className={`h-10 border mt-1 rounded px-4 w-full bg-lightShade-200 dark:bg-darkShade-800 text-lightShade-800 dark:text-lightShade-100 ${getError("password") ? "border-error-500" : "border-gray-300 dark:border-gray-700"}`}
                        placeholder={currentLabels.password}
                        defaultValue={prevState.password || ""}
                        aria-invalid={!!getError("password")}
                      />
                      {getError("password") && <p className="text-error-500 text-xs mt-1">{getError("password").message}</p>}
                    </div>

                    {/* Verify Password */}
                    <div className="md:col-span-5">
                      <label htmlFor="verifyPassword" className="block text-lightShade-800 dark:text-lightShade-100">
                        {currentLabels.verifyPassword}
                      </label>
                      <input
                        type="password"
                        name="verifyPassword"
                        id="verifyPassword"
                        className={`h-10 border mt-1 rounded px-4 w-full bg-lightShade-200 dark:bg-darkShade-800 text-lightShade-800 dark:text-lightShade-100 ${getError("verifyPassword") ? "border-error-500" : "border-gray-300 dark:border-gray-700"}`}
                        placeholder={currentLabels.verifyPassword}
                        defaultValue={prevState.verifyPassword || ""}
                        aria-invalid={!!getError("verifyPassword")}
                      />
                      {getError("verifyPassword") && <p className="text-error-500 text-xs mt-1">{getError("verifyPassword").message}</p>}
                    </div>
                    {/* username */}
                    <div className="md:col-span-5">
                      <label htmlFor="userName" className="block text-lightShade-800 dark:text-lightShade-100">
                        {currentLabels.userName}
                      </label>
                      <input
                        type="text"
                        name="userName"
                        id="userName"
                        className={`h-10 border mt-1 rounded px-4 w-full bg-lightShade-200 dark:bg-darkShade-800 text-lightShade-800 dark:text-lightShade-100 ${getError("userName") ? "border-error-500" : "border-gray-300 dark:border-gray-700"}`}
                        placeholder={currentLabels.userName}
                        defaultValue={prevState.userName || ""}
                        aria-invalid={!!getError("userName")}
                      />
                      {getError("userName") && <p className="text-error-500 text-xs mt-1">{getError("userName").message}</p>}
                    </div>
                    {/* add token to the data of the form */}
                    <input type="hidden" name="token" value={token || prevState.token} />

                    {/* Submit Button */}
                    <div className="md:col-span-5 text-right">
                      <button className="bg-mainBrand-500 hover:bg-mainBrand-600 dark:bg-mainBrand-300 dark:hover:bg-mainBrand-200 text-lightShade-100 dark:text-darkShade-900 font-bold py-2 px-4 rounded" type="submit">
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
