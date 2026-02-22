import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useEffect } from "react";

const renderContent = (content) => {
  const lines = content.trim().split("\n");
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="font-bold text-foreground mb-2">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-1.5 text-muted-foreground mb-4 ml-2">
          {items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
      continue;
    } else if (/^\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={i} className="list-decimal list-inside space-y-1.5 text-muted-foreground mb-4 ml-2">
          {items.map((item, j) => {
            const parts = item.split(/\*\*(.*?)\*\*/g);
            return (
              <li key={j}>
                {parts.map((p, k) =>
                  k % 2 === 1 ? <strong key={k} className="text-foreground font-semibold">{p}</strong> : p
                )}
              </li>
            );
          })}
        </ol>
      );
      continue;
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      elements.push(
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          {parts.map((p, k) =>
            k % 2 === 1 ? (
              <strong key={k} className="text-foreground font-semibold">
                {p}
              </strong>
            ) : (
              p
            )
          )}
        </p>
      );
    }
    i++;
  }

  return elements;
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);
  const { ref, isVisible } = useScrollAnimation(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <main className="pt-24 pb-20">
        <div
          ref={ref}
          className={`container mx-auto px-4 max-w-3xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            All posts
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${post.categoryColor}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 pb-8 mb-10 border-b border-border">
            <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold">
              {post.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.authorRole}</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose-custom">{renderContent(post.content)}</div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-card border border-border p-8 text-center shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Ready to put this into practice?
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Book a free strategy call and we'll map out exactly how these ideas apply to your brand.
            </p>
            <Button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="rounded-full px-8"
            >
              Book a Free Call
            </Button>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="text-lg font-bold text-foreground mb-6">More from the blog</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all"
                  >
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${p.categoryColor}`}>
                      {p.category}
                    </span>
                    <h4 className="mt-3 font-bold text-sm text-card-foreground group-hover:text-primary transition-colors leading-snug">
                      {p.title}
                    </h4>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
