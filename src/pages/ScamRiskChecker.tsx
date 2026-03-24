import { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, AlertTriangle, RotateCcw } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

type RiskLevel = 'low' | 'medium' | 'high' | null;

export default function ScamRiskChecker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(null);

  const questions = [
    "Did they promise you free money or a grant you didn't apply for?",
    "Did someone ask to hold or use your phone?",
    "Were you asked for an OTP, BVN, or PIN?",
    "Did they say you must act urgently or you will lose an opportunity?",
    "Did they say you will recieve the money instantly?"
  ];

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateRisk(newAnswers);
    }
  };

  const calculateRisk = (finalAnswers: boolean[]) => {
    const yesCount = finalAnswers.filter(a => a).length;
    if (yesCount === 0) {
      setRiskLevel('low');
    } else if (yesCount === 1 || yesCount === 2) {
      setRiskLevel('medium');
    } else {
      setRiskLevel('high');
    }
  };

  const resetChecker = () => {
    setCurrentStep(0);
    setAnswers([]);
    setRiskLevel(null);
  };

  const renderResult = () => {
    if (riskLevel === 'high') {
      return (
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-block p-6 bg-red-100 dark:bg-red-900/40 rounded-full animate-pulse">
            <ShieldAlert className="w-16 h-16 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-3xl font-black text-red-600 dark:text-red-400">HIGH RISK!</h2>
          <Card className="border-2 border-red-200 bg-red-50/50 dark:bg-red-900/10 dark:border-red-800 text-left p-6">
            <p className="text-xl font-bold text-slate-800 dark:text-white mb-2">This is very likely a scam.</p>
            <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-4">
              Do not send any money. Do not share your OTP or PIN. Hang up the phone or delete the message immediately.
            </p>
          </Card>
          <Button onClick={resetChecker} variant="outline" className="mt-8">
            <RotateCcw className="w-5 h-5 mr-2" /> Check Another Situation
          </Button>
        </div>
      );
    }

    if (riskLevel === 'medium') {
      return (
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-block p-6 bg-amber-100 dark:bg-amber-900/40 rounded-full">
            <AlertTriangle className="w-16 h-16 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-3xl font-black text-amber-600 dark:text-amber-400">MEDIUM RISK</h2>
          <Card className="border-2 border-amber-200 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-800 text-left p-6">
            <p className="text-xl font-bold text-slate-800 dark:text-white mb-2">Be very careful.</p>
            <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-4">
              There are some warning signs. Stop and talk to someone you trust before continuing. Never share your password or OTP.
            </p>
          </Card>
          <Button onClick={resetChecker} variant="outline" className="mt-8">
            <RotateCcw className="w-5 h-5 mr-2" /> Check Another Situation
          </Button>
        </div>
      );
    }

    return (
      <div className="text-center space-y-6 animate-fade-in">
        <div className="inline-block p-6 bg-emerald-100 dark:bg-emerald-900/40 rounded-full">
          <ShieldCheck className="w-16 h-16 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-3xl font-black text-emerald-600 dark:text-emerald-400">LOW RISK</h2>
        <Card className="border-2 border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-800 text-left p-6">
          <p className="text-xl font-bold text-slate-800 dark:text-white mb-2">This seems safe for now.</p>
          <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-4">
            However, always stay alert. If anyone ever asks for your OTP or wants to hold your phone, it becomes a high risk immediately.
          </p>
        </Card>
        <Button onClick={resetChecker} variant="outline" className="mt-8">
          <RotateCcw className="w-5 h-5 mr-2" /> Check Another Situation
        </Button>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex p-4 bg-purple-100 dark:bg-purple-900/40 rounded-full">
          <Search className="w-12 h-12 text-purple-600 dark:text-purple-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Scam Risk Checker</h1>
        {riskLevel === null && (
          <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
            Answer the questions to see if an offer or situation is safe.
          </p>
        )}
      </div>

      {riskLevel === null ? (
        <Card className="border-2 border-purple-200 bg-purple-50/30 dark:bg-purple-900/10 dark:border-purple-800 p-8 shadow-sm">
          <div className="mb-8">
            <div className="flex justify-between text-sm font-bold text-purple-600 dark:text-purple-400 mb-2">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(((currentStep) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div 
                className="bg-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 min-h-[5rem] flex items-center">
            {questions[currentStep]}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="danger" 
              className="py-5 text-xl flex-1 shadow-md hover:shadow-lg"
              onClick={() => handleAnswer(true)}
            >
              YES
            </Button>
            <Button 
              variant="secondary" 
              className="py-5 text-xl flex-1 bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-md hover:shadow-lg border-none"
              onClick={() => handleAnswer(false)}
            >
              NO
            </Button>
          </div>
        </Card>
      ) : (
        renderResult()
      )}
    </div>
  );
}
