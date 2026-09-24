export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  createdAt: string;
}

export interface StoreData {
  categories: Category[];
  items: Item[];
}
