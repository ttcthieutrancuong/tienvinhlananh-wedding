import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

interface HeaderProps {
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

const Header = ({
  audioEnabled,
  onToggleAudio,
}: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Liquid glass effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newIsScrolled = scrollTop > 50;

      if (newIsScrolled !== isScrolled) {
        setIsScrolled(newIsScrolled);

        if (headerRef.current) {
          gsap.to(headerRef.current, {
            backdropFilter: newIsScrolled ? "blur(20px)" : "blur(0px)",
            background: newIsScrolled
              ? "linear-gradient(135deg, rgba(255,244,246,0.88) 0%, rgba(249,220,228,0.82) 50%, rgba(211,162,111,0.18) 100%)"
              : "transparent",
            borderColor: newIsScrolled ? "rgba(212,175,55,0.3)" : "transparent",
            duration: 0.6,
            ease: "power2.out",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${
        isScrolled
          ? "liquid-glass liquid-animated border-[#D4AF37]/30 shadow-xl lg:rounded-b-full"
          : "backdrop-blur-none border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section with Chinese Accent - Clickable */}
          <button
            type="button"
            aria-label="Về đầu thiệp cưới"
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer header-logo"
            onClick={scrollToTop}
          >
            <div className="relative">
              <img
                src="/icons/monogram-va.svg"
                alt="Chữ lồng V và A"
                className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="text-[#8B7355] header-text-responsive">
              <span className="text-sm sm:text-lg md:text-xl font-display font-semibold tracking-wide sm:tracking-wider header-text-nowrap">
                <span className="text-[#D4AF37]">Tiến Vinh</span>
                <span className="mx-1 sm:mx-2 text-[#D4AF37] font-display" aria-hidden="true">
                  &
                </span>
                <span className="text-[#D4AF37]">Lan Anh</span>
              </span>
            </div>
          </button>

          {/* Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Audio Toggle */}
            <button
              onClick={onToggleAudio}
              aria-label={audioEnabled ? "Tắt nhạc nền" : "Bật nhạc nền"}
              title={audioEnabled ? "Tắt nhạc nền" : "Bật nhạc nền"}
              className="flex items-center space-x-1 sm:space-x-2 bg-[#8B7355]/30 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 hover:scale-105"
            >
              {audioEnabled ? (
                <HiSpeakerWave className="text-[#D4AF37]" size={18} />
              ) : (
                <HiSpeakerXMark className="text-red-400" size={18} />
              )}
              <span className="text-[#FBE8ED] font-['Cormorant_Garamond',serif] text-xs sm:text-sm font-medium">
                {audioEnabled ? "NHẠC BẬT" : "NHẠC TẮT"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
