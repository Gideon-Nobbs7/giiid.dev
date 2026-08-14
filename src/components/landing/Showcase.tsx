/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useState } from "react";
import { Tween } from "react-gsap";

const MARQUEE_PHRASE =
  "EVENT-DRIVEN \u00b7 DISTRIBUTED \u00b7 ASYNC PIPELINES \u00b7 API DESIGN \u00b7 REAL-TIME \u00b7 DATABASE PERFORMANCE";

const Showcase = forwardRef<HTMLDivElement>((_, ref) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const marqueeContent = Array.from({ length: 5 }).map((_, i) => (
    <span
      key={i}
      className="mr-10 shrink-0 whitespace-nowrap font-bold text-theme-text-black-muted"
    >
      {MARQUEE_PHRASE}
    </span>
  ));

  return (
    <div
      ref={ref}
      className="min-h-screen m-auto text-theme-text-black showcase bg-theme-bg-white"
    >
      <div className="max-w-[1158px] m-auto doc-padding-top">
        <p className="max-w-[275px] font-medium">
          I work as a backend engineer at HoneyPot Solutions, a software
          development consultancy. I spend my days building across a range of
          projects with a team of developers, designers, and product owners.
        </p>
      </div>

      <div className="py-[10vh]">
        <div className="flex w-full h-auto gap-6 overflow-scroll scrollbar-hide my-12 text-[11rem] leading-[11rem] cursor-default select-none">
          {prefersReducedMotion ? (
            marqueeContent
          ) : (
            <Tween
              from={{
                x: "-25%",
              }}
              to={{
                x: "-100%",
                ease: "none",
                scrollTrigger: {
                  end: "bottom center",
                  scrub: true,
                },
              }}
            >
              {marqueeContent}
            </Tween>
          )}
        </div>
      </div>
    </div>
  );
});

export default Showcase;
