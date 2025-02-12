import { findUserByfield } from "@/util/db-libraries/users-library/users-events/db-find-user";
import {hashPassword} from "@/util/lib/hashing/hashing";
export default async function activateNewUser(data) {
  const { password, verifyPassword, userName, token, } = data;
  const user = await findUserByfield("email", token.email);
  

}