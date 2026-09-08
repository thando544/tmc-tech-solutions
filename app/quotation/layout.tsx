import type { Metadata } from "next";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Quotation | Boat cruise website and operations",
  description: `Fixed-price quotation from ${company.name} for a boat cruise website and operations system.`,
  robots: { index: false, follow: false }
};

export default function QuotationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#eef1f4] print:bg-white">
      {children}
    </div>
  );
}
