import { CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useStaggerAnimation } from "@/hooks/use-stagger-animation";

const points = [
  "Data-driven strategy that eliminates guesswork",
  "Creative storytelling that builds emotional connection",
  "Transparent reporting you can trust",
  "ROI-focused campaigns with measurable impact",
];

const About = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: metricsRef, visibleItems } = useStaggerAnimation(4, 150);
  return (
    <section ref={ref} id="about" className={`py-24 gradient-bg transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Marketing That <span className="text-gradient">Actually Works</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We're not just another agency. We're a team of strategists, creatives, and data nerds obsessed with growing your brand. Every campaign is built on insights, powered by creativity, and measured by results.
          </p>
          <ul className="space-y-4">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm font-medium">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative right side */}
        <div className="relative flex items-center justify-center min-h-[300px]">
          <div className="absolute w-64 h-64 bg-primary/10 rounded-full blur-2xl animate-blob" />
          <div className="absolute w-48 h-48 bg-secondary/10 rounded-full blur-2xl animate-blob" style={{ animationDelay: "4s" }} />
          <div className="relative bg-card rounded-2xl border border-border p-8 shadow-lg space-y-5 max-w-sm w-full">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Weekly Performance Report</p>
              <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Feb 10–16</span>
            </div>

            <div ref={metricsRef} className="grid grid-cols-2 gap-3">
              {[
                { bg: "bg-primary/10", label: "Leads", value: "142", change: "+18% vs last week", changeColor: "text-primary" },
                { bg: "bg-secondary/10", label: "Reach", value: "48.2K", change: "+24% vs last week", changeColor: "text-secondary" },
                { bg: "bg-accent/10", label: "Engagement", value: "6.8%", change: "+0.9pp vs last week", changeColor: "text-accent" },
                { bg: "bg-marketr-blue/10", label: "Cost / Result", value: "$3.12", change: "-11% vs last week", changeColor: "text-marketr-blue" },
              ].map((m, i) => (
                <div key={m.label} className={`${m.bg} rounded-xl p-3 space-y-1 transition-all duration-500 ${visibleItems[i] ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</p>
                  <p className="text-lg font-bold">{m.value}</p>
                  <p className={`text-[10px] ${m.changeColor} font-medium`}>{m.change}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Ad Spend Budget Used</span>
                <span>72%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[72%] bg-primary rounded-full" />
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground text-center pt-1 italic">
              Clients receive a clear weekly performance report
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
