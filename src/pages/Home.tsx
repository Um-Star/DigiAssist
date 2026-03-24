import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, BookOpen, AlertCircle, ShieldAlert, Search, MessageSquareWarning, Play, Square } from 'lucide-react';

function HomeAudioButton({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="mt-3 flex justify-center">
      <button 
        onClick={togglePlay}
        className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-md transition-all active:scale-95"
      >
        {isPlaying ? (
          <Square className="w-4 h-4 fill-current" />
        ) : (
          <Play className="w-4 h-4 fill-current" />
        )}
        <span>Listen in Nupe</span>
      </button>
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} onPause={() => setIsPlaying(false)} className="hidden" />
    </div>
  );
}

export default function Home() {
  const learnItems = [
    {
      title: "Phone Safety",
      icon: <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-md" />,
      path: "/phone-safety"
    },
    {
      title: "Loan vs Grant",
      icon: <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-md" />,
      path: "/loan-vs-grant"
    },
    {
      title: "Scam Awareness",
      icon: <AlertCircle className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-md" />,
      path: "/scam-examples"
    }
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Header Section */}
      <div className="text-center space-y-4 pt-4 px-2 tracking-tight">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Welcome to <span className="text-primary-600 dark:text-primary-400">DigiAssist</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-medium leading-relaxed">
          Your simple guide to staying safe with your phone and money.
        </p>
      </div>

      {/* Learn Section */}
      <section className="space-y-8 p-6 md:p-10 rounded-3xl bg-surface-light dark:bg-surface-dark shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-slate-800">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">Learn</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Tap a circle below to start learning</p>
          <HomeAudioButton src="/audio/learn-guide.mp3" />
        </div>
        
        <div className="grid grid-cols-3 gap-2 md:gap-8 max-w-2xl mx-auto">
          {learnItems.map((item) => (
            <Link to={item.path} key={item.path} className="flex flex-col items-center group text-center cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-[0_0_15px_rgba(20,184,166,0.5)] flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 group-active:scale-95 mb-3 md:mb-4 group-hover:shadow-[0_0_25px_rgba(20,184,166,0.8)] relative">
                {item.icon}
                <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
              </div>
              <span className="font-bold text-sm md:text-base text-slate-800 dark:text-white transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400 px-1">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section className="px-2">
        {/* Top Area */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Tools</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-center">Choose a tool below to continue</p>
          <HomeAudioButton src="/audio/tools-guide.mp3" />
        </div>
        
        {/* Middle Section: Checkers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Link to="/ai-checker" className="block rounded-2xl p-5 md:p-6 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-white shadow-md hover:shadow-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 border border-indigo-500 group">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-inner transition-transform group-hover:rotate-6 duration-300">
                <MessageSquareWarning className="w-8 h-8 md:w-9 md:h-9 text-indigo-100 drop-shadow-sm" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1.5 drop-shadow-sm flex items-center justify-between">
                  AI Scam Checker
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">→</span>
                </h3>
                <p className="text-white/85 text-sm md:text-base font-medium drop-shadow-sm leading-snug">
                  Let our smart tool check a message to see if it's a scam.
                </p>
              </div>
            </div>
          </Link>

          <Link to="/scam-checker" className="block rounded-2xl p-5 md:p-6 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-white shadow-md hover:shadow-xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 border border-purple-500 group">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-inner transition-transform group-hover:rotate-6 duration-300">
                <Search className="w-8 h-8 md:w-9 md:h-9 text-purple-100 drop-shadow-sm" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1.5 drop-shadow-sm flex items-center justify-between">
                  Risk Checker
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">→</span>
                </h3>
                <p className="text-white/85 text-sm md:text-base font-medium drop-shadow-sm leading-snug">
                  Answer questions to see if an offer is safe.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Section: Report Scam */}
        <div className="mt-8 relative z-10 w-full max-w-lg mx-auto">
          <Link to="/report" className="block w-full rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1.5 active:translate-y-0 text-white shadow-lg hover:shadow-[0_10px_25px_rgba(225,29,72,0.4)] bg-rose-600 hover:bg-rose-700 active:bg-rose-800 border border-rose-500 group text-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            
            <div className="flex flex-col items-center space-y-3 relative z-10">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm shadow-inner transition-transform group-hover:scale-110 group-hover:-rotate-6 duration-300">
                <ShieldAlert className="w-10 h-10 text-white drop-shadow-md" />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-1.5 drop-shadow-md tracking-wide">
                  Report a Scam 🚨
                </h3>
                <p className="text-rose-100 text-base font-medium drop-shadow-sm px-2 max-w-sm mx-auto">
                  Tell us about a scam you saw to help protect others in your community.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Developer Profile Section */}
      <section className="px-6 mt-16 mb-12 text-center max-w-2xl mx-auto">
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
            By: Umar Musa Saidu
          </p>
          
          <div className="text-slate-600 dark:text-slate-300 font-medium space-y-1">
            <p>ND in Computer Science</p>
            <p>HND (In-View) in Cyber Security</p>
            <p className="text-sm">Federal Polytechnic Bida, Niger State</p>
            <p className="text-primary-600 dark:text-primary-400 font-bold mt-2">
              Phone: 07064766182
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6">
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 italic leading-relaxed">
              This application was proudly developed as part of the 3MTT (3 Million Technical Talent) program. 
              A special thanks to the 3MTT initiative for providing the incredible opportunity to learn, build, and contribute to our community's digital safety.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
