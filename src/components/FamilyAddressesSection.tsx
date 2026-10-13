import React from "react";
import { FaArrowUpRightFromSquare, FaMapPin } from "react-icons/fa6";

export interface FamilyAddressesSectionProps {
  groomAddress: string;
  brideAddress?: string;
  groomMapUrl?: string;
  brideMapUrl?: string;
}

const FamilyAddressesSection = React.memo(({ groomAddress, brideAddress, groomMapUrl, brideMapUrl }: FamilyAddressesSectionProps) => {
  const locations = [
    { side: "Nhà chú rể", family: "Tiến Vinh", address: groomAddress, mapUrl: groomMapUrl, tone: "groom" },
    ...(brideAddress ? [{ side: "Nhà cô dâu", family: "Lan Anh", address: brideAddress, mapUrl: brideMapUrl, tone: "bride" }] : []),
  ];

  return (
    <section id="dia-chi-gia-dinh" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#FFF8F7] to-[#F7E8EB] px-4 py-7 sm:scroll-mt-24 sm:px-6 sm:py-9">
      <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-[#E8C783]/10 blur-3xl" />
      <div className="relative mx-auto w-full max-w-5xl">
      <div className="mb-3 text-center sm:mb-4">
        <p className="mb-1 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#A67C52] sm:text-[0.65rem]">Địa chỉ gia đình</p>
        <h3 className="font-display text-xl font-medium leading-tight text-[#6D3F4B] sm:text-2xl">
          Nhà trai &amp; nhà gái
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
        {locations.map((location) => {
          const mapsUrl = location.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
          return (
            <article
              key={location.side}
              className={`grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-xl border px-3 py-2.5 shadow-[0_8px_24px_rgba(125,70,79,0.06)] sm:gap-3 sm:px-3.5 sm:py-3 ${
                location.tone === "groom"
                  ? "border-[#E8C783]/35 bg-gradient-to-r from-white to-[#FFF9F1]"
                  : "border-[#E9CBD0] bg-gradient-to-r from-white to-[#FFF6F7]"
              }`}
            >
              <div className="flex min-w-0 items-start gap-2.5">
                <FaMapPin aria-hidden="true" className="mt-1 shrink-0 text-xs text-[#B1844B]" />
                <div className="min-w-0">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#A67C52] sm:text-[0.62rem]">
                    {location.side}
                    <span aria-hidden="true" className="mx-1.5 text-[#CDBB9C]">·</span>
                    {location.family}
                  </p>
                  <p className="mt-1 break-words text-xs leading-snug text-[#624F4A] sm:text-[0.78rem]">
                    {location.address}
                  </p>
                </div>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Mở bản đồ đến ${location.side.toLowerCase()} tại ${location.address}`}
                className="inline-flex min-h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-[#B88A3D]/25 bg-gradient-to-r from-[#B88A3D] to-[#D4AF68] px-2.5 text-[0.68rem] font-semibold text-white transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A67C52] sm:min-h-9 sm:px-3 sm:text-xs"
              >
                Bản đồ
                <FaArrowUpRightFromSquare aria-hidden="true" className="text-[0.55rem]" />
              </a>
            </article>
          );
        })}
      </div>
      </div>
    </section>
  );
});

FamilyAddressesSection.displayName = "FamilyAddressesSection";

export default FamilyAddressesSection;
