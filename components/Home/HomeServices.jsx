import { FaWhatsapp } from "react-icons/fa";

export default function HomeServices() {
  return (
    <section className="py-20 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-5xl mx-auto">

        <div
          className="
            relative rounded-3xl
            bg-gradient-to-br
            from-[var(--card)]
            to-[var(--background)]
            border border-[var(--border)]
            px-6 py-10 md:px-10
          "
        >
          {/* soft accent glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-[var(--accent)] opacity-10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row gap-8 items-center justify-between text-center md:text-left">

            {/* Text */}
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
                Website Services
              </p>

              <h3 className="text-xl md:text-2xl font-extrabold leading-snug mb-3">
                Design • Development • Maintenance
              </h3>

              <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
                From idea to deployment — I build, host, optimize, and maintain
                fast, secure websites tailored to your business needs.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <span className="text-lg md:text-xl font-bold text-[var(--accent)]">
                +91 63723 05866
              </span>

   <a
  href="https://wa.me/916372305866"
  target="_blank"
  rel="noopener noreferrer"
  className="
    inline-flex items-center gap-2
    px-6 py-3 rounded-full
    bg-[var(--accent)]
    !text-white font-semibold text-sm
    shadow-lg shadow-[var(--accent)]/30
    hover:scale-105 hover:brightness-110
    transition-transform
  "
>
  <FaWhatsapp className="text-lg !fill-white" />
  WhatsApp Now
</a>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
