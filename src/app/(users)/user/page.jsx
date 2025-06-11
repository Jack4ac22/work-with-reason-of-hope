"use client";
import { useSearchParams } from "next/navigation";
import ActivationForm from "@/components/forms/users/activation-with-token-form";
import { activateUser } from "@/lib/actions/users/user-actions";

export default function UserPage() {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");
  const action = searchParam.get("action");


  if (action === "activate_new_user") {
    return (
      <>
        <div>Activate New User</div>

        <ActivationForm action={activateUser} token={token} />
      </>
    );
  }

  return (
    <>
      <div>User Page</div>
    </>
  );
}
