import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { fetchCaseStudies } from "@/services/caseStudyService";

const CaseStudyCard = ({ item }) => (
  <Link
    to={`/case-studies/${item.slug}`}
    className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
  >
    {item.cover_image_url ? (
      <img
        src={item.cover_image_url}
        alt={item.title}
        className="h-44 w-full object-cover"
      />
    ) : (
      <div className="h-44 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
        {item.metric ? (
          <span className="text-4xl font-extrabold text-gradient">{item.metric}</span>
        ) : (
          <span className="text-5xl">📈</span>
        )}
      </div>
    )}
    <div className="p-5 space-y-2 flex flex-col flex-1">
      {item.industry && (
        <Badge variant="secondary" className="rounded-full text-xs w-fit">
          {item.industry}
        </Badge>
      )}
      <h3 className="font-bold group-hover:text-primary transition-colors">{item.title}</h3>
      {item.client && (
        <p className="text-xs text-muted-foreground">{item.client}</p>
      )}
      {item.summary && (
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{item.summary}</p>
      )}
      {item.metric && item.metric_label && (
        <p className="text-sm font-semibold text-primary mt-auto pt-2">
          {item.metric} {item.metric_label}
        </p>
      )}
    </div>
  </Link>
);

const CaseStudyCardSkeleton = () => (
  <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col">
    <Skeleton className="h-44 w-full rounded-none" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-5 w-20 rounded-full" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);

const CaseStudies = () => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCaseStudies()
      .then(setStudies)
      .catch(() => setError("Failed to load case studies. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Our Work</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Case <span className="text-gradient">Studies</span>
            </h1>
            <p className="text-muted-foreground">
              Real results from real campaigns. Here's what we've achieved for our partners.
            </p>
          </div>

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CaseStudyCardSkeleton key={i} />
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

          {!loading && !error && studies.length === 0 && (
            <div className="text-center py-16 space-y-2">
              <p className="text-2xl font-bold">No case studies yet</p>
              <p className="text-muted-foreground">
                We're documenting our results — check back soon.
              </p>
            </div>
          )}

          {!loading && !error && studies.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {studies.map((item) => (
                <CaseStudyCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
