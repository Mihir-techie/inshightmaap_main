import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Check, Sparkles, Zap, Crown, Users } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    duration: "10 mins demo",
    description: "Perfect for trying out our features",
    features: [
      "10 minutes of transcript processing",
      "Basic text summarization",
      "Learning map generation",
      "PDF export (basic)",
      "Email support",
    ],
    icon: Sparkles,
    color: "from-blue-500 to-blue-600",
    popular: false,
  },
  {
    id: "student",
    name: "Student",
    price: "₹99",
    duration: "1 hour/month",
    description: "Ideal for students and learners",
    features: [
      "1 hour of transcript processing per month",
      "Advanced text & PDF summarization",
      "Learning map with mind map visualization",
      "Revision mode",
      "Focus score heatmap",
      "PDF export (full features)",
      "Priority email support",
    ],
    icon: Zap,
    color: "from-green-500 to-green-600",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹299",
    duration: "5 hours/month",
    description: "For professionals and content creators",
    features: [
      "5 hours of transcript processing per month",
      "All Student features",
      "Unlimited text & PDF summarization",
      "Advanced analytics",
      "Priority processing",
      "Export to multiple formats",
      "Priority support",
    ],
    icon: Crown,
    color: "from-purple-500 to-purple-600",
    popular: false,
  },
  {
    id: "team",
    name: "Team",
    price: "₹999",
    duration: "Unlimited/day",
    description: "For teams and organizations",
    features: [
      "Unlimited transcript processing",
      "All Pro features",
      "Team collaboration",
      "Shared dashboards",
      "Advanced analytics & insights",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    icon: Users,
    color: "from-orange-500 to-orange-600",
    popular: false,
  },
];

const PricingPage = () => {
  const handleSelectPlan = (planId: string) => {
    // Store selected plan in localStorage
    localStorage.setItem("selectedPlan", planId);
    // For now, just apply the plan directly
    // In production, this would redirect to payment gateway
    localStorage.setItem("currentPlan", planId);
    localStorage.setItem("planExpiry", new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString());
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <ParticleBackground />
      <Navbar />

      <main className="flex-1 pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-hero mb-6 shadow-glow"
            >
              <Crown className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan for your needs. Upgrade or downgrade at any time.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-card rounded-2xl border-2 p-8 shadow-card hover:shadow-lg transition-all ${
                    plan.popular
                      ? "border-accent scale-105 md:scale-110"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-accent to-primary text-accent-foreground px-4 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-bold text-4xl text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">/{plan.duration.split("/")[1] || "month"}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{plan.duration}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "hero" : "outline"}
                    size="lg"
                    className="w-full"
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {plan.price === "₹0" ? "Get Started" : "Choose Plan"}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <h2 className="font-display font-bold text-3xl text-center text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can I change my plan later?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
                },
                {
                  q: "What happens when I exceed my monthly limit?",
                  a: "You'll be notified when you're close to your limit. You can upgrade your plan or wait for the next billing cycle.",
                },
                {
                  q: "Do you offer refunds?",
                  a: "Yes, we offer a 7-day money-back guarantee for all paid plans.",
                },
                {
                  q: "Is there a free trial for paid plans?",
                  a: "Yes! All plans start with our free 10-minute demo to try out all features.",
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <h4 className="font-display font-semibold text-lg text-foreground mb-2">
                    {faq.q}
                  </h4>
                  <p className="text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
