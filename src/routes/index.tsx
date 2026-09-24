import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "../assets/grocery-hero.png";
import { CATEGORIES, CATEGORY_EMOJI } from "../lib/groceries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FreshCart — Plan Your Shopping Easily" },
      {
        name: "description",
        content:
          "FreshCart helps you plan your grocery shopping easily. Organize items by category, track purchases, and never forget an item again.",
      },
      { property: "og:title", content: "FreshCart — Plan Your Shopping Easily" },
      {
        property: "og:description",
        content:
          "FreshCart helps you plan your grocery shopping easily. Organize items by category, track purchases, and never forget an item again.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Home,
});

const FEATURES = [
  {
    emoji: "📝",
    title: "Smart Lists",
    text: "Add items with quantity, unit, category and notes — everything organized in one place.",
  },
  {
    emoji: "✅",
    title: "Track Progress",
    text: "Check off items as you shop and see your total, purchased and pending counts at a glance.",
  },
  {
    emoji: "🔍",
    title: "Search & Filter",
    text: "Find any item instantly with search, plus category and status filters.",
  },
  {
    emoji: "💾",
    title: "Auto-Saved",
    text: "Your list is saved automatically in your browser — no account, no internet needed.",
  },
];

function Home() {
  return (
    <div className="animate-page-in">
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-2 lg:pt-20">
        <div className="animate-hero-up text-center lg:text-left">
          <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold tracking-wide text-leaf-dark uppercase">
            🌿 Fresh &amp; Organized
          </span>
          <h1 className="mt-5 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            Plan Your Shopping <span className="text-accent">Easily</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground sm:text-lg lg:mx-0">
            FreshCart keeps your grocery list fresh and organized — add items, sort by
            category, and check them off as you shop. Simple, fast and always with you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link to="/list" className="btn-primary text-base">
              🛒 Start Shopping
            </Link>
            <Link to="/about" className="btn-ghost text-base">
              Learn More
            </Link>
          </div>
        </div>

        <div className="animate-hero-up relative mx-auto w-full max-w-md [animation-delay:150ms]">
          <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-leaf-light/60 blur-3xl" />
          <img
            src={heroImg}
            alt="Basket of fresh groceries"
            width={1024}
            height={1024}
            className="animate-float w-full drop-shadow-2xl"
          />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Why FreshCart?</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
          Everything you need for a stress-free shopping trip.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="card-soft card-soft-hover animate-pop-in p-6"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-2xl">
                {f.emoji}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Shop by Category</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
          Organize your list across eight handy categories.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat}
              to="/list"
              search={{ category: cat }}
              className="card-soft animate-pop-in group flex flex-col items-center gap-2 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:bg-secondary/60 hover:shadow-lg"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-4xl transition-transform duration-300 group-hover:scale-125">
                {CATEGORY_EMOJI[cat]}
              </span>
              <span className="font-semibold text-leaf-dark">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="card-soft animate-pop-in relative overflow-hidden p-10 text-center sm:p-14">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-leaf-light/60 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cream blur-2xl" />
          <h2 className="relative text-3xl font-bold sm:text-4xl">
            Ready to shop smarter?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-muted-foreground">
            Build your list in seconds and breeze through the store.
          </p>
          <Link to="/list" className="btn-primary relative mt-7 text-base">
            🛒 Open My Grocery List
          </Link>
        </div>
      </section>
    </div>
  );
}
