import type { Metadata } from "next";
import MoonshotClient from "./MoonshotClient";

export const metadata: Metadata = {
  title: "Project Ax04 | The Moonshot",
  description:
    "An autonomous, self-improving agent system built with decentralized microservices, full OS automation, automated network failover, and recursive self-evolution (neuroplasticity).",
};

export default function MoonshotPage() {
  return <MoonshotClient />;
}
