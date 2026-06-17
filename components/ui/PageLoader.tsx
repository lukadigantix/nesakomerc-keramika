"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 1400);
    const t2 = setTimeout(() => setGone(true), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <>
      <style>{`
        @keyframes nk-logo-in {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes nk-bar-fill {
          0%   { width: 0%; }
          30%  { width: 40%; }
          70%  { width: 75%; }
          100% { width: 100%; }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          opacity: exiting ? 0 : 1,
          transition: exiting ? "opacity 0.45s ease" : "none",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <img
            src="/nesa-komerc-logo.svg"
            alt="Neša Komerc Keramika"
            width={150}
            height={68}
            style={{ animation: "nk-logo-in 0.5s ease forwards" }}
          />
          <div
            style={{
              width: 120,
              height: 3,
              backgroundColor: "#f0f0f0",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 99,
                background: "linear-gradient(to right, #e11d1b, #f97316)",
                animation: "nk-bar-fill 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
