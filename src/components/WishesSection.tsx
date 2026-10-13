import React from "react";
import { FaHeart } from "react-icons/fa";

const wishes = [
  { from: "Cương", mark: "C", caption: "gửi lời chúc", message: "Chúc hai bạn trăm năm hạnh phúc, luôn yêu thương và đồng hành cùng nhau!", tone: "gold" },
  { from: "Thủy", mark: "T", caption: "gửi lời thương", message: "Chúc đôi mình mãi ngọt ngào, nắm tay nhau đi qua thật nhiều mùa vui!", tone: "rose" },
  { from: "Trường", mark: "T", caption: "mừng ngày vui", message: "Chúc Tiến Vinh và Lan Anh hạnh phúc viên mãn, sớm có thật nhiều kỷ niệm đẹp!", tone: "lilac" },
  { from: "Lâm", mark: "L", caption: "chúc phúc", message: "Chúc hai bạn luôn vui vẻ, thuận hòa và thương nhau bền lâu!", tone: "gold" },
  { from: "Minh", mark: "M", caption: "chia vui cùng đôi bạn", message: "Chúc mừng ngày vui của hai bạn! Mong mái ấm luôn đầy ắp tiếng cười và yêu thương.", tone: "rose" },
  { from: "Tuấn", mark: "T", caption: "gửi đôi lời", message: "Chúc hai bạn trọn đời bên nhau, cùng xây dựng một gia đình thật hạnh phúc!", tone: "lilac" },
  { from: "Bố", mark: "B", caption: "lời chúc của bố", message: "Bố chúc hai con yêu thương, nhường nhịn và cùng nhau vun đắp mái ấm bình an.", tone: "gold" },
  { from: "Mẹ", mark: "M", caption: "mẹ gửi lời thương", message: "Mẹ chúc hai con luôn hạnh phúc, thuận hòa và mãi trân quý những ngày bên nhau.", tone: "rose" },
  { from: "Anh", mark: "A", caption: "chúc hai em", message: "Anh chúc hai em hạnh phúc dài lâu, luôn sát cánh và sẻ chia mọi điều trong cuộc sống.", tone: "lilac" },
  { from: "Chị", mark: "C", caption: "gửi lời mừng", message: "Chị chúc hai em một đời thương nhau, mỗi ngày đều ngập tràn niềm vui và tiếng cười.", tone: "gold" },
];

const WishesSection = React.memo(() => {
  const liveMessages = [...wishes, ...wishes];

  return (
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8F7] via-[#FBE8ED] to-[#FFF8F7] px-4 py-10 sm:px-6 sm:py-16">
      <div className="pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#E8C783]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#D98B9D]/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <header className="mb-5 text-center sm:mb-7">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-white/70 text-[#C28C63] shadow-sm">
            <FaHeart aria-hidden="true" className="text-sm" />
          </div>
          <p className="mb-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#A67C52] sm:text-xs">
            Bao lời thương mến
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight text-[#6D3F4B] sm:text-4xl md:text-5xl">
            Lời chúc ngày chung đôi
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-[#805F5B] sm:text-base">
            Những lời thương đang được gửi đến hai bạn.
          </p>
        </header>

        <div className="wish-live-stage" aria-label="Bình luận lời chúc đang hiện trên màn hình">
          <div className="wish-backdrop-balloon-field" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} className={`wish-backdrop-balloon wish-backdrop-balloon-${index + 1}`}>
                <span className="wish-backdrop-string" />
                <span className="wish-backdrop-pop">✦</span>
              </span>
            ))}
          </div>
          <span className="wish-live-status"><span className="wish-live-dot" /> ĐANG GỬI LỜI CHÚC</span>
          <div className="wish-live-window">
            <div className="wish-live-track">
              {liveMessages.map((wish, index) => (
                <article className={`wish-live-row wish-live-row-${index % 3}`} key={`${wish.from}-${index}`}>
                  <span aria-hidden="true" className={`wish-live-avatar wish-live-avatar-${wish.tone}`}>
                    {wish.mark}
                  </span>
                  <div className="min-w-0">
                    <p className="wish-live-author">{wish.from}<FaHeart aria-hidden="true" /> <span>{wish.caption}</span></p>
                    <p className="wish-live-message">{wish.message}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WishesSection.displayName = "WishesSection";

export default WishesSection;
