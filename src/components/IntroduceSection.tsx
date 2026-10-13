import { useEffect, useState, memo } from "react";

const getTimeLeft = (targetDate: Date) => {
  const distance = Math.max(0, targetDate.getTime() - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance % 86_400_000) / 3_600_000),
    minutes: Math.floor((distance % 3_600_000) / 60_000),
    seconds: Math.floor((distance % 60_000) / 1_000),
  };
};

interface IntroduceSectionProps {
  language: "vi" | "en";
  weddingDate: Date;
  content: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
}

const IntroduceSection = memo(
  ({ language, weddingDate, content }: IntroduceSectionProps) => {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(weddingDate));
    const weddingHasPassed = weddingDate.getTime() <= Date.now();

    useEffect(() => {
      setTimeLeft(getTimeLeft(weddingDate));
      if (weddingDate.getTime() <= Date.now()) return;
      const timer = window.setInterval(() => {
        setTimeLeft(getTimeLeft(weddingDate));
        if (weddingDate.getTime() <= Date.now()) window.clearInterval(timer);
      }, 1000);
      return () => window.clearInterval(timer);
    }, [weddingDate]);

    return (
      <section
        className="relative w-full bg-gradient-to-br from-[#FFF7F8] via-[#F9E8EC] to-[#F3DDE3] overflow-hidden"
      >
        {/* Chinese-inspired decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Traditional Chinese corner ornaments */}
          <div className="absolute top-4 left-4 w-16 h-16 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#C8A882]">
              <path
                d="M10 10 L90 10 L90 30 L30 30 L30 90 L10 90 Z"
                fill="currentColor"
              />
              <path
                d="M15 15 L85 15 L85 25 L25 25 L25 85 L15 85 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute top-4 right-4 w-16 h-16 opacity-10 rotate-90">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#C8A882]">
              <path
                d="M10 10 L90 10 L90 30 L30 30 L30 90 L10 90 Z"
                fill="currentColor"
              />
              <path
                d="M15 15 L85 15 L85 25 L25 25 L25 85 L15 85 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 w-16 h-16 opacity-10 -rotate-90">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#C8A882]">
              <path
                d="M10 10 L90 10 L90 30 L30 30 L30 90 L10 90 Z"
                fill="currentColor"
              />
              <path
                d="M15 15 L85 15 L85 25 L25 25 L25 85 L15 85 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10 rotate-180">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#C8A882]">
              <path
                d="M10 10 L90 10 L90 30 L30 30 L30 90 L10 90 Z"
                fill="currentColor"
              />
              <path
                d="M15 15 L85 15 L85 25 L25 25 L25 85 L15 85 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Traditional Chinese cloud patterns */}
          <div className="absolute top-1/4 left-8 opacity-5">
            <svg
              width="80"
              height="40"
              viewBox="0 0 80 40"
              className="text-[#C8A882]"
            >
              <path
                d="M10 30 Q20 10 40 20 Q60 10 70 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M5 25 Q15 15 25 25 Q35 15 45 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="absolute top-1/3 right-8 opacity-5">
            <svg
              width="80"
              height="40"
              viewBox="0 0 80 40"
              className="text-[#C8A882]"
            >
              <path
                d="M10 30 Q20 10 40 20 Q60 10 70 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M5 25 Q15 15 25 25 Q35 15 45 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Subtle bamboo-inspired vertical lines */}
          <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#C8A882]/10 to-transparent"></div>
          <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#C8A882]/10 to-transparent"></div>
        </div>
        {/* Main Content - Smaller desktop spacing */}
        <div className="relative z-10 mx-auto flex w-full max-w-[100vw] flex-col items-center justify-center overflow-x-hidden px-4 py-2 sm:px-6 sm:py-3 md:py-4">
          {/* Title Section - Larger desktop content without logo */}
          <div className="text-center mb-5 sm:mb-7 max-w-3xl mx-auto">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl text-[#4A3B2A] mb-3 sm:mb-4 leading-tight font-medium ${
                language === "vi"
                  ? "font-['Noto_Serif_SC']"
                  : "font-['Stay_Glory_Serif']"
              }`}
            >
              {weddingHasPassed ? "Hai ngày vui, một đời thương" : "Hai ngày vui đang đến gần"}
            </h2>
            {/* Elegant Separator - Chinese-inspired with traditional elements */}
            <div
              className="flex items-center justify-center space-x-3 sm:space-x-5 mb-3 sm:mb-4"
            >
              <div className="flex items-center space-x-2">
                <div className="w-12 sm:w-16 md:w-18 lg:w-24 xl:w-28 h-px bg-gradient-to-r from-transparent via-[#C8A882] to-[#C8A882]/60"></div>
                {/* Traditional Chinese knot pattern */}
                <div className="w-3 h-3 border border-[#C8A882] rotate-45 opacity-60"></div>
              </div>
              <div className="relative">
                {/* Traditional Chinese double happiness symbol background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    className="text-[#C8A882]"
                  >
                    <path
                      d="M4 8 L12 8 L12 12 L20 12 L20 8 L28 8 L28 16 L20 16 L20 20 L12 20 L12 16 L4 16 Z M8 12 L8 20 L12 20 L12 24 L20 24 L20 20 L24 20 L24 12"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                {/* Chinese characters instead of ring icon */}
                <span className="text-[#C8A882] text-lg sm:text-xl md:text-xl lg:text-3xl xl:text-4xl font-['Noto_Serif_SC'] font-medium relative z-10">
                  ♡
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border border-[#C8A882] rotate-45 opacity-60"></div>
                <div className="w-12 sm:w-16 md:w-18 lg:w-24 xl:w-28 h-px bg-gradient-to-l from-transparent via-[#C8A882] to-[#C8A882]/60"></div>
              </div>
            </div>

            <p
              className={`text-sm sm:text-base text-[#4A3B2A]/80 leading-relaxed max-w-2xl mx-auto px-2 font-light ${
                language === "vi"
                  ? "font-['Noto_Serif_SC']"
                  : "font-['Playfair_Display',serif]"
              }`}
            >
              {weddingHasPassed
                ? "Ngày 2 và 3 tháng 11 năm 2026 đã trở thành những kỷ niệm thật đẹp. Cảm ơn bạn đã cùng chúng mình lưu giữ ngày vui."
                : "Chúng mình trân trọng mời bạn cùng sẻ chia niềm vui trong hai ngày hạnh phúc của gia đình."}
            </p>
          </div>
          {/* Countdown Section - Larger desktop text */}
          <div className="countdown-container text-center w-full max-w-3xl mx-auto">
            <div className="mb-4 sm:mb-6">
              <h3
                  className={`text-base sm:text-lg text-[#4A3B2A] mb-2 sm:mb-3 font-medium ${
                  language === "vi"
                    ? "font-['Noto_Serif_SC']"
                    : "font-['Stay_Glory_Serif']"
                }`}
              >
                {weddingHasPassed ? "Hai ngày đáng nhớ" : "Đếm ngược đến buổi tiệc đầu tiên"}
              </h3>
            </div>
            {/* Countdown Cards - Larger desktop size */}
            {weddingHasPassed ? (
              <div className="mx-auto max-w-xl rounded-2xl border border-[#C8A882]/30 bg-white/65 px-6 py-5 text-center shadow-[0_12px_40px_rgba(121,66,78,0.08)] backdrop-blur-sm sm:px-10">
                <p className="text-base leading-relaxed text-[#6E5452] sm:text-lg">
                  Một lời hẹn ước đã mở ra hành trình chung đôi. Cùng ngắm lại những khoảnh khắc đáng nhớ trong ngày vui.
                </p>
                <a
                  href="#gallery"
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-[#A67C52]/40 px-6 py-2 text-sm font-semibold text-[#805B43] transition hover:bg-[#A67C52] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#805B43]"
                >
                  Xem ảnh cưới
                </a>
              </div>
            ) : (
            <div
              className="grid grid-cols-4 gap-2 sm:gap-3 px-1 sm:px-2"
            >
              {[
                {
                  label: content.days,
                  value: timeLeft.days.toString().padStart(2, "0"),
                },
                {
                  label: content.hours,
                  value: timeLeft.hours.toString().padStart(2, "0"),
                },
                {
                  label: content.minutes,
                  value: timeLeft.minutes.toString().padStart(2, "0"),
                },
                {
                  label: content.seconds,
                  value: timeLeft.seconds.toString().padStart(2, "0"),
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="countdown-card relative rounded-xl sm:rounded-2xl p-2.5 sm:p-4 bg-white/85 shadow-[0_8px_24px_rgba(121,66,78,0.08)] border border-[#C8A882]/20 overflow-hidden">
                    {/* Chinese-inspired corner decorations */}
                    <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-[#C8A882]/30"></div>
                    <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-[#C8A882]/30"></div>
                    <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-[#C8A882]/30"></div>
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-[#C8A882]/30"></div>

                    <div className="countdown-number text-lg sm:text-2xl font-medium text-[#4A3B2A] mb-1 sm:mb-2 tracking-wide relative z-10 tabular-nums">
                      {item.value}
                    </div>
                    <div
                      className={
                        `text-[0.62rem] sm:text-sm text-[#4A3B2A]/70 tracking-wide font-medium relative z-10 ` +
                        (language === "en"
                          ? "font-['Playfair_Display',serif]"
                          : "font-['Noto_Serif_SC']")
                      }
                    >
                      {item.label}
                    </div>

                    {/* Subtle traditional pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full bg-gradient-to-br from-[#C8A882]/20 via-transparent to-[#C8A882]/10"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

export default IntroduceSection;
