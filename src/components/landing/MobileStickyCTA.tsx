 import { useState, useEffect } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { ArrowRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 export const MobileStickyCTA = () => {
   const [isVisible, setIsVisible] = useState(false);
 
   useEffect(() => {
     const handleScroll = () => {
       // Show after scrolling past hero section
       setIsVisible(window.scrollY > window.innerHeight * 0.8);
     };
 
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);
 
   return (
     <AnimatePresence>
       {isVisible && (
         <motion.div
           initial={{ y: 100, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           exit={{ y: 100, opacity: 0 }}
           transition={{ duration: 0.3 }}
           className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden"
         >
           <div className="glass-strong rounded-xl p-3 shadow-glow">
             <Button
               size="lg"
               className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all group text-base"
             >
               Get Started Free
               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Button>
           </div>
         </motion.div>
       )}
     </AnimatePresence>
   );
 };