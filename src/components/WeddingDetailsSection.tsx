import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const WeddingDetailsSection = React.memo(() => (
  <section
    id="thong-tin-le-cuoi"
    aria-labelledby="wedding-details-title"
    className="scroll-mt-24 bg-gradient-to-b from-[#FFF8F7] via-[#FBE8ED] to-[#FFF8F7] px-4 py-7 sm:px-6 sm:py-16"
  >
    <div className="mx-auto max-w-5xl">
      <header className="mx-auto mb-5 max-w-2xl text-center sm:mb-9">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A67C52]">
          Hai ngày đáng nhớ
        </p>
        <h2
          id="wedding-details-title"
          className="font-display text-3xl font-medium leading-tight text-[#6D3F4B] sm:text-4xl"
        >
          Hai ngày nên duyên
        </h2>
      </header>

      <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2 sm:gap-4">
        <article className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#E8C783]/45 bg-white/75 px-4 py-4 shadow-[0_8px_24px_rgba(125,70,79,0.06)] sm:px-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FBF0E6] text-[#A67C52]" aria-hidden="true">
            <FaCalendarAlt />
          </span>
          <div className="min-w-0">
          <p className="text-xs font-medium text-[#72543A]">Lễ ăn hỏi &amp; lễ cưới</p>
            <p className="font-display text-lg font-semibold leading-snug text-[#6D3F4B] sm:text-xl">02–03 tháng 11, 2026</p>
          </div>
        </article>

        <article className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#E9CBD0] bg-white/75 px-4 py-4 shadow-[0_8px_24px_rgba(125,70,79,0.06)] sm:px-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FBECEF] text-[#A45D6A]" aria-hidden="true">
            <FaMapMarkerAlt />
          </span>
          <div className="min-w-0">
          <p className="text-xs font-medium text-[#72543A]">Nơi tổ chức</p>
            <p className="font-display text-lg font-semibold leading-snug text-[#6D3F4B] sm:text-xl">Tư gia hai gia đình</p>
          </div>
        </article>
      </div>

    </div>
  </section>
));

WeddingDetailsSection.displayName = "WeddingDetailsSection";

export default WeddingDetailsSection;
