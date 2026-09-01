import { MAP_EXTENT, REGIONS } from "@/lib/map/regions";
import { MAP_VIEW_BOX, MAP_VIEW_BOX_ATTRIBUTE, anchorPoint, regionPath } from "@/lib/map/svg-path";
import type { Locale } from "@/i18n/routing";

const REFERENCE_WIDTH = 600;
const REFERENCE_HEIGHT = REFERENCE_WIDTH / (MAP_EXTENT.width / MAP_EXTENT.height);
const CHARACTER_WIDTH = 6.6;
const CHIP_PADDING = 18;
const CHIP_HEIGHT = 20;
const LABEL_GAP = 8;

function labelsThatFit(locale: Locale) {
  const placed: Array<[number, number, number, number]> = [];

  return REGIONS.filter((region) => {
    const { x, y } = anchorPoint(region);
    const width = region.names[locale].length * CHARACTER_WIDTH + CHIP_PADDING;
    const left =
      ((x - MAP_VIEW_BOX.minX) / MAP_VIEW_BOX.width) * REFERENCE_WIDTH - width / 2;
    const bottom =
      ((y - MAP_VIEW_BOX.minY) / MAP_VIEW_BOX.height) * REFERENCE_HEIGHT - LABEL_GAP;
    const box: [number, number, number, number] = [
      left,
      bottom - CHIP_HEIGHT,
      left + width,
      bottom,
    ];

    if (placed.some(([l, t, r, b]) => box[0] < r && box[2] > l && box[1] < b && box[3] > t)) {
      return false;
    }
    placed.push(box);
    return true;
  });
}

export function RegionMapFlat({ locale }: { locale: Locale }) {
  const labelled = labelsThatFit(locale);

  return (
    <div
      className="relative max-h-full w-full self-center"
      style={{ aspectRatio: `${MAP_EXTENT.width} / ${MAP_EXTENT.height}` }}
    >
      <svg
        viewBox={MAP_VIEW_BOX_ATTRIBUTE}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {REGIONS.map((region) => (
          <path
            key={region.id}
            d={regionPath(region)}
            fillRule="evenodd"
            className="fill-surface stroke-primary-ink/30"
            strokeWidth={0.004}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {REGIONS.map((region) => {
          const { x, y } = anchorPoint(region);
          return (
            <g key={region.id}>
              <circle cx={x} cy={y} r={0.028} className="fill-primary/20" />
              <circle cx={x} cy={y} r={0.013} className="fill-primary-ink" />
            </g>
          );
        })}
      </svg>

      <div aria-hidden="true" className="absolute inset-0 hidden sm:block">
        {labelled.map((region) => {
          const { x, y } = anchorPoint(region);
          return (
            <span
              key={region.id}
              className="absolute -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] rounded-full border border-border bg-surface/90 px-2 py-0.5 text-xs leading-tight font-semibold whitespace-nowrap text-primary-ink"
              style={{
                left: `${((x - MAP_VIEW_BOX.minX) / MAP_VIEW_BOX.width) * 100}%`,
                top: `${((y - MAP_VIEW_BOX.minY) / MAP_VIEW_BOX.height) * 100}%`,
              }}
            >
              {region.names[locale]}
            </span>
          );
        })}
      </div>
    </div>
  );
}
