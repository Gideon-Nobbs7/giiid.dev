import React from "react";

import ProjectPageLayout from "@/components/projects/ProjectPageLayout";
import { projects } from "@/data/projects";

export default function AdventureLogProjectPage() {
  const project = projects.find((p) => p.slug === "adventurelog");

  if (!project) {
    return null;
  }

  return <ProjectPageLayout project={project} />;
}