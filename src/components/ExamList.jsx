import React from 'react'
import { ExamCard } from './ExamCard'
import { SingleExamCard } from './SingleExamCard'

export const ExamList = ({ preExams, exams }) => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
        {preExams.map((exam) => (
          <SingleExamCard key={exam.id} exam={exam} />
        ))}
      </div>
      <div className="my-8">
          <h1 className="text-2xl font-bold text-gray-800">Categorieën</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </>
  )
}
