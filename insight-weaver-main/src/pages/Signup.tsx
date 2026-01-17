import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParticleBackground } from "@/components/ParticleBackground";
import { toast } from "sonner";
import { Mail, Lock, UserPlus, User, ArrowRight } from "lucide-react";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simple validation
      if (!name || !email || !password || !confirmPassword) {
        toast.error("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      // Simulate signup (replace with actual authentication)
      // For now, just store in localStorage
      localStorage.setItem("user", JSON.stringify({ 
        name, 
        email, 
        isAuthenticated: true 
      }));
      
      toast.success("Account created successfully!", {
        description: "Welcome to Insight Main!",
      });

      // Navigate to home
      navigate("/");
    } catch (error) {
      toast.error("Signup failed", {
        description: "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <ParticleBackground />
      <Navbar />

      <main className="flex-1 pt-32 pb-20 relative z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-hero mb-4 shadow-glow"
              >
                <UserPlus className="w-8 h-8 text-primary-foreground" />
              </motion.div>
              <h1 className="font-display font-bold text-3xl text-foreground mb-2">
                Create Account
              </h1>
              <p className="text-muted-foreground">
                Sign up to start using Insight Main
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Creating account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-accent hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SignupPage;
