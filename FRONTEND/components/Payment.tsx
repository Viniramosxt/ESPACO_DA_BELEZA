const payments = [
  { method: 'Cartão de Crédito', icon: '💳' },
  { method: 'Cartão de Débito', icon: '💳' },
  { method: 'PIX', icon: '📱' },
  { method: 'Dinheiro', icon: '💵' },
]

export default function Payment() {
  return (
    <section className="py-20 px-4 bg-dark-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold-400 text-lg">✦</span>
          <h2 className="font-serif text-2xl md:text-3xl text-white mt-2 mb-2">Formas de</h2>
          <p className="font-cursive text-4xl md:text-5xl text-gold-400 mb-4">pagamento</p>
          <div className="section-divider" />
        </div>

        {/* Payment Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {payments.map((item, index) => (
            <div
              key={index}
              className="glass-card p-6 text-center hover:border-gold-400/40 transition-all duration-300"
            >
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <p className="text-white font-medium text-sm">{item.method}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8 italic">
          *Pagamentos no Cartão incluirão a taxa da máquina, sem juros.
        </p>
      </div>
    </section>
  )
}
