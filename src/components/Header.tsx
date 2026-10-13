import { useRef, useEffect, useState } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

interface HeaderProps {
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

const Header = ({
  audioEnabled,
  onToggleAudio,
}: HeaderProps) => {
  const scrolledStateRef = useRef(false);
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
    let frameId = 0;
    const updateScrolledState = () => {
      const nextIsScrolled = window.scrollY > 50;
      if (nextIsScrolled === scrolledStateRef.current) return;
      scrolledStateRef.current = nextIsScrolled;
      setIsScrolled(nextIsScrolled);
    };
    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateScrolledState();
      });
    };

    updateScrolledState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 liquid-animated border-b bg-[#fffaf6]/70 transition-transform duration-300 ease-out motion-reduce:transition-none ${
        isScrolled
          ? "translate-y-0 pointer-events-auto opacity-100 liquid-glass border-[#D4AF37]/30 shadow-xl lg:rounded-b-full"
          : "-translate-y-full pointer-events-none opacity-0 backdrop-blur-none border-transparent"
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
              <span className="text-base sm:text-lg md:text-xl font-display font-bold tracking-wide sm:tracking-wider header-text-nowrap">
                <span className="text-[#713447]">Tiến Vinh</span>
                <span className="mx-1 sm:mx-2 text-[#D4AF37] font-display" aria-hidden="true">
                  &
                </span>
                <span className="text-[#713447]">Lan Anh</span>
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
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-[#D4AF37]/30 bg-[#8B7355]/30 px-2.5 sm:gap-2 sm:px-4 hover:border-[#D4AF37] transition-colors"
            >
              {audioEnabled ? (
                <HiSpeakerWave className="text-[#D4AF37]" size={18} />
              ) : (
                <HiSpeakerXMark className="text-red-400" size={18} />
              )}
              <span className="hidden text-[#FBE8ED] font-display text-xs sm:inline sm:text-sm font-medium">
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
