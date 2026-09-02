import { BrandMarkRaise } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const NON_BREAKING_SPACE = " ";

export function BrandSignature({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("brand-signature", className)}>
      <BrandMarkRaise className="w-[clamp(2.75rem,9vw,7rem)] shrink-0 text-primary" />
      <span className="brand-signature-word display-face text-primary-muted">
        {[...name].map((letter, index) => (
          <span key={`${letter}-${index}`} className="brand-signature-letter">
            <span className="brand-signature-glyph">
              {letter === " " ? NON_BREAKING_SPACE : letter}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}
