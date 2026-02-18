const combos = [
  {
    name: 'Combo Pronta pra Tudo',
    description: 'Escova + Manicure e Pedicure + Limpeza de Sobrancelhas',
    price: 'R$ 90,00',
    icon: '💎',
  },
  {
    name: 'Combo Renova Total',
    description: 'Corte + Escova + Manicure e Pedicure',
    price: 'R$ 120,00',
    icon: '👑',
  },
]

export default function Combos() {
  return (
    <section id="combos" className="py-20 px-4 bg-dark-950">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold-400 text-lg">✦</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mt-2 mb-2 tracking-wider uppercase font-bold">
            Combos
          </h2>
          <p className="font-cursive text-3xl md:text-4xl text-gold-400 mb-4">promocionais</p>
          <div className="section-divider mb-6" />
          <p className="text-gray-500 text-sm">*Valores sujeitos a avaliação dos fios e comprimento do cabelo</p>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {combos.map((combo, index) => (
            <div
              key={index}
              className="glass-card p-8 text-center hover:border-gold-400/50 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

              <span className="text-4xl mb-4 block">{combo.icon}</span>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-gold-400">★</span>
                <h3 className="font-cursive text-2xl md:text-3xl text-gold-400">
                  {combo.name}
                </h3>
              </div>

              <p className="text-gray-400 mb-8 leading-relaxed">
                {combo.description}
              </p>

              <div className="mb-6">
                <span className="text-gray-500 text-sm">Por apenas</span>
                <p className="text-4xl md:text-5xl font-serif text-gold-400 font-bold mt-1">
                  {combo.price}
                </p>
              </div>

              <a
                href="https://wa.me/5592999836459?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20o%20combo%20" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-block text-sm"
              >
                Agendar Este Combo
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
