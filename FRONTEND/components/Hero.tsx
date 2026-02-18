export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
        {/* Gold sparkle particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-gold-400 rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-gold-300 rounded-full opacity-40 animate-pulse delay-300" />
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-gold-500 rounded-full opacity-50 animate-pulse delay-700" />
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-gold-400 rounded-full opacity-25 animate-pulse delay-500" />
        <div className="absolute bottom-60 left-1/2 w-1.5 h-1.5 bg-gold-300 rounded-full opacity-35 animate-pulse delay-1000" />
        
        {/* Gold gradient accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gold-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gold-400/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-400" />
          <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-400" />
        </div>

        {/* Logo text */}
        <div className="mb-4">
          <img src="/logo.png" alt="Espaço da Beleza" className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-gold-400 mb-6" />
        </div>

        <h1 className="font-cursive text-5xl md:text-7xl lg:text-8xl text-gold-400 mb-4 fade-in-up">
          Espaço da Beleza
        </h1>

        <p className="text-gold-600 tracking-[6px] uppercase text-sm md:text-base mb-8">
          Beleza e Cuidado
        </p>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-4 font-light leading-relaxed">
          Transformando autoestima em beleza desde 2011
        </p>

        <p className="text-gray-500 text-base mb-10">
          por <span className="text-gold-400 font-medium">Soraia Fernandes</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/5592999836459?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-base flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Agendar Horário
          </a>
          <a
            href="#servicos"
            className="border border-gold-400/50 text-gold-400 px-8 py-3 rounded-full hover:bg-gold-400/10 transition-all duration-300 text-base tracking-wide"
          >
            Ver Serviços
          </a>
        </div>

        {/* Decorative bottom */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-400" />
          <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-400" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gold-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
