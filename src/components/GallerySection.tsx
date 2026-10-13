import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import FloatingParticles from "./FloatingParticles";
import { getAllPhotoPaths } from "./photoList";
import { FixedSizeGrid as Grid } from "react-window";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const ALL_PHOTOS = getAllPhotoPaths();

const LANG = {
  vi: {
    album: "Bộ sưu tập ảnh",
    of: "của",
    love: "Thương yêu",
    album2: "Những khoảnh khắc yêu thương",
    love2: "Thương yêu",
    viewAll: "Xem trọn bộ ảnh cưới",
    close: "Đóng bộ ảnh",
  },
  en: {
    album: "Bộ sưu tập ảnh",
    of: "của",
    love: "Thương yêu",
    album2: "Những khoảnh khắc yêu thương",
    love2: "Thương yêu",
    viewAll: "Xem trọn bộ ảnh cưới",
    close: "Đóng bộ ảnh",
  },
} as const;

type LangKey = keyof typeof LANG;

function GallerySection({ lang = "vi" }: { lang?: LangKey }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const t = LANG[lang] || LANG.vi;
  const sectionRef = useRef<HTMLDivElement>(null);
  // Particle count responsive by viewport area
  const [dotGoldCount, setDotGoldCount] = useState(12);
  const [dotRedCount, setDotRedCount] = useState(6);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  const [allPhotoOrder, setAllPhotoOrder] = useState(getShuffledPhotoList);
  const [slideshowPhotos] = useState(getShuffledPhotoList);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);
  const swipeStartX = useRef<number | null>(null);
  useEffect(() => {
    function updateCounts() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setDotGoldCount(Math.max(3, Math.min(16, Math.floor((w * h) / 60000))));
      setDotRedCount(Math.max(2, Math.min(8, Math.floor((w * h) / 120000))));
      setIsMobile(w < 640);
    }
    updateCounts();
    window.addEventListener("resize", updateCounts);
    return () => window.removeEventListener("resize", updateCounts);
  }, []);

  // Chọn số lượng ảnh phù hợp cho mobile/desktop
  const PHOTOS = useMemo(() => {
    // Luôn lấy 8 ảnh đầu tiên, không random, không shuffle
    if (isMobile) {
      // Ảnh đầu tiên là full (4x4), 7 ảnh còn lại là vuông nhỏ (1x1)
      return [
        { src: ALL_PHOTOS[0], full: true },
        ...ALL_PHOTOS.slice(1, 8).map((src: string) => ({ src, full: false })),
      ];
    } else {
      return ALL_PHOTOS.slice(0, 8).map((src: string) => ({
        src,
        full: false,
      }));
    }
  }, [isMobile]);
  const [photoSources, setPhotoSources] = useState(() => allPhotoOrder.slice(0, PHOTOS.length));
  const photoSourcesRef = useRef(photoSources);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const displayPhotos = useMemo(
    () => PHOTOS.map((photo, idx) => ({ ...photo, src: photoSources[idx] ?? photo.src })),
    [PHOTOS, photoSources]
  );

  useEffect(() => {
    photoSourcesRef.current = photoSources;
  }, [photoSources]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsGalleryVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isGalleryVisible || showOverlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rotatePhoto = () => {
      if (document.hidden) return;

      const currentSources = photoSourcesRef.current;
      const candidates = ALL_PHOTOS.filter((src) => !currentSources.includes(src));
      if (!candidates.length || !currentSources.length) return;

      const nextSources = [...currentSources];
      const availableSlots = nextSources.map((_, index) => index);
      const changesThisCycle = Math.min(3, candidates.length, availableSlots.length);

      for (let change = 0; change < changesThisCycle; change += 1) {
        const slotPosition = Math.floor(Math.random() * availableSlots.length);
        const photoPosition = Math.floor(Math.random() * candidates.length);
        const slot = availableSlots.splice(slotPosition, 1)[0];
        const nextPhoto = candidates.splice(photoPosition, 1)[0];
        if (slot === undefined || !nextPhoto) break;
        nextSources[slot] = nextPhoto;
      }

      photoSourcesRef.current = nextSources;
      setPhotoSources(nextSources);
    };

    const timer = window.setInterval(rotatePhoto, 2000);
    return () => window.clearInterval(timer);
  }, [isGalleryVisible, showOverlay]);

  useEffect(() => {
    if (
      !isGalleryVisible ||
      showOverlay ||
      isSlideshowPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActiveSlide((current) => (current + 1) % slideshowPhotos.length);
      }
    }, 2800);
    return () => window.clearInterval(timer);
  }, [isGalleryVisible, isSlideshowPaused, showOverlay, slideshowPhotos.length]);

  // Hiệu ứng wave GSAP cho virtual grid
  useEffect(() => {
    if (!showOverlay || !sectionRef.current) {
      window.__galleryWaveAnimated = false;
      return;
    }

    const context = gsap.context(() => {
      const items = Array.from(
        sectionRef.current?.querySelectorAll('[id^="overlay-photo-"] img') ?? []
      );
      if (!items.length) return;
      if (!window.__galleryWaveAnimated) {
        const mid = Math.floor(items.length / 2);
        const order: number[] = [];
        for (let i = 0; i < items.length; i++) {
          const left = mid - i;
          const right = mid + i;
          if (left >= 0) order.push(left);
          if (right < items.length && right !== left) order.push(right);
        }
        const orderedItems = order.map((idx) => items[idx]).filter(Boolean);
        gsap.set(items, { scale: 0.96, opacity: 0 });
        gsap.to(orderedItems, {
          scale: 1,
          opacity: 1,
          stagger: 0.035,
          duration: 0.32,
          ease: "power2.out",
          onComplete: () => {
            window.__galleryWaveAnimated = true;
          },
        });
      } else {
        gsap.set(items, { scale: 1, opacity: 1 });
      }
    }, sectionRef);
    return () => context.revert();
  }, [showOverlay]);

  // Animation cho từng ảnh gallery chính (fade-in từng ảnh, KHÔNG fade section)
  useLayoutEffect(() => {
    if (typeof window !== "undefined" && sectionRef.current) {
      const context = gsap.context(() => {
      const items = Array.from(
        sectionRef.current?.querySelectorAll('[id^="main-gallery-photo-"]') ?? []
      );
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 40 });
      items.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
      }, sectionRef);
      return () => context.revert();
    }
  }, []);

  // Utility để random col/row span và style cho từng ảnh
  // function getRandomBentoStyle(idx: number) {
  //   // Để giữ layout đẹp, random nhưng có kiểm soát
  //   const colSpanArr = [1, 2, 3];
  //   const rowSpanArr = [1, 2];
  //   // Đảm bảo ảnh đầu và cuối luôn lớn hơn
  //   const colSpan =
  //     idx === 0 || idx === 11
  //       ? 3
  //       : colSpanArr[Math.floor(Math.random() * colSpanArr.length)];
  //   const rowSpan =
  //     idx === 0 || idx === 11
  //       ? 2
  //       : rowSpanArr[Math.floor(Math.random() * rowSpanArr.length)];
  //   // Random border, shadow, bo góc
  //   const borderStyles = [
  //     "border-4 border-double border-[#C8A882] rounded-tl-[3rem] shadow-[0_0_32px_8px_rgba(200,168,130,0.18)]",
  //     "border-2 border-dashed border-[#C0392B] rounded-br-[2.5rem] shadow-lg",
  //     "border-2 border-[#C8A882] rounded-bl-[2.5rem] shadow-xl",
  //     "border border-[#C8A882] rounded-2xl shadow-md",
  //     "border-2 border-[#D4AF37] rounded-tr-[2rem] shadow-gold",
  //     "border-2 border-[#C0392B] rounded-bl-[2rem] shadow-red-500/30",
  //   ];
  //   const borderClass =
  //     borderStyles[Math.floor(Math.random() * borderStyles.length)];
  //   return {
  //     colSpan,
  //     rowSpan,
  //     borderClass,
  //   };
  // }

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-[60vh] px-2 md:px-8 py-8 bg-gradient-to-bl from-[#F3DDE3] via-[#F9E8EC] to-[#FFF7F8] relative overflow-x-hidden"
      id="gallery"
    >
      {/* Visually hidden H2 for SEO */}
      <h2
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Thư viện ảnh cưới
      </h2>
      {/* Tiêu đề thư viện ảnh */}
      <div className="text-center pt-0 pb-6">
        <div className="font-display text-3xl font-semibold leading-tight tracking-wide text-[#A67C52] sm:text-4xl md:text-5xl">
          {t.album2}
        </div>
      </div>
      <div className="relative z-20 mx-auto mb-10 max-w-6xl px-2 sm:mb-14 sm:px-6">
        <div className="mb-4 text-center sm:mb-6">
          <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#A67C52] sm:text-xs">
            Một thoáng yêu thương
          </p>
          <p className="font-display text-lg italic text-[#805B43] sm:text-xl">
            Những ngày đẹp nhất, mình cùng nhau lưu giữ
          </p>
        </div>

        <div
          className="relative h-[410px] overflow-hidden sm:h-[510px] md:h-[570px]"
          onMouseEnter={() => setIsSlideshowPaused(true)}
          onMouseLeave={() => setIsSlideshowPaused(false)}
          onTouchStart={(event) => {
            swipeStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const startX = swipeStartX.current;
            const endX = event.changedTouches[0]?.clientX;
            swipeStartX.current = null;
            if (startX === null || endX === undefined) return;
            const distance = endX - startX;
            if (Math.abs(distance) < 45) return;
            setActiveSlide((current) =>
              (current + (distance < 0 ? 1 : -1) + slideshowPhotos.length) % slideshowPhotos.length
            );
          }}
          style={{ touchAction: "pan-y" }}
          aria-label="Trình chiếu ảnh cưới"
        >
          {[-1, 0, 1].map((offset) => {
            const photoIndex = (activeSlide + offset + slideshowPhotos.length) % slideshowPhotos.length;
            const isActive = offset === 0;
            return (
              <figure
                key={photoIndex}
                className="absolute left-1/2 top-1/2 h-[88%] w-[min(76vw,420px)] overflow-hidden rounded-[1.5rem] border border-[#D6B779]/75 bg-[#f6e8e3] shadow-[0_22px_60px_rgba(90,42,50,.2)] transition-[transform,opacity] duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] sm:rounded-[2rem] motion-reduce:transition-none"
                style={{
                  transform:
                    offset === 0
                      ? "translate(-50%, -50%) scale(1)"
                      : offset < 0
                        ? "translate(-141%, -50%) scale(.88)"
                        : "translate(41%, -50%) scale(.88)",
                  opacity: isActive ? 1 : 0.5,
                  zIndex: isActive ? 2 : 1,
                }}
                aria-hidden={!isActive}
              >
                <img
                  src={getFocusUrl(slideshowPhotos[photoIndex], isMobile ? 850 : 1200)}
                  alt={isActive ? `Tiến Vinh và Lan Anh — khoảnh khắc ${photoIndex + 1}` : ""}
                  loading={isGalleryVisible ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                  draggable={false}
                />
                <figcaption className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#321a25]/80 via-[#321a25]/25 to-transparent px-5 pb-5 pt-16 text-center text-[#fff9f3] transition-opacity duration-500 sm:px-8 sm:pb-7 ${isActive ? "opacity-100" : "opacity-0"}`}>
                  <span className="block font-display text-2xl tracking-wide sm:text-3xl">Tiến Vinh <span className="text-[#e8c783]">&amp;</span> Lan Anh</span>
                  <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.24em] text-[#f1dfbc] sm:text-xs">02 — 03 tháng 11, 2026</span>
                </figcaption>
              </figure>
            );
          })}
          <button
            type="button"
            className="absolute left-1 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#c7a468]/55 bg-[#fffaf5]/85 text-[#805b43] shadow-md backdrop-blur-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#805b43] sm:left-4 sm:h-12 sm:w-12"
            onClick={() => setActiveSlide((current) => (current - 1 + slideshowPhotos.length) % slideshowPhotos.length)}
            aria-label="Ảnh trước"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="absolute right-1 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#c7a468]/55 bg-[#fffaf5]/85 text-[#805b43] shadow-md backdrop-blur-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#805b43] sm:right-4 sm:h-12 sm:w-12"
            onClick={() => setActiveSlide((current) => (current + 1) % slideshowPhotos.length)}
            aria-label="Ảnh tiếp theo"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className="mx-auto mt-3 flex max-w-sm items-center justify-center gap-4 sm:mt-5">
          <span className="min-w-[3.2rem] text-right font-display text-sm text-[#9a744d]" aria-live="polite">
            {String(activeSlide + 1).padStart(2, "0")} <span className="text-[#c7a468]/70">/</span> {String(slideshowPhotos.length).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 overflow-hidden bg-[#c7a468]/30" aria-hidden="true">
            <div className="h-full bg-[#b28a4d] transition-[width] duration-700" style={{ width: `${((activeSlide + 1) / slideshowPhotos.length) * 100}%` }} />
          </div>
          <span className="font-display text-sm italic text-[#9a744d]">Lướt xem</span>
        </div>
      </div>
      {/* Chinese pattern background luxury - pattern chìm */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-0 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,168,130,0.12),transparent_68%)]" />
        {/* Lời chúc nền */}
        <div
          className="absolute left-8 top-8 text-[5vw] md:text-6xl font-chinese-elegant text-[#C8A882] opacity-20 select-none pointer-events-none"
          style={{ letterSpacing: "0.2em" }}
        >
          {" "}
          Yêu thương · gắn kết · trọn đời
        </div>
        <div
          className="absolute right-8 bottom-8 text-[4vw] md:text-5xl font-chinese-elegant text-[#A67C52] opacity-15 select-none pointer-events-none"
          style={{ letterSpacing: "0.2em" }}
        >
          Mỗi khoảnh khắc là một lời thương
        </div>
      </div>
      {/* Gallery Bento luxury layout - bento lộn xộn, đậm chất Trung Hoa */}
      <div className="relative mx-auto max-w-[98vw] md:max-w-[1800px] pb-8 px-1 xs:px-2 sm:px-3 md:px-0">
        {/* Floating particles luxury - nhiều hơn */}
        <FloatingParticles
          count={dotGoldCount}
          areaClassName="absolute inset-0 pointer-events-none z-10"
          type="dot"
          minSize={6}
          maxSize={10}
          color="#D4AF37"
          animationName="float"
          randomize={true}
          zIndex={10}
        />
        <FloatingParticles
          count={dotRedCount}
          areaClassName="absolute inset-0 pointer-events-none z-10"
          type="dot"
          minSize={8}
          maxSize={14}
          color="#C0392B"
          animationName="float"
          randomize={true}
          zIndex={10}
        />
        {/* Bento grid luxury, lộn xộn, đậm chất Trung Hoa */}
        <div
          className={
            isMobile
              ? "relative z-20 grid grid-cols-2 gap-2 auto-rows-[180px]"
              : "relative z-20 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-7 gap-2 xs:gap-3 md:gap-8 auto-rows-[140px] xs:auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[340px]"
          }
        >
          {displayPhotos.map((item, idx) => {
            // Tính toán layout cố định theo idx
            let colSpan = 1,
              rowSpan = 1;
            if (isMobile) {
              if (item.full) {
                colSpan = 2;
                rowSpan = 2;
              } else {
                // Quy luật: chẵn dọc, lẻ vuông
                if (idx % 2 === 0) {
                  colSpan = 1;
                  rowSpan = 2;
                } else {
                  colSpan = 1;
                  rowSpan = 1;
                }
              }
            } else {
              // Desktop: quy luật theo idx
              const colSpanArr = [1, 2, 3];
              const rowSpanArr = [1, 2];
              colSpan =
                idx === 0 || idx === PHOTOS.length - 1
                  ? 3
                  : colSpanArr[idx % colSpanArr.length];
              rowSpan =
                idx === 0 || idx === PHOTOS.length - 1
                  ? 2
                  : rowSpanArr[idx % rowSpanArr.length];
            }
            const colSpanClass = colSpan === 1 ? "col-span-1" : "col-span-2";
            const rowSpanClass = rowSpan === 1 ? "row-span-1" : "row-span-2";
            const borderStyles = isMobile
              ? [
                  "border-4 border-double border-[#C8A882] rounded-tl-[2rem] shadow-[0_0_16px_4px_rgba(200,168,130,0.18)]",
                  "border-2 border-dashed border-[#C0392B] rounded-br-[1.5rem] shadow-md",
                  "border-2 border-[#C8A882] rounded-bl-[1.5rem] shadow-lg",
                  "border border-[#C8A882] rounded-xl shadow-sm",
                  "border-2 border-[#D4AF37] rounded-tr-[1.2rem] shadow-gold",
                  "border-2 border-[#C0392B] rounded-bl-[1.2rem] shadow-red-500/30",
                ]
              : [
                  "border-4 border-double border-[#C8A882] rounded-tl-[3rem] shadow-[0_0_32px_8px_rgba(200,168,130,0.18)]",
                  "border-2 border-dashed border-[#C0392B] rounded-br-[2.5rem] shadow-lg",
                  "border-2 border-[#C8A882] rounded-bl-[2.5rem] shadow-xl",
                  "border border-[#C8A882] rounded-2xl shadow-md",
                  "border-2 border-[#D4AF37] rounded-tr-[2rem] shadow-gold",
                  "border-2 border-[#C0392B] rounded-bl-[2rem] shadow-red-500/30",
                ];
            // borderClass cố định theo idx
            const borderClass = borderStyles[idx % borderStyles.length];
            const className = `group overflow-hidden bg-[#F9E8EC] relative transition-transform duration-300 hover:scale-[1.04] hover:shadow-gold ${colSpanClass} ${rowSpanClass} ${borderClass} ${
              isMobile
                ? "rounded-xl shadow-md"
                : "rounded-lg xs:rounded-xl md:rounded-2xl shadow-sm xs:shadow-md md:shadow-xl"
            }`;
            const imgClass = isMobile
              ? "w-full h-full object-cover bg-[#FFF7F8] rounded-xl"
              : "w-full h-full object-cover bg-[#FFF7F8] group-hover:scale-105 group-hover:opacity-95 transition-all duration-500 drop-shadow-xl p-0.5 xs:p-1 md:p-2";
            return (
              <GalleryPhotoCard
                key={idx}
                idx={idx}
                isMobile={isMobile}
                item={item}
                className={className}
                imgClass={imgClass}
              />
            );
          })}
        </div>
      </div>
      {/* Nút mở toàn bộ thư viện ảnh */}
      <div className="flex justify-center mt-8">
        <button
          type="button"
          className="min-h-11 rounded-full border border-[#A67C52]/35 bg-white/50 px-6 py-2 text-base font-semibold text-[#805B43] transition hover:border-[#A67C52] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#805B43]"
          onClick={() => {
            setAllPhotoOrder(getShuffledPhotoList());
            setShowOverlay(true);
          }}
        >
          {t.viewAll}
        </button>
      </div>
      {/* Overlay modal - virtual scroll grid */}
      {showOverlay && (
        <>
          <div
            className="fixed inset-0 z-[101] bg-black/0 backdrop-blur-[6px] transition-all duration-300"
            onClick={() => setShowOverlay(false)}
          />
          <div className="fixed inset-0 z-[102] flex items-center justify-center">
            {/* Nút tắt overlay */}
            <button
              className="fixed top-6 right-8 z-[200] bg-[#A67C52] text-white rounded-full w-12 h-12 flex items-center justify-center text-3xl shadow-lg hover:bg-[#C8A882] transition-all duration-300"
              onClick={() => setShowOverlay(false)}
              aria-label={t.close}
              style={{ pointerEvents: "auto" }}
            >
              ×
            </button>
            <Grid
              columnCount={window.innerWidth < 640 ? 2 : 5}
              rowCount={Math.ceil(
                allPhotoOrder.length / (window.innerWidth < 640 ? 2 : 5)
              )}
              columnWidth={
                window.innerWidth < 640
                  ? Math.floor(window.innerWidth / 2)
                  : Math.floor(window.innerWidth / 5)
              }
              rowHeight={
                window.innerWidth < 640
                  ? Math.floor(window.innerHeight / 3.2)
                  : Math.floor(window.innerHeight / 2.1)
              }
              height={window.innerHeight}
              width={window.innerWidth}
              style={{ outline: "none", background: "none" }}
              children={({
                columnIndex,
                rowIndex,
                style,
              }: {
                columnIndex: number;
                rowIndex: number;
                style: React.CSSProperties;
              }) => {
                const colCount = window.innerWidth < 640 ? 2 : 5;
                const idx = rowIndex * colCount + columnIndex;
                if (idx >= allPhotoOrder.length) return null;
                return (
                  <div
                    id={`overlay-photo-${idx}`}
                    className="w-full h-full flex items-center justify-center"
                    style={style}
                  >
                    <img
                      src={getFocusUrl(allPhotoOrder[idx], window.innerWidth < 640 ? 900 : 1100)}
                      alt={`Ảnh cưới ${idx + 1}`}
                      className="w-full h-full object-cover rounded-2xl shadow-2xl"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                );
              }}
            />
          </div>
        </>
      )}
    </section>
  );
}

const GalleryPhotoCard = React.memo(function GalleryPhotoCard({
  idx,
  isMobile,
  item,
  className,
  imgClass,
}: {
  idx: number;
  isMobile: boolean;
  item: { src: string; full: boolean };
  className: string;
  imgClass: string;
}) {
  const [visible, setVisible] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState(item.src);
  const [currentLoaded, setCurrentLoaded] = React.useState(false);
  const [incomingSrc, setIncomingSrc] = React.useState<string | null>(null);
  const [incomingLoaded, setIncomingLoaded] = React.useState(false);
  const [incomingMotion, setIncomingMotion] = React.useState({ x: 0, y: 20, rotate: 1.2 });
  const transitionTimerRef = React.useRef<number | null>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (item.src === currentSrc || item.src === incomingSrc) return;
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    const directions = [
      { x: -22, y: 0, rotate: -1.4 },
      { x: 22, y: 0, rotate: 1.4 },
      { x: 0, y: 22, rotate: 1.1 },
      { x: 0, y: -22, rotate: -1.1 },
    ];
    setIncomingMotion(directions[Math.floor(Math.random() * directions.length)]);
    setIncomingSrc(item.src);
    setIncomingLoaded(false);
  }, [currentSrc, incomingSrc, item.src]);

  React.useEffect(
    () => () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    },
    []
  );

  React.useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeout = setTimeout(() => setVisible(true), 80 + idx * 30);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeout !== undefined) clearTimeout(timeout);
    };
  }, [idx]);

  return (
    <div
      ref={cardRef}
      id={`main-gallery-photo-${idx}`}
      className={className}
      style={{ padding: isMobile ? "2px" : "4px" }}
    >
      <img
        key={currentSrc}
        src={getFocusUrl(currentSrc, isMobile ? 700 : 1100)}
        alt={`Ảnh cưới ${idx + 1}`}
        className={imgClass}
        loading="lazy"
        decoding="async"
        style={{
          borderRadius: "0.75rem",
          background: "#FFF7F8",
          objectPosition: "center top",
          opacity: visible && currentLoaded && !incomingLoaded ? 1 : 0,
          transform: incomingSrc && incomingLoaded ? "translate3d(0, -7px, 0) scale(1.01)" : "translate3d(0, 0, 0) scale(1)",
          transition: "opacity 680ms cubic-bezier(.22,1,.36,1), transform 680ms cubic-bezier(.22,1,.36,1)",
          willChange: incomingSrc ? "opacity, transform" : undefined,
        }}
        onLoad={() => setCurrentLoaded(true)}
      />
      {incomingSrc && (
        <img
          key={incomingSrc}
          src={getFocusUrl(incomingSrc, isMobile ? 700 : 1100)}
          alt=""
          aria-hidden="true"
          className={
            imgClass + " absolute inset-0 pointer-events-none"
          }
          loading="lazy"
          decoding="async"
          style={{
            borderRadius: "0.75rem",
            objectPosition: "center top",
            opacity: visible && incomingLoaded ? 1 : 0,
            transform: incomingLoaded
              ? "translate3d(0, 0, 0) scale(1) rotate(0deg)"
              : `translate3d(${incomingMotion.x}px, ${incomingMotion.y}px, 0) scale(.94) rotate(${incomingMotion.rotate}deg)`,
            transition: "opacity 680ms cubic-bezier(.22,1,.36,1), transform 680ms cubic-bezier(.22,1,.36,1)",
            willChange: "opacity, transform",
          }}
          onLoad={() => {
            window.requestAnimationFrame(() =>
              window.requestAnimationFrame(() => setIncomingLoaded(true))
            );
            const nextSrc = incomingSrc;
            transitionTimerRef.current = window.setTimeout(() => {
              setCurrentSrc(nextSrc);
              setCurrentLoaded(true);
              setIncomingSrc(null);
              setIncomingLoaded(false);
              transitionTimerRef.current = null;
            }, 720);
          }}
          onError={() => {
            setIncomingSrc(null);
            setIncomingLoaded(false);
          }}
        />
      )}
      {idx % 2 === 0 ? (
        <div className="absolute bottom-2 right-2 h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4AF37] opacity-80 xs:h-2 xs:w-2" />
      ) : (
        <div className="absolute left-2 top-2 h-1.5 w-1.5 animate-pulse rounded-full bg-[#C0392B] opacity-70 xs:h-2 xs:w-2" />
      )}
      {idx % 5 === 0 ? (
        <div className="pointer-events-none absolute left-2 top-2 select-none font-chinese-elegant text-lg text-[#C0392B] opacity-70 xs:text-xl md:text-2xl">
          ♡
        </div>
      ) : idx % 7 === 0 ? (
        <div className="pointer-events-none absolute bottom-2 right-2 select-none font-chinese-elegant text-base text-[#C8A882] opacity-60 xs:text-lg md:text-xl">
          ✿
        </div>
      ) : null}
    </div>
  );
});

// Định nghĩa biến toàn cục cho window để tránh lỗi typescript
declare global {
  interface Window {
    __galleryWaveAnimated?: boolean;
  }
}

// Hàm xử lý url Cloudinary để crop focus vào mặt hoặc vùng nổi bật (face nếu có, không thì auto)
function getFocusUrl(url: string, width: number) {
  if (url.startsWith("/photos/stories/")) return url;
  if (url.includes("res.cloudinary.com")) {
    return url.replace(
      "/upload/",
      `/upload/c_fill,g_auto,w_${width},q_auto,f_auto/`
    );
  }
  if (url.includes("ik.imagekit.io")) {
    return url.replace(/\?tr=[^&]*/, `?tr=w-${width},q-80,f-auto`);
  }
  // Nếu là ảnh local JPG/PNG thì ưu tiên .webp nếu có
  if (url.endsWith(".JPG") || url.endsWith(".jpg") || url.endsWith(".png")) {
    const webpUrl = url.replace(/\.(JPG|jpg|png)$/i, ".webp");
    return webpUrl;
  }
  return url;
}

function getShuffledPhotoList() {
  const shuffled = [...ALL_PHOTOS];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

export default GallerySection;
