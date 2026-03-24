import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Home, Menu, X, Moon, Sun, Volume2, ArrowLeft, Bell } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [unreadReports, setUnreadReports] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize audio only once
    audioRef.current = new Audio('/audio/welcome-nupe.mp3');
    
    // Listen for when audio finishes playing
    const handleEnded = () => setIsPlaying(false);
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    const updateUnreadCount = () => {
      const savedReports = localStorage.getItem('digiassist_scam_reports');
      const reports = savedReports ? JSON.parse(savedReports) : [];
      const totalReports = reports.length;
      
      const lastViewed = localStorage.getItem('digiassist_last_viewed_report_count');
      const lastViewedCount = lastViewed ? parseInt(lastViewed, 10) : 0;
      
      setUnreadReports(Math.max(0, totalReports - lastViewedCount));
    };

    updateUnreadCount();

    window.addEventListener('reportsUpdated', updateUnreadCount);
    window.addEventListener('storage', updateUnreadCount);

    return () => {
      window.removeEventListener('reportsUpdated', updateUnreadCount);
      window.removeEventListener('storage', updateUnreadCount);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const toggleNupeAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed", e));
      setIsPlaying(true);
    }
  };

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-primary-600 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {!isHome && (
              <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-primary-700 rounded-full transition" aria-label="Go back">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-wide">
              <Shield className="w-6 h-6 text-primary-100" />
              <span>DigiAssist</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-1 md:space-x-4">
            {/* Desktop Only Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={toggleNupeAudio} 
                className={`flex items-center space-x-1 transition font-medium ${isPlaying ? 'text-green-300 animate-pulse' : 'hover:text-primary-100'}`} 
                aria-label={isPlaying ? "Pause Nupe Audio" : "Play in Nupe"} 
                title={isPlaying ? "Pause Nupe Audio" : "Play in Nupe"}
              >
                <Volume2 className="w-5 h-5" />
                <span className="text-sm">{isPlaying ? 'Playing...' : 'Nupe'}</span>
              </button>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-primary-700 transition aria-label='Toggle theme'">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Notification Bell */}
            <Link 
              to="/reports" 
              className="relative p-2 rounded-full hover:bg-primary-700 transition flex items-center justify-center mr-1 md:mr-0"
              aria-label="View Reports"
              title="View Reports"
            >
              <Bell className="w-5 h-5 md:w-6 md:h-6 drop-shadow-sm" />
              {unreadReports > 0 && (
                <span className="absolute top-1.5 right-1.5 md:top-1 md:right-1 flex h-4 w-4 md:h-4 md:w-4 items-center justify-center rounded-full bg-red-500 text-[9px] md:text-[10px] font-bold text-white shadow-sm ring-2 ring-primary-600 transform translate-x-1/2 -translate-y-1/2">
                  {unreadReports}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 rounded hover:bg-primary-700 transition" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-700 text-white absolute w-full z-40 animate-fade-in shadow-xl pb-4 border-t border-primary-600">
          <div className="flex flex-col space-y-1 px-4 pt-2">
            <Link to="/" className="flex items-center space-x-3 p-3 hover:bg-primary-600 rounded-lg transition">
              <Home className="w-5 h-5 text-primary-100" />
              <span className="font-medium">Home</span>
            </Link>
            <div className="h-px bg-primary-500/50 my-2"></div>
            <button onClick={toggleNupeAudio} className="flex items-center space-x-3 p-3 hover:bg-primary-600 rounded-lg text-left transition">
              <Volume2 className={`w-5 h-5 ${isPlaying ? 'text-green-300 animate-pulse' : 'text-primary-100'}`} />
              <span className={`font-medium ${isPlaying ? 'text-green-300' : ''}`}>
                {isPlaying ? 'Pause Audio' : 'Play in Nupe'}
              </span>
            </button>
            <button onClick={toggleTheme} className="flex items-center space-x-3 p-3 hover:bg-primary-600 rounded-lg text-left transition">
              {isDarkMode ? <Sun className="w-5 h-5 text-primary-100" /> : <Moon className="w-5 h-5 text-primary-100" />}
              <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-lg mx-auto md:max-w-2xl lg:max-w-4xl px-4 py-8 relative">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
      
      <footer className="bg-surface-light dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 py-6 mt-auto text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">© 2026 DigiAssist. Digital Safety for Everyone.</p>
      </footer>
    </div>
  );
}
