"use client";
import { useActionState } from "react";
import { useState } from "react";
import { useSearchParams } from 'next/navigation';


export default function ActivationForm({ action }) {
  const [state, formAction] = useActionState(action, {});
  const [language, setLanguage] = useState("en");
  const searchParam = useSearchParams();
  const token = searchParam.get('token');
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
  if (!token) {
    return (
      <>
        {/* TODO: add a new form to manually validate using the token sent by email and the email address after validation generate a jwt token and addit to the url so the other form will appear to get to password setup */}
      </>
    );
  }

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

              {/* TODO: check if token has errors or invalid token to display request a new token form. */}

              <form action={formAction}>
                <div className="form-card text-lightShade-800 dark:text-lightShade-100">
                  <div className="form-grid">
                    <div className="">
                      <p className="font-medium text-lg">{currentLabels.formTitle}</p>
                      <p>{currentLabels.formDescription}</p>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="form-fields-grid">
                        {/* Password */}
                        <div className="md:col-span-5">
                          <label htmlFor="password" className="block ">
                            {currentLabels.password}
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            className={`h-10 form-input ${getError("password") ? "form-input-error" : "form-input-border"}`}
                            placeholder={currentLabels.password}
                            defaultValue={prevState.password || ""}
                            aria-invalid={!!getError("password")}
                          />
                          {getError("password") && <p className="form-error-message">{getError("password").message}</p>}
                        </div>

                        {/* Verify Password */}
                        <div className="md:col-span-5">
                          <label htmlFor="verifyPassword" className="block">
                            {currentLabels.verifyPassword}
                          </label>
                          <input
                            type="password"
                            name="verifyPassword"
                            id="verifyPassword"
                            className={`h-10 form-input ${getError("verifyPassword") ? "form-input-error" : "form-input-border"}`}
                            placeholder={currentLabels.verifyPassword}
                            defaultValue={prevState.verifyPassword || ""}
                            aria-invalid={!!getError("verifyPassword")}
                          />
                          {getError("verifyPassword") && <p className="form-error-message">{getError("verifyPassword").message}</p>}
                        </div>
                        {/* username */}
                        <div className="md:col-span-5">
                          <label htmlFor="userName" className="block">
                            {currentLabels.userName}
                          </label>
                          <input
                            type="text"
                            name="userName"
                            id="userName"
                            className={`h-10 form-input ${getError("userName") ? "form-input-error" : "form-input-border"}`}
                            placeholder={currentLabels.userName}
                            defaultValue={prevState.userName || ""}
                            aria-invalid={!!getError("userName")}
                          />
                          {getError("userName") && <p className="form-error-message">{getError("userName").message}</p>}
                        </div>
                        {/* add token to the data of the form */}
                        <input type="hidden" name="token" value={token || prevState.token} />

                        {/* Submit Button */}
                        <div className="md:col-span-5 text-right">
                          <button className="form-button" type="submit">
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
