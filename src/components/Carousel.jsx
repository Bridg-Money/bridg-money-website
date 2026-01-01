import React, { useEffect, useRef, useState } from "react";

export default function VerticalCarousel({ items, children }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    let frame;
    const container = containerRef.current;

    const checkActive = () => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;

      let closest = 0;
      let minDist = Infinity;

      Array.from(container.querySelectorAll(".ticker-card")).forEach(
        (child, i) => {
          const cRect = child.getBoundingClientRect();
          const cCenter = cRect.top + cRect.height / 2;
          const dist = Math.abs(centerY - cCenter);

          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        }
      );

      setActiveIndex(closest);
      frame = requestAnimationFrame(checkActive);
    };

    checkActive();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="overflow-hidden h-100 group relative" ref={containerRef}>
      <div className="ticker__inner p-5">
        <div className="flex flex-col gap-4">
          {items.concat(items).map((data, i) => (
            <div key={`a-${data.id}-${i}`} className="ticker-card">
              {children(data, i === activeIndex)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
