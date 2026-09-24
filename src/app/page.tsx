import Link from "next/link";
import Image from "next/image";
import { getItems, getCategories } from "@/lib/data";
import { ItemCard } from "@/components/ItemCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [items, categories] = await Promise.all([getItems(), getCategories()]);
  const featured = items.slice(0, 6);
  const catMap = Object.fromEntries(categories.map((c) => [c.id, c]));

  return (
    <>
      <section className="hero-pattern relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
              Rett ved Sandvika stasjon
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Skatter med{" "}
              <span className="text-primary">historie</span>
            </h1>
            <p className="mt-5 text-lg text-muted leading-relaxed">
              Velkommen til Sandvika Gjenbruk – et koselig utstillingsvindu for unike
              gjenbruksobjekter. Her finner du alt fra porselen og glass til møbler,
              tepper, leker og smykker. Kom innom og gå på skattejakt!
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/utstilling"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary-light"
              >
                Se utstillingen
              </Link>
              <a
                href="#om-oss"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                Les mer om oss
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Nylig innom
            </h2>
            <p className="mt-1 text-muted">Et lite utvalg av våre skatter</p>
          </div>
          <Link
            href="/utstilling"
            className="hidden text-sm font-medium text-primary hover:underline sm:block"
          >
            Se alle →
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center text-muted">
            Ingen objekter lagret ennå. Gå til admin for å legge ut de første skattene!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                category={catMap[item.categoryId]}
              />
            ))}
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/utstilling"
            className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary"
          >
            Se hele utstillingen →
          </Link>
        </div>
      </section>

      <section id="om-oss" className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Om Sandvika Gjenbruk
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                Vi åpnet dørene i august og er allerede et populært stoppested for
                alle som elsker gjenbruk. Hos oss finner du en herlig miks av brukte
                skatter og litt nytt – porselen, fine glass, tepper, koselige møbler,
                brettspill, leker og smykker.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Dette er ikke en nettbutikk, men et utstillingsvindu. Kom innom,
                ta og føl på tingene, og ta med deg noe hjem som har en historie.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary text-xs">✓</span>
                  Unike objekter med sjel
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary text-xs">✓</span>
                  Rett ved Sandvika stasjon
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary text-xs">✓</span>
                  Bærekraftig shopping med god samvittighet
                </li>
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop"
                alt="Koselig interiør med gjenbruksobjekter"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-primary px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Kom innom!</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/85">
            Vi ligger rett ved Sandvika stasjon. Følg oss på Instagram og Facebook
            for å se hva som er nytt i butikken.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-accent"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Facebook
            </a>
          </div>
          <p className="mt-6 text-sm text-white/60">
            Erstatt Instagram- og Facebook-lenkene med de ekte profilene når du har dem.
          </p>
        </div>
      </section>
    </>
  );
}
