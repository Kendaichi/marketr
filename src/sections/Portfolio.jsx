import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useStaggerAnimation } from "@/hooks/use-stagger-animation";

const mockData = [
  { id: "1", title: "E-Commerce Brand Relaunch", industry: "Retail", metric: "+320%", metricLabel: "Engagement" },
  { id: "2", title: "SaaS Growth Campaign", industry: "Technology", metric: "+180%", metricLabel: "Sign-ups" },
  { id: "3", title: "Restaurant Social Strategy", industry: "Food & Beverage", metric: "+250%", metricLabel: "Foot Traffic" },
  { id: "4", title: "Fintech Launch Campaign", industry: "Finance", metric: "4.2x", metricLabel: "ROAS" },
];

const PortfolioCard = ({ item }) => (
  <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="h-44 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
      <span className="text-4xl font-extrabold text-gradient">{item.metric}</span>
    </div>
    <div className="p-5 space-y-2">
      <Badge variant="secondary" className="rounded-full text-xs">{item.industry}</Badge>
      <h3 className="font-bold">{item.title}</h3>
      <p className="text-sm text-muted-foreground">{item.metric} {item.metricLabel}</p>
    </div>
  </div>
);

const Portfolio = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: gridRef, visibleItems } = useStaggerAnimation(4, 120);
  return (
    <section ref={ref} id="portfolio" className={`py-24 gradient-bg transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Our Work</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Case <span className="text-gradient">Studies</span></h2>
          <p className="text-muted-foreground">Real results from real campaigns. Here's what we've achieved for our partners.</p>
        </div>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockData.map((item, i) => (
            <div key={item.id} className={`transition-all duration-500 ${visibleItems[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <PortfolioCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
