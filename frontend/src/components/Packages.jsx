import { Check, Zap, Crown, Rocket } from "lucide-react";
import { cn } from "../lib/utils";

const packages = [
  {
    name: "Free",
    description: "Perfect for trying out Makeable",
    price: "0",
    features: [
      "5 AI generations per day",
      "Basic templates",
      "Community support",
      "Export to HTML/CSS",
    ],
    icon: Zap,
    popularFlag: false,
  },
  {
    name: "Pro",
    description: "For professional developers",
    price: "19",
    features: [
      "Unlimited AI generations",
      "Premium templates",
      "Priority support",
      "Export to React/Next.js",
      "Custom CSS frameworks",
      "Component library access",
    ],
    icon: Crown,
    popularFlag: true,
  },
  {
    name: "Enterprise",
    description: "For large teams and organizations",
    price: "Custom",
    features: [
      "Everything in Pro",
      "Custom API integration",
      "Dedicated support",
      "Team collaboration",
      "Custom branding",
      "Advanced analytics",
    ],
    icon: Rocket,
    popularFlag: false,
  },
];

const PackageCard = ({ name, description, price, features, icon: Icon, popularFlag }) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900",
        popularFlag && "border-blue-500 dark:border-blue-500"
      )}
    >
      {popularFlag && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-blue-500 px-3 py-1 text-sm font-medium text-white">
          Most Popular
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <Icon className="h-8 w-8 text-blue-500" />
      </div>
      <div className="mt-6">
        <p className="flex items-baseline">
          {price !== "Custom" ? (
            <>
              <span className="text-4xl font-bold text-gray-900 dark:text-white">${price}</span>
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">/month</span>
            </>
          ) : (
            <span className="text-4xl font-bold text-gray-900 dark:text-white">Custom</span>
          )}
        </p>
      </div>
      <ul className="mt-6 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-center space-x-3 text-sm">
            <Check className="h-5 w-5 flex-shrink-0 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={cn(
          "mt-8 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
          popularFlag
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        )}
      >
        {price === "Custom" ? "Contact Sales" : "Get Started"}
      </button>
    </div>
  );
};

const Packages = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.name} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;