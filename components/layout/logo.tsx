import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const logoUrl = "https://res.cloudinary.com/dnqjax5ut/image/upload/v1779049221/tmctechsolutions_oc321y.png";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="TMC Tech Solutions home">
      <Image
        src={logoUrl}
        alt="TMC Tech Solutions"
        width={180}
        height={44}
        priority
        className={cn("h-10 w-auto object-contain", onDark && "brightness-0 invert")}
      />
    </Link>
  );
}
