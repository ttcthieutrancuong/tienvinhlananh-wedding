import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const wishes = [
  { from: "Thiều Trần Cương", mark: "C", message: "Chúc hai bạn trăm năm hạnh phúc, luôn yêu thương và đồng hành cùng nhau!", tone: "gold" },
  { from: "Đào Xuân Thuỷ", mark: "T", message: "Chúc đôi mình mãi ngọt ngào, nắm tay nhau đi qua thật nhiều mùa vui!", tone: "rose" },
  { from: "Đào Duy Trường", mark: "T", message: "Chúc Tiến Vinh và Lan Anh hạnh phúc viên mãn, sớm có thật nhiều kỷ niệm đẹp!", tone: "lilac" },
  { from: "Lưu Quốc Lâm", mark: "L", message: "Chúc hai bạn luôn vui vẻ, thuận hòa và thương nhau bền lâu!", tone: "gold" },
  { from: "Lê Văn Minh", mark: "M", message: "Chúc mừng ngày vui của hai bạn! Mong mái ấm luôn đầy ắp tiếng cười và yêu thương.", tone: "rose" },
  { from: "Ngô Minh Tuấn", mark: "T", message: "Chúc hai bạn trọn đời bên nhau, cùng xây dựng một gia đình thật hạnh phúc!", tone: "lilac" },
  { from: "Bố", mark: "B", message: "Bố chúc hai con yêu thương, nhường nhịn và cùng nhau vun đắp mái ấm bình an.", tone: "gold" },
  { from: "Mẹ", mark: "M", message: "Mẹ chúc hai con luôn hạnh phúc, thuận hòa và mãi trân quý những ngày bên nhau.", tone: "rose" },
  { from: "Anh", mark: "A", message: "Anh chúc hai em hạnh phúc dài lâu, luôn sát cánh và sẻ chia mọi điều trong cuộc sống.", tone: "lilac" },
  { from: "Chị", mark: "C", message: "Chị chúc hai em một đời thương nhau, mỗi ngày đều ngập tràn niềm vui và tiếng cười.", tone: "gold" },
];

const WishesSection = React.memo(() => {
  const liveMessages = [...wishes, ...wishes];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8F7] via-[#FBE8ED] to-[#FFF8F7] px-4 py-16 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#E8C783]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#D98B9D]/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <header className="mb-9 text-center sm:mb-12">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-white/70 text-[#C28C63] shadow-sm">
            <FaHeart aria-hidden="true" className="text-sm" />
          </div>
          <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#A67C52] sm:text-xs">
            Bao lời thương mến
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight text-[#6D3F4B] sm:text-4xl md:text-5xl">
            Lời chúc ngày chung đôi
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#805F5B] sm:text-base">
            Cùng đọc những lời chúc ngọt ngào gửi đến Tiến Vinh và Lan Anh.
          </p>
        </header>

        <div className="mx-auto max-w-2xl overflow-hidden rounded-[1.75rem] border border-white/90 bg-white/70 p-2 shadow-[0_24px_80px_rgba(125,70,79,0.16)] backdrop-blur-sm sm:p-3">
          <div className="overflow-hidden rounded-[1.3rem] border border-[#EADDD4] bg-[#FFFCFA]">
            <div className="flex items-center gap-3 border-b border-[#EADDD4] bg-gradient-to-r from-[#FFF9F4] to-[#FCEEF0] px-4 py-3.5 sm:px-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white text-[#B1844B]">
                <FaHeart aria-hidden="true" className="text-sm" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-lg font-semibold text-[#684651] sm:text-xl">Ngày vui của Tiến Vinh &amp; Lan Anh</p>
                <p className="text-xs text-[#9A7D75]">Góc gửi lời chúc</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#F1CFD1] bg-white/80 px-2.5 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] text-[#A54E5C] sm:px-3 sm:text-xs">
                <span className="wish-live-dot" />
                TRỰC TIẾP
              </span>
            </div>

            <div className="wish-live-window" aria-label="Dòng lời chúc đang bay lên">
              <div className="wish-live-track">
                {liveMessages.map((wish, index) => (
                  <article className="wish-live-row" key={`${wish.from}-${index}`}>
                    <span aria-hidden="true" className={`wish-live-avatar wish-live-avatar-${wish.tone}`}>
                      {wish.mark}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 px-1 text-xs font-semibold tracking-wide text-[#8B5963]">{wish.from}</p>
                      <p className={`wish-live-bubble wish-live-bubble-${wish.tone}`}>
                        {wish.message}
                        <FaRegHeart aria-hidden="true" className="ml-1.5 inline-block align-[-1px] text-[0.62rem] text-[#C28C63]" />
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-[#EADDD4] bg-[#FFFCFA] px-3 py-3 text-center text-xs text-[#9A7D75] sm:py-3.5 sm:text-sm">
              <FaHeart aria-hidden="true" className="shrink-0 text-[0.65rem] text-[#C28C63]" />
              Mỗi lời chúc là một món quà chúng mình luôn trân quý
              <FaHeart aria-hidden="true" className="shrink-0 text-[0.65rem] text-[#C28C63]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WishesSection.displayName = "WishesSection";

export default WishesSection;
