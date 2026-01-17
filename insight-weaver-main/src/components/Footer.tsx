import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                Insight<span className="text-accent">Main</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 max-w-sm">
              Transform messy lectures and discussions into structured, visual learning maps powered by AI.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/upload" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Upload Content
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="text-center text-primary-foreground/50 text-sm mb-4">
            © {new Date().getFullYear()} Insight Main. Built with ❤️ for learners everywhere.
          </div>
          <div className="text-center text-primary-foreground/60 text-sm font-medium">
            <div className="flex flex-wrap justify-center gap-4">
              <span>Mihir Kumar Panigrahi</span>
              <span>•</span>
              <span>Ishu Anand</span>
              <span>•</span>
              <span>Prangya Sree Pattanayak</span>
              <span>•</span>
              <span>Deepak Kumar Majhi</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
