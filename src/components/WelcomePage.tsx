import { useRef, useEffect, useState, useMemo, memo } from "react";
import FloatingParticles from "./FloatingParticles";
import { gsap } from "gsap";

const WelcomePage = memo(({ onOpen, onStartMusic }: { onOpen: () => void; onStartMusic: () => void }) => {
  // Sparkles for bottom floating effect (memoized)
  const bottomSparkles = useMemo(
    () =>
      Array.from({ length: 6 }, () => ({
        width: 2 + Math.random() * 3,
        height: 2 + Math.random() * 3,
        top: 10 + Math.random() * 80,
        left: 10 + Math.random() * 80,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    []
  );
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const bambooLayer1Ref = useRef<HTMLDivElement>(null);
  const bambooLayer2Ref = useRef<HTMLDivElement>(null);
  const bambooLayer3Ref = useRef<HTMLDivElement>(null);
  const lanternsRef = useRef<HTMLDivElement[]>([]);
  const animationContextRef = useRef<gsap.Context | null>(null);
  const openedRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  // Giảm số lượng ornament, corner, sparkle trên mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const ornamentCount = isMobile ? 2 : 6;
  const cornerCount = isMobile ? 2 : 4;
  const sparkleCount = isMobile ? 2 : 6;
  const ornamentPositions = useMemo(
    () =>
      [
        { top: 15, left: 8 },
        { top: 25, left: 85 },
        { top: 70, left: 12 },
        { top: 65, left: 78 },
        { top: 35, left: 5 },
        { top: 45, left: 88 },
      ].slice(0, ornamentCount),
    [ornamentCount]
  );
  const cornerPositions = useMemo(
    () =>
      [
        { top: "10%", left: "5%" },
        { top: "10%", left: "90%" },
        { top: "85%", left: "5%" },
        { top: "85%", left: "90%" },
      ].slice(0, cornerCount),
    [cornerCount]
  );
  // sparkleCount is used for FloatingParticles

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
    // Initial animation - envelope floating in
    gsap.fromTo(
      envelopeRef.current,
      {
        y: -100,
        opacity: 0,
        scale: 0.8,
        rotation: -5,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: prefersReducedMotion ? 0.01 : 2,
        ease: "elastic.out(1, 0.8)",
      }
    );

    if (!prefersReducedMotion) {
      // Floating animation
      gsap.to(envelopeRef.current, {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // Seal glowing effect
      gsap.to(sealRef.current, {
        scale: 1.1,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Keep background art static; animate each small ornament with one transform tween.
      lanternsRef.current.forEach((lantern, index) => {
        if (lantern) {
          const mobile = window.matchMedia("(max-width: 639px)").matches;
          gsap.to(lantern, {
            y: mobile ? (index % 2 ? -7 : 7) : (index % 2 ? -12 : 12),
            x: mobile ? 0 : (index % 2 ? -4 : 4),
            rotation: index % 2 ? -2 : 2,
            duration: 7 + (index % 3) * 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.18,
          });
        }
      });
    }
    }, envelopeRef);
    animationContextRef.current = context;
    return () => {
      context.revert();
      animationContextRef.current = null;
    };
  }, []);

  const handleEnvelopeClick = () => {
    if (openedRef.current) return;
    openedRef.current = true;
    // Call play directly from the trusted click/keyboard activation for Safari.
    onStartMusic();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onOpen();
      return;
    }

    animationContextRef.current?.add(() => {
      const card = cardRef.current;
      const cardBounds = card?.getBoundingClientRect();
      const revealScale = cardBounds
        ? Math.max(window.innerWidth / cardBounds.width, window.innerHeight / cardBounds.height) * 1.12
        : 5;
      const opening = gsap.timeline({ onComplete: onOpen });

      opening
        .to(flapRef.current, {
          rotationX: -180,
          duration: 0.85,
          ease: "power2.inOut",
          transformOrigin: "bottom center",
        })
        .to(sealRef.current, { scale: 1.12, opacity: 0, duration: 0.22, ease: "power1.out" }, "<0.22")
        .to(card, { y: -68, opacity: 1, scale: 1.04, duration: 0.85, ease: "power2.out" }, "<0.12")
        .to([bambooLayer1Ref.current, bambooLayer2Ref.current, bambooLayer3Ref.current, ...lanternsRef.current], {
          opacity: 0,
          duration: 0.45,
          ease: "power1.out",
        }, ">-0.08")
        .to(card, { scale: revealScale, opacity: 1, duration: 0.78, ease: "power2.inOut" }, "+=0.18");
    });
  };

  const handleHover = () => {
    setIsHovered(true);
    animationContextRef.current?.add(() => {
    gsap.to(envelopeRef.current, {
      scale: 1.08,
      y: -5,
      rotationY: 5,
      duration: 0.4,
      ease: "power2.out",
    });
    });
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    animationContextRef.current?.add(() => {
    gsap.to(envelopeRef.current, {
      scale: 1,
      y: 0,
      rotationY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    });
  };

  return (
    <div className="welcome-screen min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF4F6] via-[#FBE8ED] to-[#F2D2DB] opacity-90"></div>

        {/* Luxury decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border border-[#8B7355] rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 border border-[#8B7355] rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 border border-[#8B7355] rounded-full"></div>
          <div className="absolute top-1/3 right-10 w-28 h-28 border border-[#8B7355] rounded-full"></div>
        </div>

        {/* Elegant corner flourishes */}
        <div className="absolute top-8 left-8 w-16 h-16 opacity-20">
          <div className="w-full h-1 bg-[#8B7355] absolute top-0"></div>
          <div className="w-1 h-full bg-[#8B7355] absolute left-0"></div>
          <div className="w-8 h-8 border-r border-b border-[#8B7355] absolute top-4 left-4"></div>
        </div>
        <div className="absolute top-8 right-8 w-16 h-16 opacity-20 rotate-90">
          <div className="w-full h-1 bg-[#8B7355] absolute top-0"></div>
          <div className="w-1 h-full bg-[#8B7355] absolute left-0"></div>
          <div className="w-8 h-8 border-r border-b border-[#8B7355] absolute top-4 left-4"></div>
        </div>
        <div className="absolute bottom-8 left-8 w-16 h-16 opacity-20 -rotate-90">
          <div className="w-full h-1 bg-[#8B7355] absolute top-0"></div>
          <div className="w-1 h-full bg-[#8B7355] absolute left-0"></div>
          <div className="w-8 h-8 border-r border-b border-[#8B7355] absolute top-4 left-4"></div>
        </div>
        <div className="absolute bottom-8 right-8 w-16 h-16 opacity-20 rotate-180">
          <div className="w-full h-1 bg-[#8B7355] absolute top-0"></div>
          <div className="w-1 h-full bg-[#8B7355] absolute left-0"></div>
          <div className="w-8 h-8 border-r border-b border-[#8B7355] absolute top-4 left-4"></div>
        </div>
      </div>

      {/* Elegant Bamboo Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div
          ref={bambooLayer1Ref}
          className="absolute inset-0 transform-gpu opacity-60"
        >
          <img
            src="/decorations/bamboo-parttern-removebg-preview.webp"
            alt=""
            className="w-full h-full object-cover scale-110 filter sepia-[0.3] hue-rotate-[30deg] brightness-[1.2] contrast-[0.8]"
          />
        </div>

        <div
          ref={bambooLayer3Ref}
          className="absolute inset-0 transform-gpu opacity-40"
        >
          <img
            src="/decorations/bamboo-parttern-removebg-preview.webp"
            alt=""
            className="w-full h-full object-cover filter sepia-[0.4] hue-rotate-[45deg] brightness-[1.1] contrast-[0.7]"
          />
        </div>
      </div>

      {/* Luxury Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Elegant floating ornaments */}
        {ornamentPositions.map((pos, i) => (
          <div
            key={`ornament-${i}`}
            ref={(el) => {
              if (el) lanternsRef.current[i] = el;
            }}
            className="absolute transform-gpu opacity-30"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              zIndex: 3,
            }}
          >
            <div className="relative">
              {/* Elegant ornamental design */}
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#DAA520] to-[#B8860B] rounded-full shadow-lg border-2 border-[#8B7355] opacity-80">
                  <div className="absolute inset-2 bg-gradient-to-br from-[#F5DEB3] to-[#F2D2DB] rounded-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[#8B7355] text-lg font-serif">
                        {i % 3 === 0 ? "❁" : i % 3 === 1 ? "✿" : "❀"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#D4AF37] rounded-full shadow-sm"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#D4AF37] rounded-full shadow-sm"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#D4AF37] rounded-full shadow-sm"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#D4AF37] rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Corner elegance elements */}
        {cornerPositions.map((pos, i) => (
          <div
            key={`corner-element-${i}`}
            ref={(el) => {
              if (el) lanternsRef.current[i + 6] = el;
            }}
            className="absolute transform-gpu opacity-25"
            style={{ ...pos, zIndex: 2 }}
          >
            <div className="relative scale-75">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-lg shadow-md border border-[#8B7355] transform rotate-45">
                <div className="absolute inset-1 bg-gradient-to-br from-[#F5DEB3] to-[#F2D2DB] rounded transform -rotate-45 flex items-center justify-center">
                  <div className="text-[#8B7355] text-sm">◊</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Elegant floating particles */}
      <FloatingParticles
        count={sparkleCount}
        areaClassName="absolute inset-0 pointer-events-none"
        type="sparkle"
        minSize={2}
        maxSize={5}
        color="#D4AF37"
        animationName="twinkle"
        randomize={true}
        zIndex={0}
      />

      {/* Main envelope container */}
      <div className="welcome-screen__content relative z-20 text-center">
        {/* Elegant Title */}
        <div className="welcome-screen__intro mb-12 sm:mb-14">
          <img
            src="/icons/monogram-va.svg"
            alt="Chữ lồng V và A"
            className="welcome-screen__monogram mx-auto mb-5 h-28 w-28 drop-shadow-[0_4px_12px_#D4AF3766] sm:h-36 sm:w-36"
          />
          <h2 className="welcome-screen__title text-2xl text-[#8B7355] font-['Cormorant_Garamond',serif] font-semibold tracking-[0.22em] mb-3 drop-shadow-sm uppercase sm:text-3xl">
            THIỆP CƯỚI
          </h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-0.5 bg-[#D4AF37]"></div>
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
            <div className="w-16 h-0.5 bg-[#D4AF37]"></div>
          </div>
          <p className="welcome-screen__invitation-line mt-4 font-['Cormorant_Garamond',serif]">
            Trân trọng mời bạn đến chung vui
          </p>
        </div>

        {/* Luxury Envelope */}
        <div
          ref={envelopeRef}
          role="button"
          tabIndex={0}
          aria-label="Mở thiệp cưới Tiến Vinh và Lan Anh"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleEnvelopeClick();
            }
          }}
          className="welcome-screen__envelope relative cursor-pointer transition-all duration-500 transform-gpu focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A67C52]"
          onClick={handleEnvelopeClick}
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOut}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Envelope body */}
          <div className="relative mx-auto aspect-[3/2] w-[min(90vw,24rem)]">
            <svg className="welcome-screen__shape-defs" aria-hidden="true">
              <defs>
                <clipPath id="welcome-envelope-flap-clip" clipPathUnits="objectBoundingBox">
                  <path d="M0 0 H1 C1 .22 .94 .76 .89 .96 Q.88 1 .86 1 H.14 Q.12 1 .11 .96 C.06 .76 0 .22 0 0 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* Main envelope with luxury styling */}
            <div className="welcome-screen__envelope-body w-full h-full bg-gradient-to-br from-[#FFF8F2] via-[#F2E1DC] to-[#E9D2D0] rounded-2xl shadow-2xl border border-[#C8A66C] relative overflow-hidden">
              {/* Elegant decorative patterns */}
              <div className="absolute inset-4 border border-[#8B7355] rounded-lg opacity-60"></div>
              <div className="absolute inset-6 border border-[#B8860B] rounded-md opacity-40"></div>

              {/* Luxury corner ornaments with Chinese elements */}
              <div className="absolute top-8 left-8 w-8 h-8">
                <div className="absolute inset-0 border-l-2 border-t-2 border-[#8B7355] rounded-tl-lg"></div>
                <div className="absolute top-1 left-1 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                <div className="absolute -top-1 -left-1 text-xs font-chinese-decorative text-[#8B7355] opacity-50">
                  ✿
                </div>
              </div>
              <div className="absolute top-8 right-8 w-8 h-8">
                <div className="absolute inset-0 border-r-2 border-t-2 border-[#8B7355] rounded-tr-lg"></div>
                <div className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                <div className="absolute -top-1 -right-1 text-xs font-chinese-decorative text-[#8B7355] opacity-50">
                  ✿
                </div>
              </div>
              <div className="absolute bottom-8 left-8 w-8 h-8">
                <div className="absolute inset-0 border-l-2 border-b-2 border-[#8B7355] rounded-bl-lg"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                <div className="absolute -bottom-1 -left-1 text-xs font-chinese-decorative text-[#8B7355] opacity-50">
                  ❦
                </div>
              </div>
              <div className="absolute bottom-8 right-8 w-8 h-8">
                <div className="absolute inset-0 border-r-2 border-b-2 border-[#8B7355] rounded-br-lg"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                <div className="absolute -bottom-1 -right-1 text-xs font-chinese-decorative text-[#8B7355] opacity-50">
                  ❦
                </div>
              </div>

              {/* A quiet monogram keeps the envelope personal and elegant. */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="welcome-screen__envelope-monogram">
                  <span>V <i>&amp;</i> A</span>
                  <span className="welcome-screen__envelope-names">TIẾN VINH · LAN ANH</span>
                </div>
              </div>

              <div className="welcome-screen__envelope-date absolute bottom-7 left-0 right-0 text-center font-['Cormorant_Garamond',serif]">
                02 — 03 · 11 · 2026
              </div>

              {/* Elegant texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[#8B7355]/10"></div>
            </div>

            {/* Luxury Envelope flap */}
            <div
              ref={flapRef}
              className="welcome-screen__flap absolute top-0 h-36 bg-gradient-to-b from-[#F2D2DB] via-[#F7DCE3] to-[#FFF4F6] origin-bottom shadow-lg"
              style={{
                clipPath: "url(#welcome-envelope-flap-clip)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Elegant flap pattern */}
              <div className="absolute inset-4 opacity-50">
                <div className="w-full h-full border border-[#8B7355] rounded-t-xl"></div>
              </div>
              <div className="absolute inset-6 opacity-30">
                <div className="w-full h-full border border-[#B8860B] rounded-t-lg"></div>
              </div>
              {/* Flap luxury texture */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
            </div>

            {/* Luxury Wax seal with Chinese element */}
            <div
              ref={sealRef}
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-[#8B4513] to-[#654321] rounded-full shadow-2xl flex items-center justify-center border-4 border-[#D4AF37] z-10"
              style={{
                boxShadow:
                  "0 0 20px rgba(139, 69, 19, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="relative">
                <span className="text-[#D4AF37] text-xl font-['Playfair_Display',serif] drop-shadow-md">
                  ♥
                </span>
                {/* Small Chinese character */}
                <div className="absolute -top-1 -right-1 text-xs font-chinese-decorative text-[#D4AF37] opacity-70">
                  ♡
                </div>
              </div>
              {/* Seal luxury reflection */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
            </div>

            {/* Luxury hidden card that slides out */}
            <div
              ref={cardRef}
              className="welcome-screen__invitation-card absolute top-0 left-1/2 z-20 w-[min(84vw,20rem)] min-h-[17rem] -translate-x-1/2 rounded-xl bg-white opacity-0 shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #faf8f3 50%, #FFF4F6 100%)",
              }}
            >
              <div className="relative flex min-h-[17rem] flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-[#D4AF37] px-5 py-6">
                {/* Card luxury background pattern with Chinese elements */}
                <div className="absolute inset-0 opacity-8">
                  <div className="absolute top-4 left-4 text-3xl text-[#8B7355] font-['Playfair_Display',serif] opacity-30">
                    ❦
                  </div>
                  <div className="absolute bottom-4 right-4 text-3xl text-[#8B7355] font-['Playfair_Display',serif] opacity-30">
                    ❧
                  </div>
                  {/* Chữ cái đầu trong tên hai bạn */}
                  <div className="absolute top-2 right-2 text-sm font-chinese-decorative text-[#8B7355] opacity-20">
                    V
                  </div>
                  <div className="absolute bottom-2 left-2 text-sm font-chinese-decorative text-[#8B7355] opacity-20">
                    A
                  </div>
                </div>

                {/* Card elegant content */}
                <div className="relative z-10 w-full text-center">
                  <div className="mb-1 text-xs font-['Cormorant_Garamond',serif] font-semibold tracking-[0.2em] text-[#8B7355]">
                    TRÂN TRỌNG KÍNH MỜI
                  </div>
                  <div className="mb-1 font-['Playfair_Display',serif] text-lg font-medium text-[#765D43]">
                    Tiến Vinh <span className="text-[#D4AF37]">&amp;</span> Lan Anh
                  </div>
                  <div className="my-2 flex items-center justify-center space-x-2">
                    <div className="w-8 h-0.5 bg-[#D4AF37]"></div>
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                    <div className="w-8 h-0.5 bg-[#D4AF37]"></div>
                  </div>
                  <div className="text-sm font-['Cormorant_Garamond',serif] font-semibold tracking-wide text-[#8B7355]">
                    MỜI DỰ LỄ ĂN HỎI &amp; LỄ CƯỚI
                  </div>
                  <div className="mt-1 text-xs font-['Cormorant_Garamond',serif] italic tracking-wide text-[#8B7355]">
                    Sự hiện diện của bạn là niềm vui của chúng mình
                  </div>
                  <div className="mt-2 text-xs font-['Cormorant_Garamond',serif] font-semibold tracking-widest text-[#A17B25]">
                    02 — 03 · 11 · 2026
                  </div>
                </div>

                {/* Card luxury corners */}
                <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[#D4AF37]"></div>
                <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[#D4AF37]"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[#D4AF37]"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[#D4AF37]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Instructions */}
        <div className="welcome-screen__hint mt-10 text-[#8B7355] text-sm tracking-wider font-['Cormorant_Garamond',serif] sm:mt-12 sm:text-base">
          {isHovered ? (
            <div className="transition-all duration-300">
              <p className="text-[#8B7355] font-['Cormorant_Garamond',serif] font-light italic">
                Chạm vào phong bì để mở lời mời
              </p>
              <div className="flex items-center justify-center mt-2 space-x-2">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          ) : (
          <p className="font-['Cormorant_Garamond',serif] font-light">
              Chạm vào phong bì để mở lời mời
            </p>
          )}
        </div>

        {/* Elegant Decorative elements */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-6 opacity-40">
          <div className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse"></div>
          <div
            className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      {/* Luxury floating effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Elegant sparkles (memoized) */}
        {bottomSparkles.map((pos, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute bg-[#D4AF37] rounded-full opacity-50"
            style={{
              width: `${pos.width}px`,
              height: `${pos.height}px`,
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              animationDelay: `${pos.delay}s`,
              animation: `twinkle ${pos.duration}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
});

export default WelcomePage;
