import React from 'react'
import { ArrowRightIcon } from 'lucide-react'
export function CallToAction() {
  return (
    <div className="py-24 px-4 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
          Klaar om te beginnen?
        </h2>
        <p className="text-xl text-orange-100 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Start vandaag nog met je theorie-oefening. Geen verborgen kosten, geen
          verplichtingen, gewoon kwalitatieve voorbereiding op je theorieexamen.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <button onClick={() => window.location.assign('/examen/1')} className="bg-white hover:bg-gray-50 text-orange-600 text-xl font-medium py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3">
            Begin nu gratis
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white border-opacity-20">
          <p className="text-white text-lg font-light">
            ✓ Geen creditcard vereist ✓ Geen persoonlijke gegevens ✓ Direct
            beginnen
          </p>
        </div>
        <div className="mt-16 pt-8 border-t border-white border-opacity-20">
          <p className="text-orange-100 font-light">
            © {new Date().getFullYear()} Auto Theorie Voor Niks — Toegankelijke theorie oefeningen voor
            iedereen
          </p>
          <p className='mt-1'>Vragen of suggesties? mail ons <a href="mailto:info@autotheorievoorniks.nl" className="text-blue-200 hover:underline hover:cursor-pointer">info@autotheorievoorniks.nl</a></p>
        </div>
      </div>
    </div>
  )
}
