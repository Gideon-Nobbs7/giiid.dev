import Head from "next/head";
import React from "react";

import AnimatedLineBlock from "@/components/animatables/AnimatedLineBlock";
import FillableActionButton from "@/components/FillableActionButton";
import Header from "@/components/Header";
import { Project } from "@/data/projects";

import { projectDiagrams } from "./SystemDiagram";

type Props = {
  project: Project;
};

export default function ProjectPageLayout({ project }: Props) {
  const Diagram = projectDiagrams[project.diagram];

  return (
    <div className="min-h-screen text-theme-text-black">
      <Head>
        <title>{project.title} | Gideon Courage Fummey</title>
      </Head>
      <div className="doc-padding max-w-[1158px] m-auto min-h-screen flex flex-col">
        <Header white />
        <div className="mt-12 md:mt-24">
          <AnimatedLineBlock className="text-[2.25rem] leading-[3.25rem] md:text-[3.5rem] md:leading-[4.45rem] font-medium cursor-default">
            {project.title}
          </AnimatedLineBlock>
          <p className="text-base mt-2 text-theme-text-black-muted">{project.role}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.repo ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={project.repo.href}
              >
                <FillableActionButton>{project.repo.label}</FillableActionButton>
              </a>
            ) : (
              <p className="text-sm text-theme-text-black-muted">
                Private repository — built for HoneyPot Solutions
              </p>
            )}
          </div>

          <div className="space-y-4 mt-10 max-w-2xl">
            {project.story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <div className="bg-theme-bg-surface p-6 sm:p-12">
            <Diagram />
          </div>
        </div>

        <div className="mt-20 md:mt-32">
          <p className="font-mono text-xs tracking-wider text-theme-text-black-muted mb-8">
            HOW IT&apos;S BUILT
          </p>
          <div className="space-y-5 max-w-2xl text-theme-text-black-muted">
            {project.architecture.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-32">
          <p className="font-mono text-xs tracking-wider text-theme-text-black-muted mb-8">
            EDGE CASES
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.edgeCases.map((edgeCase) => (
              <div key={edgeCase.title} className="bg-theme-bg-surface p-6">
                <p className="font-medium text-theme-text-white">{edgeCase.title}</p>
                <p className="mt-3 text-sm text-theme-text-white-muted">{edgeCase.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-32 mb-24">
          <p className="font-mono text-xs tracking-wider text-theme-text-black-muted mb-8">
            WHY THIS WAY
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {project.rationale.map((rationale) => (
              <div key={rationale.title} className="bg-theme-bg-surface p-6">
                <p className="font-medium text-theme-text-white">{rationale.title}</p>
                <p className="mt-3 text-sm text-theme-text-white-muted">{rationale.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}