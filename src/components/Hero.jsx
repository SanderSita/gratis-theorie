import React from 'react';
import { CheckCircleIcon } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-gradient-to-br from-orange-100 via-white to-blue-100 py-20 px-4 sm:min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/assets/svg/logo.svg"
            alt="Gratis Auto Theorie Logo"
            className="w-20 h-20 rounded-3xl shadow-xl p-2"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-800 mb-4 tracking-tight leading-tight">
          Gratis Auto Theorie
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-light mb-4 max-w-3xl mx-auto leading-relaxed">
          Bereidt je voor op je theorieexamen
        </p>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          Volledig gratis, geen registratie vereist, geen verborgen kosten
        </p>


          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10">
            {[
              'Onbeperkt oefenen',
              'Directe resultaten',
              'Geen account nodig',
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-3 sm:bg-white sm:px-5 sm:py-3 sm:rounded-full sm:shadow-md sm:border sm:border-orange-100"
              >
                <CheckCircleIcon className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700 text-sm sm:text-base font-medium">
            {text}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <button
            onClick={() => window.location.assign('/overzicht')}
            className="w-full sm:w-auto bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white text-lg sm:text-xl font-medium py-3 px-8 sm:py-4 sm:px-12 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Bekijk examens
          </button>
          <button
            onClick={() => window.location.assign('/examen/1')}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg sm:text-xl font-medium py-3 px-8 sm:py-4 sm:px-12 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Begin met oefenen
          </button>
        </div>
      </div>
    </div>
  );
}
