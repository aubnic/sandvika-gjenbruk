import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-full bg-[#f7f4ec] p-0.5 shadow-sm">
                <Logo size="sm" />
              </div>
              <span className="font-semibold">Sandvika Gjenbruk</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Gi ting nytt liv. Et utstillingsvindu for unike gjenbruksobjekter –
              rett ved Sandvika stasjon.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/55">
              Finn oss
            </h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li>Rett ved Sandvika stasjon</li>
              <li>Sandvika, Bærum</li>
              <li className="pt-1">
                <a
                  href="https://www.instagram.com/sandvikagjenbruk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent transition"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/p/Sandvika-Gjenbruk-61591488455336/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent transition"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/55">
              Hurtiglenker
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/utstilling" className="hover:text-accent transition">
                  Se utstillingen
                </Link>
              </li>
              <li>
                <Link href="/#om-oss" className="hover:text-accent transition">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-accent transition">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Sandvika Gjenbruk · Gi ting · Nytt liv
        </div>
      </div>
    </footer>
  );
}
