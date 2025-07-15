import React from "react";
import { cn } from "@/lib/utils";

// Utility shimmer class
const shimmer =
  "animate-pulse bg-muted-foreground/10 dark:bg-muted-foreground/20 rounded";

// Skeleton for Avatar
function AvatarSkeleton() {
  return <div className={cn(shimmer, "size-28 border rounded-full")} />;
}

// Skeleton for text lines
function TextSkeleton({ width = "100%", height = "1.25rem", className = "" }) {
  return (
    <div
      className={cn(shimmer, className)}
      style={{ width, height, marginBottom: "0.5rem" }}
    />
  );
}

// Skeleton for ResumeCard
function ResumeCardSkeleton() {
  return (
    <div className="flex items-center gap-4 bg-muted/10">
      <div className={cn(shimmer, "size-12 rounded-full")} />
      <div className="flex-1 space-y-2">
        <TextSkeleton width="40%" height="1rem" />
        <TextSkeleton width="30%" height="0.75rem" />
        <TextSkeleton width="80%" height="0.75rem" />
      </div>
    </div>
  );
}

// Skeleton for ProjectCard
function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden border rounded-lg h-full">
      <div className={cn("h-40 w-full", shimmer)} />
      <div className="p-2 space-y-2">
        <TextSkeleton width="60%" height="1rem" />
        <TextSkeleton width="40%" height="0.75rem" />
        <TextSkeleton width="90%" height="0.75rem" />
      </div>
      <div className="mt-auto flex flex-wrap gap-1 p-2">
        <div className={cn("h-4 w-12", shimmer)} />
        <div className={cn("h-4 w-8", shimmer)} />
      </div>
    </div>
  );
}

// Skeleton for HackathonCard
function HackathonCardSkeleton() {
  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2">
        <div className={cn("size-12 rounded-full border", shimmer)} />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <TextSkeleton width="30%" height="0.75rem" />
        <TextSkeleton width="50%" height="1rem" />
        <TextSkeleton width="40%" height="0.75rem" />
        <TextSkeleton width="90%" height="0.75rem" />
      </div>
      <div className="mt-2 flex flex-row gap-2">
        <div className={cn("h-5 w-16", shimmer)} />
        <div className={cn("h-5 w-12", shimmer)} />
      </div>
    </li>
  );
}

// Main Skeleton Page
export default function PageSkeleton() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      {/* Hero */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <TextSkeleton width="60%" height="2.5rem" />
              <TextSkeleton width="90%" height="1.25rem" />
            </div>
            <AvatarSkeleton />
          </div>
        </div>
      </section>
      {/* About */}
      <section id="about">
        <TextSkeleton width="20%" height="1.5rem" />
        <TextSkeleton width="100%" height="1.25rem" />
        <TextSkeleton width="80%" height="1.25rem" />
      </section>
      {/* Work Experience */}
      <section id="work">
        <TextSkeleton width="30%" height="1.5rem" />
        <div className="flex flex-col gap-y-6">
          {[...Array(2)].map((_, i) => (
            <ResumeCardSkeleton key={i} />
          ))}
        </div>
      </section>
      {/* Education */}
      <section id="education">
        <TextSkeleton width="30%" height="1.5rem" />
        <div className="flex flex-col gap-y-6">
          {[...Array(1)].map((_, i) => (
            <ResumeCardSkeleton key={i} />
          ))}
        </div>
      </section>
      {/* Skills */}
      <section id="skills">
        <TextSkeleton width="20%" height="1.5rem" />
        <div className="flex flex-wrap gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={cn("h-6 w-16", shimmer)} />
          ))}
        </div>
      </section>
      {/* Projects */}
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <TextSkeleton width="20%" height="1.5rem" />
          <TextSkeleton width="60%" height="2rem" />
          <TextSkeleton width="80%" height="1.25rem" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {[...Array(2)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
      {/* Hackathons */}
      <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <TextSkeleton width="20%" height="1.5rem" />
          <TextSkeleton width="60%" height="2rem" />
          <TextSkeleton width="80%" height="1.25rem" />
          <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
            {[...Array(2)].map((_, i) => (
              <HackathonCardSkeleton key={i} />
            ))}
          </ul>
        </div>
      </section>
      {/* Contact */}
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <TextSkeleton width="20%" height="1.5rem" />
          <TextSkeleton width="60%" height="2rem" />
          <TextSkeleton width="80%" height="1.25rem" />
        </div>
      </section>
    </main>
  );
}
