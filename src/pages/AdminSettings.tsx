import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AdminSettings() {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Load existing settings
        const loadSettings = async () => {
            try {
                const docRef = doc(db, "settings", "admin");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPhone(docSnap.data().notificationPhone || "");
                }
            } catch (error) {
                console.error("Error loading settings:", error);
            }
        };
        loadSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await setDoc(doc(db, "settings", "admin"), {
                notificationPhone: phone,
                updatedAt: new Date(),
            });
            setMessage("Settings saved successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            setMessage("Failed to save settings.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-md mx-auto">
                <div className="mb-8">
                    <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold">Admin Settings</h1>
                    </div>
                    <p className="text-muted-foreground">Configure system-wide settings and notifications.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 rounded-xl border border-border/50"
                >
                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Admin Notification Phone
                            </label>
                            <div className="text-xs text-muted-foreground mb-2">
                                New user registrations will be notified to this number.
                            </div>
                            <Input
                                type="tel"
                                placeholder="+1234567890"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="bg-background/50"
                            />
                        </div>

                        {message && (
                            <div className={`text-sm ${message.includes("Failed") ? "text-destructive" : "text-green-500"}`}>
                                {message}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={loading}>
                            <Save className="w-4 h-4 mr-2" />
                            {loading ? "Saving..." : "Save Settings"}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
