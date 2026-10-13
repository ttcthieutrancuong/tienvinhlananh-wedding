import { useEffect, useRef, memo } from "react";
import FloatingParticles from "./FloatingParticles";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHeart, FaRing, FaCalendarAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

interface LoveStorySectionProps {
  language: "vi" | "en";
}

const LoveStorySection = memo(({ language }: LoveStorySectionProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Animate story particles with floating effect
      gsap.fromTo(
        ".story-particle",
        {
          opacity: 0,
          y: 20,
          scale: 0.3,
        },
        {
          opacity: 0.3,
          y: 0,
          scale: 1,
          duration: 2.2,
          stagger: 0.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".story-particle",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate Chinese characters
      gsap.fromTo(
        ".chinese-char",
        { opacity: 0, scale: 0, rotation: 45 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.1,
          stagger: 0.35,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate Groom & Bride Section
      gsap.fromTo(
        ".groom-animate, .bride-animate",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          stagger: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".groom-animate",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  const timelineData = {
    vi: {
      title: "Chuyện chúng mình",
      subtitle: "Từ lần đầu gặp gỡ đến lời hẹn trăm năm",
      events: [
        {
          title: "Ngày đầu gặp gỡ",
          description:
            "Giữa những ngày bình dị, chúng mình gặp nhau và bắt đầu viết nên câu chuyện của riêng mình.",
          icon: FaHeart,
          chineseMeaning: "Duyên phận",
          color: "from-pink-400 to-rose-500",
          scene: {
            characters: [
              { emoji: "👨‍💼", position: "left", animation: "walk-right" },
              { emoji: "👩‍💼", position: "right", animation: "walk-left" },
              { emoji: "☕", position: "center", animation: "steam" },
            ],
            setting: "🏪",
            atmosphere: ["✨", "💫", "🌸"],
          },
        },
        {
          title: "Tình yêu lớn dần",
          description:
            "Từ những sẻ chia nhỏ bé mỗi ngày, tình yêu của chúng mình dần trở thành điều quý giá nhất.",
          icon: FaHeart,
          chineseMeaning: "Tình yêu",
          color: "from-red-400 to-pink-500",
          scene: {
            characters: [
              { emoji: "💑", position: "center", animation: "heart-beat" },
              { emoji: "💕", position: "around", animation: "float-around" },
            ],
            setting: "🌳",
            atmosphere: ["❤️", "💖", "🌹"],
          },
        },
        {
          title: "Lời hẹn ước",
          description:
            "Chúng mình chọn nắm tay nhau, cùng vun đắp mái ấm và viết tiếp những tháng ngày phía trước.",
          icon: FaRing,
          chineseMeaning: "Lời hứa",
          color: "from-yellow-400 to-amber-500",
          scene: {
            characters: [
              { emoji: "🧎‍♂️", position: "left", animation: "propose" },
              { emoji: "👰", position: "right", animation: "surprised" },
              { emoji: "💍", position: "center", animation: "shine" },
            ],
            setting: "🌅",
            atmosphere: ["💎", "⭐", "🌟"],
          },
        },
        {
          title: "Ngày chung đôi",
          description:
            "Ngày 3 tháng 11 năm 2026, chúng mình mở ra chặng đường mới. Mong bạn có mặt để niềm vui thêm trọn vẹn.",
          icon: FaCalendarAlt,
          chineseMeaning: "Hôn nhân",
          color: "from-emerald-400 to-teal-500",
          scene: {
            characters: [
              { emoji: "🤵", position: "left", animation: "dance" },
              { emoji: "👰", position: "right", animation: "dance" },
              { emoji: "💒", position: "background", animation: "glow" },
            ],
            setting: "🎊",
            atmosphere: ["🎉", "🎊", "🌺"],
          },
        },
      ],
    },
    en: {
      title: "Chuyện chúng mình",
      subtitle: "Từ lần đầu gặp gỡ đến lời hẹn trăm năm",
      events: [
        {
          title: "Ngày đầu gặp gỡ",
          description:
            "Giữa những ngày bình dị, chúng mình gặp nhau và bắt đầu viết nên câu chuyện của riêng mình.",
          icon: FaHeart,
          chineseMeaning: "Duyên phận",
          color: "from-pink-400 to-rose-500",
          scene: {
            characters: [
              { emoji: "👨‍💼", position: "left", animation: "walk-right" },
              { emoji: "👩‍💼", position: "right", animation: "walk-left" },
              { emoji: "☕", position: "center", animation: "steam" },
            ],
            setting: "🏪",
            atmosphere: ["✨", "💫", "🌸"],
          },
        },
        {
          title: "Tình yêu lớn dần",
          description:
            "Từ những sẻ chia nhỏ bé mỗi ngày, tình yêu của chúng mình dần trở thành điều quý giá nhất.",
          icon: FaHeart,
          chineseMeaning: "Tình yêu",
          color: "from-red-400 to-pink-500",
          scene: {
            characters: [
              { emoji: "💑", position: "center", animation: "heart-beat" },
              { emoji: "💕", position: "around", animation: "float-around" },
            ],
            setting: "🌳",
            atmosphere: ["❤️", "💖", "🌹"],
          },
        },
        {
          title: "Lời hẹn ước",
          description:
            "Chúng mình chọn nắm tay nhau, cùng vun đắp mái ấm và viết tiếp những tháng ngày phía trước.",
          icon: FaRing,
          chineseMeaning: "Lời hẹn ước",
          color: "from-yellow-400 to-amber-500",
          scene: {
            characters: [
              { emoji: "🧎‍♂️", position: "left", animation: "propose" },
              { emoji: "👰", position: "right", animation: "surprised" },
              { emoji: "💍", position: "center", animation: "shine" },
            ],
            setting: "🌅",
            atmosphere: ["💎", "⭐", "🌟"],
          },
        },
        {
          title: "Ngày chung đôi",
          description:
            "Ngày 3 tháng 11 năm 2026, chúng mình mở ra chặng đường mới. Mong bạn có mặt để niềm vui thêm trọn vẹn.",
          icon: FaCalendarAlt,
          chineseMeaning: "Hôn nhân",
          color: "from-emerald-400 to-teal-500",
        },
      ],
    },
  };

  const content = timelineData[language];

  // Thông tin chú rể/cô dâu cho từng ngôn ngữ
  const groomInfo =
    language === "vi"
      ? {
          title: "Chú rể",
          name: "Tiến Vinh",
          birth: "Sinh năm 2001",
          desc: "Chân thành, điềm đạm và luôn trân quý những điều bình dị.",
        }
      : {
          title: "Chú rể",
          name: "Tiến Vinh",
          birth: "Sinh năm 2001",
          desc: "Chân thành, điềm đạm và luôn trân quý những điều bình dị.",
        };
  const brideInfo =
    language === "vi"
      ? {
          title: "Cô dâu",
          name: "Lan Anh",
          birth: "Sinh năm 2004",
          desc: "Dịu dàng, ấm áp và luôn mang đến niềm vui cho người thân yêu.",
        }
      : {
          title: "Cô dâu",
          name: "Lan Anh",
          birth: "Sinh năm 2004",
          desc: "Dịu dàng, ấm áp và luôn mang đến niềm vui cho người thân yêu.",
        };

  const groomPhoto = "/photos/only-chure.jpg";
  const bridePhoto = "/photos/only-codau.jpg";

  // Tối ưu vị trí particle chỉ random 1 lần khi mount
  // Giảm số lượng particle trên mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const particleCount = isMobile ? 2 : 8;

  return (
    <>
      <section
        ref={timelineRef}
        className="relative py-14 sm:py-20 bg-gradient-to-bl from-[#F3DDE3] via-[#F9E8EC] to-[#FFF7F8] overflow-hidden"
      >
        {/* SEO Heading */}
        <h2 className="sr-only">
          Hành trình tình yêu của Tiến Vinh &amp; Lan Anh
        </h2>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 blur-sm">
          <div className="absolute inset-0 bg-[url('/decorations/bamboo-parttern-removebg-preview.webp')] bg-repeat bg-center opacity-30 blur-md"></div>
        </div>

        {/* Chinese Corner Decorations */}
        <div className="absolute top-8 left-8 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#8B7355]">
            <defs>
              <radialGradient id="gold-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fffbe6" />
                <stop offset="100%" stopColor="#D4AF37" />
              </radialGradient>
            </defs>
            <path
              d="M10 10 L90 10 L90 90 L10 90 Z"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="2"
            />
            <path
              d="M20 20 L80 20 L80 80 L20 80 Z"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="1"
            />
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="absolute top-8 right-8 w-24 h-24 opacity-10 rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#8B7355]">
            <use href="#gold-gradient" />
            <path
              d="M10 10 L90 10 L90 90 L10 90 Z"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="2"
            />
            <path
              d="M20 20 L80 20 L80 80 L20 80 Z"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="1"
            />
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16 md:mb-20">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8 mb-4 sm:mb-6">
              <div className="chinese-char text-3xl sm:text-4xl md:text-5xl font-chinese-decorative text-[#8B7355] opacity-60 mb-2 sm:mb-0">
                ❦
              </div>
              <div className="flex flex-col items-center">
                <h2
                  className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide text-[#8B7355] ${
                    language === "vi"
                      ? "font-['Noto_Serif_SC',serif]"
                      : "font-['Stay_Glory_Serif',serif] normal-case"
                  }`}
                  style={{ textTransform: "none" }}
                >
                  {content.title}
                </h2>
              </div>
              <div className="chinese-char text-3xl sm:text-4xl md:text-5xl font-chinese-decorative text-[#8B7355] opacity-60 mt-2 sm:mt-0">
                ♡
              </div>
            </div>

            {/* Groom & Bride Section */}
            <div className="flex flex-col gap-8 sm:gap-10 items-center w-full max-w-3xl mx-auto mb-2 py-4 sm:py-6">
              {/* Groom Row */}
              <div
                className="groom-animate flex flex-col sm:flex-row items-center w-full justify-center relative gap-3 sm:gap-5"
                style={{ opacity: 0, transform: "translateY(32px)" }}
              >
                {/* Chữ cái đầu tên chú rể */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 text-[16vw] sm:text-[8vw] md:text-[5vw] text-[#D4AF37] opacity-10 font-chinese-decorative select-none pointer-events-none z-0">
                  V
                </span>
                {/* Ảnh chú rể */}
                <div className="flex-shrink-0 w-[58vw] max-w-[220px] sm:w-[32vw] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[360px] aspect-[3/4] rounded-2xl overflow-visible relative z-10 shadow-2xl -rotate-3 sm:-rotate-6">
                  <picture>
                    <img
                      src={groomPhoto}
                      alt={groomInfo.title}
                      className="w-full h-full object-cover rounded-2xl border-4 border-[#D4AF37] shadow-gold"
                      style={{
                        boxShadow: "0 8px 32px 0 #D4AF37, 0 2px 8px #fffbe6",
                      }}
                    />
                  </picture>
                </div>
                {/* Thông tin chú rể */}
                <div className="w-full max-w-xl flex-1 ml-0 sm:ml-4 md:ml-10 text-center sm:text-left relative z-10 py-2 sm:py-6">
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-['Noto_Serif_SC',serif] text-[#8B7355] font-bold mb-2 drop-shadow-gold tracking-wide">
                    {groomInfo.title}
                  </h4>
                  <div
                    className={`text-sm sm:text-base md:text-lg text-[#8B7355] opacity-95 font-light leading-relaxed px-1 sm:px-0 sm:pl-5 border-l-0 sm:border-l-2 border-dotted border-[#D4AF37]/80 italic ${
                      language === "en"
                        ? "font-['Playfair_Display',serif]"
                        : "font-['Noto_Serif_SC',serif]"
                    }`}
                  >
                    {groomInfo.name}
                    <br />
                    {groomInfo.birth}
                    <br />
                    {groomInfo.desc}
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37]/80 to-transparent rounded-full mt-3 mb-1"></div>
                </div>
              </div>
              {/* Bride Row */}
              <div
                className="bride-animate flex flex-col sm:flex-row-reverse items-center w-full justify-center relative gap-3 sm:gap-5"
                style={{ opacity: 0, transform: "translateY(32px)" }}
              >
                {/* Chữ cái đầu tên cô dâu */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 text-[16vw] sm:text-[8vw] md:text-[5vw] text-[#D4AF37] opacity-10 font-chinese-decorative select-none pointer-events-none z-0">
                  A
                </span>
                {/* Ảnh cô dâu */}
                <div className="flex-shrink-0 w-[58vw] max-w-[220px] sm:w-[32vw] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[360px] aspect-[3/4] rounded-2xl overflow-visible relative z-10 shadow-2xl rotate-3 sm:rotate-6">
                  <picture>
                    <img
                      src={bridePhoto}
                      alt={brideInfo.title}
                      className="w-full h-full object-cover rounded-2xl border-4 border-[#D4AF37] shadow-gold"
                      style={{
                        boxShadow: "0 8px 32px 0 #D4AF37, 0 2px 8px #fffbe6",
                      }}
                    />
                  </picture>
                </div>
                {/* Thông tin cô dâu */}
                <div className="w-full max-w-xl flex-1 mr-0 sm:mr-4 md:mr-10 text-center sm:text-right relative z-10 py-2 sm:py-6">
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-['Noto_Serif_SC',serif] text-[#8B7355] font-bold mb-2 drop-shadow-gold tracking-wide">
                    {brideInfo.title}
                  </h4>
                  <div
                    className={`text-sm sm:text-base md:text-lg text-[#8B7355] opacity-95 font-light leading-relaxed px-1 sm:px-0 sm:pr-5 border-r-0 sm:border-r-2 border-dotted border-[#D4AF37]/80 italic ${
                      language === "en"
                        ? "font-['Playfair_Display',serif]"
                        : "font-['Noto_Serif_SC',serif]"
                    }`}
                  >
                    {brideInfo.name}
                    <br />
                    {brideInfo.birth}
                    <br />
                    {brideInfo.desc}
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-l from-[#D4AF37]/80 to-transparent rounded-full mt-3 mb-1 ml-auto"></div>
                </div>
              </div>
            </div>

            <p
              className={`text-base sm:text-xl md:text-2xl opacity-80 font-light tracking-wide mb-4 sm:mb-8 text-[#8B7355] ${
                language === "vi"
                  ? "font-['Noto_Serif_SC',serif]"
                  : "font-['Playfair_Display',serif] normal-case"
              }`}
              style={{ textTransform: "none" }}
            >
              {content.subtitle}
            </p>

            {/* Decorative line with enhanced design */}
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]"></div>
                <div className="w-3 h-3 bg-[#D4AF37] rounded-full shadow-gold"></div>
              </div>
              <div className="relative">
                <div className="chinese-char text-3xl text-[#D4AF37] font-chinese-decorative drop-shadow-gold">
                  ♡
                </div>
                <div className="absolute inset-0 text-3xl text-[#D4AF37] font-chinese-decorative blur-sm opacity-30">
                  ♡
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#D4AF37] rounded-full shadow-gold"></div>
                <div className="w-20 h-px bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]"></div>
              </div>
            </div>
          </div>

          {/* Timeline */}

          {/* Bottom Decoration */}
        </div>

        {/* Floating Particles */}
        <FloatingParticles
          count={particleCount}
          areaClassName="absolute inset-0 pointer-events-none overflow-hidden"
          type="orn"
          configs={Array.from({ length: particleCount }, (_, i) => ({
            type: "orn" as const,
            text: i % 2 === 0 ? "❀" : "♡",
            style:
              "story-particle text-[#D4AF37] opacity-20 font-chinese-decorative text-sm pointer-events-none",
            anim: "",
          }))}
          minSize={12}
          maxSize={18}
          randomize={true}
          zIndex={0}
        />
      </section>
    </>
  );
});

export default LoveStorySection;
