import React from "react";

import ProjectPageLayout from "@/components/projects/ProjectPageLayout";
import { projects } from "@/data/projects";

export default function MidasCoreProjectPage() {
  const project = projects.find((p) => p.slug === "midas-core");

  if (!project) {
    return null;
  }

  return <ProjectPageLayout project={project} />;
}