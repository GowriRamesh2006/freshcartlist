import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { LeafShape } from "./Decorations";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/list", label: "Grocery List" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <LeafShape className="h-5 w-5" />
          </span>
          <span className="font-[Fraunces] text-2xl font-bold text-leaf-dark">
            Fresh<span className="text-accent">Cart</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all hover:scale-105 ${
                pathname === item.to
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="animate-pop-in flex flex-col gap-1 border-t border-border/60 px-4 pb-4 sm:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                pathname === item.to ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-card/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <LeafShape className="h-4 w-4" />
          </span>
          <span className="font-[Fraunces] text-xl font-bold text-leaf-dark">
            Fresh<span className="text-accent">Cart</span>
          </span>
        </div>
        <p className="max-w-md text-sm text-muted-foreground">
          Plan your shopping easily — a fresh, simple grocery list app built with React,
          TypeScript and Tailwind CSS.
        </p>
        <nav className="flex gap-6 text-sm font-semibold text-leaf-dark">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="transition-colors hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} FreshCart · College Project
        </p>
      </div>
    </footer>
  );
}
