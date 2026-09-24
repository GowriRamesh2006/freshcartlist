import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "../assets/grocery-hero.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FreshCart" },
      {
        name: "description",
        content:
          "Learn about FreshCart, a college project grocery list app built with React, TypeScript and Tailwind CSS.",
      },
      { property: "og:title", content: "About — FreshCart" },
      {
        property: "og:description",
        content:
          "Learn about FreshCart, a college project grocery list app built with React, TypeScript and Tailwind CSS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

const TECH = [
  { emoji: "⚛️", name: "React", text: "Component-based UI" },
  { emoji: "📘", name: "TypeScript", text: "Type-safe code" },
  { emoji: "🎨", name: "Tailwind CSS", text: "Utility-first styling" },
  { emoji: "💾", name: "localStorage", text: "Offline persistence" },
];

function About() {
  return (
    <div className="animate-page-in mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="animate-hero-up">
          <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold tracking-wide text-leaf-dark uppercase">
            🌱 About FreshCart
          </span>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            A fresh take on grocery lists
          </h1>
          <p className="mt-5 text-muted-foreground">
            FreshCart is a college project that makes grocery planning simple and
            enjoyable. Instead of scattered notes and forgotten items, FreshCart gives
            you one beautiful place to plan everything — from fruits and vegetables to
            household essentials.
          </p>
          <p className="mt-4 text-muted-foreground">
            The app runs entirely in your browser. Your list is saved automatically to
            localStorage, so it survives page refreshes and works completely offline —
            no accounts, no servers, no fuss.
          </p>
          <Link to="/list" className="btn-primary mt-7">
            🛒 Try the Grocery List
          </Link>
        </div>
        <div className="animate-hero-up relative mx-auto w-full max-w-sm [animation-delay:150ms]">
          <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-cream blur-3xl" />
          <img
            src={heroImg}
            alt="Fresh groceries in a basket"
            width={1024}
            height={1024}
            loading="lazy"
            className="animate-float-slow w-full drop-shadow-2xl"
          />
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-center text-3xl font-bold">Built With</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TECH.map((t, i) => (
            <div
              key={t.name}
              className="card-soft card-soft-hover animate-pop-in p-6 text-center"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="text-3xl">{t.emoji}</span>
              <h3 className="mt-3 text-lg font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="card-soft animate-pop-in p-8 sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">What it does</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Add items with name, quantity, unit, category and notes",
              "Edit or delete any item at any time",
              "Mark items purchased with a single tap",
              "Search instantly and filter by category or status",
              "See total, purchased and pending counts live",
              "Everything saved automatically in your browser",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-xs">
                  ✓
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
