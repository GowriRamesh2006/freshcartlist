import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CATEGORIES,
  CATEGORY_EMOJI,
  UNITS,
  useGroceries,
  type Category,
  type GroceryItem,
} from "../lib/groceries";

export const Route = createFileRoute("/list")({
  validateSearch: (search: Record<string, unknown>): { category?: string } => {
    const category = search["category"];
    return typeof category === "string" ? { category } : {};
  },
  head: () => ({
    meta: [
      { title: "Grocery List — FreshCart" },
      {
        name: "description",
        content:
          "Manage your FreshCart grocery list: add, edit, search, filter and check off items — all saved automatically.",
      },
      { property: "og:title", content: "Grocery List — FreshCart" },
      {
        property: "og:description",
        content:
          "Manage your FreshCart grocery list: add, edit, search, filter and check off items — all saved automatically.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GroceryListPage,
});

type StatusFilter = "all" | "pending" | "purchased";

interface FormState {
  name: string;
  quantity: string;
  unit: string;
  category: Category;
  notes: string;
}

const emptyForm: FormState = {
  name: "",
  quantity: "1",
  unit: "pcs",
  category: "Fruits",
  notes: "",
};

function GroceryListPage() {
  const { items, addItem, updateItem, deleteItem, togglePurchased } = useGroceries();
  const { category: initialCategory } = Route.useSearch();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory ?? "all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  const stats = useMemo(() => {
    const purchased = items.filter((i) => i.purchased).length;
    return { total: items.length, purchased, pending: items.length - purchased };
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const q = search.trim().toLowerCase();
      if (q && !item.name.toLowerCase().includes(q) && !item.notes.toLowerCase().includes(q))
        return false;
      if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
      if (statusFilter === "purchased" && !item.purchased) return false;
      if (statusFilter === "pending" && item.purchased) return false;
      return true;
    });
  }, [items, search, categoryFilter, statusFilter]);

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(item: GroceryItem) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      quantity: String(item.quantity),
      unit: item.unit,
      category: item.category,
      notes: item.notes,
    });
    setShowForm(true);
  }

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return;
    const quantity = Math.max(1, Number(form.quantity) || 1);
    if (editingId) {
      updateItem(editingId, { name, quantity, unit: form.unit, category: form.category, notes: form.notes.trim() });
    } else {
      addItem({ name, quantity, unit: form.unit, category: form.category, notes: form.notes.trim() });
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleDelete(id: string) {
    setRemovingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      deleteItem(id);
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 280);
  }

  return (
    <div className="animate-page-in mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold sm:text-5xl">My Grocery List</h1>
          <p className="mt-2 text-muted-foreground">
            Add, track and check off your shopping items.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          ＋ Add Item
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
        {[
          { label: "Total", value: stats.total, emoji: "🛒" },
          { label: "Purchased", value: stats.purchased, emoji: "✅" },
          { label: "Pending", value: stats.pending, emoji: "⏳" },
        ].map((s, i) => (
          <div
            key={s.label}
            className="card-soft animate-pop-in flex items-center gap-3 p-4 sm:p-6"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-xl sm:h-12 sm:w-12">
              {s.emoji}
            </span>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-leaf-dark sm:text-3xl">{s.value}</p>
              <p className="truncate text-xs font-semibold text-muted-foreground sm:text-sm">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <form
          onSubmit={submitForm}
          className="card-soft animate-pop-in mt-8 p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold">
            {editingId ? "Edit Item" : "Add New Item"}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-bold text-leaf-dark">Name *</span>
              <input
                className="input-soft"
                placeholder="e.g. Apples"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoFocus
                required
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold text-leaf-dark">Quantity</span>
              <input
                className="input-soft"
                type="number"
                min={1}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold text-leaf-dark">Unit</span>
              <select
                className="input-soft"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
              >
                {UNITS.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-bold text-leaf-dark">Category</span>
              <select
                className="input-soft"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>
                    {CATEGORY_EMOJI[c]} {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-bold text-leaf-dark">Notes</span>
              <input
                className="input-soft"
                placeholder="Optional notes…"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              {editingId ? "💾 Save Changes" : "＋ Add Item"}
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Search & filters */}
      <div className="card-soft mt-8 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground">
            🔍
          </span>
          <input
            className="input-soft pl-10"
            placeholder="Search items or notes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="input-soft sm:w-44"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_EMOJI[c]} {c}
            </option>
          ))}
        </select>
        <div className="flex rounded-full border border-input bg-muted p-1">
          {(["all", "pending", "purchased"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`flex-1 rounded-full px-4 py-1.5 text-xs font-bold capitalize transition-all sm:flex-none ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-leaf-dark"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      {filtered.length === 0 ? (
        <div className="card-soft animate-pop-in mt-8 p-14 text-center">
          <span className="text-5xl">🧺</span>
          <h3 className="mt-4 text-xl font-bold">
            {items.length === 0 ? "Your basket is empty" : "No items match your filters"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {items.length === 0
              ? "Add your first grocery item to get started."
              : "Try a different search or filter."}
          </p>
          {items.length === 0 && (
            <button onClick={openAdd} className="btn-primary mt-6">
              ＋ Add Your First Item
            </button>
          )}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className={`card-soft card-soft-hover animate-pop-in flex flex-col p-5 transition-opacity ${
                removingIds.has(item.id) ? "animate-pop-out" : ""
              } ${item.purchased ? "opacity-70" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-2xl">
                    {CATEGORY_EMOJI[item.category]}
                  </span>
                  <div className="min-w-0">
                    <h3
                      className={`truncate text-lg font-semibold transition-all ${
                        item.purchased ? "text-muted-foreground line-through" : ""
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {item.quantity} {item.unit} · {item.category}
                    </p>
                  </div>
                </div>
                <label className="flex shrink-0 cursor-pointer items-center" title="Mark purchased">
                  <input
                    type="checkbox"
                    checked={item.purchased}
                    onChange={() => togglePurchased(item.id)}
                    className="peer sr-only"
                  />
                  <span className="grid h-7 w-7 place-items-center rounded-lg border-2 border-input bg-card text-transparent transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
                    ✓
                  </span>
                </label>
              </div>

              {item.notes && (
                <p className="mt-3 rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground">
                  📝 {item.notes}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    item.purchased
                      ? "bg-secondary text-leaf-dark"
                      : "bg-cream text-amber-700"
                  }`}
                >
                  {item.purchased ? "Purchased" : "Pending"}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-sm transition-all hover:scale-110 hover:border-accent hover:bg-secondary"
                    title="Edit item"
                    aria-label={`Edit ${item.name}`}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-sm transition-all hover:scale-110 hover:border-destructive hover:bg-destructive/10"
                    title="Delete item"
                    aria-label={`Delete ${item.name}`}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
