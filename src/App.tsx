import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PhoneSafety from './pages/PhoneSafety';
import LoanVsGrant from './pages/LoanVsGrant';
import ScamExamples from './pages/ScamExamples';
import ScamRiskChecker from './pages/ScamRiskChecker';
import AiScamChecker from './pages/AiScamChecker';
import ReportScam from './pages/ReportScam';
import ViewReports from './pages/ViewReports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="phone-safety" element={<PhoneSafety />} />
          <Route path="loan-vs-grant" element={<LoanVsGrant />} />
          <Route path="scam-examples" element={<ScamExamples />} />
          <Route path="scam-checker" element={<ScamRiskChecker />} />
          <Route path="ai-checker" element={<AiScamChecker />} />
          <Route path="report" element={<ReportScam />} />
          <Route path="reports" element={<ViewReports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
