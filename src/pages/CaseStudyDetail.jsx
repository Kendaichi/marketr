import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { fetchCaseStudyBySlug } from "@/services/caseStudyService";

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCaseStudyBySlug(slug)
      .then(setStudy)
      .catch(() => setError("Case study not found or unavailable."))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            ← Back to Case Studies
          </Link>

          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <Skeleton className="h-32 w-full rounded-2xl" />
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
                to="/case-studies"
                className="inline-block text-sm font-medium text-primary hover:underline"
              >
                ← Back to Case Studies
              </Link>
            </div>
          )}

          {!loading && !error && study && (
            <>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">{study.title}</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {study.client && (
                  <Badge variant="outline" className="rounded-full">{study.client}</Badge>
                )}
                {study.industry && (
                  <Badge variant="secondary" className="rounded-full">{study.industry}</Badge>
                )}
              </div>

              {study.metric && study.metric_label && (
                <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 text-center mb-8">
                  <p className="text-5xl font-extrabold text-gradient mb-2">{study.metric}</p>
                  <p className="text-muted-foreground font-medium">{study.metric_label}</p>
                </div>
              )}

              {study.cover_image_url && (
                <img
                  src={study.cover_image_url}
                  alt={study.title}
                  className="w-full h-72 object-cover rounded-2xl mb-8"
                />
              )}

              {study.summary && (
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{study.summary}</p>
              )}

              {study.content && (
                <article className="prose prose-neutral dark:prose-invert max-w-none">
                  <ReactMarkdown>{study.content}</ReactMarkdown>
                </article>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
