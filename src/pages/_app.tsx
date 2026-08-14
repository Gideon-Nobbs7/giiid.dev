import "@/styles/globals.css";
import "@/styles/fonts/satoshi.css";

import { ReactLenis } from "@studio-freight/react-lenis";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect, useState } from "react";

import CursorTrail from "@/scripts/cursor";

export default function App({ Component, pageProps }: AppProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Initialize cursor trail client-side
    new CursorTrail();

    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <ReactLenis
        root
        options={
          reducedMotion
            ? { smoothWheel: false }
            : {
                lerp: 0.13,
                wheelMultiplier: 1,
                touchMultiplier: 1.2,
                smoothWheel: true,
                syncTouch: false,
              }
        }
      >
        <Component {...pageProps} />
      </ReactLenis>
      <div>
        <div className="cursor-trail" />
      </div>
      <Script
        defer
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-66BSQ6DB4J"
      />
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-66BSQ6DB4J');`}
      </Script>
    </>
  );
}
