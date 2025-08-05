import React, { useState } from 'react'
import { ExamList } from '../components/ExamList'
import { Header } from '../components/Header'

export default function OverView() {
  // make a list of pre-exams, dynamically from 1 to 10

  const preExams = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Examen ${i + 1}`,
    completed: JSON.parse(localStorage.getItem(`exam_${i + 1}`)) && JSON.parse(localStorage.getItem(`exam_${i + 1}`)).finished,
    score: JSON.parse(localStorage.getItem(`exam_${i + 1}`)) && JSON.parse(localStorage.getItem(`exam_${i + 1}`)).finished ? JSON.parse(localStorage.getItem(`exam_${i + 1}`)).score : null,
    startedAt: JSON.parse(localStorage.getItem(`exam_${i + 1}`)) && JSON.parse(localStorage.getItem(`exam_${i + 1}`)).startedAt ? new Date(JSON.parse(localStorage.getItem(`exam_${i + 1}`)).startedAt) : null,
  }))

  const examTitles = [
    { title: 'Aanhangwagen', amount: 2 },
    { title: 'Afstand en snelheid', amount: 2 },
    { title: 'Autosnelweg en autoweg', amount: 2 },
    { title: 'Bestuurder', amount: 2 },
    { title: 'Bewust rijden', amount: 2 },
    { title: 'Cijfers en feiten', amount: 2 },
    { title: 'Gedrag', amount: 2 },
    { title: 'Inzicht', amount: 2 },
    { title: 'Jouw auto', amount: 2 },
    { title: 'Kennis', amount: 3 },
    { title: 'Manoevres', amount: 2 },
    { title: 'Moeilijke vragen', amount: 2 },
    { title: 'Ongevallen en pech', amount: 2 },
    { title: 'Situaties', amount: 2 },
    { title: 'Stilstaan en parkeren', amount: 2 },
    { title: 'Techniek', amount: 2 },
    { title: 'Uitstekende lading', amount: 2 },
    { title: 'Verkeersregelaar', amount: 2 },
    { title: 'Verkeerstekens', amount: 2 },
    { title: 'Verlichting', amount: 2 },
    { title: 'Voorrang', amount: 2 },
    { title: 'Voorrangsituaties', amount: 2 },
    { title: 'Weer', amount: 2 },
    { title: 'Wegen en weggedeelten', amount: 2 },
    { title: 'Weggebruikers', amount: 2 },
    { title: 'Wettelijk', amount: 2 },
    { title: 'Willekeurige verkeersborden', amount: 2 },
  ];
  
  function getExamData(title, amount) {
    return Array.from({ length: amount }, (_, i) => {
      const key = `exam_${title.toLowerCase().replace(/ /g, '_')}_${i + 1}`;
      const saved = JSON.parse(localStorage.getItem(key));
  
      return {
        completed: saved?.finished || false,
        score: saved?.finished ? saved.score : null,
        startedAt: saved?.startedAt ? new Date(saved.startedAt) : null,
      };
    });
  }
  
  const [exams, setExams] = useState(
    examTitles.map((obj, index) => ({
      id: index + 1,
      title: obj.title,
      amount: obj.amount,
      exams: getExamData(obj.title, obj.amount),
    }))
  );  
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Examens</h1>
        </div>
        <ExamList preExams={preExams} exams={exams} />
      </main>
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
        <div className="py-4 border-t border-white border-opacity-20">
          <p className="text-orange-100 text-center text-sm">
            © {new Date().getFullYear()} Gratis Auto Theorie — Toegankelijke theorie-oefening voor
            iedereen
          </p>
        </div>
      </div>
    </div>
  )
}
