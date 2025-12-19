"use client";

/* ================= CONFIG (DATA ONLY) ================= */
const NOTICE_CONFIG = {
  speed: 18, // seconds
  brandEnvKey: "NEXT_PUBLIC_BRAND_NAME",
  fallbackBrand: "Meowji",
  messages: [
    {
      id: "welcome",
      type: "brand",
      text: "Welcome to {brand} Store",
    },
    {
      id: "instant",
      type: "accent",
      accent: "Instant",
      text: "& Safe Top-Ups",
    },
    {
      id: "delivery",
      type: "accent",
      accent: "24×7",
      text: "Automated Delivery",
    },
  ],
};

/* ================= COMPONENT ================= */
export default function ScrollingNoticeBand() {
  const BRAND_NAME =
    process.env[NOTICE_CONFIG.brandEnvKey] ||
    NOTICE_CONFIG.fallbackBrand;

  // duplicate once for smooth infinite scroll
  const items = [...NOTICE_CONFIG.messages, ...NOTICE_CONFIG.messages];

  return (
    <div className="w-full overflow-hidden bg-[var(--card)] border-b border-[var(--border)] mt-2">
      <div className="scroll-track py-2 text-sm font-medium whitespace-nowrap text-[var(--foreground)]">
        {items.map((item, index) => (
          <span key={`${item.id}-${index}`} className="mx-8">
            {renderMessage(item, BRAND_NAME)}
          </span>
        ))}
      </div>

      <style jsx>{`
        .scroll-track {
          display: inline-block;
          animation: scroll-left ${NOTICE_CONFIG.speed}s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

/* ================= RENDER LOGIC ================= */
function renderMessage(item, brand) {
  if (item.type === "brand") {
    return (
      <>
        {item.text.split("{brand}")[0]}
        <b className="text-[var(--accent)]">{brand}</b>
        {item.text.split("{brand}")[1]}
      </>
    );
  }

  if (item.type === "accent") {
    return (
      <>
        <b className="text-[var(--accent)]">{item.accent}</b>{" "}
        {item.text}
      </>
    );
  }

  return item.text;
}
