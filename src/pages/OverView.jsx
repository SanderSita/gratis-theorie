import React, { useState } from 'react'
import { ExamList } from '../components/ExamList'
import { Header } from '../components/Header'

export default function OverView() {
  // make a list of pre-exams, dynamically from 1 to 10

  const preExams = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Examen ${i + 1}`,
    completed: JSON.parse(localStorage.getItem(`exam_${i + 1}`)) && JSON.parse(localStorage.getItem(`exam_${i + 1}`)).finished,
    score: JSON.parse(localStorage.getItem(`exam_${i + 1}`)) && JSON.parse(localStorage.getItem(`exam_${i + 1}`)).finished ? JSON.parse(localStorage.getItem(`exam_${i + 1}`)).score : null,
    startedAt: JSON.parse(localStorage.getItem(`exam_${i + 1}`)) && JSON.parse(localStorage.getItem(`exam_${i + 1}`)).startedAt ? new Date(JSON.parse(localStorage.getItem(`exam_${i + 1}`)).startedAt) : null,
  }))

  // Mock data for exams
  const [exams, setExams] = useState([
    {
      id: 1,
      title: 'Voorrangsregels',
      completed: true,
      score: '8/10',
    },
    {
      id: 2,
      title: 'Verkeersborden',
      completed: false,
      score: null,
    },
    {
      id: 3,
      title: 'Snelheidslimieten',
      completed: true,
      score: '7/10',
    },
    {
      id: 4,
      title: 'Parkeren',
      completed: false,
      score: null,
    },
    {
      id: 5,
      title: 'Verkeersregels op kruispunten',
      completed: true,
      score: '9/10',
    },
    {
      id: 6,
      title: 'Rijden bij slecht weer',
      completed: false,
      score: null,
    },
    {
      id: 7,
      title: 'Inhalen',
      completed: false,
      score: null,
    },
    {
      id: 8,
      title: 'Rijden op de snelweg',
      completed: true,
      score: '6/10',
    },
    {
      id: 9,
      title: 'Verlichting en zichtbaarheid',
      completed: false,
      score: null,
    },
    {
      id: 10,
      title: 'Alcohol en verkeer',
      completed: false,
      score: null,
    },
  ])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Examens</h1>
          <button className="bg-[#FF7A30] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e66e29] transition-colors">
            Start Willekeurig Examen
          </button>
        </div>
        <ExamList preExams={preExams} exams={exams} />
      </main>
    </div>
  )
}
