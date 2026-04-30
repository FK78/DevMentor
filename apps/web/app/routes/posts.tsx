import type { Route } from "./+types/posts";
import { apiFetch } from "../lib/api";
import { PostCard, type Post } from "../components/PostCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Posts" },
    { name: "description", content: "Browse public posts" },
  ];
}

export async function clientLoader() {
  return apiFetch("/posts") as Promise<Post[]>;
}

export function HydrateFallback() {
  return <p className="p-6">Loading posts...</p>;
}

export default function Posts({ loaderData }: Route.ComponentProps) {
  const posts = loaderData as Post[];

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Posts</h1>
      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
