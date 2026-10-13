import React from "react";
import { FaArrowUpRightFromSquare, FaMapPin, FaPhone } from "react-icons/fa6";

export interface FamilyAddressesSectionProps {
  groomAddress: string;
  brideAddress?: string;
  groomMapUrl?: string;
  brideMapUrl?: string;
  groomPhone: string;
  bridePhone: string;
}

const FamilyAddressesSection = React.memo(({ groomAddress, brideAddress, groomMapUrl, brideMapUrl, groomPhone, bridePhone }: FamilyAddressesSectionProps) => {
  const locations = [
    { side: "Nhà chú rể", family: "Tiến Vinh", address: groomAddress, mapUrl: groomMapUrl, phone: groomPhone, tone: "groom", number: "01" },
    ...(brideAddress ? [{ side: "Nhà cô dâu", family: "Lan Anh", address: brideAddress, mapUrl: brideMapUrl, phone: bridePhone, tone: "bride", number: "02" }] : []),
  ];

  return (
    <section id="dia-chi-gia-dinh" aria-labelledby="family-addresses-title" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#FFF8F7] via-[#F9EDF0] to-[#F4E2E7] px-4 py-9 sm:scroll-mt-24 sm:px-6 sm:py-12">
      <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-[#E8C783]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-12 h-48 w-48 rounded-full bg-[#C45B69]/[0.07] blur-3xl" />
      <div className="relative mx-auto w-full max-w-5xl">
        <header className="mb-5 text-center sm:mb-8">
          <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#A67C52]">Đón tiếp tại tư gia</p>
          <h2 id="family-addresses-title" className="font-display text-2xl font-medium leading-tight text-[#6D3F4B] sm:text-3xl">
            Địa chỉ &amp; liên hệ
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#68484B] sm:text-sm">
            Chọn đúng gia đình để xem đường đi hoặc gọi điện.
          </p>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-5">
        {locations.map((location) => {
          const mapsUrl = location.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
          const phoneForCall = location.phone.replace(/\s+/g, "");
          return (
            <article
              key={location.side}
              className={`relative flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-white/90 p-4 shadow-[0_14px_38px_rgba(97,49,61,0.08)] sm:p-5 ${
                location.tone === "groom"
                  ? "border-[#E8C783]/55"
                  : "border-[#E9CBD0]"
              }`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${location.tone === "groom" ? "bg-[#D4AF68]" : "bg-[#C77A87]"}`} />
              <div className="flex items-center gap-3">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${location.tone === "groom" ? "bg-[#FBF2E2] text-[#9A7654]" : "bg-[#F9EBEE] text-[#A45D6A]"}`}>
                  <FaMapPin aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#9A7654]">{location.side}</p>
                  <h3 className="mt-0.5 truncate font-display text-xl font-semibold leading-tight text-[#6D3F4B] sm:text-2xl">{location.family}</h3>
                </div>
                <span className="ml-auto self-start font-display text-sm tracking-[0.16em] text-[#BDAA99]">{location.number}</span>
              </div>

              <div className="mt-4 flex min-h-[4.5rem] items-start gap-2.5 rounded-xl bg-[#FBF7F3] px-3 py-3 sm:min-h-[5rem] sm:px-4">
                <FaMapPin aria-hidden="true" className="mt-0.5 shrink-0 text-sm text-[#B1844B]" />
                <p className="min-w-0 break-words text-sm leading-relaxed text-[#624F4A]">{location.address}</p>
              </div>

              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2 sm:mt-auto sm:pt-4">
                <a
                  href={`tel:${phoneForCall}`}
                  aria-label={`Gọi ${location.side.toLowerCase()} ${location.family}, số ${location.phone}`}
                  className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl border border-[#9B5362]/20 bg-[#9B5362]/[0.06] px-3 text-sm font-semibold text-[#75404D] transition-colors hover:bg-[#9B5362]/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75404D]"
                >
                  <FaPhone aria-hidden="true" className="shrink-0 text-xs" />
                  <span className="truncate">{location.phone}</span>
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Mở bản đồ đến ${location.side.toLowerCase()} tại ${location.address}`}
                  className="inline-flex min-h-12 min-w-[7.5rem] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A97B42] to-[#C29A58] px-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A67C52]"
                >
                  Chỉ đường
                  <FaArrowUpRightFromSquare aria-hidden="true" className="shrink-0 text-[0.65rem]" />
                </a>
              </div>
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
