import Image from "next/image";
import { Item, Category } from "@/lib/types";

interface Props {
  item: Item;
  category?: Category;
}

export function ItemCard({ item, category }: Props) {
  return (
    <article className="item-card group overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="relative aspect-square overflow-hidden bg-accent/10">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur-sm">
            {category.name}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground leading-snug line-clamp-1">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-muted line-clamp-2">{item.description}</p>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-lg font-bold text-primary">
            {item.price.toLocaleString("nb-NO")} kr
          </span>
        </div>
      </div>
    </article>
  );
}
