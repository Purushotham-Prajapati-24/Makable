import { Code2, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center">
              <Code2 className="h-6 w-6 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Makeable.AI
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Build modern web applications with the power of AI. Transform your ideas into reality.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Product</h3>
            <ul className="mt-4 space-y-3">
              {["Features", "Pricing", "Templates", "Examples"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Resources</h3>
            <ul className="mt-4 space-y-3">
              {["Documentation", "API Reference", "Blog", "Community"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Connect</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="#github"
                  className="inline-flex items-center text-sm text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#twitter"
                  className="inline-flex items-center text-sm text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Makeable.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;