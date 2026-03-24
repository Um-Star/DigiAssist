import { BookOpen, AlertCircle, Gift, Coins } from 'lucide-react';
import Card from '../components/Card';
import AudioPlayer from '../components/AudioPlayer';

export default function LoanVsGrant() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 mb-8">
        <div className="inline-block p-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-full">
          <BookOpen className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Loan vs. Grant</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto font-medium">
          Understand the difference so you don't get tricked into paying money you didn't expect.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
        {/* LOAN CARD */}
        <Card className="border-2 border-red-200 bg-red-50/30 dark:bg-red-900/10 dark:border-red-800 flex flex-col items-center text-center p-8 transition-transform hover:-translate-y-1">
          <div className="bg-red-100 dark:bg-red-900/40 p-5 rounded-full mb-4">
            <Coins className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-3xl font-black text-red-700 dark:text-red-400 mb-2">LOAN</h2>
          <div className="bg-red-600 text-white font-bold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
            MUST BE REPAID ⚠️
          </div>
          <ul className="text-left space-y-4 w-full text-lg font-medium text-slate-800 dark:text-slate-200">
            <li className="flex items-start">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <span>You <strong className="text-red-600 dark:text-red-400">must pay back</strong> the full amount.</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <span>Often includes <strong className="text-red-600 dark:text-red-400">extra interest</strong> (you pay back more than you received).</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <span>Failure to pay can result in harassment or loss of property.</span>
            </li>
          </ul>
        </Card>

        {/* GRANT CARD */}
        <Card className="border-2 border-emerald-200 bg-emerald-50/30 dark:bg-emerald-900/10 dark:border-emerald-800 flex flex-col items-center text-center p-8 transition-transform hover:-translate-y-1">
          <div className="bg-emerald-100 dark:bg-emerald-900/40 p-5 rounded-full mb-4">
            <Gift className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black text-emerald-700 dark:text-emerald-400 mb-2">GRANT</h2>
          <div className="bg-emerald-600 text-white font-bold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
            FREE MONEY 🎁
          </div>
          <ul className="text-left space-y-4 w-full text-lg font-medium text-slate-800 dark:text-slate-200">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              </div>
              <span>You <strong className="text-emerald-600 dark:text-emerald-400">do not</strong> have to pay it back.</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              </div>
              <span>Usually given by the government or verified charities.</span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              </div>
              <span><strong>Never requires a fee to get it!</strong> If they ask for money to get the grant, it is a scam.</span>
            </li>
          </ul>
        </Card>
      </div>

      <div className="flex justify-center pb-8 mt-4">
        <AudioPlayer 
          src="/audio/loan.mp3" 
          label="Listen in Nupe"
          iconClassName="text-emerald-600 dark:text-emerald-400"
        />
      </div>
    </div>
  );
}
