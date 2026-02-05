import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Bell,
    Search,
    Menu,
    X,
    TrendingUp,
    DollarSign,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function Dashboard() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userProfile, setUserProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (auth.currentUser) {
                const docRef = doc(db, "user_registrations", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserProfile(docSnap.data());
                }
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    const SidebarItem = ({ icon: Icon, label, active = false }: any) => (
        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}>
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </button>
    );

    const StatCard = ({ icon: Icon, label, value, trend }: any) => (
        <div className="glass-card p-6 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className={`text-sm font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            </div>
            <h3 className="text-2xl font-bold font-display mb-1">{value}</h3>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className={`
        fixed md:relative z-40 w-64 h-screen bg-background/95 backdrop-blur-xl border-r border-border transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                            <img src="/favicon.ico" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-display text-xl font-bold gradient-text">Fortumars</span>
                    </div>

                    <nav className="space-y-2">
                        <SidebarItem icon={LayoutDashboard} label="Overview" active />
                        <SidebarItem icon={Users} label="Leads" />
                        <SidebarItem icon={BarChart3} label="Analytics" />
                        <SidebarItem icon={Settings} label="Settings" />
                    </nav>
                </div>

                <div className="absolute bottom-0 w-full p-6 border-t border-border">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary font-bold">
                            {auth.currentUser?.email?.[0].toUpperCase() || "U"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{userProfile?.full_name || "User"}</p>
                            <p className="text-xs text-muted-foreground truncate">{auth.currentUser?.email}</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                        <LogOut className="w-5 h-5 mr-2" />
                        Log Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="h-20 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="relative hidden md:block w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search leads, analytics..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
                            <Bell className="w-5 h-5 text-muted-foreground" />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                        </button>
                    </div>
                </header>

                {/* content */}
                <div className="p-6 md:p-8 space-y-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard icon={Users} label="Total Leads" value="1,245" trend={12.5} />
                        <StatCard icon={TrendingUp} label="Conversion Rate" value="23.5%" trend={4.2} />
                        <StatCard icon={DollarSign} label="Revenue" value="$42,500" trend={8.1} />
                    </div>

                    {/* Recent Activity Mockup */}
                    <div className="glass-card rounded-2xl border border-border/50 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Recent Activity</h2>
                            <Button variant="outline" size="sm">View All</Button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Activity className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">New lead acquired</p>
                                        <p className="text-sm text-muted-foreground">Just now via Website Form</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">2 min ago</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
