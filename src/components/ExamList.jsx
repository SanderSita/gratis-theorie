import React from 'react'
import { ExamCard } from './ExamCard'
import { SingleExamCard } from './SingleExamCard'

export const ExamList = ({ preExams, exams, showExams }) => {
  return (
    <>
      {showExams && 
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
          {preExams.map((exam) => (
            <SingleExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      }
      <div className="my-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Categorieën</h1>
          <p className="text-gray-500 text-md max-w-[600px]">
            Dit zijn de verschillende categorieën van vragen die je kunt verwachten in het examen. Elke categorie bevat 10 vragen die je moet beantwoorden om te slagen.
          </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </>
  )
}
