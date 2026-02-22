import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useStaggerAnimation } from "@/hooks/use-stagger-animation";

const PREVIEW_POSTS = blogPosts.slice(0, 3);

const BlogPreview = () => {
  const { ref: headRef, isVisible: headVisible } = useScrollAnimation();
  const { ref: postsRef, visibleItems } = useStaggerAnimation(PREVIEW_POSTS.length, 130);

  return (
    <section id="blog" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div
          ref={headRef}
          className={`text-center mb-14 transition-all duration-700 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/10">
            From the Blog
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Marketing insights, no{" "}
            <span className="text-gradient">fluff</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Practical strategy and honest takes from our team, published regularly.
          </p>
        </div>

        {/* Cards */}
        <div ref={postsRef} className="grid md:grid-cols-3 gap-6 mb-10">
          {PREVIEW_POSTS.map((post, i) => (
            <article
              key={post.slug}
              className={`group bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg overflow-hidden transition-all duration-500 ${
                visibleItems[i]
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-6 scale-95"
              }`}
            >
              <div className="h-1.5 bg-gradient-to-r from-primary to-secondary" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-card-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-5">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className="text-center">
          <Button asChild variant="outline" className="rounded-full px-8">
            <Link to="/blog">View all posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
