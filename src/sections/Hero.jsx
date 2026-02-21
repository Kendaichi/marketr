import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const FloatingNode = ({ className, color }) => (
  <div className={`absolute rounded-full opacity-60 blur-sm ${className}`} style={{ background: color }} />
);

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className={`relative min-h-screen flex items-center overflow-hidden gradient-hero pt-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "6s" }} />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            🚀 Growth-First Marketing
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Fuel Your Brand's{" "}
            <span className="text-gradient">Growth</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            We craft data-driven marketing strategies that transform startups into standout brands. Creative storytelling meets measurable results.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full gap-2 text-base" onClick={() => scrollTo("#contact")}>
              Book a Free Consultation <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full gap-2 text-base" onClick={() => scrollTo("#portfolio")}>
              <Play className="h-4 w-4" /> View Our Work
            </Button>
          </div>
          <div className="flex items-center gap-8 pt-4">
            <div>
              <p className="text-2xl font-extrabold text-gradient">150+</p>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-2xl font-extrabold text-gradient">3x</p>
              <p className="text-sm text-muted-foreground">Avg. ROI Increase</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-2xl font-extrabold text-gradient">98%</p>
              <p className="text-sm text-muted-foreground">Client Retention</p>
            </div>
          </div>
        </div>

        {/* Right decorative */}
        <div className="relative hidden lg:flex items-center justify-center min-h-[400px]">
          <FloatingNode className="w-24 h-24 top-10 left-10 animate-float" color="hsl(330 85% 55% / 0.4)" />
          <FloatingNode className="w-16 h-16 top-32 right-16 animate-float-slow" color="hsl(270 60% 60% / 0.4)" />
          <FloatingNode className="w-20 h-20 bottom-20 left-20 animate-float" color="hsl(45 90% 55% / 0.4)" />
          <FloatingNode className="w-12 h-12 bottom-32 right-24 animate-float-slow" color="hsl(210 80% 55% / 0.4)" />
          <FloatingNode className="w-32 h-32 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float" color="hsl(330 85% 55% / 0.25)" />
          {/* Connecting lines SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
            <line x1="80" y1="60" x2="200" y2="200" stroke="hsl(330 85% 55% / 0.2)" strokeWidth="2" />
            <line x1="320" y1="120" x2="200" y2="200" stroke="hsl(270 60% 60% / 0.2)" strokeWidth="2" />
            <line x1="120" y1="300" x2="200" y2="200" stroke="hsl(45 90% 55% / 0.2)" strokeWidth="2" />
            <line x1="300" y1="280" x2="200" y2="200" stroke="hsl(210 80% 55% / 0.2)" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
