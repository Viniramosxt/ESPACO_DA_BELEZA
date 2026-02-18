const payments = [
  { method: 'Cartão de Crédito', icon: 'credit' },
  { method: 'Cartão de Débito', icon: 'debit' },
  { method: 'PIX', icon: 'pix' },
  { method: 'Dinheiro', icon: 'cash' },
]

const PaymentIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'credit':
    case 'debit':
      return (
        <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      )
    case 'pix':
      return (
        <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      )
    case 'cash':
      return (
        <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      )
    default:
      return null
  }
}

export default function Payment() {
  return (
    <section className="py-20 px-4 bg-dark-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <svg className="w-5 h-5 text-gold-400 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"/></svg>
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
              <div className="mb-3 flex justify-center"><PaymentIcon type={item.icon} /></div>
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
