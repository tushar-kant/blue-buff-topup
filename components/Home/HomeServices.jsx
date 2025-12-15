import { FaWhatsapp } from "react-icons/fa";

export default function HomeServices() {
  return (
    <section className="py-16 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto">

        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md">
          <div className="absolute left-0 top-0 h-full w-2 bg-[var(--accent)]" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8">

            <div>
              <h3 className="text-lg md:text-xl font-bold mb-1">
                Website Designed, Developed & Maintained By
              </h3>
              <p className="text-[var(--muted)] text-sm md:text-base">
                Complete end-to-end website solution including development,
                deployment, updates, and ongoing maintenance.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="text-xl font-bold text-[var(--accent)] tracking-wide">
                +91 63723 05866
              </span>

              <a
                href="https://wa.me/916372305866"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 rounded-xl
                  bg-[var(--accent)]
                  !text-white
                  font-semibold text-sm
                  hover:brightness-110 transition
                "
              >
                <FaWhatsapp className="text-lg fill-current" />
                Get This Service
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
