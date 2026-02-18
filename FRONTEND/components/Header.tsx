'use client'

import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Combos', href: '#combos' },
    { label: 'Localização', href: '#localizacao' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-950/90 backdrop-blur-md border-b border-gold-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-gold-400 flex items-center justify-center">
              <span className="font-cursive text-gold-400 text-xl">EB</span>
            </div>
            <div>
              <h1 className="font-cursive text-gold-400 text-xl leading-tight">Espaço da Beleza</h1>
              <p className="text-[10px] text-gold-600 tracking-[3px] uppercase">Beleza e Cuidado</p>
            </div>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-gray-300 hover:text-gold-400 transition-colors duration-300 tracking-wide uppercase"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/5592999836459"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm"
            >
              Agendar
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gold-400 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-gold-400/20 mt-2 pt-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-gray-300 hover:text-gold-400 transition-colors tracking-wide uppercase text-sm"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/5592999836459"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-block mt-4 text-sm"
            >
              Agendar Horário
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
