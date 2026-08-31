import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

const navButtonStyle = (side) => ({
  position: "absolute",
  [side]: "8px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.4)",
  border: "none",
  color: "white",
  fontSize: "36px",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  cursor: "pointer",
  lineHeight: 1,
});

export function isPdfLink(link) {
  return !!link && link.toLowerCase().endsWith(".pdf");
}

// Slides render into whichever of these two canvases is currently hidden,
// then swap visibility only once the new page has fully painted - so the
// visible canvas is never cleared/resized in place. Without this, pdf.js
// fills each canvas with an opaque white backdrop before painting page
// content (see pdf.mjs: `this.ctx.fillStyle = background || "#ffffff"`),
// which flashes through for a frame or two on every page turn.
const SLIDE_BACKGROUND = "rgb(20, 20, 28)";

const PdfSlideshowViewer = ({ url }) => {
  const stageRef = useRef(null);
  const canvasRefs = [useRef(null), useRef(null)];
  const activeSlotRef = useRef(0);
  const [activeSlot, setActiveSlotState] = useState(0);
  const [pdf, setPdf] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const renderTaskRef = useRef(null);

  const setActiveSlot = (slot) => {
    activeSlotRef.current = slot;
    setActiveSlotState(slot);
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setReady(false);
    setError(null);
    setPdf(null);
    setPageNum(1);
    setActiveSlot(0);

    pdfjsLib
      .getDocument(encodeURI(url))
      .promise.then((doc) => {
        if (cancelled) return;
        setPdf(doc);
        setNumPages(doc.numPages);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("PdfSlideshowViewer: failed to load PDF", url, err);
        setError(err?.message || String(err));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  useEffect(() => {
    if (!pdf) return;
    let cancelled = false;

    pdf
      .getPage(pageNum)
      .then((page) => {
        if (cancelled) return;
        const targetSlot = 1 - activeSlotRef.current;
        const canvas = canvasRefs[targetSlot].current;
        if (!canvas) return;
        const context = canvas.getContext("2d");

        const containerWidth = stageRef.current.clientWidth;
        const containerHeight = stageRef.current.clientHeight;
        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = Math.min(
          containerWidth / unscaledViewport.width,
          containerHeight / unscaledViewport.height
        );
        const viewport = page.getViewport({ scale });

        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const transform =
          outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        const task = page.render({
          canvasContext: context,
          viewport,
          transform,
          background: SLIDE_BACKGROUND,
        });
        renderTaskRef.current = task;
        task.promise
          .then(() => {
            if (cancelled) return;
            setActiveSlot(targetSlot);
            setReady(true);
          })
          .catch((err) => {
            if (cancelled || err?.name === "RenderingCancelledException") return;
            console.error("PdfSlideshowViewer: failed to render page", pageNum, url, err);
            setError(err?.message || String(err));
          });
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("PdfSlideshowViewer: failed to get page", pageNum, url, err);
        setError(err?.message || String(err));
      });

    return () => {
      cancelled = true;
    };
  }, [pdf, pageNum]);

  const goPrev = () => setPageNum((n) => Math.max(1, n - 1));
  const goNext = () => setPageNum((n) => Math.min(numPages, n + 1));

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [numPages]);

  const touchStartX = useRef(null);
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        background: "rgb(20, 20, 28)",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        ref={stageRef}
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "12px",
          boxSizing: "border-box",
        }}
      >
        {error && (
          <span
            className="csci134-text"
            style={{ color: "#ff6666", textAlign: "center", padding: "0 16px" }}
          >
            couldn't load slides: {error}
          </span>
        )}
        {!error && (loading || !ready) && (
          <span className="csci134-text" style={{ color: "white" }}>
            loading slides...
          </span>
        )}

        {[0, 1].map((slot) => (
          <canvas
            key={slot}
            ref={canvasRefs[slot]}
            style={{
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              visibility:
                ready && activeSlot === slot ? "visible" : "hidden",
              position: ready && activeSlot === slot ? "static" : "absolute",
            }}
          />
        ))}

        {ready && (
          <>
            <button
              onClick={goPrev}
              disabled={pageNum <= 1}
              className="csci134-text"
              style={navButtonStyle("left")}
            >
              ‹
            </button>
            <button
              onClick={goNext}
              disabled={pageNum >= numPages}
              className="csci134-text"
              style={navButtonStyle("right")}
            >
              ›
            </button>
          </>
        )}
      </div>

      {ready && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "12px",
            flexWrap: "wrap",
          }}
        >
          <span
            className="csci134-text"
            style={{ color: "white", marginRight: "8px" }}
          >
            {pageNum} / {numPages}
          </span>
          {Array.from({ length: numPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPageNum(n)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background:
                  n === pageNum ? "#41FF00" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PdfSlideshowViewer;
