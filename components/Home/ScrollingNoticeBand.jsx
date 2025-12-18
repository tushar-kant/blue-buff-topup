"use client";

export default function ScrollingNoticeBand() {
  const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "Meowji ";

  return (
    <div className="w-full overflow-hidden bg-[var(--card)] border-b border-[var(--border)] mt-2">
      <div className="scroll-track py-2 text-sm font-medium whitespace-nowrap text-[var(--foreground)]">
        
        <span className="mx-8">
          Welcome to{" "}
          <b className="text-[var(--accent)]">
            {BRAND_NAME} Store
          </b>
        </span>

        <span className="mx-8">
          <b className="text-[var(--accent)]">Instant</b> & Safe Top-Ups
        </span>

        <span className="mx-8">
          <b className="text-[var(--accent)]">24×7</b> Automated Delivery
        </span>

        {/* Duplicate for smooth loop */}
        <span className="mx-8">
          Welcome to{" "}
          <b className="text-[var(--accent)]">
            {BRAND_NAME} Store
          </b>
        </span>

        <span className="mx-8">
          <b className="text-[var(--accent)]">Instant</b> & Safe Top-Ups
        </span>

        <span className="mx-8">
          <b className="text-[var(--accent)]">24×7</b> Automated Delivery
        </span>

      </div>

      <style jsx>{`
        .scroll-track {
          display: inline-block;
          animation: scroll-left 18s linear infinite;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
