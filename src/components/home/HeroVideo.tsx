"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Ensure autoplay kicks off reliably even on aggressive mobile power-saving policies
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy prevented playback, video will play upon user gesture
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const next = !isMuted;
      videoRef.current.muted = next;
      setIsMuted(next);
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  return (
    <div className={`relative mx-auto w-full max-w-[17rem] sm:max-w-[19rem] lg:max-w-[21rem] ${className}`}>
      {/* Ambient background glow matching site golden warmth */}
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-ghee-300/30 blur-2xl"
        aria-hidden="true"
      />

      <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] border-2 border-line/80 bg-ink-950 shadow-2xl transition-all duration-300 hover:shadow-[0_24px_50px_-12px_rgba(235,168,38,0.35)]">
        <video
          ref={videoRef}
          src="/video/farmdip%20vid.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="size-full object-cover"
        />

        {/* Floating Sound Toggle Button */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="absolute right-3.5 bottom-3.5 z-20 flex size-9 items-center justify-center rounded-full bg-ink-950/75 text-cream backdrop-blur-md transition-all hover:scale-110 hover:bg-ink-950 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ghee-400 border border-white/20"
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-ghee-300" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-ghee-400" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
