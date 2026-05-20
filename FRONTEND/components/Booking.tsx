'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

type Service = { name: string; price: string }

const ALL_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
]

const ALL_SERVICES: Record<string, Service[]> = {
  Cabelos: [
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
  Unhas: [
    { name: 'Manicure', price: 'R$ 25,00' },
    { name: 'Pedicure', price: 'R$ 30,00' },
    { name: 'Combo Pé e Mão', price: 'R$ 50,00' },
  ],
  Sobrancelhas: [
    { name: 'Limpeza de Sobrancelhas', price: 'R$ 15,00' },
    { name: 'Limpeza + Henna', price: 'R$ 25,00' },
  ],
  'Progressiva Orgânica': [
    { name: 'Progressiva Orgânica P (curto)', price: 'R$ 180,00' },
    { name: 'Progressiva Orgânica M (médio)', price: 'R$ 200,00' },
    { name: 'Progressiva Orgânica G (grande)', price: 'R$ 250,00' },
    { name: 'Progressiva Orgânica GG', price: 'R$ 300,00' },
  ],
}

function formatDateBR(dateStr: string): string {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

function todayString(): string {
  const today = new Date()
  const y = today.getFullYear()
  const m = String(today.getMonth() + 1).padStart(2, '0')
  const d = String(today.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function Booking() {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState('Cabelos')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [date, setDate] = useState('')
  const [dateError, setDateError] = useState('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [clientName, setClientName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fetchSlots = useCallback(async (d: string) => {
    setLoadingSlots(true)
    setAvailableSlots([])
    setSelectedTime('')
    try {
      const { data } = await supabase
        .from('appointments')
        .select('time')
        .eq('date', d)
        .neq('status', 'cancelled')
      const booked = (data ?? []).map((a: { time: string }) => a.time)
      setAvailableSlots(ALL_SLOTS.filter((slot) => !booked.includes(slot)))
    } catch {
      setAvailableSlots(ALL_SLOTS)
    } finally {
      setLoadingSlots(false)
    }
  }, [])

  useEffect(() => {
    if (date && !dateError) fetchSlots(date)
  }, [date, dateError, fetchSlots])

  function handleDateChange(value: string) {
    const day = new Date(value + 'T00:00:00').getDay()
    if (day === 0) {
      setDateError('O salão não atende aos domingos.')
      setDate(value)
      setAvailableSlots([])
      setSelectedTime('')
    } else {
      setDateError('')
      setDate(value)
    }
  }

  async function handleSubmit() {
    if (!clientName.trim() || !phone.trim()) {
      setError('Preencha seu nome e telefone.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: clientName.trim(),
          phone: phone.trim(),
          service: selectedService!.name,
          service_price: selectedService!.price,
          date,
          time: selectedTime,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 409) {
          setError(data.error)
          setStep(2)
          await fetchSlots(date)
        } else {
          setError(data.error || 'Erro ao realizar agendamento.')
        }
        return
      }
      setStep(4)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  function resetForm() {
    setStep(1)
    setSelectedService(null)
    setDate('')
    setDateError('')
    setSelectedTime('')
    setAvailableSlots([])
    setClientName('')
    setPhone('')
    setError('')
  }

  const whatsappMessage = encodeURIComponent(
    `Olá Soraia! Acabei de agendar pelo site 😊\n\n` +
      `📋 *Agendamento Confirmado*\n` +
      `👤 Nome: ${clientName}\n` +
      `✂️ Serviço: ${selectedService?.name} (${selectedService?.price})\n` +
      `📅 Data: ${formatDateBR(date)}\n` +
      `⏰ Horário: ${selectedTime}\n` +
      `📱 Telefone: ${phone}`,
  )

  const steps = [
    { n: 1, label: 'Serviço' },
    { n: 2, label: 'Data/Hora' },
    { n: 3, label: 'Seus dados' },
  ]

  return (
    <section id="agendamento" className="py-20 px-4 bg-dark-950">
      <div className="max-w-2xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <svg className="w-5 h-5 text-gold-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <h2 className="font-cursive text-4xl md:text-5xl text-gold-400 mt-2 mb-2">Agendar</h2>
          <p className="font-serif text-2xl md:text-3xl text-white italic mb-4">Horário Online</p>
          <div className="section-divider mb-6" />
          <p className="text-gray-500 text-sm">Atendimento de seg. a sáb. das 9h às 18h</p>
        </div>

        {/* Barra de progresso */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map(({ n, label }, i) => (
              <div key={n} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      n <= step
                        ? 'bg-gold-400 text-dark-950'
                        : 'bg-dark-800 text-gray-600 border border-dark-600'
                    }`}
                  >
                    {n < step ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      n
                    )}
                  </div>
                  <span className={`text-xs mt-1 ${n <= step ? 'text-gold-400' : 'text-gray-600'}`}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-12 h-px mb-4 ${n < step ? 'bg-gold-400' : 'bg-dark-700'}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Passo 1: Selecionar serviço */}
        {step === 1 && (
          <div className="glass-card p-8">
            <h3 className="font-serif text-xl text-gold-400 mb-6">Escolha o Serviço</h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {Object.keys(ALL_SERVICES).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    category === cat
                      ? 'bg-gold-400 text-dark-950 font-medium'
                      : 'border border-gold-400/30 text-gray-400 hover:border-gold-400/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {ALL_SERVICES[category].map((svc) => (
                <button
                  key={svc.name}
                  onClick={() => setSelectedService(svc)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-left ${
                    selectedService?.name === svc.name
                      ? 'bg-gold-400/20 border border-gold-400'
                      : 'border border-dark-700 hover:border-gold-400/40'
                  }`}
                >
                  <span className="text-white text-sm">{svc.name}</span>
                  <span className="text-gold-400 text-sm font-medium">{svc.price}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!selectedService}
              className="btn-gold w-full mt-8 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Próximo →
            </button>
          </div>
        )}

        {/* Passo 2: Data e horário */}
        {step === 2 && (
          <div className="glass-card p-8">
            <button
              onClick={() => setStep(1)}
              className="text-gold-400/70 hover:text-gold-400 text-sm mb-6 flex items-center gap-1 transition-colors"
            >
              ← Voltar
            </button>
            <h3 className="font-serif text-xl text-gold-400 mb-6">Data e Horário</h3>

            <div className="flex items-center justify-between p-3 bg-gold-400/10 rounded-lg border border-gold-400/30 mb-6">
              <span className="text-white text-sm">{selectedService?.name}</span>
              <span className="text-gold-400 text-sm font-medium">{selectedService?.price}</span>
            </div>

            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-2">Data do atendimento</label>
              <input
                type="date"
                min={todayString()}
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors [color-scheme:dark]"
              />
              {dateError && <p className="text-red-400 text-xs mt-2">{dateError}</p>}
            </div>

            {date && !dateError && (
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-3">
                  Horários disponíveis
                  {loadingSlots && (
                    <span className="ml-2 text-xs text-gold-400/60">carregando...</span>
                  )}
                </label>

                {!loadingSlots && availableSlots.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-6 border border-dark-700 rounded-lg">
                    Nenhum horário disponível nesta data.
                  </p>
                )}

                {!loadingSlots && availableSlots.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 rounded-lg text-sm transition-all ${
                          selectedTime === slot
                            ? 'bg-gold-400 text-dark-950 font-medium'
                            : 'border border-dark-600 text-gray-300 hover:border-gold-400/50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => { setError(''); setStep(3) }}
              disabled={!date || !selectedTime || !!dateError}
              className="btn-gold w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Próximo →
            </button>
          </div>
        )}

        {/* Passo 3: Dados do cliente */}
        {step === 3 && (
          <div className="glass-card p-8">
            <button
              onClick={() => setStep(2)}
              className="text-gold-400/70 hover:text-gold-400 text-sm mb-6 flex items-center gap-1 transition-colors"
            >
              ← Voltar
            </button>
            <h3 className="font-serif text-xl text-gold-400 mb-6">Seus Dados</h3>

            <div className="p-4 bg-dark-800 rounded-lg border border-dark-600 mb-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Serviço</span>
                <span className="text-white">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data</span>
                <span className="text-white">{formatDateBR(date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Horário</span>
                <span className="text-gold-400 font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between border-t border-dark-600 pt-2">
                <span className="text-gray-400">Valor</span>
                <span className="text-gold-400 font-medium">{selectedService?.price}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Nome completo *</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">WhatsApp *</label>
                <input
                  type="tel"
                  placeholder="(92) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-600"
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-gold w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? 'Agendando...' : 'Confirmar Agendamento'}
            </button>
          </div>
        )}

        {/* Passo 4: Sucesso */}
        {step === 4 && (
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-400/40">
              <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="font-cursive text-3xl text-gold-400 mb-2">Agendado!</h3>
            <p className="text-gray-300 mb-2">
              <span className="text-white font-medium">{clientName}</span>, seu horário foi registrado.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Confirme pelo WhatsApp para garantir seu horário com a Soraia.
            </p>

            <div className="p-4 bg-dark-800 rounded-lg border border-dark-600 mb-8 space-y-2 text-sm text-left">
              <div className="flex justify-between">
                <span className="text-gray-400">Serviço</span>
                <span className="text-white">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data</span>
                <span className="text-white">{formatDateBR(date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Horário</span>
                <span className="text-gold-400 font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between border-t border-dark-600 pt-2">
                <span className="text-gray-400">Valor</span>
                <span className="text-gold-400 font-medium">{selectedService?.price}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/5592999836459?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center justify-center gap-2 w-full mb-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Confirmar pelo WhatsApp
            </a>

            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
            >
              Fazer outro agendamento
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
