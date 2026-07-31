"use client";

import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="h-[158px] w-full animate-pulse bg-portfolio-surface-control" />
    ),
  },
);

export const GitHubActivityCalendar = () => {
  return (
    <GitHubCalendar
      username="y4sh1k4"
      year={2026}
      blockSize={10}
      blockMargin={3.6}
      blockRadius={2}
      fontSize={12}
      colorScheme="dark"
      className="!w-full"
      theme={{
        dark: [
          "var(--portfolio-contribution-empty)",
          "var(--portfolio-contribution-low)",
          "var(--portfolio-contribution-mid)",
          "var(--portfolio-contribution-high)",
          "var(--portfolio-contribution-peak)",
        ],
        light: [
          "var(--portfolio-contribution-empty)",
          "var(--portfolio-contribution-low)",
          "var(--portfolio-contribution-mid)",
          "var(--portfolio-contribution-high)",
          "var(--portfolio-contribution-peak)",
        ],
      }}
    />
  );
};
