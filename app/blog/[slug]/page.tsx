import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "../../components/MarkdownContent";

const post = {
  slug: "beyond-usestate",
  title: "Understanding State Ownership in Complex Frontends",
  description: "A practical mental model for deciding where your frontend state actually belongs.",
  file: "beyond-usestate.md",
};

export function generateStaticParams() {
  return [{ slug: post.slug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== post.slug) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== post.slug) notFound();

  const source = await readFile(
    path.join(process.cwd(), "content", "blog", post.file),
    "utf8",
  );

  return (
    <main className="portfolio-page min-h-screen w-full px-4 py-6 sm:px-8 sm:py-10">
      <article className="portfolio-shell mx-auto max-w-3xl overflow-hidden text-left">
        <header className="border-b border-dashed border-portfolio-border px-5 py-8 sm:px-10 sm:py-12">
          <Link href="/#blog" className="font-mono text-[10px] uppercase tracking-[0.14em] text-portfolio-text-subtle transition-colors hover:text-portfolio-text-bright">
            ← Back to portfolio
          </Link>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.14em] text-portfolio-text-subtle">
            Frontend notes · 8 min read
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[0.95] tracking-tight text-portfolio-text-bright sm:text-7xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-portfolio-text-muted">
            {post.description}
          </p>
        </header>

        <div className="px-5 py-8 sm:px-10 sm:py-12">
          <MarkdownContent source={source} />
        </div>
      </article>
    </main>
  );
}
