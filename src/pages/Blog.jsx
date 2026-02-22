import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useStaggerAnimation } from "@/hooks/use-stagger-animation";

const Blog = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0);
  const { ref: postsRef, visibleItems } = useStaggerAnimation(blogPosts.length, 120, 0.05);

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="container mx-auto px-4 mb-16">
          <div
            ref={heroRef}
            className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
              The marketr Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              Marketing insights that{" "}
              <span className="text-gradient">actually move the needle</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Practical strategy, honest takes, and real results from our team.
              No fluff, no buzzwords.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="container mx-auto px-4">
          <div
            ref={postsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {blogPosts.map((post, i) => (
              <article
                key={post.slug}
                className={`group bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden ${
                  visibleItems[i]
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-6 scale-95"
                }`}
              >
                {/* Category stripe */}
                <div className="h-1.5 bg-gradient-to-r from-primary to-secondary" />

                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${post.categoryColor}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-card-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs">
                        {post.author.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-xs">{post.author}</p>
                        <p>{post.date}</p>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                    >
                      Read <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
