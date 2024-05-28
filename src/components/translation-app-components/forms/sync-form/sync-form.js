"use client";
import { useFormState } from "react-dom";
import SyncButton from "@/components/translation-app-components/forms/sync-form/sync-button";

export default function SyncForm({ action }) {
  const [state, formAction] = useFormState(action, {});

  return (
    <>
      <h1>Synchronize all data</h1>
      <form action={formAction}>
        <p className="form-actions">
          <SyncButton />
        </p>
      </form>
    </>
  );
}
