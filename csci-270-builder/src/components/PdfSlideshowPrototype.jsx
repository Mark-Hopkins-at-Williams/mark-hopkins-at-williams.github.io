import PdfSlideshowViewer from "./PdfSlideshowViewer";

const PdfSlideshowPrototype = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgb(20, 20, 28)",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
        }}
      >
        <span className="csci270-text">state machines (prototype)</span>
      </div>
      <PdfSlideshowViewer url="State Machines.pdf" />
    </div>
  );
};

export default PdfSlideshowPrototype;
