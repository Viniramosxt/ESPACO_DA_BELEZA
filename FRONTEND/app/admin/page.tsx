'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const ADMIN_PASSWORD = 'soraia2026'

type Appointment = {
  id: string
  client_name: string
  phone: string
  service: string
  service_price: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

function todayString() {
  const today = new Date()
  const y = today.getFullYear()
  const m = String(today.getMonth() + 1).padStart(2, '0')
  const d = String(today.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDateBR(dateStr: string) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

const statusConfig = {
  pending:   { label: 'Pendente',   bg: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
  confirmed: { label: 'Confirmado', bg: 'bg-green-500/20  text-green-400  border-green-500/40'  },
  cancelled: { label: 'Cancelado',  bg: 'bg-red-500/20    text-red-400    border-red-500/40'    },
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [date, setDate] = useState(todayString())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === '1') setAuthed(true)
  }, [])

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1')
      setAuthed(true)
    } else {
      setPasswordError('Senha incorreta.')
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_auth')
    setAuthed(false)
    setPassword('')
  }

  async function fetchAppointments(d: string) {
    setLoading(true)
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .eq('date', d)
      .order('time')
    setAppointments((data as Appointment[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    if (authed) fetchAppointments(date)
  }, [authed, date])

  async function updateStatus(id: string, status: Appointment['status']) {
    setUpdatingId(id)
    await supabase.from('appointments').update({ status }).eq('id', id)
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a)),
    )
    setUpdatingId(null)
  }

  // Tela de login
  if (!authed) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
        <div className="glass-card p-8 w-full max-w-sm text-center">
          <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-full border-2 border-gold-400 mx-auto mb-4 object-cover" />
          <h1 className="font-cursive text-3xl text-gold-400 mb-1">Painel Admin</h1>
          <p className="text-gray-500 text-sm mb-8">Espaço da Beleza</p>

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError('') }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg px-4 py-3 mb-3 focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-600"
          />
          {passwordError && <p className="text-red-400 text-sm mb-3">{passwordError}</p>}
          <button onClick={handleLogin} className="btn-gold w-full">
            Entrar
          </button>
        </div>
      </div>
    )
  }

  const total = appointments.length
  const confirmed = appointments.filter((a) => a.status === 'confirmed').length
  const pending = appointments.filter((a) => a.status === 'pending').length

  return (
    <div className="min-h-screen bg-dark-950 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full border border-gold-400 object-cover" />
            <div>
              <h1 className="font-cursive text-2xl text-gold-400 leading-tight">Painel Admin</h1>
              <p className="text-gray-500 text-xs">Espaço da Beleza</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            Sair
          </button>
        </div>

        {/* Seletor de data */}
        <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <label className="text-gray-400 text-sm whitespace-nowrap">Ver agenda de:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-dark-800 border border-dark-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400 transition-colors [color-scheme:dark]"
            />
          </div>
          <button
            onClick={() => setDate(todayString())}
            className="text-gold-400 text-sm border border-gold-400/30 px-3 py-2 rounded-lg hover:bg-gold-400/10 transition-all"
          >
            Hoje
          </button>
        </div>

        {/* Cards resumo */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total', value: total, color: 'text-white' },
            { label: 'Confirmados', value: confirmed, color: 'text-green-400' },
            { label: 'Pendentes', value: pending, color: 'text-yellow-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="glass-card p-4 text-center">
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-gray-500 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Lista de agendamentos */}
        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-dark-700">
            <h2 className="font-serif text-gold-400 text-lg">
              Agenda — {formatDateBR(date)}
            </h2>
          </div>

          {loading && (
            <p className="text-center text-gray-500 text-sm py-10">Carregando...</p>
          )}

          {!loading && appointments.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-10">
              Nenhum agendamento nesta data.
            </p>
          )}

          {!loading && appointments.length > 0 && (
            <div className="divide-y divide-dark-700">
              {appointments.map((a) => (
                <div key={a.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Horário */}
                  <div className="text-gold-400 font-bold text-lg w-14 shrink-0">{a.time}</div>

                  {/* Dados */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{a.client_name}</p>
                    <p className="text-gray-400 text-sm">{a.service} · {a.service_price}</p>
                    <a
                      href={`https://wa.me/55${a.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 text-xs hover:underline"
                    >
                      {a.phone}
                    </a>
                  </div>

                  {/* Status badge */}
                  <span className={`text-xs px-2 py-1 rounded-full border ${statusConfig[a.status].bg} shrink-0`}>
                    {statusConfig[a.status].label}
                  </span>

                  {/* Ações */}
                  <div className="flex gap-2 shrink-0">
                    {a.status !== 'confirmed' && (
                      <button
                        onClick={() => updateStatus(a.id, 'confirmed')}
                        disabled={updatingId === a.id}
                        className="text-xs px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 border border-green-500/40 hover:bg-green-500/30 transition-all disabled:opacity-40"
                      >
                        Confirmar
                      </button>
                    )}
                    {a.status !== 'cancelled' && (
                      <button
                        onClick={() => updateStatus(a.id, 'cancelled')}
                        disabled={updatingId === a.id}
                        className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 transition-all disabled:opacity-40"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
