"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Send,
  GitFork,
  Globe,
  Mail,
  CheckCircle,
} from "lucide-react";
import GlowOrb from "@/components/GlowOrb";
import AnimatedSection from "@/components/AnimatedSection";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

// ═══════════════════════════════════════════════════
// FORM SCHEMA
// ═══════════════════════════════════════════════════

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ═══════════════════════════════════════════════════
// SOCIAL LINKS
// ═══════════════════════════════════════════════════

const socialLinks = [
  {
    href: "https://github.com/itzabhishekgour",
    icon: GitFork,
    label: "GitHub",
    handle: "@itzabhishekgour",
  },
  {
    href: "https://linkedin.com/in/itzabhishekgour",
    icon: Globe,
    label: "LinkedIn",
    handle: "Abhishek Gour",
  },
  {
    href: "https://instagram.com/itz_abhi_gour",
    icon: InstagramIcon,
    label: "Instagram",
    handle: "@itz_abhi_gour",
  },
  {
    href: "mailto:mrasgour1004@gmail.com",
    icon: Mail,
    label: "Email",
    handle: "mrasgour1004@gmail.com",
  },
];

// ═══════════════════════════════════════════════════
// CONTACT CLIENT COMPONENT
// ═══════════════════════════════════════════════════

export default function ContactClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setErrorMessage(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (resData.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(resData.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      // Fallback
      setIsSubmitted(true);
    }
  };

  return (
    <div className="relative min-h-screen py-24 px-6 overflow-hidden">
      {/* Background orbs */}
      <GlowOrb
        color="rgba(34, 211, 238, 0.06)"
        size={400}
        top="20%"
        left="5%"
        delay={0}
      />
      <GlowOrb
        color="rgba(52, 211, 153, 0.04)"
        size={350}
        top="60%"
        left="75%"
        delay={3}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <h2 className="text-sm font-medium text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-3">
            Contact
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white/90 mb-2">
            Let&apos;s build something.
          </h1>
          <p className="text-slate-600 dark:text-white/40 max-w-md">
            Have a project in mind, want to collaborate, or just want to say
            hello? I&apos;d love to hear from you.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <AnimatedSection delay={0.1} className="lg:col-span-3">
            {isSubmitted ? (
              <motion.div
                className="glass-card p-12 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white/90 mb-2">
                  Message sent!
                </h3>
                <p className="text-slate-600 dark:text-white/40">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="glass-card p-8 space-y-6"
              >
                {/* Name field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-slate-700 dark:text-white/60 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    {...register("name")}
                    className="w-full px-4 py-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-900 dark:text-white/90 placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-cyan-500/50 dark:focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-600 dark:text-red-400/80">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-slate-700 dark:text-white/60 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-900 dark:text-white/90 placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-cyan-500/50 dark:focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-400/20 transition-all duration-300"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-600 dark:text-red-400/80">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-slate-700 dark:text-white/60 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    {...register("message")}
                    className="w-full px-4 py-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-900 dark:text-white/90 placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-cyan-500/50 dark:focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                    placeholder="What's on your mind?"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-600 dark:text-red-400/80">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {errorMessage && (
                  <p className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-red-400">
                    {errorMessage}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="glow-button w-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white dark:border-[#0a0a0a]/30 dark:border-t-[#0a0a0a] rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatedSection>

          {/* Social links sidebar */}
          <AnimatedSection delay={0.2} className="lg:col-span-2">
            <h3 className="text-sm font-medium text-slate-400 dark:text-white/30 uppercase tracking-[0.15em] mb-6">
              Connect
            </h3>
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card flex items-center gap-4 p-4 group cursor-pointer"
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-600 dark:text-white/30 dark:group-hover:text-cyan-400 transition-colors duration-300" />
                  <div>
                    <p className="text-sm font-medium text-slate-800 group-hover:text-slate-950 dark:text-white/70 dark:group-hover:text-white/90 transition-colors">
                      {social.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-white/25">
                      {social.handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
