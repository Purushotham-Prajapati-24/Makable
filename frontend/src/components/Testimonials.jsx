import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Makeable has revolutionized how we build websites. What used to take days now takes hours.",
    author: "Sarah Johnson",
    title: "Lead Developer, TechCorp",
    image: "https://avatars.githubusercontent.com/u/1?v=4",
  },
  {
    quote: "The AI-powered generation is incredibly accurate and the code quality is outstanding.",
    author: "Michael Chen",
    title: "Frontend Engineer, StartupX",
    image: "https://avatars.githubusercontent.com/u/2?v=4",
  },
  {
    quote: "This tool has become an essential part of our development workflow. Highly recommended!",
    author: "Emily Rodriguez",
    title: "CTO, InnovateLabs",
    image: "https://avatars.githubusercontent.com/u/3?v=4",
  },
];

const TestimonialCard = ({ quote, author, title, image }) => (
  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
    <Quote className="absolute right-4 top-4 h-12 w-12 text-blue-500/10" />
    <p className="relative text-lg text-gray-700 dark:text-gray-300">{quote}</p>
    <div className="mt-6 flex items-center gap-4">
      <img 
        src={image} 
        alt={author}
        className="h-12 w-12 rounded-full object-cover"
      />
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">{author}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Loved by Developers
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            See what other developers are saying about Makeable
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;