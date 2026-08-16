import StickerSquare from "@/assets/sprites/sticker-square.svg";
import AnimatedLineBlock from "@/components/animatables/AnimatedLineBlock";
import ExternalLink from "@/components/ExternalLink";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEO from "@/components/SEO";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SEO templateTitle="About" />
      <div className="doc-padding max-w-[1158px] m-auto min-h-screen flex flex-col">
        <Header white />

        <div className="mt-[8vh] md:mt-[22.9vh] text-[2.25rem] leading-[3.25rem] md:text-[3.5rem] md:leading-[4.45rem] font-medium cursor-default">
          <AnimatedLineBlock className="mb-2">
            Gideon Courage Fummey
          </AnimatedLineBlock>
          <AnimatedLineBlock>Backend Engineer</AnimatedLineBlock>
        </div>

        <div className="mt-[8vh] flex flex-col gap-8 max-w-[42rem]">
          <p>
            I&apos;m Gideon Courage Fummey, a backend software engineer.
            Most of my work has been in Python, with some Java, building
            the backend systems that run behind them — from
            payment processing to event-driven data pipelines.
          </p>
          <p>
            I came to engineering with a background in working with
            real-world data and thinking about problems as systems. That
            curiosity about how things fit together is what pulled me into
            backend development.
          </p>
          <p>
            I&apos;ve since worked across edtech, CRM, and AI-driven
            applications. I&apos;m currently based in Kumasi, Ghana. When
            I&apos;m not programming, I&apos;m usually playing games or
            watching YouTube videos.
          </p>
          <div className="mt-4">
            <ExternalLink
              href="https://drive.google.com/file/d/1k4mlb21m6HVc6TXYoeERqWQHp6-5YsWn/view?usp=sharing"
              className="flex items-center h-fit"
            >
              <StickerSquare className="inline mr-1" />
              View Resume
            </ExternalLink>
          </div>
        </div>
      </div>

      <Footer page />
    </div>
  );
}