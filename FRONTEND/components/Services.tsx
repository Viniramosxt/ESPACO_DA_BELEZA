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

const categoryIcons: Record<string, string> = {
  cabelos: '💇‍♀️',
  unhas: '💅',
  sobrancelhas: '✨',
  progressiva: '🌿',
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
          <span className="text-gold-400 text-lg">✦</span>
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
                <span className="text-2xl">{categoryIcons[category]}</span>
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
