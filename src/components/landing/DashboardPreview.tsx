 import { useState, useRef, useEffect } from "react";
 import { motion, useInView, AnimatePresence } from "framer-motion";
 import { 
   BarChart3, 
   PieChart, 
   TrendingUp, 
   Users, 
   DollarSign,
   Calendar,
   ChevronLeft,
   ChevronRight
 } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const tabs = [
   { id: "overview", label: "Overview", icon: BarChart3 },
   { id: "analytics", label: "Analytics", icon: PieChart },
   { id: "leads", label: "Leads", icon: Users },
   { id: "revenue", label: "Revenue", icon: DollarSign },
 ];
 
 const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
   const [count, setCount] = useState(0);
   const ref = useRef<HTMLSpanElement>(null);
   const isInView = useInView(ref, { once: true });
 
   useEffect(() => {
     if (!isInView) return;
     
     let startTime: number;
     const animate = (timestamp: number) => {
       if (!startTime) startTime = timestamp;
       const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
       setCount(Math.floor(progress * end));
       
       if (progress < 1) {
         requestAnimationFrame(animate);
       }
     };
     
     requestAnimationFrame(animate);
   }, [isInView, end, duration]);
 
   return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
 };
 
 const OverviewTab = () => (
   <div className="space-y-6">
     {/* Stats grid */}
     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
       {[
         { label: "Total Revenue", value: 284500, prefix: "$", icon: DollarSign, change: "+12.5%" },
         { label: "Active Leads", value: 1847, icon: Users, change: "+8.2%" },
         { label: "Conversion Rate", value: 68, suffix: "%", icon: TrendingUp, change: "+5.1%" },
         { label: "Deals Closed", value: 156, icon: Calendar, change: "+22.4%" },
       ].map((stat, index) => (
         <motion.div
           key={stat.label}
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: index * 0.1 }}
           className="glass rounded-xl p-4"
         >
           <div className="flex items-center justify-between mb-2">
             <stat.icon className="w-5 h-5 text-primary" />
             <span className="text-xs text-accent font-medium">{stat.change}</span>
           </div>
           <div className="text-2xl font-bold">
             {stat.prefix}
             <AnimatedCounter end={stat.value} suffix={stat.suffix} />
           </div>
           <div className="text-xs text-muted-foreground">{stat.label}</div>
         </motion.div>
       ))}
     </div>
 
     {/* Chart */}
     <div className="glass rounded-xl p-6">
       <div className="flex items-center justify-between mb-6">
         <h4 className="font-semibold">Revenue Overview</h4>
         <div className="flex gap-2">
           <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">Monthly</span>
         </div>
       </div>
       <div className="h-48 flex items-end gap-2">
         {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
           <motion.div
             key={i}
             initial={{ height: 0 }}
             animate={{ height: `${height}%` }}
             transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
             className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-secondary relative group"
           >
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity glass px-2 py-1 rounded text-xs whitespace-nowrap">
               ${Math.floor(height * 100)}K
             </div>
           </motion.div>
         ))}
       </div>
       <div className="flex justify-between mt-4 text-xs text-muted-foreground">
         {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
           <span key={month}>{month}</span>
         ))}
       </div>
     </div>
   </div>
 );
 
 const AnalyticsTab = () => (
   <div className="grid md:grid-cols-2 gap-6">
     {/* Pie chart simulation */}
     <div className="glass rounded-xl p-6">
       <h4 className="font-semibold mb-6">Lead Sources</h4>
       <div className="flex items-center justify-center">
         <div className="relative w-48 h-48">
           <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
             {[
               { percent: 35, color: "var(--primary)", offset: 0 },
               { percent: 25, color: "var(--secondary)", offset: 35 },
               { percent: 20, color: "var(--accent)", offset: 60 },
               { percent: 20, color: "var(--muted)", offset: 80 },
             ].map((slice, i) => (
               <motion.circle
                 key={i}
                 cx="50"
                 cy="50"
                 r="40"
                 fill="transparent"
                 stroke={`hsl(${slice.color})`}
                 strokeWidth="20"
                 strokeDasharray={`${slice.percent * 2.51} 251`}
                 strokeDashoffset={-slice.offset * 2.51}
                 initial={{ strokeDasharray: "0 251" }}
                 animate={{ strokeDasharray: `${slice.percent * 2.51} 251` }}
                 transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
               />
             ))}
           </svg>
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-center">
               <div className="text-2xl font-bold">4,521</div>
               <div className="text-xs text-muted-foreground">Total Leads</div>
             </div>
           </div>
         </div>
       </div>
       <div className="grid grid-cols-2 gap-2 mt-6">
         {[
           { label: "Organic", percent: 35, color: "bg-primary" },
           { label: "Referral", percent: 25, color: "bg-secondary" },
           { label: "Social", percent: 20, color: "bg-accent" },
           { label: "Direct", percent: 20, color: "bg-muted" },
         ].map((item) => (
           <div key={item.label} className="flex items-center gap-2 text-sm">
             <div className={`w-3 h-3 rounded-full ${item.color}`} />
             <span className="text-muted-foreground">{item.label}</span>
             <span className="ml-auto font-medium">{item.percent}%</span>
           </div>
         ))}
       </div>
     </div>
 
     {/* Activity feed */}
     <div className="glass rounded-xl p-6">
       <h4 className="font-semibold mb-6">Recent Activity</h4>
       <div className="space-y-4">
         {[
           { action: "New lead captured", time: "2 min ago", icon: Users },
           { action: "Deal closed - $12,500", time: "15 min ago", icon: DollarSign },
           { action: "Follow-up scheduled", time: "1 hour ago", icon: Calendar },
           { action: "Pipeline updated", time: "2 hours ago", icon: TrendingUp },
         ].map((item, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.5 + i * 0.1 }}
             className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
           >
             <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
               <item.icon className="w-5 h-5 text-primary" />
             </div>
             <div className="flex-1">
               <div className="text-sm font-medium">{item.action}</div>
               <div className="text-xs text-muted-foreground">{item.time}</div>
             </div>
           </motion.div>
         ))}
       </div>
     </div>
   </div>
 );
 
 const LeadsTab = () => (
   <div className="glass rounded-xl overflow-hidden">
     <div className="overflow-x-auto">
       <table className="w-full">
         <thead>
           <tr className="border-b border-border/50">
             <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
             <th className="text-left p-4 text-sm font-medium text-muted-foreground">Company</th>
             <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
             <th className="text-left p-4 text-sm font-medium text-muted-foreground">Value</th>
           </tr>
         </thead>
         <tbody>
           {[
             { name: "Sarah Johnson", company: "TechCorp", status: "Hot", value: "$45,000" },
             { name: "Michael Chen", company: "StartupXYZ", status: "Warm", value: "$28,000" },
             { name: "Emily Davis", company: "Enterprise Inc", status: "Hot", value: "$120,000" },
             { name: "James Wilson", company: "Digital Agency", status: "Cold", value: "$15,000" },
           ].map((lead, i) => (
             <motion.tr
               key={i}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.3 + i * 0.1 }}
               className="border-b border-border/30 hover:bg-muted/30 transition-colors"
             >
               <td className="p-4">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-primary-foreground">
                     {lead.name.split(' ').map(n => n[0]).join('')}
                   </div>
                   <span className="font-medium">{lead.name}</span>
                 </div>
               </td>
               <td className="p-4 text-muted-foreground">{lead.company}</td>
               <td className="p-4">
                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                   lead.status === "Hot" ? "bg-destructive/20 text-destructive" :
                   lead.status === "Warm" ? "bg-primary/20 text-primary" :
                   "bg-muted text-muted-foreground"
                 }`}>
                   {lead.status}
                 </span>
               </td>
               <td className="p-4 font-semibold">{lead.value}</td>
             </motion.tr>
           ))}
         </tbody>
       </table>
     </div>
   </div>
 );
 
 const RevenueTab = () => (
   <div className="space-y-6">
     <div className="grid md:grid-cols-3 gap-4">
       {[
         { label: "Monthly Recurring", value: "$84,500", change: "+15%" },
         { label: "Annual Contract", value: "$1.2M", change: "+22%" },
         { label: "Lifetime Value", value: "$45,200", change: "+8%" },
       ].map((item, i) => (
         <motion.div
           key={item.label}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 + i * 0.1 }}
           className="glass rounded-xl p-6 text-center"
         >
           <div className="text-3xl font-bold gradient-text mb-1">{item.value}</div>
           <div className="text-sm text-muted-foreground mb-2">{item.label}</div>
           <span className="text-xs text-accent font-medium">{item.change}</span>
         </motion.div>
       ))}
     </div>
 
     <div className="glass rounded-xl p-6">
       <h4 className="font-semibold mb-6">Revenue Trend</h4>
       <div className="h-48 flex items-end">
         <svg viewBox="0 0 400 100" className="w-full h-full">
           <defs>
             <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
               <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
             </linearGradient>
           </defs>
           <motion.path
             d="M0,80 Q50,60 100,65 T200,50 T300,35 T400,20"
             fill="none"
             stroke="hsl(var(--primary))"
             strokeWidth="2"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 1.5, delay: 0.5 }}
           />
           <motion.path
             d="M0,80 Q50,60 100,65 T200,50 T300,35 T400,20 L400,100 L0,100 Z"
             fill="url(#revenueGradient)"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 1.5 }}
           />
         </svg>
       </div>
     </div>
   </div>
 );
 
 export const DashboardPreview = () => {
   const [activeTab, setActiveTab] = useState("overview");
   const [currentTabIndex, setCurrentTabIndex] = useState(0);
   const sectionRef = useRef<HTMLElement>(null);
   const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
 
   const handleTabChange = (tabId: string, index: number) => {
     setActiveTab(tabId);
     setCurrentTabIndex(index);
   };
 
   const navigateTab = (direction: 'prev' | 'next') => {
     const newIndex = direction === 'next' 
       ? Math.min(currentTabIndex + 1, tabs.length - 1)
       : Math.max(currentTabIndex - 1, 0);
     handleTabChange(tabs[newIndex].id, newIndex);
   };
 
   const renderTabContent = () => {
     switch (activeTab) {
       case "overview": return <OverviewTab />;
       case "analytics": return <AnalyticsTab />;
       case "leads": return <LeadsTab />;
       case "revenue": return <RevenueTab />;
       default: return <OverviewTab />;
     }
   };
 
   return (
     <section
       id="dashboard"
       ref={sectionRef}
       className="relative py-24 md:py-32 overflow-hidden"
     >
       {/* Background */}
       <div className="absolute inset-0 gradient-bg opacity-50" />
 
       <div className="container mx-auto px-4 md:px-6 relative z-10">
         {/* Section header */}
         <div className="text-center mb-12 md:mb-16">
           <motion.span
             initial={{ opacity: 0, y: 20 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.5 }}
             className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
           >
             Interactive Preview
           </motion.span>
           
           <motion.h2
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
           >
             Your Command <span className="gradient-text">Center</span>
           </motion.h2>
           
           <motion.p
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-lg text-muted-foreground max-w-2xl mx-auto"
           >
             Experience the power of our intuitive dashboard with real-time analytics
             and actionable insights.
           </motion.p>
         </div>
 
         {/* Dashboard container */}
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="glass-strong rounded-2xl p-4 md:p-8 glow"
         >
           {/* Tab navigation - Desktop */}
           <div className="hidden md:flex items-center gap-2 mb-8 p-2 glass rounded-xl">
             {tabs.map((tab, index) => (
               <button
                 key={tab.id}
                 onClick={() => handleTabChange(tab.id, index)}
                 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                   activeTab === tab.id
                     ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                     : "hover:bg-muted"
                 }`}
               >
                 <tab.icon className="w-4 h-4" />
                 <span className="text-sm font-medium">{tab.label}</span>
               </button>
             ))}
           </div>
 
           {/* Tab navigation - Mobile (swipe-style) */}
           <div className="md:hidden mb-6">
             <div className="flex items-center justify-between gap-2">
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={() => navigateTab('prev')}
                 disabled={currentTabIndex === 0}
                 className="shrink-0"
               >
                 <ChevronLeft className="w-5 h-5" />
               </Button>
               
               <div className="flex-1 overflow-hidden">
                 <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                   {tabs.map((tab, index) => (
                     <button
                       key={tab.id}
                       onClick={() => handleTabChange(tab.id, index)}
                       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shrink-0 ${
                         activeTab === tab.id
                           ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                           : "glass"
                       }`}
                     >
                       <tab.icon className="w-4 h-4" />
                       <span className="text-sm font-medium">{tab.label}</span>
                     </button>
                   ))}
                 </div>
               </div>
 
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={() => navigateTab('next')}
                 disabled={currentTabIndex === tabs.length - 1}
                 className="shrink-0"
               >
                 <ChevronRight className="w-5 h-5" />
               </Button>
             </div>
           </div>
 
           {/* Tab content */}
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
             >
               {renderTabContent()}
             </motion.div>
           </AnimatePresence>
         </motion.div>
       </div>
     </section>
   );
 };