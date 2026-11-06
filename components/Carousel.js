'use client';
import { useRef } from 'react';

// Horizontal, swipeable row of cards with previous/next buttons.
export default function Carousel({ label, children }) {
  const ref = useRef(null);
  const go = (dir) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector(':scope > *');
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };
  return (
    <div className="carousel">
      <div className="carousel__track" ref={ref} role="region" aria-label={label} tabIndex={0}>{children}</div>
      <div className="carousel__nav">
        <button type="button" className="carousel__btn" onClick={() => go(-1)} aria-label="Previous posts">‹</button>
        <button type="button" className="carousel__btn" onClick={() => go(1)} aria-label="Next posts">›</button>
      </div>
    </div>
  );
}
