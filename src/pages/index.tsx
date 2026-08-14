import { useLenis } from "@studio-freight/react-lenis";
import { AnimatePresence } from "framer-motion";
import { NextPageContext } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { Tween } from "react-gsap";

import ArrowDownIcon from "@/assets/sprites/down-arrow.svg";
import AnimatedLineBlock, {
  Animatable,
} from "@/components/animatables/AnimatedLineBlock";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Projects from "@/components/landing/Projects";
import Showcase from "@/components/landing/Showcase";
import SEO from "@/components/SEO";
import {
  TransitionContextProvider,
  useTransitionContext,
} from "@/components/transitions";
import HomeIntro from "@/components/transitions/HomeIntro";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import useUpdateRootVariables from "@/hooks/useUpdateRootVariables";
import { buildRiveCanvas } from "@/scripts/riveAnimations";

const animatablesMap = {
  "*:r": "/assets/rocket.riv",
  "*:g": "/assets/globe.riv",
  "*:w": "/assets/wave.riv",
};

export default function Home({ skipAnimation }: { skipAnimation?: boolean }) {
  return (
    <div className="min-h-screen bg-theme-bg-black">
      <SEO />

      <Head>
        <link
          rel="preload"
          href="/assets/deps/rive.wasm"
          as="fetch"
          crossOrigin="anonymous"
        />

        {Object.entries(animatablesMap).map(([key, src]) => (
          <link
            key={key}
            rel="preload"
            href={src}
            as="fetch"
            crossOrigin="anonymous"
          />
        ))}
      </Head>

      <TransitionContextProvider>
        <LandingPageWithAnimatedIntro skipAnimation={skipAnimation} />
      </TransitionContextProvider>
    </div>
  );
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  return {
    skipAnimation:
      // Don't animate if we're coming from another page which adds a query param
      !!ctx.query.e ||
      // Don't animate if we're coming from a client-side navigation. i.e this getInitialProps is run on the client-side
      !ctx.req,
  };
};

function LandingPageWithAnimatedIntro({
  skipAnimation,
}: {
  skipAnimation?: boolean;
}) {
  const [animatables, setAnimatables] = useState<Record<string, Animatable>>();
  const {
    values: { isTransitionComplete },
  } = useTransitionContext();

  useIsomorphicLayoutEffect(() => {
    // Build animatables here so they're ready before the intro animation
    // Building these elements is pretty expensive
    Object.entries(animatablesMap).forEach(([key, src]) => {
      if (animatables?.[key]) return;

      buildRiveCanvas(src).then((animatable) => {
        setAnimatables((prev) => ({
          ...prev,
          [key]: animatable,
        }));
      });
    });
  }, []);

  // Show intro until transition is complete
  return (
    <AnimatePresence mode="wait">
      {skipAnimation || isTransitionComplete ? (
        <>{animatables && <LandingPage skipAnimation={skipAnimation} animatables={animatables} />}</>
      ) : (
        <HomeIntro key={1} />
      )}
    </AnimatePresence>
  );
}

function LandingPage({
  skipAnimation,
  animatables,
}: {
  skipAnimation?: boolean;
  animatables: Record<string, Animatable>;
}) {
  const lenis = useLenis(null);
  const ref = useRef<HTMLDivElement>(null);

  useUpdateRootVariables({
    "--primary-color": "#0F1115",
    "--primary-text": "#EDF1F6",
  });

  const scrollShowcaseIntoView = () => {
    if (lenis) {
      lenis.scrollTo(ref.current, {
        duration: 1.1,
        offset: 0,
      });
    } else {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="doc-padding text-theme-text-white bg-theme-bg-black max-w-[1158px] m-auto min-h-screen flex flex-col justify-between">
        <Header entryAnimation={!skipAnimation} />
        <AnimatedLineBlock
          className="text-[2.25rem] leading-[3.25rem] md:text-[3.5rem] md:leading-[4.45rem] py-16 font-bold cursor-default"
          animatables={animatables}
        >
          Backend software engineer *:w
          <span className="text-theme-text-white-muted">building</span>
          robust *:r systems *:g
        </AnimatedLineBlock>
        <div className="overflow-hidden text-theme-text-white-muted">
          <Tween
            from={{ yPercent: 100 }}
            to={{ yPercent: 0 }}
            duration={1.5}
            ease="power4"
          >
            <button
              onClick={scrollShowcaseIntoView}
              className="flex items-center gap-2 cursor-pointer active:scale-[0.97] transition-transform duration-100 ease-out"
            >
              <span>SCROLL TO DISCOVER</span>
              <span className="mb-1 overflow-y-clip">
                <ArrowDownIcon className="w-5 h-5 animate-over-bounce" />
              </span>
            </button>
          </Tween>
        </div>
      </div>
      <div>
        <Showcase ref={ref} />
      </div>
      <div>
        <Projects />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
