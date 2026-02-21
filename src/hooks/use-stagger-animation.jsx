import { useEffect, useRef, useState } from "react";

export function useStaggerAnimation(itemCount, staggerDelay = 120, threshold = 0.15) {
  const ref = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Array(itemCount).fill(false));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * staggerDelay);
          }
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [itemCount, staggerDelay, threshold]);

  return { ref, visibleItems };
}
