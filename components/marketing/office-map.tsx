import { company } from "@/content/site";

export function OfficeMap({ className }: { className?: string }) {
  return (
    <div className={className}>
      <iframe
        title={`${company.name} office location`}
        src={company.mapsEmbedUrl}
        className="h-full min-h-[280px] w-full border-0"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
