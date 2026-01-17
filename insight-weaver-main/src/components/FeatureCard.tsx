import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300"
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
        <div className="absolute inset-0 rounded-2xl gradient-hero blur-xl opacity-20" />
      </div>

      <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>

      <h3 className="font-display font-semibold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>

      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  delay?: number;
}

export const StepCard = ({ number, title, description, delay = 0 }: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex gap-6 items-start group"
    >
      <div className="flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-12 h-12 rounded-xl gradient-accent text-accent-foreground font-display font-bold text-xl flex items-center justify-center shadow-glow"
        >
          {number}
        </motion.div>
      </div>
      <div>
        <h3 className="font-display font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

export const StatCard = ({ value, label, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="font-display font-bold text-4xl md:text-5xl text-gradient mb-2">
        {value}
      </div>
      <div className="text-muted-foreground font-medium">
        {label}
      </div>
    </motion.div>
  );
};
