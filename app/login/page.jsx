"use client";

import { useState } from "react";

export default function AuthPage() {
  const [tab, setTab] = useState("login");

  // Dummy login credentials
  const dummyUser = {
    email: "test@example.com",
    phone: "9999999999",
    password: "123456",
    name: "Demo User",
    wallet: 150,
  };

  const [loginData, setLoginData] = useState({ user: "", password: "" });
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Validation helpers
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validatePassword = (pass) => pass.length >= 6;

  // ------------------ LOGIN ------------------
  const handleLogin = () => {
    let err = {};
    setSuccess("");

    const userInput = loginData.user.trim();
    const passInput = loginData.password;

    // Validate input format
    if (!userInput) err.user = "Enter email or phone";
    else if (!validateEmail(userInput) && !validatePhone(userInput))
      err.user = "Invalid email or phone number";

    if (!validatePassword(passInput))
      err.password = "Password must be at least 6 characters";

    setErrors(err);
    if (Object.keys(err).length > 0) return;

    // ---------- Dummy validation ----------
    const isMatch =
      (userInput === dummyUser.email || userInput === dummyUser.phone) &&
      passInput === dummyUser.password;

    if (!isMatch) {
      setErrors({ user: "Invalid credentials", password: "Check again" });
      return;
    }

    // ---------------------------------------------------
    // SUCCESSFUL LOGIN → Save to localStorage
    // ---------------------------------------------------
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", dummyUser.name);
    localStorage.setItem("walletBalance", dummyUser.wallet);
    localStorage.setItem("email", dummyUser.email);
    localStorage.setItem("phone", dummyUser.phone);

    setErrors({});
    setSuccess("Login successful! Redirecting...");
    console.log("Logged in as:", dummyUser);

    setTimeout(() => {
      window.location.href = "/"; // refresh header
    }, 1200);
  };

  // ------------------ REGISTER ------------------
  const handleRegister = () => {
    let err = {};
    setSuccess("");

    if (!regData.name.trim()) err.name = "Name is required";
    if (!validateEmail(regData.email)) err.email = "Invalid email";
    if (!validatePhone(regData.phone)) err.phone = "Invalid phone number";
    if (!validatePassword(regData.password))
      err.password = "Password must be minimum 6 characters";

    setErrors(err);

    if (Object.keys(err).length === 0) {
      // simulate register success
      console.log("Register Payload:", regData);
      setSuccess("Account created successfully! Please login.");
      setTab("login");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6 text-[var(--foreground)]">
      <div className="bg-[var(--card)] border border-[var(--border)] shadow-lg rounded-xl p-6 w-full max-w-md">

        {/* Tabs */}
        <div className="flex mb-6 border-b border-[var(--border)]">
          <button
            className={`flex-1 py-3 text-center font-semibold ${
              tab === "login"
                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                : "text-[var(--muted)]"
            }`}
            onClick={() => {
              setErrors({});
              setSuccess("");
              setTab("login");
            }}
          >
            Login
          </button>

          <button
            className={`flex-1 py-3 text-center font-semibold ${
              tab === "register"
                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                : "text-[var(--muted)]"
            }`}
            onClick={() => {
              setErrors({});
              setSuccess("");
              setTab("register");
            }}
          >
            Register
          </button>
        </div>

        {success && (
          <p className="text-green-500 text-center mb-4 font-medium">{success}</p>
        )}

        {/* ---------- LOGIN UI ---------- */}
        {tab === "login" && (
          <div className="space-y-4">

            {/* Email / Phone */}
            <div>
              <input
                type="text"
                placeholder="Email or Phone"
                className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:ring-2 ring-[var(--accent)] outline-none"
                value={loginData.user}
                onChange={(e) =>
                  setLoginData({ ...loginData, user: e.target.value })
                }
              />
              {errors.user && (
                <p className="text-red-500 text-sm mt-1">{errors.user}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:ring-2 ring-[var(--accent)] outline-none"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-lg bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          </div>
        )}

        {/* ---------- REGISTER UI ---------- */}
        {tab === "register" && (
          <div className="space-y-4">

            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:ring-2 ring-[var(--accent)] outline-none"
                value={regData.name}
                onChange={(e) =>
                  setRegData({ ...regData, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:ring-2 ring-[var(--accent)] outline-none"
                value={regData.email}
                onChange={(e) =>
                  setRegData({ ...regData, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:ring-2 ring-[var(--accent)] outline-none"
                value={regData.phone}
                onChange={(e) =>
                  setRegData({ ...regData, phone: e.target.value })
                }
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:ring-2 ring-[var(--accent)] outline-none"
                value={regData.password}
                onChange={(e) =>
                  setRegData({ ...regData, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              className="w-full py-3 rounded-lg bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition"
            >
              Create Account
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
