import { useEffect, useState } from "react";
import courseData from "./csci270.json";
import PdfSlideshowViewer, { isPdfLink } from "./PdfSlideshowViewer";

function toEmbedUrl(link) {
  if (!link) return link;
  const match = link.match(
    /^https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view/
  );
  return match
    ? `https://drive.google.com/file/d/${match[1]}/preview`
    : link;
}

function getVisualViewportRect() {
  const vv = window.visualViewport;
  return vv
    ? { left: vv.offsetLeft, top: vv.offsetTop, width: vv.width, height: vv.height }
    : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
}

const SlidePreviewModal = ({ title, link, onClose }) => {
  const [viewportRect, setViewportRect] = useState(getVisualViewportRect);

  useEffect(() => {
    const scrollY = window.scrollY;
    const { position, top, width, overflow } = document.body.style;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;
      document.body.style.overflow = overflow;
      window.scrollTo(0, scrollY);
    };
  }, []);

  // iOS Safari resizes/pans the *visual* viewport (address bar collapsing,
  // pinch-zoom) independently of the layout viewport that `position: fixed`
  // sizes against, which can push a plain inset:0 overlay's controls outside
  // what's actually visible. Track the visual viewport explicitly instead.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setViewportRect(getVisualViewportRect());
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        left: viewportRect.left,
        top: viewportRect.top,
        width: viewportRect.width,
        height: viewportRect.height,
        background: "rgba(0, 0, 0, 0.75)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(1100px, 100%)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "rgb(40, 40, 50)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            color: "white",
          }}
        >
          <span className="csci270-text">{title}</span>
          <div>
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="csci270-text csci270-textlink"
              style={{ marginRight: "16px" }}
            >
              open in new tab
            </a>
            <button
              onClick={onClose}
              className="csci270-text"
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ✕ close
            </button>
          </div>
        </div>
        {isPdfLink(link) ? (
          <PdfSlideshowViewer url={link} />
        ) : (
          <iframe
            src={toEmbedUrl(link)}
            title={title}
            style={{ flexGrow: 1, border: "none", background: "white" }}
          />
        )}
      </div>
    </div>
  );
};

function getNow() {
  //return new Date("Jan 1 2030"); // uncomment to unlock all content
  return new Date(Date.now());
}

const Welcome = () => {
  return (
    <div
      className="welcome"
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          alignContent: "center",
        }}
      >
        <div
          className="csci270-welcome-logo"
          style={{ color: "#41FF00", fontSize: "100px" }}
        >
          270
        </div>
        <div
          className="csci270-welcome"
          style={{ fontSize: "20px", color: "#aaFF44" }}
        >
          foundations of
        </div>
        <div
          className="csci270-welcome"
          style={{ fontSize: "20px", color: "#aaFF44" }}
        >
          artificial intelligence
        </div>
      </div>
    </div>
  );
};

const TeachingAssistant = ({
  image,
  name,
  hours,
  hours2,
  hours3,
  where,
  link,
}) => {
  const photo = (
    <img
      src={image}
      style={{
        borderStyle: "solid",
        borderColor: "white",
        width: "100px",
      }}
    />
  );

  return (
    <div
      className="csci270-subtitle"
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "stretch",
        fontSize: "14px",
      }}
    >
      {link ? (
        <a href={link} target="_blank">
          {photo}
        </a>
      ) : (
        photo
      )}
      <div
        style={{
          width: "100px",
          fontWeight: "bold",
          fontSize: "29px",
        }}
      >
        {name.toLowerCase()}
      </div>
      <div>{hours.toLowerCase()}</div>
      {hours2 ? <div>{hours2.toLowerCase()}</div> : <div></div>}
      {hours3 ? <div>{hours3.toLowerCase()}</div> : <div></div>}
      <div>{where.toLowerCase()}</div>
    </div>
  );
};

const TeachingAssistants = () => {
  return (
    <div className="teaching-assistants">
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "stretch",
          height: "100%",
        }}
      >
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-evenly",
          }}
        >
          <TeachingAssistant
            image="images/mark.png"
            name="Mark"
            hours="tu 11am-noon"
            where="tcl 307"
            link="https://www.cs.williams.edu/~hopkins/"
          />
          <TeachingAssistant
            image="images/jasper.jpg"
            name="Jasper"
            hours="su 5-7pm"
            hours2="m 3-5pm"
            hours3="tu 5-7pm"
            where="unix lab"
          />
          <TeachingAssistant
            image="images/charlie.jpg"
            name="Charlie"
            hours="su 7-9pm"
            hours2="m 730-9pm"
            where="unix lab"
          />
        </div>
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
      </div>
    </div>
  );
};

const WeekItem = ({ title }) => {
  const renderContent = () => {
    return (
      <div
        className={"csci270-text csci270-locked"}
        style={{
          borderStyle: "solid 2px black",
          margin: "2px",
          padding: "2px",
          color: "white",
          alignContent: "center",
        }}
      >
        <span>{title}</span>
      </div>
    );
  };

  return renderContent();
};

const LabAssignment = ({ type, title, link, release }) => {
  const now = getNow();
  const released = release ? now > new Date(release) : false;
  const locked = !released || !link;

  const renderContent = () => {
    return (
      <div
        className={
          locked
            ? "csci270-lab-text csci270-locked"
            : "csci270-lab-text csci270-lab"
        }
        style={{
          border: "5px solid rgb(40, 40, 50)",
          margin: "0",
          padding: "2px",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          alignContent: "center",
        }}
      >
        <span>{title}</span>
      </div>
    );
  };

  return !locked ? (
    <a href={link} target="_blank">
      {renderContent()}
    </a>
  ) : (
    renderContent()
  );
};

const SlideDeck = ({ type, title, link, release }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const now = getNow();
  const released = release ? now > new Date(release) : false;
  const locked = !released || !link;
  const iconMap = {
    lecture: "👨‍🏫",
    activity: "✍️",
    kahoot: "🏆",
    holiday: "🏖️",
    movie: "🍿",
    workshop: "🔧",
    quiz: "💪",
  };

  const icon = iconMap[type] ?? "";

  const renderContent = () => {
    return (
      <div
        className={
          locked ? "csci270-text csci270-locked" : "csci270-text csci270-button"
        }
        style={{
          border: "solid 2px rgb(40, 40, 50)",
          margin: "2px",
          padding: "2px",
        }}
      >
        <span>
          {icon} {title}
        </span>{" "}
      </div>
    );
  };

  if (locked) return renderContent();

  if (type === "lecture") {
    return (
      <>
        <div
          onClick={() => setPreviewOpen(true)}
          style={{ cursor: "pointer" }}
        >
          {renderContent()}
        </div>
        {previewOpen && (
          <SlidePreviewModal
            title={title}
            link={link}
            onClose={() => setPreviewOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <a href={link} target="_blank">
      {renderContent()}
    </a>
  );
};

const Schedule = () => {
  const columnProportions = "1fr 2fr 2fr 2fr";
  const startMonday = new Date(2026, 8, 14); // Feb is month 1 (0-based!)

  const weeks = [];

  for (let week = 1; week <= 20; week++) {
    const monday = new Date(startMonday);
    monday.setDate(startMonday.getDate() + (week - 1) * 7);

    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    weeks.push({
      week,
      monday,
      friday,
    });
  }

  return (
    <div className="csci270-colorblock">
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "stretch",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: columnProportions,
          }}
        >
          <div className="csci270-schedule-header">week</div>
          <div className="csci270-schedule-header">tue</div>
          <div className="csci270-schedule-header">wed</div>
          <div className="csci270-schedule-header">thu</div>
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "stretch",
            height: "100%",
          }}
        >
          {courseData.schedule.map((week) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: columnProportions,
              }}
            >
              <WeekItem
                title={`${weeks[week.week - 1].monday.toDateString().toLowerCase()} – ${weeks[week.week - 1].friday.toDateString().toLowerCase()}`}
              />

              <div
                style={{
                  display: "flex",
                  flexFlow: "column nowrap",
                  justifyContent: "stretch",
                  height: "100%",
                }}
              >
                {week.mon.map((content) => (
                  <SlideDeck
                    type={content.type}
                    title={content.title}
                    link={content.link}
                    release={content.release}
                  />
                ))}
              </div>
              <LabAssignment
                type={week.lab.type}
                title={week.lab.title}
                link={week.lab.link}
                release={week.lab.release}
              />
              <div
                style={{
                  display: "flex",
                  flexFlow: "column nowrap",
                  justifyContent: "stretch",
                  height: "100%",
                }}
              >
                {week.thu.map((content) => (
                  <SlideDeck
                    type={content.type}
                    title={content.title}
                    link={content.link}
                    release={content.release}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Information = () => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-around",
        gap: "20px",
        height: "auto",
        padding: "10px",
        borderStyle: "solid",
      }}
    >
      {courseData.info.map((content) => (
        <Info title={content.title} link={content.link} />
      ))}
    </div>
  );
};

const Info = ({ title, link }) => {
  const renderContent = () => {
    return (
      <div
        className={"csci270-info"}
        style={{
          margin: "2px",
          padding: "2px",
        }}
      >
        <span>{title}</span>{" "}
      </div>
    );
  };

  return (
    <a href={link} target="_blank">
      {renderContent()}
    </a>
  );
};

function csci270() {
  return (
    <div>
      <div
        className="csci270"
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "20px",
          height: "auto",
          paddingBottom: "20px",
        }}
      >
        <Welcome />
        <TeachingAssistants />
        <Information />
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "stretch",
            gap: "20px",
            height: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: "stretch",
              gap: "20px",
            }}
          >
            <Schedule />
          </div>
        </div>
      </div>
    </div>
  );
}

export default csci270;
