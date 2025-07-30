import React from 'react'
import { CheckCircleIcon } from 'lucide-react'
export function Hero() {
  return (
    <div className="bg-gradient-to-br from-orange-100 via-white to-blue-100 py-24 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <img
            src="/assets/svg/logo.svg"
            alt="Gratis Auto Theorie Logo"
            className="w-20 h-20 rounded-3xl shadow-xl p-2"
          />
        </div>
        <h1 className="text-6xl md:text-7xl font-light text-gray-800 mb-6 tracking-tight">
          Gratis Auto Theorie
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-4 font-light max-w-4xl mx-auto">
          Bereidt je voor op je theorieexamen
        </p>
        <p className="text-xl text-gray-500 mb-12 max-w-3xl mx-auto">
          Volledig gratis, geen registratie vereist, geen verborgen kosten
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-orange-100">
            <CheckCircleIcon className="w-5 h-5 text-orange-500" />
            <span className="text-gray-700 font-medium">Onbeperkt oefenen</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-orange-100">
            <CheckCircleIcon className="w-5 h-5 text-orange-500" />
            <span className="text-gray-700 font-medium">
              Directe resultaten
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-orange-100">
            <CheckCircleIcon className="w-5 h-5 text-orange-500" />
            <span className="text-gray-700 font-medium">
              Geen account nodig
            </span>
          </div>
        </div>
        <div class="flex gap-6 justify-center">
          <button onClick={() => window.location.assign('/overzicht')} className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white text-xl font-medium py-4 px-12 rounded-full shadow-lg hover:shadow-xl">
            Bekijk examens
          </button>
          <button onClick={() => window.location.assign('/examen/1')} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xl font-medium py-4 px-12 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Begin met oefenen
          </button>
        </div>
      </div>
    </div>
  )
}
