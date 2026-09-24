import { NextRequest, NextResponse } from "next/server";
import { addItem, deleteItem, updateItem, getStoreData } from "@/lib/data";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sandvika2025";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("x-admin-password");
  return auth === ADMIN_PASSWORD;
}

export async function GET() {
  const data = await getStoreData();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { title, description, price, categoryId, image } = body;
    if (!title || !price || !categoryId) {
      return NextResponse.json(
        { error: "Mangler tittel, pris eller kategori" },
        { status: 400 }
      );
    }
    const item = await addItem({
      title,
      description: description || "",
      price: Number(price),
      categoryId,
      image:
        image ||
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
    });
    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { id, title, description, price, categoryId, image } = body;
    if (!id) {
      return NextResponse.json({ error: "Mangler id" }, { status: 400 });
    }
    if (!title || price === undefined || price === null || !categoryId) {
      return NextResponse.json(
        { error: "Mangler tittel, pris eller kategori" },
        { status: 400 }
      );
    }
    const item = await updateItem(id, {
      title,
      description: description || "",
      price: Number(price),
      categoryId,
      image:
        image ||
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
    });
    if (!item) {
      return NextResponse.json({ error: "Objekt ikke funnet" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Mangler id" }, { status: 400 });
    }
    await deleteItem(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}
