# WORK WITH US


### **How to Add a New Form in the System**
This guide explains the **process of adding a new form** to the system, covering both the **frontend (React/Next.js)** and **backend (API, database, and actions).**

---

## **1. Understanding the System's Structure**
The system follows a **modular architecture**:
- **Frontend (React/Next.js)**
  - `components/forms/users/` → UI components for forms.
  - `pages/` → Pages that use forms (e.g., `pages/api/register.js` for registration).
- **Backend**
  - `util/actions/users/` → Server actions (e.g., `registerUser`).
  - `util/db-libraries/users-library/` → Database functions (e.g., `registerNewUser`).
  - `util/lib/mailing/` → Email sending functionality.

---

## **2. Steps to Add a New Form**
### **Step 1: Create the UI Component (React)**
1. Navigate to `src/components/forms/users/`.
2. Create a new component file **(e.g., `NewForm.jsx`)**.

### **Example: `components/forms/users/NewForm.jsx`**
```javascript
"use client";
import { useFormState } from "react-dom";
import { useState } from "react";

export default function NewForm({ action }) {
  const [state, formAction] = useFormState(action, {});
  const [language, setLanguage] = useState("en");

  const labels = {
    en: {
      field1: "Enter your data",
      submit: "Submit",
    },
    ar: {
      field1: "أدخل بياناتك",
      submit: "إرسال",
    },
  };

  const currentLabels = labels[language];

  return (
    <form action={formAction}>
      <label>{currentLabels.field1}</label>
      <input type="text" name="field1" required />
      <button type="submit">{currentLabels.submit}</button>
    </form>
  );
}
```
---
### **Step 2: Add the Form to a Page**
1. Go to `src/app/` and create a new page file **(e.g., `new-form-page.jsx`)**.
2. Import the form and its backend action.

### **Example: `pages/new-form-page.jsx`**
```javascript
import NewForm from "@/components/forms/users/NewForm";
import { handleNewForm } from "@/util/actions/users/user-actions";

export default function NewFormPage() {
  return <NewForm action={handleNewForm} />;
}
```
---
### **Step 3: Create the Action Function**
1. Go to `src/util/actions/users/`.
2. Add a function to process form submissions.

### **Example: `util/actions/users/user-actions.js`**
```javascript
"use server";
import saveNewFormData from "@/util/db-libraries/users-library/saveNewFormData";

/**
 * Handles new form submission, validates input, and saves to the database.
 * @param {Object} prevState - Previous state of the form.
 * @param {FormData} formData - Submitted form data.
 * @returns {Object} Updated state with success message or errors.
 */
export async function handleNewForm(prevState, formData) {
  const field1 = formData.get("field1");
  const errors = [];

  if (!field1 || field1.trim() === "") {
    errors.push({ name: "field1", message: "Field cannot be empty." });
  }

  if (errors.length > 0) {
    return { prevState, errors };
  }

  await saveNewFormData({ field1 });

  return { prevState, response: { message: "Form submitted successfully!" } };
}
```
---
### **Step 4: Create the Database Function**
1. Navigate to `src/util/db-libraries/users-library/`.
2. Create a function to save the form data.

### **Example: `util/db-libraries/users-library/saveNewFormData.js`**
```javascript
import mainDB from "@/util/db-libraries/users-library/usersDB";

/**
 * Saves new form data to the database.
 * @param {Object} data - Form data.
 */
export default async function saveNewFormData(data) {
  const sql = `INSERT INTO NewFormTable (field1, created_at) VALUES (?, CURRENT_TIMESTAMP);`;
  const stmt = mainDB.prepare(sql);
  stmt.run(data.field1);
}
```
---
### **Step 5: Add Database Schema**
Modify `usersDB.js` to include a new table.

### **Example: `usersDB.js`**
```sql
CREATE TABLE IF NOT EXISTS NewFormTable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  field1 TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
---
### **Step 6: (Optional) Send an Email Notification**
If required, integrate **email notifications**.

### **Example: `util/lib/mailing/sendNewFormEmail.js`**
```javascript
"use server";
import { transporter, getMailOptionsNoCC } from "@/util/lib/mailing/nodemailer";

/**
 * Sends an email notification for a new form submission.
 * @param {Object} data - Form data.
 */
export async function sendNewFormEmail(data) {
  const mailOptions = getMailOptionsNoCC(data.email);
  const emailContent = `New form submitted: ${data.field1}`;

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: "New Form Submission",
      text: emailContent,
    });
  } catch (error) {
    console.error("Email request failed:", error);
  }
}
```
---
## **3. Summary of the Process**
✅ **Frontend**
1. Create a new form component (`NewForm.jsx`).
2. Add the form to a Next.js page (`new-form-page.jsx`).

✅ **Backend**
3. Add a server action (`handleNewForm`) in `user-actions.js`.
4. Add a database function (`saveNewFormData.js`) to save data.
5. Update the database schema (`usersDB.js`).

✅ **Extras**
6. (Optional) Send an email notification.

---
## **4. Frequently Asked Questions (FAQs)**
### ❓ *How do I validate input before submission?*
- Use **HTML5 validation** (`required`, `minlength`).
- Use **backend validation** in `handleNewForm()`.

### ❓ *Where should I store user-submitted files?*
- Store **file paths** in the database.
- Save files in `public/uploads/`.

### ❓ *How do I allow multiple roles for users?*
- Use a **separate table** for user roles (`UserRolesTable`).
- Store `user_id` and `role_name`.

---
## **Final Thoughts**
🚀 **This structure ensures:**  
- **Modular code** (easy to extend).  
- **Security** (validations & database constraints).  
- **Scalability** (handles multiple forms).  

🔹 Would you like an **API version** of form submission?  
🔹 Do you need **automated admin approval** for certain forms?  

Let me know how you'd like to proceed! 🚀