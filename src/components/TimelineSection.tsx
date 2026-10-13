import React from "react";
import { FiCamera, FiCoffee, FiHeart, FiMusic, FiUsers } from "react-icons/fi";

const weddingDays = [
  {
    id: "le-an-hoi",
    date: "Thứ Hai · 02.11.2026",
    title: "Lễ ăn hỏi",
    introduction: "Một buổi chiều sum vầy, mở đầu cho ngày vui của hai gia đình.",
    events: [
      { time: "16:30", title: "Đón khách", note: "Gia đình thân tình chào đón người thân và bạn bè.", Icon: FiUsers },
      { time: "17:00", title: "Mời dùng bữa", note: "Cùng quây quần bên mâm cơm ấm cúng ngày ăn hỏi.", Icon: FiCoffee },
      { time: "18:30", title: "Vui chơi & ca nhạc", note: "Chia sẻ niềm vui qua những câu hát và khoảnh khắc thân tình.", Icon: FiMusic },
    ],
  },
  {
    id: "ngay-cuoi",
    date: "Thứ Ba · 03.11.2026",
    title: "Lễ cưới",
    introduction: "Từng khoảnh khắc trong ngày chung đôi, chúng mình mong được sẻ chia cùng bạn.",
    events: [
      { time: "08:30", title: "Đón khách", note: "Hai gia đình hân hoan chào đón người thân, bạn bè.", Icon: FiUsers },
      { time: "09:00", title: "Dùng tiệc thân mật", note: "Cùng quây quần bên mâm cơm ngày vui.", Icon: FiCoffee },
      { time: "11:00", title: "Giao lưu, ca hát", note: "Thêm niềm vui với những giai điệu thân tình.", Icon: FiMusic },
      { time: "13:30", title: "Lễ đón dâu", note: "Giây phút vu quy, rước cô dâu về nhà trai.", Icon: FiHeart },
      { time: "Sau nghi lễ", title: "Chụp ảnh lưu niệm", note: "Lưu lại khoảnh khắc đẹp bên gia đình và bạn bè.", Icon: FiCamera },
    ],
  },
];

const TimelineSection = React.memo(function TimelineSection() {
  return (
    <section id="timeline" aria-labelledby="timeline-title" className="wedding-timeline scroll-mt-20">
      <div className="wedding-timeline__ornament wedding-timeline__ornament--top" aria-hidden="true">✳</div>
      <div className="wedding-timeline__inner">
        <header className="wedding-timeline__header">
          <span className="wedding-timeline__eyebrow">02 — 03 THÁNG 11 · 2026</span>
          <h2 id="timeline-title">Hai ngày vui, trọn lời thương</h2>
          <p>Thân mời bạn cùng gia đình chúng mình lưu giữ những khoảnh khắc đáng nhớ.</p>
          <span className="wedding-timeline__divider" aria-hidden="true"><i /><b>♡</b><i /></span>
        </header>

        <div className="wedding-timeline__days">
          {weddingDays.map((day, dayIndex) => (
            <section key={day.id} className={`wedding-timeline__day ${dayIndex === 1 ? "is-wedding-day" : "is-engagement-day"}`} aria-labelledby={`${day.id}-title`}>
              <header className="wedding-timeline__day-header">
                <div className="wedding-timeline__day-kicker">
                  <span className="wedding-timeline__day-number" aria-hidden="true">0{dayIndex + 1}</span>
                  <span className="wedding-timeline__day-date">{day.date}</span>
                </div>
                <h3 id={`${day.id}-title`}>{day.title}</h3>
                <p>{day.introduction}</p>
              </header>
              <ol className="wedding-timeline__list">
                {day.events.map(({ time, title, note, Icon }, index) => {
                  const featured = dayIndex === 1 && time === "13:30";
                  return (
                    <li key={`${day.id}-${time}`} className={`wedding-timeline__item ${featured ? "is-featured" : ""}`}>
                      <span className={`wedding-timeline__marker ${featured ? "is-featured" : ""}`} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <article className={`wedding-timeline__card ${featured ? "is-featured" : ""}`}>
                        <div className="wedding-timeline__card-top">
                          <time className="wedding-timeline__time">{time}</time>
                          <span className="wedding-timeline__icon" aria-hidden="true"><Icon /></span>
                        </div>
                        <h4>{title}</h4>
                        <span className="wedding-timeline__card-rule" aria-hidden="true" />
                        <p>{note}</p>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>
      <div className="wedding-timeline__ornament wedding-timeline__ornament--bottom" aria-hidden="true">✳</div>
    </section>
  );
});

export default TimelineSection;
