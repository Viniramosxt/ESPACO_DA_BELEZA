'use client'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5e6d3] to-[#e8d5c4]">
      <nav className="bg-pink-600 text-white p-4">
        <h1 className="text-2xl font-bold">Espaço da Beleza</h1>
      </nav>
      
      <div className="container mx-auto py-10 px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-pink-800">
          Bem-vinda ao Salão da Beleza
        </h2>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-pink-600 mb-2">Manicure</h3>
            <p className="text-gray-700">Serviços de manicure e esmaltação profissional</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-pink-600 mb-2">Pedicure</h3>
            <p className="text-gray-700">Cuidados especiais para seus pés</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-pink-600 mb-2">Cabelo</h3>
            <p className="text-gray-700">Corte, coloração e tratamentos capilares</p>
          </div>
        </section>
      </div>
    </main>
  )
}
