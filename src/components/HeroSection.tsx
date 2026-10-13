import { forwardRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";

interface HeroSectionProps {
  language: "vi" | "en";
  content: {
    brideName: string;
    groomName: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDate: string;
    heroLocation: string;
    countdownTitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  weddingDate: Date;
}

import { memo } from "react";
const HeroSection = memo(
  forwardRef<HTMLDivElement, HeroSectionProps>(({ content }, ref) => {
    // Removed countdown functionality since it's not needed in the simplified design

    useEffect(() => {
      // Hero content animations with 3D parallax effect
      const tl = gsap.timeline();

      // Animate the background layers with 3D perspective
      gsap.fromTo(
        ".couple-image",
        {
          scale: 1.2,
          opacity: 0,
          y: 50,
          rotationY: 10,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 2.5,
          ease: "power4.out",
          delay: 0.5,
        }
      );

      // Animate content sections
      tl.fromTo(
        ".hero-title",
        { y: -80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
      )
        .fromTo(
          ".hero-subtitle",
          { y: 80, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".countdown-container",
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.3"
        );

      // Subtle parallax effect on scroll
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.3;

        if (window.innerWidth > 768) {
          // Only on desktop for performance
          gsap.to(".couple-image", {
            y: scrollY * parallaxSpeed,
            duration: 0.1,
            ease: "none",
          });
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      // Cleanup function
      return () => {
        tl.kill();
        gsap.killTweensOf(".couple-image");
        window.removeEventListener("scroll", handleScroll);
      };
    }, []); // Empty dependency array - chỉ chạy một lần

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
        ref={ref}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image Layer (Clear, Sharp, Main Focus) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/backgrounds/hero-background.webp"
            alt="Ảnh nền lễ cưới"
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
              style={{
                perspective: "1500px",
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src="/backgrounds/hero-background-removebg.webp"
                alt="Cô dâu và chú rể"
                decoding="async"
                className="w-full h-full object-cover"
                style={{
                  filter: `
                      drop-shadow(0 40px 80px rgba(0,0,0,0.6)) 
                      drop-shadow(0 20px 40px rgba(0,0,0,0.4))
                    `,
                  transform: "translateZ(30px) rotateY(1deg)",
                  transition: "all 0.3s ease-out",
                  objectPosition: "center 25%",
                }}
              />
            </div>
          </div>
        </div>

        {/* Content Overlay - Modern Typography Design */}
        <div className="relative z-10 w-full h-full flex flex-col justify-end">
          {/* Names set in a compact, readable title plaque */}
          <div className="pb-10 sm:pb-14 lg:pb-16">
            <div className="mx-auto w-fit max-w-[calc(100%-2rem)] rounded-3xl border border-white/30 bg-[#38101D]/50 px-5 py-3 text-center shadow-2xl backdrop-blur-md sm:px-9 sm:py-4">
              <h1 className="flex items-center justify-center gap-2 sm:gap-5">
                <span
                  className="font-display whitespace-nowrap text-[clamp(1.35rem,3.6vw,3.25rem)] font-medium leading-tight text-[#FFF9F5]"
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
                  className="font-display text-[clamp(1.35rem,3.6vw,3.25rem)] font-medium leading-tight text-[#E8C783]"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                    textShadow: "0 2px 14px rgba(0,0,0,0.55)",
                  }}
                >
                  &amp;
                </span>
                <span
                  className="font-display whitespace-nowrap text-[clamp(1.35rem,3.6vw,3.25rem)] font-medium leading-tight text-[#FFF9F5]"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                    letterSpacing: "0.045em",
                    textShadow: "0 2px 14px rgba(0,0,0,0.55)",
                  }}
                >
                  {content.brideName}
                </span>
              </h1>
              <p className="mt-1 text-xs tracking-[0.12em] text-[#FFF9F5] sm:mt-2 sm:text-base">
                {content.heroSubtitle}
              </p>
              <p className="mt-1 text-[0.65rem] tracking-wide text-[#F2D9C0] sm:text-sm">
                {content.heroDate} · {content.heroLocation}
              </p>
            </div>

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
              className="absolute"
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
  })
);

HeroSection.displayName = "HeroSection";

export default HeroSection;
