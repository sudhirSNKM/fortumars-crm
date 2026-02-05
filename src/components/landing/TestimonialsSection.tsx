import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "VP of Sales",
    company: "TechCorp Inc.",
    avatar: "SJ",
    rating: 5,
    text: "Fortumars transformed our sales process completely. We've seen a 40% increase in conversion rates within the first quarter. The AI-powered insights are game-changing.",
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "StartupXYZ",
    avatar: "MC",
    rating: 5,
    text: "The automation workflows alone saved our team 20 hours per week. It's intuitive, powerful, and the support team is exceptional. Best decision we made this year.",
  },
  {
    name: "Emily Davis",
    role: "Sales Director",
    company: "Enterprise Solutions",
    avatar: "ED",
    rating: 5,
    text: "We evaluated 10 CRM platforms before choosing Fortumars. The dashboard analytics and real-time reporting give us insights we never had before.",
  },
  {
    name: "James Wilson",
    role: "Founder",
    company: "Digital Agency Co.",
    avatar: "JW",
    rating: 5,
    text: "From lead capture to closing deals, every step is streamlined. Our team adopted it within days, not weeks. The ROI was visible almost immediately.",
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(nextTestimonial, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const handleInteraction = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(nextTestimonial, 5000);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
          >
            Testimonials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
          >
            Loved by <span className="gradient-text">Thousands</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Join the growing community of businesses transforming their customer relationships.
          </motion.p>
        </div>

        {/* Testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Quote icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>

            {/* Testimonial card */}
            <div className="glass-strong rounded-2xl p-8 md:p-12 pt-12 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 fill-primary text-primary" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Author */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-primary-foreground">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div>
                      <div className="font-display font-bold text-lg">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-muted-foreground">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  prevTestimonial();
                  handleInteraction();
                }}
                className="glass border-border/50 hover:bg-muted/50"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                      handleInteraction();
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  nextTestimonial();
                  handleInteraction();
                }}
                className="glass border-border/50 hover:bg-muted/50"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};