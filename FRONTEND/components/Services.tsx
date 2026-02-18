const services = {
  cabelos: [
    { name: 'Corte', price: 'R$ 30,00' },
    { name: 'Escova', price: 'R$ 40,00' },
    { name: 'Botox Capilar', price: 'R$ 130,00' },
    { name: 'Detox Capilar', price: 'R$ 130,00' },
    { name: 'Cauterização', price: 'R$ 100,00' },
    { name: 'Progressiva Lissage', price: 'R$ 180,00' },
    { name: 'Progressiva Orgânica Lissage', price: 'R$ 180,00' },
    { name: 'Reconstrução Madamelis', price: 'R$ 50,00' },
    { name: 'Tratamentos Wella', price: 'R$ 100,00' },
    { name: 'Tratamento p/ Loiros Absolute', price: 'R$ 70,00' },
    { name: 'Coloração', price: 'R$ 120,00' },
    { name: 'Mechas', price: 'R$ 250,00' },
    { name: 'Hair Contour', price: 'R$ 200,00' },
  ],
  unhas: [
    { name: 'Manicure', price: 'R$ 25,00' },
    { name: 'Pedicure', price: 'R$ 30,00' },
    { name: 'Combo Pé e Mão', price: 'R$ 50,00' },
  ],
  sobrancelhas: [
    { name: 'Limpeza de Sobrancelhas', price: 'R$ 15,00' },
    { name: 'Limpeza + Henna', price: 'R$ 25,00' },
  ],
  progressiva: [
    { name: 'Progressiva Orgânica P (curto)', price: 'R$ 180,00' },
    { name: 'Progressiva Orgânica M (médio)', price: 'R$ 200,00' },
    { name: 'Progressiva Orgânica G (grande)', price: 'R$ 250,00' },
    { name: 'Progressiva Orgânica GG', price: 'R$ 300,00' },
  ],
}

const categoryIcons: Record<string, JSX.Element> = {
  cabelos: (
    <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 3.5C13.5 5.5 8 6 6.5 9s1 6.5 3 8.5" />
    </svg>
  ),
  unhas: (
    <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
    </svg>
  ),
  sobrancelhas: (
    <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  progressiva: (
    <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
}

const categoryTitles: Record<string, string> = {
  cabelos: 'Cabelos',
  unhas: 'Unhas',
  sobrancelhas: 'Sobrancelhas',
  progressiva: 'Progressiva Orgânica',
}

export default function Services() {
  return (
    <section id="servicos" className="py-20 px-4 bg-dark-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <svg className="w-5 h-5 text-gold-400 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg>
          <h2 className="font-cursive text-4xl md:text-5xl text-gold-400 mt-2 mb-2">Tabela</h2>
          <p className="font-serif text-2xl md:text-3xl text-white italic mb-4">de Valores</p>
          <div className="section-divider mb-6" />
          <p className="text-gray-500 text-sm">*Valores sujeitos a avaliação dos fios e comprimento do cabelo</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(services).map(([category, items]) => (
            <div key={category} className="glass-card p-8 relative overflow-hidden gold-corner">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                {categoryIcons[category]}
                <h3 className="font-serif text-xl text-gold-400 tracking-wider uppercase">
                  {categoryTitles[category]}
                </h3>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-gold-400/50 to-transparent mb-6" />

              {/* Service Items */}
              <div className="space-y-4">
                {items.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors text-sm md:text-base">
                      {service.name}
                    </span>
                    <div className="flex-1 mx-3 border-b border-dotted border-gray-700 min-w-[40px]" />
                    <span className="text-gold-400 font-semibold whitespace-nowrap">
                      {service.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
