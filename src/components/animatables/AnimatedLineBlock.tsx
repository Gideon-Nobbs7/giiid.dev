import { gsap } from "gsap";
import React, { useRef } from "react";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { Animatable, playRiveSequence } from "@/scripts/riveAnimations";

export type { Animatable } from "@/scripts/riveAnimations";

type Props = {
  children: React.ReactNode;
  animatables?: Record<string, Animatable>;
} & React.HTMLAttributes<HTMLDivElement>;

const AnimatedLineBlock = ({ children, animatables, ...rest }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isAnimated = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (ref.current && !isAnimated.current) {
      isAnimated.current = true;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        ref.current.style.opacity = "1";
        return;
      }

      const animatableInstances: Animatable[] = [];

      const Splitting = require("splitting");

      const split = Splitting({
        target: ref.current,
        by: "lines",
      });

      const lines = split[0].lines.map((lineWords: Element[]) => {
        // Create line container
        const lineContainer = document.createElement("div");
        lineContainer.classList.add("overflow-hidden");

        const line = document.createElement("p");
        lineContainer.append(line);

        // Wrap each line in a container
        ref.current?.appendChild(lineContainer);

        lineWords.forEach((word) => {
          const text = word.textContent;
          if (!text) return;

          // Replace words with replacements
          if (animatables && animatables[text]) {
            const { canvas, riveInstance } = animatables[text];
            animatableInstances.push(animatables[text]);

            word.replaceChildren(canvas);

            riveInstance.resizeDrawingSurfaceToCanvas();
          } else {
            word.textContent = `${word.textContent} `;
          }

          line.appendChild(word);
        });
        return line;
      });

      ref.current.style.opacity = "1";

      ref.current.onmouseenter = () => {
        playRiveSequence(animatableInstances);
      };

      gsap.from(lines, {
        yPercent: 100,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4",
        onComplete: () => {
          // Run animations in sequence
          setTimeout(() => {
            playRiveSequence(animatableInstances);
            // Start playing animations after 1 second
          }, 1000);
        },
      });
    }
  }, [ref, animatables]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        userSelect: "none",
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default AnimatedLineBlock;
