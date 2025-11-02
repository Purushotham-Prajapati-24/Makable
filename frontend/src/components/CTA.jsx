import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5" />
      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-sm text-blue-600 shadow-lg dark:bg-gray-800 dark:text-blue-400">
            <Sparkles className="mr-2 h-4 w-4" />
            New Features Available
          </div>
          <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Ready to transform your development workflow?
          </h2>
          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Join thousands of developers who are already building faster with Makeable AI
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#get-started"
              className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#learn-more"
              className="inline-flex items-center rounded-xl bg-gray-100 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;