"use client";

import { useState } from "react";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

interface AccountTabProps {
  userDetails: UserDetails;
}

export default function AccountTab({ userDetails }: AccountTabProps) {
  const [newPass, setNewPass] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [passError, setPassError] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);

  const handlePasswordUpdate = async () => {
    if (newPass.length < 6) {
      setPassError("Minimum 6 characters required");
      return;
    }

    setLoadingPass(true);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: userDetails.email || userDetails.phone,
          newPassword: newPass,
        }),
      });

      const data = await res.json();
      setLoadingPass(false);

      if (!data.success) {
        setPassError(data.message);
        return;
      }

      setNewPass("");
      setPassSuccess("Password updated!");
      setTimeout(() => setPassSuccess(""), 2000);
    } catch (error) {
      setLoadingPass(false);
      setPassError("Failed to update password. Please try again.");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Account Details</h2>

      <div className="space-y-2 text-lg">
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Phone:</strong> {userDetails.phone}</p>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-3">Change Password</h3>

        {passSuccess && <p className="text-green-500 text-sm">{passSuccess}</p>}
        {passError && <p className="text-red-500 text-sm">{passError}</p>}

        <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => {
            setNewPass(e.target.value);
            setPassError("");
          }}
          className="w-full p-3 border border-[var(--border)] rounded-xl mb-3"
        />

        <button
          disabled={loadingPass}
          onClick={handlePasswordUpdate}
          className="bg-[var(--accent)] text-white px-5 py-3 rounded-xl"
        >
          {loadingPass ? "Updating..." : "Update Password"}
        </button>
      </div>
    </>
  );
}