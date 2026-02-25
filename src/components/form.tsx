"use client";

import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { client, addEmailToWaitlist } from "@/lib/appwrite";
import { toast } from "sonner";

const inter = Inter({ subsets: ["latin"] });

type FormStatus = "idle" | "submitting" | "success";

export const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  // Ping Appwrite to verify connection on mount
  useEffect(() => {
    client.ping().then(() => {
      console.log("✅ Appwrite connected successfully");
    }).catch((err: unknown) => {
      console.error("❌ Appwrite connection failed:", err);
    });
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleSubmit = async () => {
    // Validate
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");

    try {
      const trimmedEmail = email.trim();
      await addEmailToWaitlist(trimmedEmail);
      setStatus("success");
      setEmail("");
      toast.success("You're on the list! We'll notify you when we launch. 🎉");

      // Send confirmation email (fire-and-forget)
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      }).catch((err) => console.error("Failed to send confirmation email:", err));
    } catch (err: unknown) {
      setStatus("idle");
      if (err instanceof Error) {
        if (err.message.includes("Document with the requested ID already exists")) {
          toast.error("This email is already on the waitlist!");
        } else {
          toast.error(err.message || "Something went wrong. Please try again.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-4xl text-neutral-100">Join Waitlist</h3>

      {status === "success" ? (
        <div className="mt-4 flex items-center gap-2 text-emerald-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <p className={`${inter.className} text-sm`}>
            You&apos;re on the list! We&apos;ll notify you when we launch.
          </p>
        </div>
      ) : (
        <>
          <div className="relative mt-4 w-full max-w-full sm:max-w-xs">
            <input
              ref={inputRef}
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your email"
              disabled={status === "submitting"}
              className={`${inter.className} text-sm p-2 pr-8 rounded-md bg-neutral-800 text-neutral-100 w-full ring-neutral-500 focus:ring-2 focus:ring-neutral-500 focus:outline-none transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-bold border border-neutral-600 rounded px-1 pointer-events-none">
              /
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === "submitting"}
            className={`${inter.className} mt-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 py-2 px-4 rounded-md transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
          >
            {status === "submitting" ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Joining...
              </>
            ) : (
              "Join Waitlist"
            )}
          </button>
        </>
      )}
    </div>
  );
};
