import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExamPage from "./pages/ExamPage";
import NotFound from "./pages/NotFound";
import ResultScreen from "./pages/ResultScreen";
import OverView from "./pages/OverView";
import { Analytics } from "@vercel/analytics/react";
import DonatePage from "./pages/DonatePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/overzicht" element={<OverView />} />
          <Route path="/examen/:examId" element={<ExamPage />} />
          <Route path="/examen/:examId/resultaat" element={<ResultScreen />} />
          <Route path="/doneren" element={<DonatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Analytics />
    </>
  );
}

export default App;
