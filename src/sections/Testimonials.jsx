import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useStaggerAnimation } from "@/hooks/use-stagger-animation";

const testimonials = [
  {
    quote: "marketr transformed our social presence. We went from 500 to 15K followers in three months — and the leads followed.",
    name: "Sarah Chen",
    company: "NovaTech",
    avatar: "SC",
  },
  {
    quote: "Their data-driven approach made all the difference. Every dollar spent was tracked, optimized, and justified. Truly partners, not vendors.",
    name: "Marcus Johnson",
    company: "GreenLeaf Co.",
    avatar: "MJ",
  },
  {
    quote: "The rebrand was exactly what we needed. Fresh, modern, and unmistakably us. Our customers loved it from day one.",
    name: "Priya Patel",
    company: "Bloom Studio",
    avatar: "PP",
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: gridRef, visibleItems } = useStaggerAnimation(3, 150);
  return (
    <section ref={ref} id="testimonials" className={`py-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Loved by <span className="text-gradient">Brands</span></h2>
        </div>
        <div ref={gridRef} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col ${visibleItems[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground flex-1 mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
