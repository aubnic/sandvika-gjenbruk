import { promises as fs } from "fs";
import path from "path";
import { StoreData, Item, Category } from "./types";

const dataPath = path.join(process.cwd(), "data", "items.json");

export async function getStoreData(): Promise<StoreData> {
  try {
    const raw = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(raw) as StoreData;
  } catch {
    return { categories: [], items: [] };
  }
}

export async function saveStoreData(data: StoreData): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getItems(categorySlug?: string): Promise<Item[]> {
  const data = await getStoreData();
  if (!categorySlug || categorySlug === "alle") {
    return data.items.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  const cat = data.categories.find((c) => c.slug === categorySlug);
  if (!cat) return [];
  return data.items
    .filter((i) => i.categoryId === cat.id)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export async function getCategories(): Promise<Category[]> {
  const data = await getStoreData();
  return data.categories;
}

export async function addItem(item: Omit<Item, "id" | "createdAt">): Promise<Item> {
  const data = await getStoreData();
  const newItem: Item = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  data.items.unshift(newItem);
  await saveStoreData(data);
  return newItem;
}

export async function deleteItem(id: string): Promise<void> {
  const data = await getStoreData();
  data.items = data.items.filter((i) => i.id !== id);
  await saveStoreData(data);
}

export async function addCategory(name: string): Promise<Category> {
  const data = await getStoreData();
  const slug = name
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const newCat: Category = {
    id: slug,
    name,
    slug,
  };
  data.categories.push(newCat);
  await saveStoreData(data);
  return newCat;
}

export async function deleteCategory(id: string): Promise<void> {
  const data = await getStoreData();
  data.categories = data.categories.filter((c) => c.id !== id);
  await saveStoreData(data);
}
