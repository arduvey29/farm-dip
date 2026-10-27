import { getPost, posts } from "@/data/posts";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Farm Dip ghee guide";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOg({
    kicker: post ? `${post.category} guide` : "Ghee guide",
    title: post?.title ?? "Know your ghee",
    footer: post ? `${post.readingMinutes} minute read from the Farm Dip dairy team` : "From the Farm Dip dairy team",
  });
}
