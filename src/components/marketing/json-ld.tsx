import type { JsonLd as JsonLdDocument } from "@/lib/seo/json-ld";

export function JsonLd({ data }: { data: JsonLdDocument }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll("<", "\\u003c") }}
    />
  );
}
