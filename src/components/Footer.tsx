import React from "react";
import { FaCalendarAlt, FaCopyright, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

const Footer = React.memo(() => (
  <footer className="relative overflow-hidden bg-gradient-to-br from-[#7B344B] via-[#9A4961] to-[#682B40] text-[#FFF7F8]">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,231,236,0.16),transparent_58%)]" />
    <div className="pointer-events-none absolute left-1/2 top-0 h-px w-4/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#E8C783]/70 to-transparent" />

    <div className="relative mx-auto max-w-5xl px-4 py-12 text-center sm:px-8 sm:py-16">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#E8C783]/50 bg-white/5 text-[#E8C783] shadow-[0_0_30px_rgba(232,199,131,0.12)]">
        <FaHeart aria-hidden="true" />
      </div>

      <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#F2D9C0] sm:text-xs sm:tracking-[0.28em]">
        Hẹn bạn trong ngày vui
      </p>
      <h2 className="flex flex-wrap items-center justify-center gap-x-2 font-['Cormorant_Garamond',serif] text-[clamp(2rem,8vw,3.25rem)] font-medium leading-tight tracking-wide text-[#FFF9F5]">
        <span className="font-display whitespace-nowrap">Tiến Vinh</span>
        <span aria-hidden="true" className="font-display text-[#E8C783]">&amp;</span>
        <span className="font-display whitespace-nowrap">Lan Anh</span>
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#FFF7F8]/80 sm:text-base">
        Có bạn chung vui, ngày trọng đại của chúng mình sẽ thêm trọn vẹn.
      </p>

      <div className="mx-auto mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-4 text-left sm:items-center sm:px-5">
          <FaCalendarAlt className="mt-0.5 shrink-0 text-[#E8C783] sm:mt-0" aria-hidden="true" />
          <span className="min-w-0 break-words text-sm leading-relaxed tracking-wide sm:text-center">Thứ Ba, ngày 3 tháng 11 năm 2026</span>
        </div>
        <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-4 text-left sm:items-center sm:px-5">
          <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#E8C783] sm:mt-0" aria-hidden="true" />
          <span className="min-w-0 break-words text-sm leading-relaxed tracking-wide sm:text-center">Tư gia hai gia đình</span>
        </div>
      </div>

      <div className="mx-auto mt-9 h-px max-w-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mt-5 flex flex-col items-center justify-between gap-2 text-xs text-[#FFF7F8]/65 sm:flex-row">
        <span className="inline-flex items-center gap-1.5">
          <FaCopyright aria-hidden="true" /> 2026 Tiến Vinh &amp; Lan Anh
        </span>
        <span className="font-['Cormorant_Garamond',serif] text-sm italic tracking-wide text-[#F2D9C0]/80">
          Thương nhau trọn một đời
        </span>
      </div>
    </div>
  </footer>
));

Footer.displayName = "Footer";

export default Footer;
