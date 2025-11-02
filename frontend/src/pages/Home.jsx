import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import Packages from '../components/Packages';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import TypewriterEffect from '../components/TypewriterEffect';
import ScrollProgress from '../components/ScrollProgress';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = () => {
    if (prompt.trim()) {
      navigate('/livepreview', { state: { initialPrompt: prompt } });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900'>
      <ScrollProgress />
      <Navbar />
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
      
      {/* Hero Section */}
      <div className='relative'>
        <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
          <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-purple-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
        </div>

        <div className='container mx-auto px-4'>
          <div className={`py-20 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className='mx-auto mb-8 flex max-w-fit items-center rounded-full bg-white/90 px-3 py-1 text-sm text-blue-600 shadow-lg ring-1 ring-gray-900/10 dark:bg-gray-800 dark:text-blue-400 dark:ring-gray-800'>
              <Sparkles className='mr-2 h-4 w-4' />
              Powered by Advanced AI Technology
            </div>

            <h1 className='text-5xl font-bold text-gray-900 dark:text-white md:text-6xl lg:text-7xl'>
              Build Something{' '}
              <span className='animate-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-300% bg-clip-text text-transparent'>
                Makeable
              </span>
            </h1>
            
            <p className='mt-6 text-xl text-gray-600 dark:text-gray-300'>
              <TypewriterEffect
                words={[
                  "Create apps by chatting with AI",
                  "Build websites in minutes",
                  "Design beautiful interfaces",
                  "Generate responsive layouts",
                  "Develop faster with AI"
                ]}
                className="inline-block min-w-[300px]"
              />
            </p>
            
            <div className='mx-auto mt-10 max-w-2xl'>
              <div className='group relative flex items-center rounded-2xl bg-white p-2 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800'>
                <input
                  className='flex-1 bg-transparent px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none dark:text-white dark:placeholder-gray-400'
                  placeholder='Ask Makeable to Create Web Application'
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!prompt.trim()}
                  className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:hover:scale-100 dark:focus:ring-offset-gray-800"
                >
                  Generate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section 
            id="features"
            className={`transition-all duration-1000 ${
              activeSection === 'features' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Features />
          </section>

          {/* Packages Section */}
          <section 
            id="packages"
            className={`transition-all duration-1000 ${
              activeSection === 'packages' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Packages />
          </section>

          {/* Testimonials Section */}
          <section 
            id="testimonials"
            className={`transition-all duration-1000 ${
              activeSection === 'testimonials' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Testimonials />
          </section>

          {/* CTA Section */}
          <section 
            id="cta"
            className={`transition-all duration-1000 ${
              activeSection === 'cta' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <CTA />
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
