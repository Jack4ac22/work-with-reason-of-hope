"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ActivationForm from "@/components/forms/users/activation-with-token-form";
import { activateUser } from "@/util/actions/users/user-actions";

export default function UserPage() {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");
  const action = searchParam.get("action");

  // State to store the IP address
  const [ipAddress, setIpAddress] = useState("Fetching...");

  useEffect(() => {
    async function fetchIp() {
      try {
        const res = await fetch("/api/get-ip");
        const data = await res.json();
        setIpAddress(data.ip);
      } catch (error) {
        setIpAddress("Error retrieving IP");
      }
    }
    fetchIp();
  }, []);

  if (action === "activate_new_user") {
    return (
      <>
        <div>Activate New User</div>
        <div>User IP: {ipAddress}</div>
        <ActivationForm action={activateUser} token={token} />
      </>
    );
  }

  return (
    <>
      <div>User Page</div>
      <div>User IP: {ipAddress}</div>
    </>
  );
}
