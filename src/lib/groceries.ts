import { useCallback, useEffect, useState } from "react";

export const CATEGORIES = [
  "Fruits",
  "Vegetables",
  "Dairy",
  "Grains",
  "Snacks",
  "Beverages",
  "Household",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const UNITS = ["pcs", "kg", "g", "L", "ml", "pack", "box", "dozen"] as const;

export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: Category;
  notes: string;
  purchased: boolean;
  createdAt: number;
}

const STORAGE_KEY = "freshcart-items-v1";

export const CATEGORY_EMOJI: Record<Category, string> = {
  Fruits: "🍎",
  Vegetables: "🥕",
  Dairy: "🥛",
  Grains: "🌾",
  Snacks: "🍪",
  Beverages: "🧃",
  Household: "🧼",
  Other: "🛒",
};

function loadItems(): GroceryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedItems();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as GroceryItem[];
  } catch {
    return [];
  }
}

function seedItems(): GroceryItem[] {
  const now = Date.now();
  return [
    { id: crypto.randomUUID(), name: "Bananas", quantity: 6, unit: "pcs", category: "Fruits", notes: "Ripe ones for smoothies", purchased: false, createdAt: now - 5000 },
    { id: crypto.randomUUID(), name: "Spinach", quantity: 1, unit: "pack", category: "Vegetables", notes: "", purchased: true, createdAt: now - 4000 },
    { id: crypto.randomUUID(), name: "Milk", quantity: 2, unit: "L", category: "Dairy", notes: "Low fat", purchased: false, createdAt: now - 3000 },
    { id: crypto.randomUUID(), name: "Brown Rice", quantity: 1, unit: "kg", category: "Grains", notes: "", purchased: false, createdAt: now - 2000 },
    { id: crypto.randomUUID(), name: "Orange Juice", quantity: 1, unit: "L", category: "Beverages", notes: "No added sugar", purchased: true, createdAt: now - 1000 },
  ];
}

export function useGroceries() {
  const [items, setItems] = useState<GroceryItem[]>(loadItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback(
    (item: Omit<GroceryItem, "id" | "createdAt" | "purchased">) => {
      setItems((prev) => [
        { ...item, id: crypto.randomUUID(), purchased: false, createdAt: Date.now() },
        ...prev,
      ]);
    },
    []
  );

  const updateItem = useCallback((id: string, patch: Partial<GroceryItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const togglePurchased = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, purchased: !it.purchased } : it))
    );
  }, []);

  return { items, addItem, updateItem, deleteItem, togglePurchased };
}
