import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchBlogPosts } from "@/services/blogService";

const BlogCard = ({ post }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
  >
    {post.cover_image_url ? (
      <img
        src={post.cover_image_url}
        alt={post.title}
        className="h-44 w-full object-cover"
      />
    ) : (
      <div className="h-44 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
        <span className="text-5xl">✍️</span>
      </div>
    )}
    <div className="p-5 space-y-2 flex flex-col flex-1">
      {post.published_at && (
        <p className="text-xs text-muted-foreground">
          {new Date(post.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <h3 className="font-bold group-hover:text-primary transition-colors">{post.title}</h3>
      {post.excerpt && (
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{post.excerpt}</p>
      )}
      <span className="text-sm font-medium text-primary mt-auto pt-2">Read more →</span>
    </div>
  </Link>
);

const BlogCardSkeleton = () => (
  <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col">
    <Skeleton className="h-44 w-full rounded-none" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogPosts()
      .then(setPosts)
      .catch(() => setError("Failed to load blog posts. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Insights</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Our <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-muted-foreground">
              Marketing strategies, growth tips, and industry insights from the marketr team.
            </p>
          </div>

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-16 space-y-4">
              <p className="text-muted-foreground">{error}</p>
              <Link
                to="/"
                className="inline-block text-sm font-medium text-primary hover:underline"
              >
                ← Back to home
              </Link>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-16 space-y-2">
              <p className="text-2xl font-bold">No posts yet</p>
              <p className="text-muted-foreground">
                Check back soon — we're working on some great content.
              </p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
