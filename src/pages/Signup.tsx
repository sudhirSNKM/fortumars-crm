import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Building, Phone, Briefcase, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { UserRegistration } from '@/lib/firebase';

export default function Signup() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Form data
    const [formData, setFormData] = useState<UserRegistration & { password: string }>({
        email: '',
        password: '',
        full_name: '',
        company_name: '',
        phone_number: '',
        role: '',
        industry: '',
        team_size: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setStep(2);
    };

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 1. Create auth user
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

            // 2. Update user profile with display name
            await updateProfile(userCredential.user, {
                displayName: formData.full_name,
            });

            // 3. Store registration details in Firestore
            await addDoc(collection(db, 'user_registrations'), {
                userId: userCredential.user.uid,
                email: formData.email,
                full_name: formData.full_name,
                company_name: formData.company_name,
                phone_number: formData.phone_number,
                role: formData.role || '',
                industry: formData.industry || '',
                team_size: formData.team_size || '',
                created_at: serverTimestamp(),
            });

            // 4. Send notification to admin
            try {
                // Fetch admin phone number
                const { doc, getDoc } = await import('firebase/firestore');
                const adminSettingsRef = doc(db, 'settings', 'admin');
                const adminSettingsSnap = await getDoc(adminSettingsRef);

                if (adminSettingsSnap.exists()) {
                    const adminPhone = adminSettingsSnap.data().notificationPhone;
                    if (adminPhone) {
                        // Simulate sending SMS (Integration required with Twilio/SendGrid)
                        console.log(`[SIMULATION] Sending new user notification to Admin (${adminPhone}):`);
                        console.log(`New User: ${formData.full_name}, Company: ${formData.company_name}, Email: ${formData.email}`);

                        // In a real app, you would call a Cloud Function here:
                        // await httpsCallable(functions, 'sendAdminNotification')({ phone: adminPhone, userData: formData });
                    }
                }
            } catch (notifyError) {
                console.error("Failed to notify admin:", notifyError);
                // Don't fail the registration if notification fails
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-accent" />
                    </div>
                    <h2 className="text-3xl font-display font-bold mb-4">Account Created Successfully!</h2>
                    <p className="text-muted-foreground mb-2">Welcome to Fortumars!</p>
                    <p className="text-sm text-muted-foreground">Redirecting to login...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background px-4 py-12">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float-slow" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 group mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                            <img src="/favicon.ico" alt="Fortumars Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-display text-2xl font-bold gradient-text">Fortumars</span>
                    </Link>
                    <h1 className="text-3xl font-display font-bold mb-2">Get Started Free</h1>
                    <p className="text-muted-foreground">Create your account and transform your business</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            1
                        </div>
                        <span className="text-sm font-medium hidden sm:inline">Account</span>
                    </div>
                    <div className="w-12 h-0.5 bg-border" />
                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            2
                        </div>
                        <span className="text-sm font-medium hidden sm:inline">Details</span>
                    </div>
                </div>

                {/* Registration Form */}
                <div className="glass-strong rounded-2xl p-6 md:p-8">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3 mb-6"
                        >
                            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-destructive">{error}</p>
                        </motion.div>
                    )}

                    {/* Step 1: Account Info */}
                    {step === 1 && (
                        <form onSubmit={handleStep1Submit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="full_name" className="block text-sm font-medium mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            id="full_name"
                                            name="full_name"
                                            type="text"
                                            value={formData.full_name}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                            placeholder="you@company.com"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">
                                    Password *
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                        required
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Must be at least 6 characters</p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity py-6 text-lg"
                            >
                                Continue
                            </Button>
                        </form>
                    )}

                    {/* Step 2: Business Details */}
                    {step === 2 && (
                        <form onSubmit={handleFinalSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="company_name" className="block text-sm font-medium mb-2">
                                        Company Name *
                                    </label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            id="company_name"
                                            name="company_name"
                                            type="text"
                                            value={formData.company_name}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                            placeholder="Acme Inc."
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone_number" className="block text-sm font-medium mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            id="phone_number"
                                            name="phone_number"
                                            type="tel"
                                            value={formData.phone_number}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                            placeholder="+1 (555) 000-0000"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium mb-2">
                                        Your Role
                                    </label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <select
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
                                        >
                                            <option value="">Select role...</option>
                                            <option value="founder">Founder/CEO</option>
                                            <option value="sales">Sales Manager</option>
                                            <option value="marketing">Marketing Manager</option>
                                            <option value="operations">Operations Manager</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="team_size" className="block text-sm font-medium mb-2">
                                        Team Size
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <select
                                            id="team_size"
                                            name="team_size"
                                            value={formData.team_size}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
                                        >
                                            <option value="">Select size...</option>
                                            <option value="1-10">1-10 employees</option>
                                            <option value="11-50">11-50 employees</option>
                                            <option value="51-200">51-200 employees</option>
                                            <option value="201-500">201-500 employees</option>
                                            <option value="500+">500+ employees</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="industry" className="block text-sm font-medium mb-2">
                                    Industry
                                </label>
                                <input
                                    id="industry"
                                    name="industry"
                                    type="text"
                                    value={formData.industry}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    placeholder="e.g., Technology, Healthcare, Finance"
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-6"
                                    disabled={loading}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity py-6 text-lg"
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </Button>
                            </div>
                        </form>
                    )}

                    <div className="text-center mt-6">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
