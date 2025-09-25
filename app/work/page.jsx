'use client';

import React from "react";
import styles from "../../Styles/work.module.css";
import { workInfo, projects, workImages } from "./work.content";
import ProjectCarouselCard from "@/components/ProjectCarouselCard";

export default function WorkPage() {
  // Fallback por si no hubiera 'projects'
  const items =
    projects && projects.length
      ? projects
      : (workImages || []).map((src, i) => ({
          src,
          title: `Proyecto ${i + 1}`,
          location: "Argentina",
          description: "Intervención técnica en parque de generación renovable.",
        }));

  // Agrupar en carruseles de a 3
  const groups = [];
  for (let i = 0; i < items.length; i += 3) {
    groups.push(items.slice(i, i + 3));
  }

  return (
    <div className={styles.page}>
      <section className={styles.section} aria-labelledby="projects-title">
        <header className={styles.header}>
          <h1 id="projects-title" className={styles.title}>
            {workInfo.title}
          </h1>
          {workInfo.subtitle ? (
            <p className={styles.subtitle}>{workInfo.subtitle}</p>
          ) : null}
        </header>

        <div className={styles.grid}>
          {groups.map((slides, idx) => (
            <ProjectCarouselCard key={`group-${idx}`} slides={slides} />
          ))}
        </div>
      </section>
    </div>
  );
}
