import React from "react";
import { FaArrowUp, FaCopyright, FaHeart } from "react-icons/fa";

const Footer = React.memo(() => (
  <footer className="relative isolate overflow-hidden bg-[#552331] text-[#FFF7F8]">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,199,131,0.16),transparent_48%),linear-gradient(135deg,#713248_0%,#552331_55%,#42202C_100%)]" />
    <div className="pointer-events-none absolute inset-x-5 top-4 h-px bg-gradient-to-r from-transparent via-[#E8C783]/50 to-transparent sm:inset-x-10 sm:top-6" />

    <div className="relative mx-auto max-w-5xl px-5 pb-6 pt-10 text-center sm:px-8 sm:pb-8 sm:pt-14">
      <img
        src="/icons/monogram-va.svg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="mx-auto h-14 w-14 sm:h-16 sm:w-16"
      />
      <p className="mt-4 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[#E8C783] sm:text-xs">
        Lễ ăn hỏi &amp; lễ cưới · 02–03.11.2026
      </p>

      <div className="mx-auto mt-5 grid max-w-2xl grid-cols-[1fr_auto_1fr] items-center gap-3 sm:mt-6 sm:gap-8">
        <div className="text-right">
          <p className="text-[0.58rem] font-medium uppercase tracking-[0.2em] text-[#F2D9C0]/65 sm:text-[0.65rem]">Chú rể</p>
          <p className="mt-1 font-display text-2xl leading-none text-[#FFF9F5] sm:text-4xl">Tiến Vinh</p>
        </div>
        <FaHeart aria-hidden="true" className="text-sm text-[#E8C783] sm:text-base" />
        <div className="text-left">
          <p className="text-[0.58rem] font-medium uppercase tracking-[0.2em] text-[#F2D9C0]/65 sm:text-[0.65rem]">Cô dâu</p>
          <p className="mt-1 font-display text-2xl leading-none text-[#FFF9F5] sm:text-4xl">Lan Anh</p>
        </div>
      </div>

      <div className="mx-auto mt-6 h-px max-w-md bg-gradient-to-r from-transparent via-[#E8C783]/45 to-transparent sm:mt-8" />
      <h2 className="mx-auto mt-5 max-w-xl font-display text-2xl italic leading-tight text-[#FFF9F5] sm:mt-6 sm:text-3xl">
        Trân trọng cảm ơn
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-[#FFF7F8]/75 sm:text-sm">
        Cảm ơn gia đình, người thân và bạn bè đã dành thời gian đến chung vui, gửi lời chúc và cùng chúng mình lưu giữ ngày hạnh phúc này.
      </p>

      <a
        href="#"
        className="mx-auto mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E8C783]/35 px-4 text-xs font-medium text-[#F7E8D4] transition-colors hover:border-[#E8C783]/70 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8C783] sm:mt-6 sm:text-sm"
      >
        <FaArrowUp aria-hidden="true" className="text-[0.65rem]" />
        Về đầu trang
      </a>

      <div className="mx-auto mt-7 h-px max-w-3xl bg-gradient-to-r from-transparent via-white/15 to-transparent sm:mt-9" />
      <div className="mt-4 flex flex-col items-center justify-between gap-2 text-xs text-[#FFF7F8]/60 sm:mt-5 sm:flex-row">
        <span className="inline-flex items-center gap-1.5"><FaCopyright aria-hidden="true" /> 2026 · Tiến Vinh &amp; Lan Anh</span>
        <span className="font-display italic tracking-wide text-[#F2D9C0]/80">Được viết nên bằng yêu thương</span>
      </div>
    </div>
  </footer>
));

Footer.displayName = "Footer";

export default Footer;
