import { useState, useEffect } from 'react';
import { FileText, MapPin, Tag, Calendar, AlertCircle, Mic } from 'lucide-react';
import Card from '../components/Card';
import { ScamReport } from './ReportScam';

export default function ViewReports() {
  const [reports, setReports] = useState<ScamReport[]>([]);

  useEffect(() => {
    const savedReports = localStorage.getItem('digiassist_scam_reports');
    if (savedReports) {
      const parsedReports = JSON.parse(savedReports);
      setReports(parsedReports);
      
      // Update last viewed count
      localStorage.setItem('digiassist_last_viewed_report_count', parsedReports.length.toString());
      window.dispatchEvent(new Event('reportsUpdated'));
    } else {
      localStorage.setItem('digiassist_last_viewed_report_count', '0');
      window.dispatchEvent(new Event('reportsUpdated'));
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
          <FileText className="w-12 h-12 text-slate-600 dark:text-slate-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Community Reports</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 font-medium tracking-wide">
          See what scams others have reported nearby.
        </p>
      </div>

      {reports.length === 0 ? (
        <Card className="text-center py-16 border-2 border-dashed border-slate-300 dark:border-slate-700 bg-transparent shadow-none">
          <AlertCircle className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No Reports Yet</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
            When people report scams using the "Report a Scam" page, they will appear here.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                    <Tag className="w-5 h-5 text-red-500" />
                    <span className="font-bold text-xl">{report.type}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>{report.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 font-medium">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <span className="text-lg">{report.location}</span>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mt-2">
                  {report.audioData ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-bold mb-2">
                        <Mic className="w-5 h-5" />
                        <span>Voice Report</span>
                      </div>
                      <audio src={report.audioData} controls className="w-full h-12 outline-none rounded-full bg-slate-100 dark:bg-slate-800" />
                    </div>
                  ) : (
                    <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed italic">
                      "{report.description}"
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
