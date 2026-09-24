"use client";

import { useEffect, useState, FormEvent } from "react";
import { Category, Item } from "@/lib/types";

const STORAGE_KEY = "sg_admin_pw";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newCatName, setNewCatName] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPassword(saved);
      setAuthed(true);
      loadData(saved);
    }
  }, []);

  async function loadData(pw: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/items", {
        headers: { "x-admin-password": pw },
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
        setItems(data.items || []);
        if (data.categories?.length && !categoryId) {
          setCategoryId(data.categories[0].id);
        }
      }
    } catch {
      setError("Kunne ikke hente data");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/items", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      sessionStorage.setItem(STORAGE_KEY, password);
      setAuthed(true);
      loadData(password);
    } else {
      setError("Feil passord");
    }
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setPrice("");
    setImage("");
    setEditingId(null);
    if (categories.length) setCategoryId(categories[0].id);
  }

  function startEdit(item: Item) {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setPrice(String(item.price));
    setCategoryId(item.categoryId);
    setImage(item.image || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmitItem(e: FormEvent) {
    e.preventDefault();
    setError("");
    const payload = {
      title,
      description,
      price: Number(price),
      categoryId,
      image: image || undefined,
    };

    if (editingId) {
      const res = await fetch("/api/items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ id: editingId, ...payload }),
      });
      if (res.ok) {
        const updated = await res.json();
        setItems((prev) =>
          prev.map((i) => (i.id === editingId ? updated : i))
        );
        resetForm();
      } else {
        const err = await res.json();
        setError(err.error || "Kunne ikke lagre endringer");
      }
    } else {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const item = await res.json();
        setItems((prev) => [item, ...prev]);
        resetForm();
      } else {
        const err = await res.json();
        setError(err.error || "Noe gikk galt");
      }
    }
  }

  async function handleDeleteItem(id: string) {
    if (!confirm("Slette dette objektet?")) return;
    const res = await fetch("/api/items", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (editingId === id) resetForm();
    }
  }

  async function handleAddCategory(e: FormEvent) {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ name: newCatName.trim() }),
    });
    if (res.ok) {
      const cat = await res.json();
      setCategories((prev) => [...prev, cat]);
      setNewCatName("");
      if (!categoryId) setCategoryId(cat.id);
    }
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm("Slette denne kategorien?")) return;
    const res = await fetch("/api/categories", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Admin</h1>
          <p className="mt-1 text-sm text-muted">
            Logg inn for å administrere kategorier og objekter.
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Passord</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Skriv inn admin-passord"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-light"
            >
              Logg inn
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-muted">
            Standard passord:{" "}
            <code className="rounded bg-accent/20 px-1">sandvika2025</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Admin-panel</h1>
          <p className="text-sm text-muted">Administrer utstillingen</p>
        </div>
        <button
          onClick={logout}
          className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:border-primary hover:text-primary"
        >
          Logg ut
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">
              {editingId ? "Rediger objekt" : "Legg ut nytt objekt"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-muted hover:text-primary hover:underline"
              >
                Avbryt redigering
              </button>
            )}
          </div>
          <form onSubmit={handleSubmitItem} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium">Tittel *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Beskrivelse</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium">Pris (kr) *</label>
                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Kategori *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  required
                >
                  <option value="">Velg…</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Bilde-URL</label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <p className="mt-1 text-xs text-muted">
                Lim inn bilde-URL. Tom = standardbilde.
              </p>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-light"
            >
              {editingId ? "Lagre endringer" : "Publiser objekt"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Kategorier</h2>
          <form onSubmit={handleAddCategory} className="mt-4 flex gap-2">
            <input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="Ny kategori…"
              className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light"
            >
              Legg til
            </button>
          </form>
          <ul className="mt-4 space-y-2">
            {categories.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between rounded-xl border border-border px-3 py-2 text-sm"
              >
                <span>{c.name}</span>
                <button
                  onClick={() => handleDeleteCategory(c.id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Slett
                </button>
              </li>
            ))}
            {categories.length === 0 && (
              <li className="text-sm text-muted">Ingen kategorier ennå</li>
            )}
          </ul>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">
          Objekter ({items.length})
        </h2>
        {loading ? (
          <p className="text-muted">Laster…</p>
        ) : items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-12 text-center text-muted">
            Ingen objekter. Legg ut det første ovenfor!
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-accent/10">
                <tr>
                  <th className="px-4 py-3 font-medium">Objekt</th>
                  <th className="hidden px-4 py-3 font-medium sm:table-cell">
                    Kategori
                  </th>
                  <th className="px-4 py-3 font-medium">Pris</th>
                  <th className="px-4 py-3 font-medium text-right">Handling</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const cat = categories.find((c) => c.id === item.categoryId);
                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-border last:border-0 ${
                        editingId === item.id ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-muted line-clamp-1">
                          {item.description}
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 text-muted sm:table-cell">
                        {cat?.name || "—"}
                      </td>
                      <td className="px-4 py-3 font-medium text-primary">
                        {item.price.toLocaleString("nb-NO")} kr
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => startEdit(item)}
                            className="text-xs text-primary hover:underline"
                          >
                            Rediger
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Slett
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
