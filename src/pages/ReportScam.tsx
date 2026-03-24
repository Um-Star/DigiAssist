import { useState, useRef } from 'react';
import { ShieldAlert, Send, CheckCircle, MapPin, FileText, Tag, Mic, Square, Trash2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

export interface ScamReport {
  id: string;
  location: string;
  type: string;
  description: string;
  date: string;
  audioData?: string;
}

export default function ReportScam() {
  const [activeTab, setActiveTab] = useState<'text' | 'voice'>('text');

  const [formData, setFormData] = useState({
    location: '',
    type: 'Fake Loan',
    description: ''
  });
  
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const scamTypes = [
    "Fake Loan",
    "Fake Grant",
    "OTP Request",
    "Account Blocked Trick",
    "Job Scam",
    "Other"
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setAudioUrl(base64data);
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access is needed to record a report.");
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const deleteRecording = () => {
    setAudioUrl(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'text' && (!formData.location.trim() || !formData.description.trim())) return;
    if (activeTab === 'voice' && !audioUrl) return;

    const newReport: ScamReport = {
      id: Date.now().toString(),
      location: activeTab === 'text' ? formData.location : 'Voice Report (Unknown Location)',
      type: activeTab === 'text' ? formData.type : 'Voice Report',
      description: activeTab === 'text' ? formData.description : 'This is an audio recording of a scam report.',
      date: new Date().toLocaleDateString(),
      audioData: activeTab === 'voice' && audioUrl ? audioUrl : undefined
    };

    // Save to localStorage
    const existingReports = JSON.parse(localStorage.getItem('digiassist_scam_reports') || '[]');
    localStorage.setItem('digiassist_scam_reports', JSON.stringify([newReport, ...existingReports]));
    window.dispatchEvent(new Event('reportsUpdated'));

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({ location: '', type: 'Fake Loan', description: '' });
    setAudioUrl(null);
    setActiveTab('text');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in py-12">
        <div className="inline-block p-6 bg-emerald-100 dark:bg-emerald-900/40 rounded-full">
          <CheckCircle className="w-16 h-16 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-3xl font-black text-emerald-600 dark:text-emerald-400">REPORT SAVED</h2>
        <Card className="border-2 border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-800 p-8">
          <p className="text-xl font-bold text-slate-800 dark:text-white mb-2">Thank you!</p>
          <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
            Your report will help others avoid this trick. 
            Information is saved locally on your device.
          </p>
        </Card>
        <Button onClick={resetForm} variant="outline" className="mt-8">
          Report Another Scam
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4 mb-4">
        <div className="inline-flex p-4 bg-red-100 dark:bg-red-900/40 rounded-full">
          <ShieldAlert className="w-12 h-12 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Report a Scam</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
          Tell us about a scam you experienced or saw. It helps keep the community safe.
        </p>
      </div>

      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 flex items-center justify-center py-3 text-lg font-bold rounded-lg transition-all ${
            activeTab === 'text' 
              ? 'bg-white dark:bg-slate-700 shadow text-primary-600 dark:text-primary-400' 
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="w-5 h-5 mr-2" />
          Write Text
        </button>
        <button
          onClick={() => setActiveTab('voice')}
          className={`flex-1 flex items-center justify-center py-3 text-lg font-bold rounded-lg transition-all ${
            activeTab === 'voice' 
              ? 'bg-white dark:bg-slate-700 shadow text-red-500 dark:text-red-400' 
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Mic className="w-5 h-5 mr-2" />
          Record Voice
        </button>
      </div>

      <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'text' ? (
            <>
              <div className="space-y-2">
                <label className="flex items-center text-lg font-bold text-slate-800 dark:text-white">
                  <MapPin className="w-5 h-5 mr-2 text-primary-500" />
                  Your Village or City
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="E.g. Minna, Bida, Agaie..."
                  className="w-full text-lg p-4 bg-slate-50 border border-slate-300 dark:bg-slate-900 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-slate-800 dark:text-white transition-shadow"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-lg font-bold text-slate-800 dark:text-white">
                  <Tag className="w-5 h-5 mr-2 text-primary-500" />
                  Type of Scam
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full text-lg p-4 bg-slate-50 border border-slate-300 dark:bg-slate-900 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-slate-800 dark:text-white transition-shadow appearance-none"
                >
                  {scamTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-lg font-bold text-slate-800 dark:text-white">
                  <FileText className="w-5 h-5 mr-2 text-primary-500" />
                  What Happened?
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="They called me and said..."
                  rows={4}
                  className="w-full text-lg p-4 bg-slate-50 border border-slate-300 dark:bg-slate-900 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-slate-800 dark:text-white transition-shadow resize-none"
                />
              </div>
            </>
          ) : (
            <div className="space-y-6 text-center py-8">
              {!audioUrl ? (
                <>
                  <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center ${isRecording ? 'bg-red-100 dark:bg-red-900/40 animate-pulse' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    <Mic className={`w-12 h-12 ${isRecording ? 'text-red-600 dark:text-red-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    {isRecording ? "Recording..." : "Tap to record your voice"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Tell us what happened in your own words.
                  </p>
                  
                  {isRecording ? (
                    <Button type="button" onClick={stopRecording} className="bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-200 dark:hover:bg-white dark:text-slate-900 shadow-lg px-8 py-4 rounded-full text-lg">
                      <Square className="w-5 h-5 mr-2" /> Stop Recording
                    </Button>
                  ) : (
                    <Button type="button" onClick={startRecording} className="bg-red-500 hover:bg-red-600 text-white shadow-lg px-8 py-4 rounded-full text-lg">
                      <Mic className="w-5 h-5 mr-2" /> Start Recording
                    </Button>
                  )}
                </>
              ) : (
                <div className="space-y-6">
                  <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Recording Saved</h3>
                  
                  <audio src={audioUrl} controls className="w-full outline-none" />
                  
                  <Button type="button" onClick={deleteRecording} variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 className="w-5 h-5 mr-2" /> Delete Recording
                  </Button>
                </div>
              )}
            </div>
          )}

          <Button type="submit" fullWidth className="py-4 text-xl mt-4 shadow-md" disabled={activeTab === 'voice' && !audioUrl}>
            <Send className="w-6 h-6 mr-2" />
            Submit Report
          </Button>
        </form>
      </Card>
    </div>
  );
}
