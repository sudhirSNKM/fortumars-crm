 import { useEffect, useRef } from "react";
 import { motion, useInView } from "framer-motion";
 import { 
   Users, 
   GitBranch, 
   BarChart3, 
   Zap, 
   Brain,
   ArrowRight
 } from "lucide-react";
 import gsap from "gsap";
 import { ScrollTrigger } from "gsap/ScrollTrigger";
 
 gsap.registerPlugin(ScrollTrigger);
 
 const features = [
   {
     icon: Users,
     title: "Lead Management",
     description: "Capture, nurture, and convert leads with intelligent scoring and automated follow-ups.",
     gradient: "from-primary to-secondary",
   },
   {
     icon: GitBranch,
     title: "Sales Pipeline",
     description: "Visualize your entire sales process with customizable stages and real-time tracking.",
     gradient: "from-secondary to-accent",
   },
   {
     icon: BarChart3,
     title: "Customer Insights",
     description: "Deep analytics and reporting to understand customer behavior and trends.",
     gradient: "from-accent to-primary",
   },
   {
     icon: Zap,
     title: "Automation Workflows",
     description: "Automate repetitive tasks and create powerful workflows without coding.",
     gradient: "from-primary to-accent",
   },
   {
     icon: Brain,
     title: "AI Recommendations",
     description: "Smart suggestions powered by machine learning to close deals faster.",
     gradient: "from-secondary to-primary",
   },
 ];
 
 const FeatureCard = ({ 
   feature, 
   index 
 }: { 
   feature: typeof features[0]; 
   index: number;
 }) => {
   const cardRef = useRef<HTMLDivElement>(null);
   const isInView = useInView(cardRef, { once: true, margin: "-100px" });
 
   useEffect(() => {
     if (!cardRef.current) return;
 
     const handleMouseMove = (e: MouseEvent) => {
       if (window.innerWidth < 768) return;
       
       const rect = cardRef.current!.getBoundingClientRect();
       const x = e.clientX - rect.left;
       const y = e.clientY - rect.top;
       
       cardRef.current!.style.setProperty("--mouse-x", `${x}px`);
       cardRef.current!.style.setProperty("--mouse-y", `${y}px`);
     };
 
     cardRef.current.addEventListener("mousemove", handleMouseMove);
     return () => cardRef.current?.removeEventListener("mousemove", handleMouseMove);
   }, []);
 
   return (
     <motion.div
       ref={cardRef}
       initial={{ opacity: 0, y: 50 }}
       animate={isInView ? { opacity: 1, y: 0 } : {}}
       transition={{ 
         duration: 0.6, 
         delay: index * 0.1,
         ease: [0.25, 0.46, 0.45, 0.94]
       }}
       className="group relative glass rounded-2xl p-6 md:p-8 card-hover overflow-hidden"
       style={{
         background: `radial-gradient(
           600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
           hsl(var(--primary) / 0.1),
           transparent 40%
         )`,
       }}
     >
       {/* Animated border */}
       <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
         <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-sm" />
       </div>
 
       <div className="relative z-10">
         {/* Icon */}
         <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
           <feature.icon className="w-full h-full text-primary-foreground" />
         </div>
 
         {/* Content */}
         <h3 className="text-xl font-display font-bold mb-3 group-hover:gradient-text transition-all duration-300">
           {feature.title}
         </h3>
         <p className="text-muted-foreground leading-relaxed mb-4">
           {feature.description}
         </p>
 
         {/* Learn more link */}
         <a 
           href="#" 
           className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all"
         >
           Learn more
           <ArrowRight className="w-4 h-4" />
         </a>
       </div>
     </motion.div>
   );
 };
 
 export const FeaturesSection = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const titleRef = useRef<HTMLDivElement>(null);
   const isInView = useInView(titleRef, { once: true, margin: "-100px" });
 
   return (
     <section
       id="features"
       ref={sectionRef}
       className="relative py-24 md:py-32 overflow-hidden"
     >
       {/* Background effects */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
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
             Powerful Features
           </motion.span>
           
           <motion.h2
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
           >
             Everything You Need to{" "}
             <span className="gradient-text">Scale</span>
           </motion.h2>
           
           <motion.p
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-lg text-muted-foreground max-w-2xl mx-auto"
           >
             A comprehensive suite of tools designed to streamline your sales process
             and maximize customer relationships.
           </motion.p>
         </div>
 
         {/* Features grid */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
           {features.map((feature, index) => (
             <FeatureCard key={feature.title} feature={feature} index={index} />
           ))}
         </div>
       </div>
     </section>
   );
 };