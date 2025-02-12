import RegistrationForm from "@/components/forms/users/registration-form";
import { registerUser } from "@/lib/actions/users/user-actions";
export default function RegisterPage() {
  return (
    <>
      <h1>Registration</h1>
      <RegistrationForm action={registerUser}/>
    </>
  );
}