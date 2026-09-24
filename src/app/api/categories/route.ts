import { NextRequest, NextResponse } from "next/server";
import { addCategory, deleteCategory, getCategories } from "@/lib/data";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sandvika2025";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("x-admin-password");
  return auth === ADMIN_PASSWORD;
}

export async function GET() {
  const cats = await getCategories();
  return NextResponse.json(cats);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { name } = await req.json();
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Mangler navn" }, { status: 400 });
    }
    const cat = await addCategory(name.trim());
    return NextResponse.json(cat, { status: 201 });
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
    await deleteCategory(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}
