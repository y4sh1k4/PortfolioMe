"use client";

import { useEffect, useState } from "react";

export function ViewCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/page-views", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { count?: unknown } | null) => {
        if (typeof data?.count === "number") {
          setCount(data.count);
        }
      })
      .catch(() => {
        // The counter is optional; leave it blank when analytics is unavailable.
      });

    return () => controller.abort();
  }, []);

  return <span aria-live="polite">{count === null ? "—" : count.toLocaleString()}</span>;
}
