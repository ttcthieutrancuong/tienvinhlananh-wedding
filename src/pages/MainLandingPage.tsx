import { useMemo } from "react";
import FloatingParticles from "../components/FloatingParticles";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import IntroduceSection from "../components/IntroduceSection";
import LoveStorySection from "../components/LoveStorySection";
import WeddingDetailsSection from "../components/WeddingDetailsSection";
import FamilyAddressesSection from "../components/FamilyAddressesSection";
import GallerySection from "../components/GallerySection";
import TimelineSection from "../components/TimelineSection";
import WishesSection from "../components/WishesSection";
import Footer from "../components/Footer";

interface MainLandingPageProps {
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

const MainLandingPage = ({ audioEnabled, onToggleAudio }: MainLandingPageProps) => {
  const language: `vi` = "vi";

  // Wedding date - Tiến Vinh & Lan Anh
  const weddingDate = new Date("2026-11-02T17:00:00+07:00");

  // Giảm số lượng floating-lantern và particle trên mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const floatingLanternCount = isMobile ? 2 : 6;
  const particleCount = isMobile ? 4 : 12;
  const floatingLanternPositions = useMemo(
    () =>
      Array.from({ length: floatingLanternCount }, (_, i) => ({
        top: 15 + i * 12,
        left: i % 2 === 0 ? 8 + i * 3 : 82 + i * 2,
      })),
    [floatingLanternCount]
  );
  // No need to manually generate particlePositions, handled by FloatingParticles

  const content = {
    brideName: "Lan Anh",
    groomName: "Tiến Vinh",
    heroSubtitle: "Hai nhịp tim, một lời hẹn trăm năm",
    days: "Ngày",
    hours: "Giờ",
    minutes: "Phút",
    seconds: "Giây",
  };

  return (
    <div
      className="invitation-page isolate relative overflow-x-clip bg-[#FBE8ED]"
      style={{
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Elegant Background Pattern */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF4F6] via-[#FBE8ED] to-[#F2D2DB] opacity-95"></div>

        {/* Subtle decorative elements */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-20 left-20 w-40 h-40 border border-[#8B7355] rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 border border-[#8B7355] rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 border border-[#8B7355] rounded-full"></div>
          <div className="absolute top-1/3 right-10 w-28 h-28 border border-[#8B7355] rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-[#8B7355] rounded-full"></div>
          <div className="absolute top-2/3 right-1/4 w-36 h-36 border border-[#8B7355] rounded-full"></div>
        </div>

        {/* Elegant corner flourishes */}
        <div className="absolute top-8 left-8 w-16 h-16 opacity-15">
          <div className="w-full h-1 bg-[#8B7355] absolute top-0"></div>
          <div className="w-1 h-full bg-[#8B7355] absolute left-0"></div>
          <div className="w-8 h-8 border-r border-b border-[#8B7355] absolute top-4 left-4"></div>
        </div>
        <div className="absolute top-8 right-8 w-16 h-16 opacity-15 rotate-90">
          <div className="w-full h-1 bg-[#8B7355] absolute top-0"></div>
          <div className="w-1 h-full bg-[#8B7355] absolute left-0"></div>
          <div className="w-8 h-8 border-r border-b border-[#8B7355] absolute top-4 left-4"></div>
        </div>
        <div className="absolute bottom-8 left-8 w-16 h-16 opacity-15 -rotate-90">
          <div className="w-full h-1 bg-[#8B7355] absolute top-0"></div>
          <div className="w-1 h-full bg-[#8B7355] absolute left-0"></div>
          <div className="w-8 h-8 border-r border-b border-[#8B7355] absolute top-4 left-4"></div>
        </div>
        <div className="absolute bottom-8 right-8 w-16 h-16 opacity-15 rotate-180">
          <div className="w-full h-1 bg-[#8B7355] absolute top-0"></div>
          <div className="w-1 h-full bg-[#8B7355] absolute left-0"></div>
          <div className="w-8 h-8 border-r border-b border-[#8B7355] absolute top-4 left-4"></div>
        </div>
      </div>
      {/* Elegant Bamboo Background with sepia tone */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-12">
        <div className="bamboo-layer absolute inset-0">
          <img
            src="/decorations/bamboo-parttern-removebg-preview.webp"
            alt=""
            className="w-full h-full object-cover scale-110 filter sepia-[0.3] hue-rotate-[30deg] brightness-[1.2] contrast-[0.8]"
          />
        </div>
        <div
          className="bamboo-layer absolute inset-0 opacity-60"
          style={{ transform: "translateY(50px)" }}
        >
          <img
            src="/decorations/bamboo-parttern2-removebg-preview.webp"
            alt=""
            className="w-full h-full object-cover scale-105 filter sepia-[0.4] hue-rotate-[45deg] brightness-[1.1] contrast-[0.7]"
          />
        </div>
      </div>
      {/* Luxury Floating Ornaments with Chinese Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingLanternPositions.map((pos, i) => (
          <div
            key={`floating-ornament-${i}`}
            className="floating-lantern absolute"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              zIndex: 1,
            }}
          >
            <div className="relative opacity-25">
              {/* Elegant ornamental design with Chinese accents */}
              <div className="w-12 h-12 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] via-[#DAA520] to-[#B8860B] rounded-full shadow-md border border-[#8B7355] opacity-70">
                  <div className="absolute inset-2 bg-gradient-to-br from-[#F5DEB3] to-[#F2D2DB] rounded-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[#8B7355] text-sm font-serif">
                        {i % 3 === 0 ? "❁" : i % 3 === 1 ? "✿" : "❀"}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Small Chinese characters as accents */}
                <div className="absolute -top-1 -right-1 text-xs font-chinese-decorative text-[#8B7355] opacity-40">
                  {i % 4 === 0
                    ? "❀"
                    : i % 4 === 1
                    ? "✿"
                    : i % 4 === 2
                    ? "❁"
                    : "❀"}
                </div>
                <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-sm"></div>
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-sm"></div>
                <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-sm"></div>
                <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative z-10">
      {/* Header Component */}
      <Header
        audioEnabled={audioEnabled}
        onToggleAudio={onToggleAudio}
      />
      {/* Hero Section */}
      <HeroSection
        content={content}
      />
      {/* Thời gian và địa điểm được đặt sớm để khách dễ tìm */}
      <WeddingDetailsSection />
      <TimelineSection />
      {/* Đếm ngược gọn sau lịch trình để ưu tiên thông tin cần dùng */}
      <IntroduceSection
        language={language}
        weddingDate={weddingDate}
        content={{
          days: content.days,
          hours: content.hours,
          minutes: content.minutes,
          seconds: content.seconds,
        }}
      />
      <LoveStorySection language={language} />
      <GallerySection lang={language} />
      <WishesSection />
      <FamilyAddressesSection
        groomAddress="Xóm 13, thôn Quan Lạng, xã Lý Nhân, tỉnh Ninh Bình"
        groomPhone="0796006507"
        groomMapUrl="https://www.google.com/maps/place/13+%C4%90%C6%B0%E1%BB%9Dng+Quan+L%E1%BA%A1ng,+L%C3%BD+Nh%C3%A2n,+Ninh+B%C3%ACnh,+Vi%E1%BB%87t+Nam/@20.5902408,105.9845056,17z/data=!3m1!4b1!4m6!3m5!1s0x3135c590b6de68fd:0x3e64b50788e2f164!8m2!3d20.5902408!4d105.9870805!16s%2Fg%2F11s8dsfy93?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D"
        brideAddress="Thôn An Bài 1, xã Bình Lục, tỉnh Ninh Bình"
        bridePhone="0386243117"
        brideMapUrl="https://www.google.com/maps/search/?api=1&query=20.544918480986105%2C106.00597937600507"
      />
      </div>
      {/* Footer */}
      <Footer />
      {/* Elegant Floating Particles */}
      <FloatingParticles
        count={particleCount}
        areaClassName="absolute inset-0 pointer-events-none overflow-hidden"
        type="dot"
        minSize={4}
        maxSize={8}
        color="#D4AF37"
        animationName="float"
        randomize={true}
        zIndex={0}
      />
    </div>
  );
};

export default MainLandingPage;
