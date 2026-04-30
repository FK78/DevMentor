export type Post = {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at?: string;
};

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <span className="text-sm text-gray-500">{post.category}</span>
      </div>
      <p className="mt-3 text-gray-700">{post.content}</p>
    </article>
  );
}
