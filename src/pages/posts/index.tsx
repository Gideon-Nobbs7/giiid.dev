import AnimatedLineBlock from "@/components/animatables/AnimatedLineBlock";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEO from "@/components/SEO";

export default function PostsPage() {
  return (
    <div className="min-h-screen">
      <SEO templateTitle="Posts" />
      <div className="doc-padding max-w-[1158px] m-auto min-h-screen flex flex-col">
        <Header white />
        <div className="mt-[8vh] md:mt-[22.9vh] text-[2.25rem] leading-[3.25rem] md:text-[3.5rem] md:leading-[4.45rem] font-medium cursor-default">
          <AnimatedLineBlock>Posts</AnimatedLineBlock>
        </div>
        <div className="mt-[8vh]">
          <AnimatedLineBlock className="text-[1.125rem] leading-[1.75rem] text-theme-bg-black">
            Posts are coming soon. I&apos;m working on the first few, and
            they&apos;ll show up here as I finish them.
          </AnimatedLineBlock>
        </div>
      </div>
      <Footer page />
    </div>
  );
}