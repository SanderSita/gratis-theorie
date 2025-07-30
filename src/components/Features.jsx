import React from 'react'
import { BookOpenIcon, ClockIcon, TrophyIcon, UsersIcon } from 'lucide-react'
export function Features() {
  const features = [
    {
      icon: BookOpenIcon,
      title: 'Officiële Vragen',
      description:
        'Oefen met authentieke theorievragen die overeenkomen met het officiële examen',
    },
    {
      icon: ClockIcon,
      title: 'Altijd Beschikbaar',
      description:
        '24/7 toegang tot alle oefenmaterialen, oefen wanneer het jou uitkomt',
    },
    {
      icon: TrophyIcon,
      title: 'Directe Feedback',
      description:
        'Ontvang onmiddellijk je resultaten en gedetailleerde uitleg bij elke vraag',
    },
    {
      icon: UsersIcon,
      title: 'Toegankelijk voor Iedereen',
      description:
        'Geen registratie of persoonlijke gegevens vereist, begin direct met oefenen',
    },
  ]
  return (
    <div className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Waarom kiezen voor ons?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Wij geloven dat kwaliteitsvolle theorie-oefening toegankelijk moet
            zijn voor iedereen, zonder financiële barrières
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-gradient-to-b from-orange-50 to-white border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
