import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "14 production artifacts spanning systems programming, AI/ML, full-stack, security, and open source contributions.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
