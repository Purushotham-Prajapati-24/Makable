import { Bot, Code2, Laptop, Palette, Sparkles, Zap } from "lucide-react";
import { cn } from "../lib/utils";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Generation",
    description: "Create websites and components using natural language prompts with advanced AI technology.",
  },
  {
    icon: Code2,
    title: "Clean Code Output",
    description: "Generate production-ready React code that follows best practices and modern standards.",
  },
  {
    icon: Palette,
    title: "Customizable Designs",
    description: "Modify and customize the generated designs to match your brand and requirements.",
  },
  {
    icon: Laptop,
    title: "Live Preview",
    description: "See your changes in real-time with an interactive preview of your components.",
  },
  {
    icon: Sparkles,
    title: "Modern Frameworks",
    description: "Support for popular frameworks like React, Next.js, and various UI libraries.",
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description: "Deploy your generated website instantly with one click using Vercel integration.",
  },
];

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <Icon className="h-10 w-10 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Everything you need to build modern web applications with AI assistance
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;