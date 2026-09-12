import {
  ActivityCalendar,
  type Activity,
} from "react-activity-calendar";

const GITHUB_USERNAME = "y4sh1k4";
const CONTRIBUTION_YEAR = 2026;

const contributionTheme = {
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
};

function isActivity(value: unknown): value is Activity {
  if (!value || typeof value !== "object") {
    return false;
  }

  const activity = value as Partial<Activity>;

  return (
    typeof activity.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(activity.date) &&
    typeof activity.count === "number" &&
    typeof activity.level === "number" &&
    activity.level >= 0 &&
    activity.level <= 4
  );
}

async function getContributions(): Promise<Activity[] | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${CONTRIBUTION_YEAR}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      return null;
    }

    const payload: unknown = await response.json();

    if (!payload || typeof payload !== "object") {
      return null;
    }

    const contributions = (payload as { contributions?: unknown }).contributions;

    if (!Array.isArray(contributions) || !contributions.every(isActivity)) {
      return null;
    }

    return contributions;
  } catch {
    return null;
  }
}

export const GitHubActivityCalendar = async () => {
  const contributions = await getContributions();

  if (!contributions) {
    return (
      <div className="flex h-[158px] items-center justify-center text-sm text-portfolio-text-subtle">
        Contribution activity is temporarily unavailable.
      </div>
    );
  }

  return (
    <ActivityCalendar
      data={contributions}
      blockSize={10}
      blockMargin={3.6}
      blockRadius={2}
      fontSize={12}
      colorScheme="dark"
      className="!w-full"
      labels={{
        totalCount: `{{count}} contributions in ${CONTRIBUTION_YEAR}`,
      }}
      maxLevel={4}
      theme={contributionTheme}
    />
  );
};
