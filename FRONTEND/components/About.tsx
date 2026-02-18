export default function About() {
  return (
    <section id="sobre" className="py-20 px-4 bg-dark-950">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold-400 text-lg">✦</span>
          <h2 className="font-cursive text-4xl md:text-5xl text-gold-400 mt-2 mb-4">Sobre Nós</h2>
          <div className="section-divider mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Conheça o Espaço da Beleza
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="relative">
            <div className="glass-card p-8 text-center">
              <div className="w-40 h-40 mx-auto rounded-full border-2 border-gold-400/50 flex items-center justify-center mb-6 bg-dark-800">
                <span className="font-cursive text-gold-400 text-5xl">SF</span>
              </div>
              <h3 className="font-serif text-2xl text-gold-400 mb-2">Soraia Fernandes</h3>
              <p className="text-gold-600 text-sm tracking-widest uppercase">Fundadora & Profissional</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-6">
              Transformando autoestima em <span className="text-gold-400">beleza</span> desde 2011
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              O Espaço da Beleza é mais do que um salão — é um lugar onde cada cliente
              é tratada com carinho e atenção. Com mais de 14 anos de experiência,
              Soraia Fernandes se dedica a realçar a beleza natural de cada mulher.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Localizado na Zona Norte de Manaus, oferecemos um ambiente acolhedor
              e serviços de alta qualidade em cabelos, unhas e sobrancelhas.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center glass-card p-4">
                <p className="font-serif text-3xl text-gold-400 mb-1">14+</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Anos</p>
              </div>
              <div className="text-center glass-card p-4">
                <p className="font-serif text-3xl text-gold-400 mb-1">1000+</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Clientes</p>
              </div>
              <div className="text-center glass-card p-4">
                <p className="font-serif text-3xl text-gold-400 mb-1">20+</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Serviços</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
