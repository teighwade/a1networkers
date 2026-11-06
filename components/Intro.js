'use client';
import { useEffect, useState } from 'react';

// One-time splash on the home page: two hands (red and white) meet in a handshake, gold sparkles,
// then the claret curtain lifts to reveal the page. Shown once per browser session; click to skip.
// Skipped entirely for visitors who prefer reduced motion.
export default function Intro() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('a1-intro') === '1'; sessionStorage.setItem('a1-intro', '1'); } catch (e) {}
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduce) { setGone(true); return; }
    const t = setTimeout(() => setGone(true), 3300);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('a1-intro')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro-skip')}catch(e){}" }} />
      <div className="intro" onClick={() => setGone(true)} aria-hidden="true">
        <div className="intro__stage">
          <svg className="intro__hands" viewBox="0 0 64 50" width="380" height="297">
            <g className="intro__left" stroke="#3f0812" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" transform="translate(0 -6)">
              <path d="M3 30 L14 19 L22 27 L11 38 Z" fill="#c41e2e" />
              <path d="M20 25 L33 38 C35 40 38 40 39 38 C41 39 43 37 42 35 C44 35 45 33 44 31 C46 31 47 28 45 26 L39 21 L32 24 Z" fill="#c41e2e" />
              <path d="M35 33 L39 37 M37 30 L41 34 M39 27 L43 31" fill="none" stroke="#fff" strokeWidth="2" />
            </g>
            <g className="intro__right" stroke="#3f0812" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" transform="translate(0 -6)">
              <path d="M61 30 L50 19 L42 27 L53 38 Z" fill="#fff" />
              <path d="M28 21 C31 19 35 20 37 22 L38 25 C36 26 33 25 31 24 Z" fill="#fff" />
            </g>
          </svg>
          <span className="intro__spark intro__spark--1" /><span className="intro__spark intro__spark--2" /><span className="intro__spark intro__spark--3" />
          <img className="intro__logo" src="/img/logo.webp" alt="" width="400" height="197" />
          <p className="intro__line">Givers Gain®</p>
        </div>
      </div>
    </>
  );
}
