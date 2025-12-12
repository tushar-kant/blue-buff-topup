"use client";

export default function LoaderBB() {
  return (
    <div className="flex items-center justify-center h-full py-6">
      <div className="bb-loader">
        <span className="bb bb-left">B</span>
        <span className="bb bb-right">B</span>

        <style jsx>{`
          .bb-loader {
            display: flex;
            gap: 8px;
            font-size: 48px;
            font-weight: 900;
            color: var(--accent);
          }

          .bb {
            display: inline-block;
            animation: dance 0.6s infinite alternate ease-in-out;
          }

          .bb-left {
            animation-delay: 0s;
          }

          .bb-right {
            animation-delay: 0.2s;
          }

          @keyframes dance {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.8;
            }
            100% {
              transform: translateY(-10px) rotate(6deg);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
