"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSession() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createSession = async () => {
    setLoading(true);
    const response = await fetch("/api/session", { method: "POST" });
    const data = await response.json();
    setLoading(false);

    if (data.sessionId) {
      router.push(`/session/${data.sessionId}`); // Redirect to the session page
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <button
        onClick={createSession}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Creating Session..." : "Create Voting Session"}
      </button>
    </div>
  );
}
