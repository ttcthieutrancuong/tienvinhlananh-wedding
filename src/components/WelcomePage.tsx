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
      });

      // Seal glowing effect
      gsap.to(sealRef.current, {
        scale: 1.1,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Bamboo layers 3D parallax animations
      gsap.to(bambooLayer1Ref.current, {
        y: -20,
        rotation: 1,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(bambooLayer2Ref.current, {
        y: -15,
        x: 10,
        rotation: -0.5,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(bambooLayer3Ref.current, {
        y: -25,
        x: -8,
        rotation: 0.8,
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Animate Chinese lanterns - Random chaotic movement
      lanternsRef.current.forEach((lantern, index) => {
        if (lantern) {
          if (index < 6) {
            // Medium lanterns - chaotic floating patterns
            const randomDirection = Math.random() > 0.5 ? 1 : -1;
            const randomIntensity = 20 + Math.random() * 40;
            const randomSpeed = 4 + Math.random() * 8;

            gsap.to(lantern, {
              y: randomDirection * randomIntensity,
              x: (Math.random() - 0.5) * 30,
              rotation: (Math.random() - 0.5) * 8,
              duration: randomSpeed,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 2,
            });

            // Chaotic swaying
            gsap.to(lantern, {
              rotationZ: (Math.random() - 0.5) * 6,
              duration: 3 + Math.random() * 4,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 1.5,
            });

            // Random scale pulsing
            gsap.to(lantern, {
              scale: 0.95 + Math.random() * 0.1,
              duration: 2 + Math.random() * 3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 1,
            });
          } else if (index < 9) {
            // Large background lanterns - slow chaotic drift
            const randomDrift = Math.random() * 60 - 30;
            const randomFloat = Math.random() * 40 - 20;

            gsap.to(lantern, {
              y: randomFloat,
              x: randomDrift,
              rotation: (Math.random() - 0.5) * 3,
              duration: 12 + Math.random() * 8,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 3,
            });

            gsap.to(lantern, {
              rotationZ: (Math.random() - 0.5) * 4,
              duration: 10 + Math.random() * 6,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 2,
            });
          } else {
            // Small corner lanterns - subtle random bob
            const randomBob = Math.random() * 20 - 10;
            const randomSway = Math.random() * 15 - 7.5;

            gsap.to(lantern, {
              y: randomBob,
              x: randomSway,
              rotation: (Math.random() - 0.5) * 4,
              duration: 6 + Math.random() * 4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 2,
            });

            gsap.to(lantern, {
              rotationZ: (Math.random() - 0.5) * 3,
              duration: 5 + Math.random() * 3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: Math.random() * 1.5,
            });
          }
        }
      });
    }
  }, []);

  const handleEnvelopeClick = () => {
    // Start playback inside the user's click so browsers allow the audio.
    onStartMusic();

    // Animate flap opening
    gsap.to(flapRef.current, {
      rotationX: -180,
      duration: 1,
      ease: "power2.out",
      transformOrigin: "bottom center",
    });

    // Card sliding out with enhanced animation
    gsap.to(cardRef.current, {
      y: -60,
      opacity: 1,
      scale: 1.05,
      duration: 1.2,
      delay: 0.5,
      ease: "back.out(1.7)",
    });

    // Add glow effect to card
    gsap.to(cardRef.current, {
      boxShadow:
        "0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3)",
      duration: 0.3,
      delay: 0.8,
      ease: "power2.out",
    });

    // Start background fade immediately after card appears
    gsap.to(
      [
        bambooLayer1Ref.current,
        bambooLayer2Ref.current,
        bambooLayer3Ref.current,
      ],
      {
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        ease: "power2.out",
      }
    );

    // Fade out lanterns
    gsap.to(lanternsRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 1.2,
      ease: "power2.out",
    });

    // Fade out envelope (except card)
    gsap.to(envelopeRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 1.3,
      ease: "power2.out",
    });

    // Zoom into card and transition to main page (faster)
    gsap.to(cardRef.current, {
      scale: 10,
      y: -150,
      duration: 1.2,
      delay: 1.5,
      ease: "power2.inOut",
      onUpdate: function () {
        // Start transition when zoom reaches 50%
        if (this.progress() > 0.5) {
          onOpen();
        }
      },
    });
  };

  const handleHover = () => {
    setIsHovered(true);
    gsap.to(envelopeRef.current, {
      scale: 1.08,
      y: -5,
      rotationY: 5,
      duration: 0.4,
      ease: "power2.out",
    });

    // Add subtle glow to envelope
    gsap.to(envelopeRef.current, {
      filter: "drop-shadow(0 10px 25px rgba(139, 115, 85, 0.4))",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    gsap.to(envelopeRef.current, {
      scale: 1,
      y: 0,
      rotationY: 0,
      filter: "drop-shadow(0 8px 20px rgba(139, 115, 85, 0.3))",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div className="min-h-screen bg-[#FBE8ED] flex items-center justify-center overflow-hidden relative">
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
      <div className="relative z-20 text-center">
        {/* Elegant Title */}
        <div className="mb-16">
          <img
            src="/icons/monogram-va.svg"
            alt="Chữ lồng V và A"
            className="mx-auto mb-6 h-32 w-32 drop-shadow-[0_4px_12px_#D4AF3766] sm:h-40 sm:w-40"
          />
          <h2 className="text-3xl text-[#8B7355] font-['Cormorant_Garamond',serif] font-semibold tracking-[0.3em] mb-4 drop-shadow-sm uppercase">
            THIỆP CƯỚI
          </h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-0.5 bg-[#D4AF37]"></div>
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
            <div className="w-16 h-0.5 bg-[#D4AF37]"></div>
          </div>
          {/* Elegant subtitle with Chinese touch */}
          <p className="text-[#8B7355] text-sm mt-4 tracking-widest opacity-80 font-['Cormorant_Garamond',serif] font-light italic">
            Một lời hẹn ước, một hành trình chung đôi
          </p>
          <p className="text-[#8B7355] text-xs mt-2 tracking-wider opacity-60 font-chinese-elegant">
            Hẹn gặp bạn trong ngày vui
          </p>
        </div>

        {/* Luxury Envelope */}
        <div
          ref={envelopeRef}
          className="relative cursor-pointer transition-all duration-500 transform-gpu"
          onClick={handleEnvelopeClick}
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOut}
          style={{
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 8px 25px rgba(139, 115, 85, 0.3))",
          }}
        >
          {/* Envelope body */}
          <div className="relative mx-auto aspect-[3/2] w-[min(90vw,24rem)]">
            {/* Main envelope with luxury styling */}
            <div className="w-full h-full bg-gradient-to-br from-[#FFF4F6] via-[#F7DCE3] to-[#F2D2DB] rounded-xl shadow-2xl border-2 border-[#D4AF37] relative overflow-hidden">
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

              {/* Center ornamental design with Chinese touch */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-2 border-[#8B7355] rounded-full flex items-center justify-center opacity-30">
                  <div className="w-16 h-16 border border-[#D4AF37] rounded-full flex items-center justify-center">
                    <div className="text-[#8B7355] text-xl font-['Playfair_Display',serif]">
                      ♥
                    </div>
                  </div>
                </div>
                {/* Chinese double happiness in background */}
                <div className="absolute text-4xl font-chinese-decorative text-[#8B7355] opacity-15">
                  ♡
                </div>
              </div>

              {/* Elegant texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[#8B7355]/10"></div>
            </div>

            {/* Luxury Envelope flap */}
            <div
              ref={flapRef}
              className="absolute top-0 left-0 w-full h-36 bg-gradient-to-b from-[#F2D2DB] via-[#F7DCE3] to-[#FFF4F6] origin-bottom shadow-lg"
              style={{
                clipPath: "polygon(0 0, 100% 0, 88% 100%, 12% 100%)",
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
              className="absolute top-0 left-1/2 z-20 w-[min(84vw,20rem)] min-h-[17rem] -translate-x-1/2 rounded-xl bg-white opacity-0 shadow-2xl"
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
                    ĐẾN CHUNG VUI NGÀY THÀNH HÔN
                  </div>
                  <div className="mt-1 text-xs font-['Cormorant_Garamond',serif] italic tracking-wide text-[#8B7355]">
                    Sự hiện diện của bạn là niềm vui của chúng mình
                  </div>
                  <div className="mt-2 text-xs font-['Cormorant_Garamond',serif] font-semibold tracking-widest text-[#A17B25]">
                    03 · 11 · 2026
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
        <div className="mt-16 text-[#8B7355] text-base tracking-wider font-['Cormorant_Garamond',serif]">
          {isHovered ? (
            <div className="transition-all duration-300">
              <p className="text-[#8B7355] font-['Cormorant_Garamond',serif] font-light italic">
                Chạm hoặc nhấn vào phong bì để mở thiệp
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
              Chạm hoặc nhấn vào phong bì để mở thiệp
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
