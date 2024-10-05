import React, { useEffect, useRef } from "react";

interface PopupProps {
  htmlContent: string;
  onClose: () => void;
  isOpen: boolean;
}

const Popup: React.FC<PopupProps> = ({ htmlContent, onClose, isOpen }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && isOpen) {
      contentRef.current.innerHTML = htmlContent;

      // Evaluate any embedded scripts
      const scripts = contentRef.current.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        const newScript = document.createElement("script");
        newScript.text = script.text;
        script.parentNode?.replaceChild(newScript, script);
      }
    }
  }, [htmlContent, isOpen]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} className="z-50">
      <div style={styles.popup}>
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
        <div ref={contentRef} />
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "500px",
    width: "100%",
    boxSizing: "border-box" as "border-box",
  },
  closeButton: {
    position: "absolute" as "absolute",
    top: "10px",
    right: "10px",
  },
};

export default Popup;
