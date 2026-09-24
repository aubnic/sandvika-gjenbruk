import Link from "next/link";
import { getItems, getCategories } from "@/lib/data";
import { ItemCard } from "@/components/ItemCard";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ kategori?: string }>;
}

export default async function UtstillingPage({ searchParams }: Props) {
  const { kategori } = await searchParams;
  const [items, categories] = await Promise.all([
    getItems(kategori),
    getCategories(),
  ]);
  const catMap = Object.fromEntries(categories.map((c) => [c.id, c]));
  const activeSlug = kategori || "alle";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Utstilling
        </h1>
        <p className="mt-2 text-muted">
          Oversikt over objekter som er tilgjengelige i butikken. Prisene gjelder i
          fysisk butikk – dette er et utstillingsvindu, ikke en nettbutikk.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/utstilling"
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            activeSlug === "alle"
              ? "bg-primary text-white"
              : "bg-card border border-border text-muted hover:border-primary hover:text-primary"
          }`}
        >
          Alle
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/utstilling?kategori=${cat.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeSlug === cat.slug
                ? "bg-primary text-white"
                : "bg-card border border-border text-muted hover:border-primary hover:text-primary"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 py-20 text-center">
          <p className="text-muted">Ingen objekter i denne kategorien ennå.</p>
          <Link
            href="/admin"
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            Legg til objekter i admin →
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              category={catMap[item.categoryId]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
