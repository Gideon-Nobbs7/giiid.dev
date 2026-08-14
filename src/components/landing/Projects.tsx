import Image from "next/image";
import Link from "next/link";
import React from "react";

import ArrowUpRightIcon from "@/assets/sprites/up-right-arow.svg";
import { compactProjectDiagrams } from "@/components/projects/SystemDiagram";
import { Project, projects } from "@/data/projects";
import { cn } from "@/utils";

const Projects = () => {
  return (
    <div className="bg-theme-bg-black text-theme-text-white doc-padding max-w-[1158px] m-auto min-h-screen flex flex-col gap-[15vh] py-[10vh]">
      <div className="flex items-end justify-between">
        <p className="font-medium text-theme-text-white-muted">PROJECTS</p>
        <p className="font-medium text-theme-text-white-muted">01 — 03 · BACKEND</p>
      </div>

      {projects.map((project, index) => (
        <ProjectRow key={project.slug} project={project} flipped={index % 2 === 1} />
      ))}
    </div>
  );
};

export default Projects;

const ProjectRow = ({ project, flipped }: { project: Project; flipped: boolean }) => {
  const Diagram = compactProjectDiagrams[project.diagram];

  return (
    <div
      className={cn(
        "relative flex flex-col gap-10 lg:flex-row lg:items-center",
        flipped && "lg:flex-row-reverse"
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} project`}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      <div className="pointer-events-none lg:w-1/2">
        <p className="font-mono text-sm text-theme-text-white-muted">{project.index}</p>
        <h1 className="sm:text-[64px] text-4xl font-medium sm:leading-[76px] mt-4 mb-8">
          {project.title}
        </h1>
        <div className="space-y-4 text-theme-text-white-muted">
          {project.blurb.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 border-t border-theme-bg-elevated">
          <SpecRow label="STACK" values={project.stack} />
          <SpecRow label="ROLE" values={[project.role]} />
          <SpecRow label="SCALE" values={project.scale} />
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="group pointer-events-none inline-flex items-center gap-2 border border-theme-text-white-muted rounded-[3rem] px-6 py-3 font-medium uppercase text-sm hover:bg-theme-accent hover:border-theme-accent hover:text-theme-text-white transition-colors duration-200"
          >
            View Project
            <ArrowUpRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45" />
          </Link>
          {project.repo && (
            <a
              href={project.repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 inline-flex items-center border border-theme-text-white-muted rounded-[3rem] px-6 py-3 font-medium uppercase text-sm hover:bg-theme-accent hover:border-theme-accent hover:text-theme-text-white active:scale-[0.97] transition-colors duration-200"
            >
              {project.repo.label}
            </a>
          )}
        </div>
      </div>

      <div className="pointer-events-none lg:w-1/2">
        {project.screenshot ? (
          <div className="rounded-2xl overflow-hidden bg-theme-bg-surface ring-1 ring-white/10">
            <Image
              src={project.screenshot.src}
              width={project.screenshot.width}
              height={project.screenshot.height}
              alt={`${project.title} interface`}
              className="w-full h-auto"
            />
          </div>
        ) : (
          <div className="bg-theme-bg-surface p-6 sm:p-10">
            <Diagram />
          </div>
        )}
      </div>
    </div>
  );
};

const SpecRow = ({ label, values }: { label: string; values: string[] }) => (
  <div className="grid grid-cols-[96px_1fr] gap-4 py-4 border-b border-theme-bg-elevated">
    <p className="font-mono text-xs tracking-wider text-theme-text-white-muted pt-1">{label}</p>
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <span
          key={value}
          className="bg-theme-bg-elevated rounded-full px-3 py-1 text-sm font-medium"
        >
          {value}
        </span>
      ))}
    </div>
  </div>
);