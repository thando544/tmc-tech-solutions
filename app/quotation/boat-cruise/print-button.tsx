"use client";

export function PrintQuoteButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="focus-ring h-10 border border-foreground bg-white px-4 text-sm font-semibold text-foreground hover:bg-secondary-background print:hidden"
    >
      Print / save PDF
    </button>
  );
}
