import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Home from './pages/Home';
import LivePreview from './pages/LivePreview';

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-50 dark:opacity-25"></div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/livepreview" element={<LivePreview />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
