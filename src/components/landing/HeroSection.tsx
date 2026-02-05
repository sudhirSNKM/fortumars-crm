import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!floatingCardRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!floatingCardRef.current || window.innerWidth < 768) return;

      const rect = floatingCardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateX = (e.clientY - centerY) / 50;
      const rotateY = -(e.clientX - centerX) / 50;

      gsap.to(floatingCardRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 md:w-[600px] md:h-[600px] bg-primary/30 rounded-full blur-3xl opacity-50 animate-float-slow" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 md:w-[500px] md:h-[500px] bg-secondary/30 rounded-full blur-3xl opacity-40 animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[400px] md:h-[400px] bg-accent/20 rounded-full blur-3xl opacity-30 animate-float-fast" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary">
                <Sparkles className="w-4 h-4" />
                AI-Powered CRM Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-6"
            >
              Transform Your{" "}
              <span className="gradient-text text-glow">Customer</span>{" "}
              Relationships
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              The next-generation CRM that combines intelligent automation,
              predictive analytics, and seamless collaboration to accelerate
              your business growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all glow group text-base px-8 py-6"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass border-border/50 hover:bg-muted/50 group text-base px-8 py-6"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/30"
            >
              {[
                { value: "50K+", label: "Active Users" },
                { value: "98%", label: "Satisfaction" },
                { value: "3x", label: "Faster Growth" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-display font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right side - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <div
              ref={floatingCardRef}
              className="relative perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Main dashboard card */}
              <div className="glass-strong rounded-2xl p-6 glow">
                {/* Dashboard header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Dashboard Overview
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: TrendingUp, value: "$124K", label: "Revenue", color: "text-accent" },
                    { icon: Zap, value: "2,847", label: "Leads", color: "text-primary" },
                    { icon: Sparkles, value: "94%", label: "Conversion", color: "text-secondary" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="glass rounded-xl p-4 text-center"
                    >
                      <item.icon className={`w-5 h-5 mx-auto mb-2 ${item.color}`} />
                      <div className="text-lg font-bold">{item.value}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div className="glass rounded-xl p-4 h-48">
                  <div className="flex items-end justify-between h-full gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                      (height, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{
                            duration: 0.8,
                            delay: 0.5 + index * 0.1,
                          }}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-secondary opacity-80"
                        />
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Floating notification card */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -top-4 -right-4 glass rounded-xl p-4 glow-sm animate-float-fast"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">New Deal Won!</div>
                    <div className="text-xs text-muted-foreground">
                      +$15,000 revenue
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating AI assistant card */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-4 -left-4 glass rounded-xl p-4 glow-sm animate-float-slow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">AI Insight</div>
                    <div className="text-xs text-muted-foreground">
                      3 hot leads detected
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ height: ["20%", "50%", "20%"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};