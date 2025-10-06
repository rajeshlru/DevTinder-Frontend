import React, { useState, useRef, useEffect } from "react";

const ExpandableText = ({ text, maxLines = 4 }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      const lineHeight = parseInt(window.getComputedStyle(el).lineHeight, 10);
      const maxHeight = lineHeight * maxLines;
      setIsOverflow(el.scrollHeight > maxHeight);
    }
  }, [text, maxLines]);

  return (
    <div className="relative z-10 mb-4">
      <p
        ref={textRef}
        className={`text-indigo-950 text-[1.05rem] leading-relaxed italic ${
          !expanded && isOverflow ? "overflow-hidden" : ""
        }`}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: expanded ? "none" : maxLines,
          WebkitBoxOrient: "vertical",
        }}
      >
        ✨ “{text}”
      </p>

      {isOverflow && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-sm text-blue-400 hover:underline font-semibold"
        >
          {expanded ? "Show Less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
