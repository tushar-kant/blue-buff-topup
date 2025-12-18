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
    <div className="space-y-8 max-w-4xl mx-auto">

      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Account Details
        </h2>
        <p className="text-[var(--muted)] text-sm sm:text-base">
          Manage your account information and password.
        </p>
      </div>

      {/* ================= USER INFO ================= */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <InfoRow label="Name" value={userDetails.name} />
          <InfoRow label="Email" value={userDetails.email} />
          <InfoRow label="Phone" value={userDetails.phone} />

        </div>
      </div>

      {/* ================= PASSWORD SECTION ================= */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Change Password
        </h3>

        {/* Status */}
        {passSuccess && (
          <div className="mb-3 rounded-xl bg-green-500/10 text-green-500 px-4 py-2 text-sm">
            {passSuccess}
          </div>
        )}
        {passError && (
          <div className="mb-3 rounded-xl bg-red-500/10 text-red-500 px-4 py-2 text-sm">
            {passError}
          </div>
        )}

        <div className="space-y-4">

          <input
            type="password"
            placeholder="Enter new password"
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
              setPassError("");
            }}
            className="w-full p-3 sm:p-4 rounded-xl border border-[var(--border)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
          />

          <button
            disabled={loadingPass}
            onClick={handlePasswordUpdate}
            className="w-full sm:w-auto sm:min-w-[220px] py-3 rounded-xl text-white font-medium transition hover:opacity-90 bg-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingPass ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Updating...
              </span>
            ) : (
              "Update Password"
            )}
          </button>

        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-[var(--border)] p-4">
      <span className="text-xs text-[var(--muted)]">{label}</span>
      <span className="font-medium break-all">{value}</span>
    </div>
  );
}
