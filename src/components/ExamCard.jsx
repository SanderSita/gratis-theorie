import React from 'react'
import { CheckCircleIcon, ClipboardListIcon, PlayIcon } from 'lucide-react'

const getExamImage = (id) => {
  const images = {
    1: 'https://images.unsplash.com/photo-1621799754526-a0d52c49fad5?w=800&auto=format&fit=crop&q=60',
    2: 'https://images.unsplash.com/photo-1577537500263-751957dbf7a3?w=800&auto=format&fit=crop&q=60',
    3: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=800&auto=format&fit=crop&q=60',
    4: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=60',
    5: 'https://images.unsplash.com/photo-1606161290889-77950cfb67d3?w=800&auto=format&fit=crop&q=60',
    6: 'https://images.unsplash.com/photo-1501999635878-b73fd0d53cd2?w=800&auto=format&fit=crop&q=60',
    7: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=60',
    8: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=800&auto=format&fit=crop&q=60',
    9: 'https://images.unsplash.com/photo-1603176559162-b2c0c8cb7a92?w=800&auto=format&fit=crop&q=60',
    10: 'https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?w=800&auto=format&fit=crop&q=60', // Alcohol
  }
  return images[id]
}

export const ExamCard = ({ exam }) => {
  const cleanTitle = exam.title.replace(' ', '-').toLowerCase()
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={'/assets/img/' + cleanTitle + '.jpg'}
          alt={exam.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{exam.title}</h3>
          {exam.completed && (
            <div className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full flex items-center">
              <CheckCircleIcon size={16} className="mr-1" />
              <span>Voltooid</span>
            </div>
          )}
        </div>
        {exam.completed && (
          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-medium">Score:</span> {exam.score}
            </p>
          </div>
        )}
        
        {/* Push buttons to bottom */}
        <div className="mt-auto flex justify-end gap-3 pt-4">
          {exam.completed && (
            <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors">
              <ClipboardListIcon size={18} className="mr-2" />
              Bekijk Resultaten
            </button>
          )}
          <button className="bg-[#FF7A30] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#e66e29] transition-colors flex items-center">
            <PlayIcon size={18} className="mr-2" />
            Start Examen
          </button>
        </div>
      </div>
    </div>
  )
}

