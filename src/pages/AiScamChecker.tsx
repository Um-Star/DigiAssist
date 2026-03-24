import { useState, useEffect } from 'react';
import { MessageSquareWarning, Bot, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

type AnalysisResult = 'scam' | 'safe' | null;

export default function AiScamChecker() {
  const [message, setMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(null);
  const [reasons, setReasons] = useState<string[]>([]);

  useEffect(() => {
    if (result === 'scam') {
      try {
        const warningSfx = new Audio('/audio/warning.mp3');
        const voiceWarning = new Audio('/audio/scam-warning.mp3');
        
        warningSfx.play().catch(e => console.log('Audio playback prevented by browser:', e));
        warningSfx.onended = () => {
          voiceWarning.play().catch(e => console.log('Voice audio playback prevented:', e));
        };
      } catch (err) {
        console.error("Audio playback error:", err);
      }
    }
  }, [result]);

  const analyzeMessage = () => {
    if (!message.trim()) return;

    setIsAnalyzing(true);
    setResult(null);
    setReasons([]);

    // Simulate network delay for AI effect
    setTimeout(() => {
      const lowerMsg = message.toLowerCase();
      const detectedReasons: string[] = [];

      // Rule-based keyword matching
      if (lowerMsg.includes('otp') || lowerMsg.includes('code') || lowerMsg.includes('pin') || lowerMsg.includes('bvn')) {
        detectedReasons.push("Asks for sensitive information (OTP/PIN/BVN).");
      }
      if (lowerMsg.includes('free') && (lowerMsg.includes('money') || lowerMsg.includes('cash'))) {
        detectedReasons.push("Promises 'free money', which is a common trick.");
      }
      if (lowerMsg.includes('grant') || lowerMsg.includes('fund')) {
        detectedReasons.push("Mentions grants or funds; often fake unless from official sources.");
      }
      if (lowerMsg.includes('urgent') || lowerMsg.includes('immediately') || lowerMsg.includes('alert')) {
        detectedReasons.push("Creates a false sense of urgency so you don't think clearly.");
      }
      if (lowerMsg.includes('click') || lowerMsg.includes('http') || lowerMsg.includes('www')) {
        detectedReasons.push("Contains a link. Do not click links from unknown senders.");
      }

      if (detectedReasons.length > 0) {
        setResult('scam');
        setReasons(detectedReasons);
      } else {
        setResult('safe');
      }

      setIsAnalyzing(false);
    }, 1500);
  };

  const resetAnalyzer = () => {
    setMessage('');
    setResult(null);
    setReasons([]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-4">
        <div className="inline-flex p-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-full shadow-sm">
          <Bot className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">AI Scam Checker</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
          Paste a suspicious message below. Our AI assistant will check if it looks safe.
        </p>
      </div>

      {!result && !isAnalyzing && (
        <Card className="border-2 border-indigo-200 dark:border-indigo-800 shadow-md p-6 bg-white dark:bg-slate-900">
          <div className="space-y-4">
            <label htmlFor="message" className="block text-xl font-bold text-slate-800 dark:text-white">
              Message text:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="E.g. Congratulations! You have been selected for a free grant. Send your OTP to receive it..."
              className="w-full h-40 p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-colors resize-none text-lg font-medium shadow-inner"
            />
            <Button 
              fullWidth 
              onClick={analyzeMessage} 
              disabled={!message.trim()}
              className="py-4 text-xl shadow-md font-bold"
            >
              <MessageSquareWarning className="w-7 h-7 mr-3" />
              Analyze Message
            </Button>
          </div>
        </Card>
      )}

      {isAnalyzing && (
        <Card className="border-2 border-indigo-200 dark:border-indigo-800 shadow-lg p-12 text-center animate-pulse bg-white dark:bg-slate-900">
          <Loader2 className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto animate-spin mb-4" />
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">The AI is checking...</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mt-2 font-medium">Looking for scam keywords and tricks</p>
        </Card>
      )}

      {result === 'scam' && (
        <div className="space-y-6 animate-fade-in">
          <Card className="bg-red-600 text-white p-6 md:p-8 shadow-2xl animate-[pulse_1.5s_ease-in-out_infinite] border-4 border-red-700">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6 text-center md:text-left">
              <div className="bg-white p-3 md:p-4 rounded-full flex-shrink-0 shadow-lg">
                <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-red-600" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase drop-shadow-md">
                Scam Detected ⚠️
              </h2>
            </div>
            
            <div className="bg-white/10 rounded-xl p-5 md:p-6 mb-6 font-bold text-xl md:text-2xl drop-shadow-sm text-center md:text-left">
              Do not trust this message. We found several warning signs:
            </div>
            
            <ul className="space-y-4 mb-8 bg-red-800/40 rounded-xl p-5 md:p-6 shadow-inner">
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-white mt-2 mr-4 flex-shrink-0 shadow-sm"></div>
                  <span className="text-lg md:text-xl font-semibold drop-shadow-sm leading-snug">{reason}</span>
                </li>
              ))}
            </ul>

            <div className="bg-red-950/40 p-5 rounded-xl border-l-4 border-red-300 italic text-white/95 text-lg shadow-inner font-medium">
              "{message}"
            </div>
          </Card>
          
          <div className="flex justify-center pt-4">
            <Button onClick={resetAnalyzer} variant="secondary" className="shadow-md hover:shadow-lg transition-all py-4 px-8 text-xl font-bold border-2 border-slate-300 dark:border-slate-600">
              Check Another Message
            </Button>
          </div>
        </div>
      )}

      {result === 'safe' && (
        <div className="space-y-6 animate-fade-in">
          <Card className="bg-emerald-600 text-white p-6 md:p-8 shadow-xl border-4 border-emerald-700">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8 text-center md:text-left">
              <div className="bg-white p-3 md:p-4 rounded-full flex-shrink-0 shadow-lg">
                <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-emerald-600" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
                Looks Safe ✅
              </h2>
            </div>
            
            <div className="bg-white/10 rounded-xl p-5 md:p-6 mb-8 text-center text-xl md:text-2xl font-bold drop-shadow-sm">
              We did not find common scam words in this message.
            </div>
            
            <div className="bg-emerald-800/40 rounded-xl p-5 md:p-6 mb-8 flex flex-col md:flex-row items-center md:items-start shadow-inner text-center md:text-left space-y-4 md:space-y-0 md:space-x-4">
              <AlertTriangle className="w-10 h-10 text-yellow-300 flex-shrink-0 drop-shadow-sm" />
              <p className="text-lg md:text-xl font-medium leading-snug text-white/95">
                <strong className="text-yellow-300 block mb-1 drop-shadow-sm uppercase tracking-wide">However, always be careful</strong>
                Scammers can be very clever. If you don't know the sender, ignore it entirely.
              </p>
            </div>

            <div className="bg-emerald-950/40 p-5 rounded-xl border-l-4 border-emerald-300 italic text-white/95 text-lg shadow-inner font-medium">
              "{message}"
            </div>
          </Card>
          
          <div className="flex justify-center pt-4">
            <Button onClick={resetAnalyzer} variant="secondary" className="shadow-md hover:shadow-lg transition-all py-4 px-8 text-xl font-bold border-2 border-slate-300 dark:border-slate-600">
              Check Another Message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
