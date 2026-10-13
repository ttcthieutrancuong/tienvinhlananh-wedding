import { useRef, useEffect, useState, useMemo, memo } from "react";
import FloatingParticles from "./FloatingParticles";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const TimelineSection = memo(function TimelineSection({
  lang = "vi",
}: {
  lang?: "vi" | "en";
}) {
  // Dữ liệu timeline mới, alternating trên-dưới, dot luxury, không dùng icon thô
  const WEDDING_TIMELINE = [
    {
      time: "08:30",
      title: { vi: "Đón khách", en: "Đón khách" },
      zh: "01",
      accent: "bg-[#F8E1E7] border-[#F6E7C1]",
    },
    {
      time: "09:00",
      title: { vi: "Mời khách dùng tiệc", en: "Mời khách dùng tiệc" },
      zh: "02",
      accent: "bg-[#F6E7C1] border-[#E7BFA5]",
    },
    {
      time: "11:00",
      title: { vi: "Giao lưu, ca hát", en: "Giao lưu, ca hát" },
      zh: "03",
      accent: "bg-[#F7E7CE] border-[#C8A882]",
    },
    {
      time: "13:00",
      title: { vi: "Đón dâu, rước dâu", en: "Đón dâu, rước dâu" },
      zh: "04",
      accent: "bg-[#FFF7F8] border-[#A67C52]",
    },
    {
      time: "Sau lễ",
      title: { vi: "Chụp ảnh lưu niệm", en: "Chụp ảnh lưu niệm" },
      zh: "05",
      accent: "bg-[#F8E1E7] border-[#C8A882]",
    },
  ];

  // GSAP refs
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const particleRefs = useRef<(HTMLDivElement | SVGSVGElement | null)[]>([]);
  const timelineBarRef = useRef<HTMLDivElement>(null); // Thêm ref cho thanh ngang

  // Responsive: xác định mobile
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Giảm số lượng dot và particle trên mobile

  // Decorative particles used behind the timeline.
  const sparkleCount = isMobile ? 8 : 20;
  const sparkleParticles = useMemo(() => {
    return Array.from({ length: sparkleCount }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: isMobile ? 8 + Math.random() * 8 : 12 + Math.random() * 16,
      opacity: 0.3 + Math.random() * 0.5,
      delay: Math.random() * 2,
    }));
  }, [isMobile, sparkleCount]);

  const [customCount, setCustomCount] = useState(10);
  useEffect(() => {
    function updateParticleCount() {
      const particleCount = Math.max(
        2,
        Math.min(16, Math.floor((window.innerWidth * window.innerHeight) / 60000))
      );
      setCustomCount(particleCount);
    }
    updateParticleCount();
    window.addEventListener("resize", updateParticleCount);
    return () => window.removeEventListener("resize", updateParticleCount);
  }, []);

  useEffect(() => {
    // Timeline fade-in
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8, // chậm hơn
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "restart none none none", // Đổi thành restart
          },
        }
      );
    }
    // Timeline bar animation từ trái sang phải
    if (timelineBarRef.current) {
      gsap.fromTo(
        timelineBarRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 2.1, // chậm hơn
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: timelineBarRef.current,
            start: "top 85%",
            toggleActions: "restart none none none", // Đổi thành restart
          },
        }
      );
    }
    // Dot luxury alternating float-in
    dotRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { scale: 0.6, opacity: 0, y: i % 2 === 0 ? -40 : 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.5, // chậm hơn
            delay: 0.3 + i * 0.22,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "restart none none none", // Đổi thành restart
            },
          }
        );
      }
    });
    // Card info fade-up
    cardRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5, // chậm hơn
            delay: 0.5 + i * 0.22,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "restart none none none", // Đổi thành restart
            },
          }
        );
      }
    });
    // Particle luxury sparkle/float
    particleRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 0.18 + (i % 3) * 0.08,
            scale: 1,
            duration: 1.5, // chậm hơn
            delay: 1 + i * 0.09,
            ease: "power1.out",
            yoyo: true,
            repeat: -1,
            repeatDelay: 2 + Math.random() * 2,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 90%",
              toggleActions: "restart none none none", // Đổi thành restart
            },
          }
        );
      }
    });
    // Tagline luxury animate in
    const tagline = document.querySelector(".luxury-tagline");
    if (tagline) {
      gsap.fromTo(
        tagline,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5, // chậm hơn
          delay: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tagline,
            start: "top 95%",
            toggleActions: "restart none none none", // Đổi thành restart
          },
        }
      );
    }
  }, []);

  return (
    <section
      className="w-full px-2 md:px-8 py-12 bg-gradient-to-br from-[#FFF7F8] via-[#F9E8EC] to-[#F3DDE3] relative overflow-hidden "
      id="timeline"
    >
      {/* Particle background: phủ kín toàn bộ section timeline */}
      {/* Particle count tự động theo diện tích màn hình */}
      <FloatingParticles
        count={customCount}
        areaClassName="absolute left-0 top-0 w-full h-full pointer-events-none overflow-hidden"
        type="custom"
        configs={sparkleParticles.slice(0, customCount).map((particle) => ({
          type: "custom" as const,
          custom: undefined,
          style: "pointer-events-none",
          anim: "",
          color: "#F8BBD0",
          width: particle.size,
          height: particle.size,
          opacity: particle.opacity,
          top: particle.top,
          left: particle.left,
        }))}
        minSize={8}
        maxSize={32}
        randomize={false}
        zIndex={0}
      />
      {/* Chinese luxury pattern 4 góc */}
      <svg
        className="absolute left-0 top-0 w-24 h-24 md:w-32 md:h-32 opacity-30 z-0"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10,90 Q40,60 90,10"
          stroke="#C8A882"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="18" cy="82" r="6" fill="#F6E7C1" fillOpacity="0.7" />
        <rect
          x="5"
          y="85"
          width="10"
          height="5"
          rx="2"
          fill="#E7BFA5"
          fillOpacity="0.5"
        />
      </svg>
      <svg
        className="absolute right-0 top-0 w-24 h-24 md:w-32 md:h-32 opacity-30 z-0 rotate-90"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10,90 Q40,60 90,10"
          stroke="#C8A882"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="18" cy="82" r="6" fill="#F6E7C1" fillOpacity="0.7" />
        <rect
          x="5"
          y="85"
          width="10"
          height="5"
          rx="2"
          fill="#E7BFA5"
          fillOpacity="0.5"
        />
      </svg>
      <svg
        className="absolute left-0 bottom-0 w-24 h-24 md:w-32 md:h-32 opacity-30 z-0 rotate-[-90deg]"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10,90 Q40,60 90,10"
          stroke="#C8A882"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="18" cy="82" r="6" fill="#F6E7C1" fillOpacity="0.7" />
        <rect
          x="5"
          y="85"
          width="10"
          height="5"
          rx="2"
          fill="#E7BFA5"
          fillOpacity="0.5"
        />
      </svg>
      <svg
        className="absolute right-0 bottom-0 w-24 h-24 md:w-32 md:h-32 opacity-30 z-0 rotate-180"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10,90 Q40,60 90,10"
          stroke="#C8A882"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="18" cy="82" r="6" fill="#F6E7C1" fillOpacity="0.7" />
        <rect
          x="5"
          y="85"
          width="10"
          height="5"
          rx="2"
          fill="#E7BFA5"
          fillOpacity="0.5"
        />
      </svg>
      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          className={`text-center text-3xl md:text-4xl font-bold mb-16 tracking-wider text-[#A67C52] ${
            lang === "vi"
              ? "font-['Noto_Serif_SC',serif]"
              : "font-['Stay_Glory_Serif','Playfair_Display',serif]"
          }`}
        >
          Lịch trình buổi tiệc
        </h2>
        <p className="mx-auto -mt-10 mb-12 max-w-xl text-center text-sm leading-relaxed text-[#8B7355] sm:text-base">
          Lịch trình gợi ý: 08:30 đón khách; 09:00 mời tiệc tại tư gia hai gia đình; 11:00 giao lưu ca hát; 13:00 đón dâu, rước dâu về nhà trai; chụp ảnh lưu niệm sau lễ.
        </p>

        {/* Timeline alternating trên-dưới, luxury, dot lớn nối liền đường kẻ */}
        {!isMobile ? (
          <div className="relative w-full min-h-[340px] md:min-h-[400px] flex items-center justify-center pb-8">
            {/* Đường timeline chính: gradient pastel, dot luxury nằm trên đường */}
            <div
              ref={timelineBarRef}
              className="absolute left-8 right-8 md:left-16 md:right-16 top-1/2 h-2 md:h-3 rounded-full z-0 shadow-md"
              style={{
                background:
                  "linear-gradient(90deg, #F8E1E7 0%, #F6E7C1 40%, #E7C6C6 60%, #F7E7CE 100%)",
                transform: "translateY(-50%)",
              }}
            ></div>
            <div className="w-full flex justify-between items-center relative z-10 px-8 md:px-16">
              {WEDDING_TIMELINE.map((item, idx) => {
                const isTop = idx % 2 === 0;
                // Màu luxury đồng bộ toàn trang: pastel vàng nhạt, hồng phấn, ivory, gold, accent nâu nhạt
                const dotBg = [
                  "bg-[#F8E1E7]",
                  "bg-[#F6E7C1]",
                  "bg-[#F7E7CE]",
                  "bg-[#FFF7F8]",
                ][idx % 4];
                const dotBorder = [
                  "border-[#C8A882]",
                  "border-[#E7BFA5]",
                  "border-[#F6E7C1]",
                  "border-[#A67C52]",
                ][idx % 4];
                const cardBorder = [
                  "border-[#F6E7C1]",
                  "border-[#E7BFA5]",
                  "border-[#C8A882]",
                  "border-[#A67C52]",
                ][idx % 4];
                const cardShadow =
                  "shadow-[0_4px_32px_0_rgba(200,168,130,0.10),0_2px_16px_0_rgba(231,191,165,0.08)]";
                const cardBg =
                  "bg-gradient-to-br from-[#FFF7F8]/90 via-[#FFF7F8]/80 to-[#f8e1e7]/90";
                const textColor = "text-[#A67C52]";
                // Chọn font luxury cho tiêu đề
                const titleFont =
                  lang === "vi"
                    ? "font-['Noto_Serif_SC',serif]"
                    : "font-['Playfair_Display',serif]";
                const titleLength = item.title[lang].length;
                const cardMinWidth =
                  titleLength < 10 ? 112 : titleLength < 18 ? 138 : 150;
                const cardMaxWidth = titleLength < 18 ? 170 : 180;
                // Card width tự động, padding hợp lý, không wrap, không overflow
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center w-1/5 min-w-[90px] relative group"
                    ref={(el) => {
                      dotRefs.current[idx] = el;
                    }}
                  >
                    {/* Line nối dot với card info - luxury gradient, luôn căn giữa */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 ${
                        isTop ? "bottom-full" : "top-full"
                      } w-1 h-10 md:h-16 bg-gradient-to-b from-[#E7BFA5] to-[#F6E7C1] z-0`}
                      style={{
                        marginBottom: isTop ? "0.5rem" : 0,
                        marginTop: !isTop ? "0.5rem" : 0,
                      }}
                    ></div>
                    {/* Dot luxury pastel, border gold, Chinese nhỏ, luôn căn giữa */}
                    <div
                      className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center z-20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl ${dotBg} ${dotBorder}`}
                      style={{
                        fontFamily: "Noto Serif SC, serif",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        boxShadow:
                          "0 8px 32px 0 rgba(200, 168, 130, 0.13), 0 2px 16px 0 rgba(231,191,165,0.10)",
                        borderColor: undefined,
                      }}
                    >
                      {/* Inner circle cho depth */}
                      <div className="absolute inset-2 rounded-full bg-white/30 border border-white/40"></div>
                      <span
                        className="font-chinese-elegant select-none pointer-events-none drop-shadow-lg text-center block w-full relative z-10 text-[#A67C52]"
                        style={{
                          fontSize: "1.1em",
                          lineHeight: 1,
                          textShadow: "0 1px 2px rgba(166,124,82,0.13)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {item.zh}
                      </span>
                    </div>
                    {/* Card info luxury, width động, luôn căn giữa, font động, padding đều */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-500 group-hover:scale-105 ${
                        isTop
                          ? "bottom-full mb-10 md:mb-16"
                          : "top-full mt-10 md:mt-16"
                      }`}
                      style={{
                        zIndex: 3,
                        animation: "fadeInUp 1s both",
                        animationDelay: `${0.2 + idx * 0.15}s`,
                        minWidth: cardMinWidth,
                        maxWidth: cardMaxWidth,
                        width: "auto",
                      }}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                    >
                      <div
                        className={`flex flex-col items-center ${cardBg} px-5 py-3 md:px-7 md:py-4 rounded-3xl ${cardShadow} border-2 ${cardBorder} text-center`}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          minWidth: cardMinWidth,
                          maxWidth: cardMaxWidth,
                          width: "auto",
                          boxSizing: "border-box",
                        }}
                      >
                        <span
                          className={`font-bold ${titleFont} mb-1 tracking-wide leading-tight w-full block ${textColor}`}
                          style={{
                            fontSize: titleLength > 18 ? "1em" : "1.13em",
                            textAlign: "center",
                          }}
                        >
                          {item.title[lang]}
                        </span>
                        <span className="text-xs md:text-base text-[#C8A882] font-sans font-semibold bg-[#F8E1E7]/60 px-3 py-1 rounded-full whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // MOBILE TIMELINE: dọc, dot ở giữa, card trái/phải luân phiên
          <div className="relative w-full flex flex-col items-center min-h-[420px] pb-8 px-2">
            {/* Dọc: line dọc ở giữa */}
            <div
              className="absolute left-1/2 top-8 bottom-8 w-2 bg-gradient-to-b from-[#F8E1E7] via-[#F6E7C1] to-[#E7C6C6] rounded-full z-0"
              style={{ transform: "translateX(-50%)" }}
              ref={timelineBarRef}
            ></div>
            <div className="flex flex-col w-full max-w-md mx-auto relative z-10">
              {WEDDING_TIMELINE.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                // Dot luxury
                const dotBg = [
                  "bg-[#F8E1E7]",
                  "bg-[#F6E7C1]",
                  "bg-[#F7E7CE]",
                  "bg-[#FFF7F8]",
                ][idx % 4];
                const dotBorder = [
                  "border-[#C8A882]",
                  "border-[#E7BFA5]",
                  "border-[#F6E7C1]",
                  "border-[#A67C52]",
                ][idx % 4];
                const cardBorder = [
                  "border-[#F6E7C1]",
                  "border-[#E7BFA5]",
                  "border-[#C8A882]",
                  "border-[#A67C52]",
                ][idx % 4];
                const cardShadow =
                  "shadow-[0_4px_32px_0_rgba(200,168,130,0.10),0_2px_16px_0_rgba(231,191,165,0.08)]";
                const cardBg =
                  "bg-gradient-to-br from-[#FFF7F8]/90 via-[#FFF7F8]/80 to-[#f8e1e7]/90";
                const textColor = "text-[#A67C52]";
                const titleFont =
                  lang === "vi"
                    ? "font-['Noto_Serif_SC',serif]"
                    : "font-['Playfair_Display',serif]";
                return (
                  <div
                    key={idx}
                    className="relative flex w-full min-w-0 min-h-[110px] mb-12 last:mb-0"
                  >
                    {/* Card info luxury trái/phải */}
                    <div
                      className={`flex min-w-0 w-1/2 flex-col items-${
                        isLeft ? "end" : "start"
                      } justify-center pr-2 pl-1`}
                      style={{ order: isLeft ? 0 : 2 }}
                    >
                      <div
                        className={`relative w-full min-w-0 max-w-full break-words ${cardBg} px-2 py-3 xs:px-3 rounded-2xl ${cardShadow} border-2 ${cardBorder} ${textColor} ${titleFont} text-xs xs:text-sm font-bold ${isLeft ? "text-right" : "text-left"}`}
                        ref={(el) => {
                          cardRefs.current[idx] = el;
                        }}
                      >
                        <span>{item.title[lang]}</span>
                        <span className="block text-xs text-[#C8A882] font-sans font-semibold bg-[#F8E1E7]/60 px-2 py-0.5 rounded-full mt-1">
                          {item.time}
                        </span>
                      </div>
                    </div>
                    {/* Dot luxury ở giữa */}
                    <div
                      className="flex flex-col items-center justify-center w-0 relative"
                      style={{ order: 1 }}
                    >
                      {/* Line xiên nối dot với card info */}
                      <div
                        className="absolute"
                        style={{
                          top: "50%",
                          left: isLeft ? "calc(-50vw + 50%)" : "auto",
                          right: isLeft ? "auto" : "calc(-50vw + 50%)",
                          width: "60vw",
                          height: 0,
                          borderTop: `2px solid ${cardBorder.replace(
                            "border-",
                            "#"
                          )}`,
                          transform: isLeft
                            ? "translateY(-50%) rotate(-18deg)"
                            : "translateY(-50%) rotate(18deg)",
                          zIndex: 1,
                          opacity: 0.5,
                          display: "block",
                          maxWidth: 120,
                          minWidth: 40,
                        }}
                      ></div>
                      <div
                        className={`relative w-10 h-10 rounded-full border-4 flex items-center justify-center z-20 ${dotBg} ${dotBorder}`}
                        style={{
                          fontFamily: "Noto Serif SC, serif",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                        }}
                        ref={(el) => {
                          dotRefs.current[idx] = el;
                        }}
                      >
                        <div className="absolute inset-2 rounded-full bg-white/30 border border-white/40"></div>
                        <span
                          className="font-chinese-elegant select-none pointer-events-none drop-shadow-lg text-center block w-full relative z-10 text-[#A67C52]"
                          style={{
                            fontSize: "1.1em",
                            lineHeight: 1,
                          }}
                        >
                          {item.zh}
                        </span>
                      </div>
                      {/* Line dọc nối dot với dot tiếp theo */}
                      {idx < WEDDING_TIMELINE.length - 1 && (
                        <div className="w-1 h-10 bg-gradient-to-b from-[#E7BFA5] to-[#F6E7C1] z-0 mx-auto"></div>
                      )}
                    </div>
                    {/* Card info luxury phải/trái (ẩn) */}
                    <div
                      className="w-1/2"
                      style={{ order: isLeft ? 2 : 0 }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Particle background: phủ kín toàn bộ section timeline */}
        <FloatingParticles
          count={isMobile ? 12 : 24}
          areaClassName="absolute left-0 top-0 w-full h-full pointer-events-none overflow-hidden"
          type="dot"
          minSize={8}
          maxSize={14}
          color="#D4AF37"
          randomize={true}
          zIndex={1}
        />
      </div>
    </section>
  );
});

export default TimelineSection;
