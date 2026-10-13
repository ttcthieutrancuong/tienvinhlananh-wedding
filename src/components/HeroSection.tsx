import { memo, useEffect, useMemo, useRef, type MouseEvent } from "react";
import { gsap } from "gsap";
import { FaLocationDot } from "react-icons/fa6";

interface HeroSectionProps {
  content: {
    brideName: string;
    groomName: string;
    heroSubtitle: string;
  };
}

const HeroSection = memo(({ content }: HeroSectionProps) => {
    const heroRef = useRef<HTMLElement | null>(null);

    const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      const target = document.getElementById(sectionId);
      if (!target) return;

      event.preventDefault();
      const fixedHeader = document.querySelector("header.fixed");
      const headerOffset = (fixedHeader?.getBoundingClientRect().height ?? 0) + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      window.history.replaceState(null, "", `#${sectionId}`);
      window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? "auto" : "smooth" });
    };

    useEffect(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const context = gsap.context(() => {
        gsap.fromTo(
          ".hero-invitation-card",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: "power2.out" }
        );
      }, heroRef);

      return () => context.revert();
    }, []);

    // Tối ưu vị trí các element động chỉ random 1 lần nếu có
    const floralPositions = useMemo(
      () => [
        { top: "20%", left: "25%" },
        { bottom: "36px", right: "25%" },
      ],
      []
    );

    return (
      <section
        ref={heroRef}
        className="hero-section relative h-[100svh] min-h-[560px] max-h-none flex items-center justify-center overflow-hidden sm:max-h-[900px]"
      >
        {/* Background Image Layer (Clear, Sharp, Main Focus) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/backgrounds/hero-background.webp"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
            style={{
              filter: "brightness(0.85) saturate(1.1) contrast(1.1)",
              objectPosition: "center 25%",
            }}
          />
          {/* Light overlay để vẫn thấy màu đỏ */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
          {/* Text protection zones nhẹ hơn */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
        </div>

        {/* 3D Effect: Enhanced Floating Couple Image */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          <div className="relative w-full h-full">
            <div
              className="couple-image absolute inset-0"
            >
              <img
                src="/backgrounds/hero-background-removebg.webp"
                alt="Tiến Vinh và Lan Anh trong ảnh cưới"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: "center 25%",
                }}
              />
            </div>
          </div>
        </div>

        {/* Content Overlay - Modern Typography Design */}
        <div className="relative z-10 w-full h-full flex flex-col justify-end">
          {/* Names set in a compact, readable title plaque */}
          <div className="px-3 pb-7 sm:pb-10 lg:pb-12">
            <div className="hero-invitation-card mx-auto w-fit max-w-full rounded-3xl border border-white/30 bg-[#38101D]/65 px-4 py-3 text-center shadow-xl backdrop-blur-sm sm:px-9 sm:py-4">
              <h1 className="flex items-center justify-center gap-2 sm:gap-5">
                <span
                  className="font-display whitespace-nowrap text-[clamp(1.3rem,5vw,3.25rem)] font-medium leading-tight text-[#FFF9F5]"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                    letterSpacing: "0.045em",
                    textShadow: "0 2px 14px rgba(0,0,0,0.55)",
                  }}
                >
                  {content.groomName}
                </span>
                <span
                  aria-hidden="true"
                  className="font-display text-[clamp(1.3rem,5vw,3.25rem)] font-medium leading-tight text-[#E8C783]"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                    textShadow: "0 2px 14px rgba(0,0,0,0.55)",
                  }}
                >
                  &amp;
                </span>
                <span
                  className="font-display whitespace-nowrap text-[clamp(1.3rem,5vw,3.25rem)] font-medium leading-tight text-[#FFF9F5]"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                    letterSpacing: "0.045em",
                    textShadow: "0 2px 14px rgba(0,0,0,0.55)",
                  }}
                >
                  {content.brideName}
                </span>
              </h1>
              <p className="mt-1 text-[0.82rem] leading-relaxed tracking-wide text-[#FFF9F5] sm:mt-2 sm:text-base">
                {content.heroSubtitle}
              </p>
              <div className="hero-date-ribbon" aria-label="Lễ ăn hỏi ngày 2 tháng 11 và lễ cưới ngày 3 tháng 11 năm 2026">
                <span><i aria-hidden="true">✦</i> 02.11 · LỄ ĂN HỎI</span>
                <span className="hero-date-ribbon__divider" aria-hidden="true">♡</span>
                <span>03.11 · LỄ CƯỚI <i aria-hidden="true">✦</i></span>
              </div>
            </div>

            <nav aria-label="Lối tắt trong thiệp" className="mt-4 flex flex-wrap justify-center gap-2.5">
              <a
                href="#timeline"
                onClick={(event) => scrollToSection(event, "timeline")}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#E8C783]/60 bg-[#38101D]/70 px-4 text-sm font-semibold text-[#FFF9F5] transition-colors hover:bg-[#5A2435] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8C783]"
              >
                Xem lịch trình
              </a>
              <a
                href="#dia-chi-gia-dinh"
                onClick={(event) => scrollToSection(event, "dia-chi-gia-dinh")}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/55 bg-white/15 px-4 text-sm font-semibold text-[#FFF9F5] backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8C783]"
              >
                <FaLocationDot aria-hidden="true" className="text-xs text-[#E8C783]" />
                Xem địa chỉ
              </a>
            </nav>

                {/* Chinese-Style Decorative Elements */}
                <div className="mt-6 sm:mt-8 flex justify-center">
                  <div className="flex items-center space-x-6">
                    {/* Left flourish with Chinese pattern */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-[#D4AF37] opacity-70 font-chinese-decorative">
                        ❦
                      </span>
                      <div
                        className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]/40"
                        style={{
                          boxShadow: "0 1px 3px rgba(212,175,55,0.3)",
                        }}
                      ></div>
                    </div>

                    {/* Center ornament - Double happiness symbol */}
                    <div className="relative">
                      <span
                        className="text-2xl sm:text-3xl text-[#D4AF37] opacity-90 font-chinese-decorative"
                        style={{
                          filter: "drop-shadow(0 3px 8px rgba(212,175,55,0.5))",
                          textShadow: "0 0 15px rgba(212,175,55,0.4)",
                        }}
                      >
                        ♡
                      </span>
                      {/* Subtle glow background */}
                      <div className="absolute inset-0 text-2xl sm:text-3xl text-[#D4AF37] opacity-30 font-chinese-decorative blur-sm">
                        ♡
                      </div>
                    </div>

                    {/* Right flourish with Chinese pattern */}
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]/40"
                        style={{
                          boxShadow: "0 1px 3px rgba(212,175,55,0.3)",
                        }}
                      ></div>
                      <span className="text-sm text-[#D4AF37] opacity-70 font-chinese-decorative">
                        ❦
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        {/* Subtle Romantic Elements Only */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
          {/* Minimal floral background elements */}
          {floralPositions.map((pos, i) => (
            <div
              key={i}
              className="hero-floral-ornament absolute"
              style={{
                ...pos,
                animation:
                  i === 0
                    ? "romantic-float 8s ease-in-out infinite 0.5s"
                    : "gentle-sway 10s ease-in-out infinite 2.5s",
              }}
            >
              <span
                className={
                  i === 0 ? "text-3xl text-[#D4AF37]" : "text-4xl text-white"
                }
                style={{ fontFamily: "'Stay Glory Serif', serif" }}
              >
                {i === 0 ? "\u2740" : "\u273f"}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  });

HeroSection.displayName = "HeroSection";

export default HeroSection;
