 import { useRef, useEffect, useState } from "react";
 import { motion, useInView, useScroll, useTransform } from "framer-motion";
 import { 
   UserPlus, 
   MessageSquare, 
   CalendarCheck, 
   FileCheck, 
   Trophy,
   ArrowRight
 } from "lucide-react";
 import gsap from "gsap";
 import { ScrollTrigger } from "gsap/ScrollTrigger";
 
 gsap.registerPlugin(ScrollTrigger);
 
 const steps = [
   {
     icon: UserPlus,
     title: "Lead Capture",
     description: "Automatically capture leads from multiple channels including web forms, social media, and email.",
     color: "from-primary to-primary/50",
   },
   {
     icon: MessageSquare,
     title: "Engagement",
     description: "Nurture leads with personalized email sequences and automated follow-ups.",
     color: "from-secondary to-secondary/50",
   },
   {
     icon: CalendarCheck,
     title: "Qualification",
     description: "AI-powered lead scoring helps you focus on the most promising opportunities.",
     color: "from-accent to-accent/50",
   },
   {
     icon: FileCheck,
     title: "Proposal",
     description: "Generate professional proposals and track engagement in real-time.",
     color: "from-primary to-secondary",
   },
   {
     icon: Trophy,
     title: "Conversion",
     description: "Close deals faster with streamlined workflows and instant notifications.",
     color: "from-secondary to-accent",
   },
 ];
 
 export const WorkflowSection = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const horizontalRef = useRef<HTMLDivElement>(null);
   const titleRef = useRef<HTMLDivElement>(null);
   const isInView = useInView(titleRef, { once: true, margin: "-100px" });
   const [isMobile, setIsMobile] = useState(false);
 
   useEffect(() => {
     const checkMobile = () => setIsMobile(window.innerWidth < 768);
     checkMobile();
     window.addEventListener("resize", checkMobile);
     return () => window.removeEventListener("resize", checkMobile);
   }, []);
 
   useEffect(() => {
     if (isMobile || !horizontalRef.current || !sectionRef.current) return;
 
     const scrollWidth = horizontalRef.current.scrollWidth - window.innerWidth;
 
     const tl = gsap.timeline({
       scrollTrigger: {
         trigger: sectionRef.current,
         start: "top top",
         end: () => `+=${scrollWidth}`,
         pin: true,
         scrub: 1,
         anticipatePin: 1,
       },
     });
 
     tl.to(horizontalRef.current, {
       x: -scrollWidth,
       ease: "none",
     });
 
     return () => {
       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
     };
   }, [isMobile]);
 
   return (
     <section
       id="workflow"
       ref={sectionRef}
       className="relative py-24 md:py-0 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background"
     >
       {/* Section header - always visible */}
       <div ref={titleRef} className="container mx-auto px-4 md:px-6 py-12 md:py-24">
         <div className="text-center mb-12">
           <motion.span
             initial={{ opacity: 0, y: 20 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.5 }}
             className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
           >
             Sales Journey
           </motion.span>
           
           <motion.h2
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
           >
             From Lead to <span className="gradient-text">Customer</span>
           </motion.h2>
           
           <motion.p
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-lg text-muted-foreground max-w-2xl mx-auto"
           >
             Our streamlined workflow guides you through every step of the customer journey.
           </motion.p>
         </div>
 
         {/* Desktop: Horizontal scroll */}
         {!isMobile && (
           <div ref={horizontalRef} className="hidden md:flex gap-8 pl-8">
             {steps.map((step, index) => (
               <motion.div
                 key={step.title}
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: index * 0.1 }}
                 viewport={{ once: true }}
                 className="relative flex-shrink-0 w-[400px]"
               >
                 {/* Connector line */}
                 {index < steps.length - 1 && (
                   <div className="absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-border to-transparent" />
                 )}
 
                 <div className="glass rounded-2xl p-8 h-full card-hover">
                   {/* Step number */}
                   <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground">
                     {index + 1}
                   </div>
 
                   {/* Icon */}
                   <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 mb-6`}>
                     <step.icon className="w-full h-full text-primary-foreground" />
                   </div>
 
                   {/* Content */}
                   <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
                   <p className="text-muted-foreground leading-relaxed">{step.description}</p>
 
                   {/* Arrow indicator */}
                   {index < steps.length - 1 && (
                     <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
                       <ArrowRight className="w-8 h-8 text-primary/50" />
                     </div>
                   )}
                 </div>
               </motion.div>
             ))}
           </div>
         )}
 
         {/* Mobile: Vertical timeline */}
         {isMobile && (
           <div className="md:hidden relative">
             {/* Timeline line */}
             <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
 
             <div className="space-y-8">
               {steps.map((step, index) => (
                 <motion.div
                   key={step.title}
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: index * 0.1 }}
                   viewport={{ once: true, margin: "-50px" }}
                   className="relative pl-20"
                 >
                   {/* Timeline dot */}
                   <div className="absolute left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground z-10">
                     {index + 1}
                   </div>
 
                   <div className="glass rounded-xl p-6">
                     {/* Icon */}
                     <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} p-3 mb-4`}>
                       <step.icon className="w-full h-full text-primary-foreground" />
                     </div>
 
                     <h3 className="text-lg font-display font-bold mb-2">{step.title}</h3>
                     <p className="text-sm text-muted-foreground">{step.description}</p>
                   </div>
                 </motion.div>
               ))}
             </div>
           </div>
         )}
       </div>
     </section>
   );
 };