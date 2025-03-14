# Volunteer Bible Translation Platform

This web application serves as a platform for volunteers to translate Biblical material from English to Arabic. The system supports multiple user roles and features a multilingual interface to enhance usability.

---

## Overview

- **Frontend:**  
  - Built with Next.js, providing both UI and API routes.
  - Internationalized using an i18n library (e.g., next-i18next) for English and Arabic, with the option to support additional languages in the future.

- **Backend/API:**  
  - Implemented via Next.js API routes handling business logic such as role-based operations, translation workflows, and version control.
  - Includes a dedicated version control system that logs all editorial changes and supports reverting modifications (admin-only).

- **Database:**  
  - Utilizes MySQL to store users, roles, permissions, content materials, translations, and version logs.
  - Schema includes dedicated tables for users, roles, permissions, and junction tables to manage many-to-many relationships (user-permission-restrictions).

- **Authentication & Sessions:**  
  - Managed by NextAuth with email/password support and optional Google OAuth.
  - Sessions are stored in a MySQL-backed session table.
  - GDPR compliance is ensured by prompting users to review and accept the latest terms, with consent logged via timestamps.

- **Deployment:**  
  - Containerized using Docker Compose.
  - Designed for deployment on platforms like PVS or Vercel.

---

## Architecture Details

### User Roles & Permissions

- **Roles:** Admin, Editor, Translator, and Proofreader.
- **Permissions & Restrictions:**
  - **Admins:**  
    - Control user permissions, approvals, and activation/deactivation.
    - Possess super admin capabilities.
  - **Editors:**  
    - Add new materials for translation.
    - Approve proofread translations (excluding those they translated).
    - Revert published materials to draft (admins can also perform these tasks).
  - **Translators:**  
    - Submit new translations.
    - Cannot proofread their own submissions.
  - **Proofreaders:**  
    - Review submitted translations.
    - No user is permitted to proofread their own translation.
- **Multi-role Support:**  
  - Users can hold multiple roles concurrently.
- **Data Model:**  
  - Utilizes dedicated tables for roles and permissions along with junction tables to manage the relationships and restrictions.

### Content Management & Version Control

- **Static Biblical Material:**  
  - Managed by Editors and Admins.
  - Large texts are portionized into multiple segments (text areas) while remaining a single logical item.
  
- **Version Control:**  
  - All editorial changes are logged (with timestamps, user details, and descriptions) in a dedicated table.
  - Admins can revert changes using this log.

### Translation Workflow

- **Submission Process:**  
  - Only translators can submit new translations.
- **Review Process:**  
  - Proofreading is performed by Proofreaders or Editors, with system-enforced rules to prevent self-review.

### Multilingual Interface

- **Internationalization:**  
  - Implements an i18n library (e.g., next-i18next) to manage multiple languages.
  - This approach minimizes redundant code compared to a custom useContext solution and scales more effectively for future language additions.

### Authentication & GDPR Compliance

- **Authentication:**  
  - Managed with NextAuth using both email/password and Google OAuth.
- **Session Management:**  
  - Sessions are maintained in a dedicated MySQL table.
- **GDPR:**  
  - Users must review and accept the latest consent terms upon sign-in.
  - Consent timestamps are logged to ensure compliance.

### Deployment & Infrastructure

- **Containerization:**  
  - The application is fully dockerized using Docker Compose, facilitating easy local development and production deployment.
- **Hosting:**  
  - Designed for deployment on platforms such as PVS or Vercel.
- **User Base:**  
  - Optimized for a small user base (100–200 users) with scalability considerations built in.

---


# Translation Process Design

## Overview
The platform supports translatable content across several categories (e.g., events, people, places, dictionaries, systematic theology, quiz). Each category is maintained in its own table, with Bible verses stored in a shared table and junction (conjunction) tables used to link related data (e.g., related places or events).

## Workflow

### 1. Item Creation
- **Roles:**  
  - Editors (and Admins) have the permission to insert new translatable items.
  - Access to item creation may be selectively restricted based on additional permissions.
  
- **Data Model:**  
  - Each item represents a single logical entity, which can be divided into multiple segments (or text areas) for large texts.
  - Items contain both translatable and non-translatable fields as defined in the schema.

### 2. Translation Submission
- **Drafting:**  
  - Translators work on the entire item via a dashboard interface, saving their work as a draft.
  
- **Time Restriction:**  
  - To encourage careful translation, a configurable time restriction is applied before a translation can be submitted. This is enforced if a translator is identified (by admin or editor) as hasty.
  - The restriction ensures that translators review what they’ve written as a “code of honor” before final submission.
  
- **Submission & Versioning:**  
  - Once a translation is complete, the translator moves it from draft to "under review".
  - If a translator retracts their translation, the old version is rejected and replaced by the new submission—resetting any previously cast votes.

### 3. Proofreading & Evaluation
- **Review Process:**  
  - Proofreaders evaluate translated fields by assigning a star rating (1 to 5 stars) for each field and an overall rating.
  - They can also optionally provide free-form comments for additional feedback.
  
- **Configurable Vote Thresholds:**  
  - The number of votes required for the editor to decide on approval is configurable and stored in the restrictions table. More experienced proofreaders may require fewer votes compared to newcomers.
  - The editor reviews the aggregated ratings and comments, then approves the translation, returns it to draft with feedback, or rejects it.

### 4. Reporting and Editorial Action
- **Item Reporting:**  
  - A dedicated reporting endpoint allows users to flag an item by specifying the relevant table, fields, and a comment.
  - Editors use these reports to decide if an item should be moved from its current status (e.g., published) to another state (e.g., under investigation) or if enhancements are needed.

- **Status Management:**  
  - Items can progress through various statuses, including:
    - `initial-draft`
    - `final-draft`
    - `submitted`
    - `retracted`
    - `approved`
    - `rejected`
    - `returned-to-author`
    - `published`
    - `under-investigation`
    - `re-drafted`
  - The editor holds the final authority to change the status based on the review process and report findings.

### 5. Notifications
- **Internal Alerts:**  
  - An internal notifications table will store system alerts that are visible when users log in.
  - Email notifications can be integrated in a later phase.

---
