import { Megaphone, Palette, Target, Search, PenTool, BarChart3 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useStaggerAnimation } from "@/hooks/use-stagger-animation";

const services = [
  { icon: Megaphone, title: "Social Media Marketing", desc: "Engage your audience across every platform with content that converts.", color: "bg-primary/10 text-primary" },
  { icon: Palette, title: "Branding & Design", desc: "Build a visual identity that captures your brand's unique personality.", color: "bg-secondary/10 text-secondary" },
  { icon: Target, title: "Paid Ads", desc: "Targeted campaigns on Google, Meta, and TikTok that maximize ROAS.", color: "bg-accent/10 text-accent-foreground" },
  { icon: Search, title: "SEO", desc: "Rank higher, drive organic traffic, and own your search presence.", color: "bg-marketr-blue/10 text-marketr-blue" },
  { icon: PenTool, title: "Content Creation", desc: "Scroll-stopping visuals, copy, and video that tell your story.", color: "bg-marketr-green/10 text-marketr-green" },
  { icon: BarChart3, title: "Analytics & Strategy", desc: "Data-backed insights that inform every move and prove every result.", color: "bg-primary/10 text-primary" },
];

const Services = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: gridRef, visibleItems } = useStaggerAnimation(6, 100);
  return (
    <section ref={ref} id="services" className={`py-24 relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">What We Do</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Services That <span className="text-gradient">Drive Results</span></h2>
          <p className="text-muted-foreground">Full-stack marketing solutions tailored for ambitious brands ready to scale.</p>
        </div>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={s.title} className={`group bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${visibleItems[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${s.color}`}>
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
