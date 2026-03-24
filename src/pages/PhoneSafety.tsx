import { Smartphone, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import Card from '../components/Card';
import AudioPlayer from '../components/AudioPlayer';

export default function PhoneSafety() {
  const safetyTips = [
    {
      title: "Keep your OTP private",
      description: "Never share your One-Time Password (OTP) with anyone, not even bank workers.",
      icon: <Shield className="w-8 h-8 text-indigo-500" />,
      color: "border-indigo-200 bg-indigo-50/50 dark:bg-indigo-900/10 dark:border-indigo-800"
    },
    {
      title: "Do not give strangers your phone",
      description: "Scammers can use your phone to steal your money or information quickly.",
      icon: <AlertTriangle className="w-8 h-8 text-rose-500" />,
      color: "border-rose-200 bg-rose-50/50 dark:bg-rose-900/10 dark:border-rose-800"
    },
    {
      title: "Do not accept unknown loans",
      description: "If you didn't ask for a loan, do not click links or accept money sent to you by mistake.",
      icon: <CheckCircle className="w-8 h-8 text-emerald-500" />,
      color: "border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-800"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-full flex-shrink-0">
          <Smartphone className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Phone Safety Tips</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md font-medium">
          Follow these simple rules to keep your money and personal information secure.
        </p>
      </div>

      <div className="space-y-4 pb-8">
        {safetyTips.map((tip, index) => (
          <Card key={index} className={`border-2 ${tip.color} transform transition-transform duration-300 hover:scale-[1.02]`}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-white dark:bg-surface-dark p-3 rounded-full shadow-sm">
                {tip.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{tip.title}</h3>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium">{tip.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pb-8 mt-4">
        <AudioPlayer 
          src="/audio/safety.mp3" 
          label="Listen in Nupe"
          iconClassName="text-primary-600 dark:text-primary-400"
        />
      </div>
    </div>
  );
}
