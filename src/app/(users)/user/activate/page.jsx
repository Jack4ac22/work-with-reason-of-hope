import ActivationForm from "@/components/forms/users/activation-with-token-form";
import { activateUser } from "@/util/actions/users/user-actions";

export default function ActivateUserPage() {
  return (
    <>
      <div>Activate</div>
      <ActivationForm action={activateUser} />
    </>
  );
}