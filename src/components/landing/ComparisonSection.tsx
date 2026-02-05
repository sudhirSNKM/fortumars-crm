import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisonData = [
  { feature: "AI-Powered Lead Scoring", us: true, others: false },
  { feature: "Real-time Analytics Dashboard", us: true, others: true },
  { feature: "Automated Workflow Builder", us: true, others: false },
  { feature: "Custom API Integration", us: true, others: true },
  { feature: "24/7 Priority Support", us: true, others: false },
  { feature: "Mobile-First Design", us: true, others: true },
  { feature: "Unlimited Users", us: true, others: false },
  { feature: "Advanced Security Features", us: true, others: true },
];

const advantages = [
  {
    title: "10x Faster Setup",
    description: "Get started in minutes, not days. Our intuitive onboarding gets you up and running instantly.",
    gradient: "from-primary to-secondary",
  },
  {
    title: "AI-First Approach",
    description: "Every feature is enhanced with machine learning for smarter insights and automation.",
    gradient: "from-secondary to-accent",
  },
  {
    title: "Seamless Integration",
    description: "Connect with 200+ apps and services with our native integrations ecosystem.",
    gradient: "from-accent to-primary",
  },
];

export const ComparisonSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
          >
            The <span className="gradient-text">Smarter</span> Choice
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            See how we stack up against traditional CRM solutions.
          </motion.p>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="glass-strong rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-3 gap-4 p-4 md:p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/30">
              <div className="text-sm font-semibold text-muted-foreground">Feature</div>
              <div className="text-center">
                <span className="text-sm font-bold gradient-text">Fortumars</span>
              </div>
              <div className="text-center text-sm font-semibold text-muted-foreground">Others</div>
            </div>

            {/* Table rows */}
            {comparisonData.map((row, index) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={`grid grid-cols-3 gap-4 p-4 md:p-6 items-center ${index !== comparisonData.length - 1 ? "border-b border-border/20" : ""
                  }`}
              >
                <div className="text-sm md:text-base">{row.feature}</div>
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.05, type: "spring" }}
                    className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-accent" />
                  </motion.div>
                </div>
                <div className="flex justify-center">
                  {row.others ? (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Check className="w-5 h-5 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="w-5 h-5 text-destructive" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Advantages cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="glass rounded-2xl p-6 md:p-8 text-center card-hover"
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${advantage.gradient} flex items-center justify-center`}>
                <Check className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{advantage.title}</h3>
              <p className="text-muted-foreground">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};