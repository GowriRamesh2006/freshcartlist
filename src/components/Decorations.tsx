export function LeafShape({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
    </svg>
  );
}

export function FloatingDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* soft circles */}
      <div className="animate-float-slow absolute -top-20 -left-20 h-72 w-72 rounded-full bg-leaf-light/50 blur-2xl" />
      <div className="animate-float absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-cream/80 blur-2xl" />
      <div className="animate-float-slow absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-accent/20 blur-2xl" />
      <div className="animate-float absolute top-24 right-1/3 h-32 w-32 rounded-full bg-leaf-light/60 blur-xl" />

      {/* leaves */}
      <LeafShape className="animate-leaf-sway absolute top-[12%] left-[6%] h-10 w-10 text-accent/50" />
      <LeafShape className="animate-float-slow absolute top-[55%] right-[8%] h-14 w-14 text-leaf/40" />
      <LeafShape className="animate-float absolute bottom-[15%] left-[12%] h-8 w-8 text-leaf-dark/25" />
      <LeafShape className="animate-leaf-sway absolute top-[30%] right-[22%] h-6 w-6 text-accent/60" />
      <LeafShape className="animate-float-slow absolute bottom-[30%] right-[35%] h-9 w-9 text-leaf-light" />
    </div>
  );
}
