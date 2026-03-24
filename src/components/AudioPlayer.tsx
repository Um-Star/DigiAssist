import { useRef, useState, useEffect } from 'react';
import { PlayCircle, PauseCircle } from 'lucide-react';
import Button from './Button';

interface AudioPlayerProps {
  src: string;
  label?: string;
  className?: string;
  iconClassName?: string;
}

export default function AudioPlayer({ 
  src, 
  label = "Listen in Nupe", 
  className = "",
  iconClassName = "text-emerald-600 dark:text-emerald-400"
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, []);

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <Button 
        variant="secondary" 
        className="rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
      >
        {isPlaying ? (
          <PauseCircle className={`w-6 h-6 mr-2 ${iconClassName} animate-pulse`} />
        ) : (
          <PlayCircle className={`w-6 h-6 mr-2 ${iconClassName}`} />
        )}
        {label}
      </Button>
      <audio ref={audioRef} src={src} preload="metadata" className="hidden" />
    </div>
  );
}
