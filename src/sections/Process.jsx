import { Compass, Lightbulb, Rocket, Settings, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useStaggerAnimation } from "@/hooks/use-stagger-animation";

const steps = [
  { icon: Compass, title: "Discover", desc: "Deep-dive into your brand, audience, and competitive landscape.", color: "bg-primary text-primary-foreground" },
  { icon: Lightbulb, title: "Strategize", desc: "Craft a tailored roadmap built on data and creative insight.", color: "bg-secondary text-secondary-foreground" },
  { icon: Rocket, title: "Execute", desc: "Launch campaigns across channels with pixel-perfect precision.", color: "bg-accent text-accent-foreground" },
  { icon: Settings, title: "Optimize", desc: "A/B test, iterate, and refine for peak performance.", color: "bg-marketr-blue text-primary-foreground" },
  { icon: TrendingUp, title: "Scale", desc: "Double down on what works and expand your reach.", color: "bg-marketr-green text-primary-foreground" },
];

const Process = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: stepsRef, visibleItems } = useStaggerAnimation(5, 140);
  return (
    <section ref={ref} id="process" className={`py-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Our Process</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">From Idea to <span className="text-gradient">Impact</span></h2>
          <p className="text-muted-foreground">A proven 5-step framework that turns ambitious goals into measurable growth.</p>
        </div>

        {/* Desktop horizontal */}
        <div ref={stepsRef} className="hidden md:flex items-start justify-between relative">
          <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-border" />
          {steps.map((s, i) => (
            <div key={s.title} className={`flex flex-col items-center text-center relative z-10 w-1/5 px-2 transition-all duration-500 ${visibleItems[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${s.color}`}>
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="font-bold mb-1">{s.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden space-y-6">
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                {i < steps.length - 1 && <div className="w-0.5 h-12 bg-border mt-2" />}
              </div>
              <div className="pt-1">
                <h3 className="font-bold mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
