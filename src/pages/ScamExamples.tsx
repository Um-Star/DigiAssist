import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, DollarSign, Gift, FileCode2 } from 'lucide-react';
import Card from '../components/Card';
import AudioPlayer from '../components/AudioPlayer';

export default function ScamExamples() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scams = [
    {
      title: "Fake Loan Offers",
      icon: <DollarSign className="w-7 h-7 text-amber-500" />,
      color: "border-amber-200 bg-amber-50/40 dark:bg-amber-900/10 dark:border-amber-800",
      description: "Scammers send a text or WhatsApp message claiming you are approved for a massive loan with no requirements.",
      warning: "Real banks require paperwork and credit checks. Ignore random loan approvals sent directly to you."
    },
    {
      title: "The Federal Government Grant Scam",
      icon: <Gift className="w-7 h-7 text-emerald-500" />,
      color: "border-emerald-200 bg-emerald-50/40 dark:bg-emerald-900/10 dark:border-emerald-800",
      description: "You receive a message that you have been selected for a free government grant, but you must first pay a 'processing fee' or 'registration fee' to receive it.",
      warning: "Real grants NEVER ask you to pay money to receive money. If you have to pay, it's a scam."
    },
    {
      title: "The OTP / BVN Scam",
      icon: <FileCode2 className="w-7 h-7 text-rose-500" />,
      color: "border-rose-200 bg-rose-50/40 dark:bg-rose-900/10 dark:border-rose-800",
      description: "Someone calls claiming to be from your bank. They say your account is blocked and ask you to read out a code (OTP) sent to your phone to unblock it.",
      warning: "Bank staff will NEVER ask for your PIN, OTP, or full card details. Hang up immediately."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-4 mb-8">
        <div className="inline-block p-4 bg-amber-100 dark:bg-amber-900/40 rounded-full">
          <AlertCircle className="w-12 h-12 text-amber-600 dark:text-amber-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Common Scams</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
          Learn about the tricks scammers use. Tap to expand and read details.
        </p>
      </div>

      <div className="space-y-4 pb-12">
        {scams.map((scam, index) => {
          const isOpen = openIndex === index;
          return (
            <Card 
              key={index} 
              className={`border-2 ${scam.color} transition-all duration-300 p-0 overflow-hidden`}
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 bg-white dark:bg-surface-dark p-2 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                    {scam.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">{scam.title}</h3>
                </div>
                <div className="flex-shrink-0 text-slate-500 dark:text-slate-400 bg-white dark:bg-surface-dark p-1 rounded-full ml-4 shadow-sm border border-slate-100 dark:border-slate-700">
                  {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out px-6 shadow-inner bg-black/5 dark:bg-black/20 ${isOpen ? 'max-h-96 py-6 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}
              >
                <div className="space-y-4">
                  <p className="text-lg text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                    <strong>The Trick:</strong> {scam.description}
                  </p>
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 p-4 rounded-xl flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800 dark:text-red-200 font-bold leading-relaxed">{scam.warning}</p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center pb-8 mt-4">
        <AudioPlayer 
          src="/audio/scam.mp3" 
          label="Listen in Nupe"
          iconClassName="text-amber-600 dark:text-amber-400"
        />
      </div>
    </div>
  );
}
