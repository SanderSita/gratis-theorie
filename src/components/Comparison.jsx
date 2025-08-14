import React from 'react'
import { XIcon, CheckIcon } from 'lucide-react'
export function Comparison() {
  return (
    <div className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Het verschil is duidelijk
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Vergelijk onze aanpak met andere platforms
          </p>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2">
            {/* Other sites */}
            <div className="p-10">
              <h3 className="text-2xl font-semibold text-gray-700 mb-8 text-center">
                Andere Platforms
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl">
                  <XIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Beperkt aantal gratis examens
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl">
                  <XIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Betaling vereist voor resultaten
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl">
                  <XIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Verplichte accountregistratie
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl">
                  <XIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Maandelijkse abonnementskosten
                  </span>
                </div>
              </div>
            </div>
            {/* Our site */}
            <div className="p-10 bg-gradient-to-b from-orange-50 to-orange-25">
              <h3 className="text-2xl font-semibold text-orange-700 mb-8 text-center">
                AutoTheorieVoorNiks.nl
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <CheckIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Onbeperkt aantal examens
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <CheckIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Alle resultaten altijd gratis
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <CheckIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Geen registratie vereist
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <CheckIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Volledig gratis, voor altijd
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
