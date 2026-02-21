import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchBlogPostBySlug } from "@/services/blogService";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogPostBySlug(slug)
      .then(setPost)
      .catch(() => setError("Post not found or unavailable."))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            ← Back to Blog
          </Link>

          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-64 w-full rounded-2xl" />
              <div className="space-y-3 pt-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className={`h-4 ${i % 3 === 2 ? "w-2/3" : "w-full"}`} />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-16 space-y-4">
              <p className="text-muted-foreground">{error}</p>
              <Link
                to="/blog"
                className="inline-block text-sm font-medium text-primary hover:underline"
              >
                ← Back to Blog
              </Link>
            </div>
          )}

          {!loading && !error && post && (
            <>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">{post.title}</h1>
              {post.published_at && (
                <p className="text-sm text-muted-foreground mb-6">
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
              {post.cover_image_url && (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-72 object-cover rounded-2xl mb-8"
                />
              )}
              <article className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown>{post.content || ""}</ReactMarkdown>
              </article>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
