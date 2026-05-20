import { createClient } from '@supabase/supabase-js'

interface Env {
  SUPABASE_URL: string
  SUPABASE_KEY: string
  EVOLUTION_API_URL: string
  EVOLUTION_API_KEY: string
  EVOLUTION_INSTANCE: string
}

interface AppointmentBody {
  client_name?: string
  phone?: string
  service?: string
  service_price?: string
  date?: string
  time?: string
}

const ALL_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
]

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY)

    const json = (data: unknown, status = 200) =>
      new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })

    try {
      if (url.pathname === '/api/health') {
        return json({ status: 'ok' })
      }

      if (url.pathname === '/api/services' && request.method === 'GET') {
        const { data, error } = await supabase.from('services').select('*')
        if (error) throw error
        return json(data)
      }

      // GET horários disponíveis para uma data
      if (url.pathname === '/api/appointments/available' && request.method === 'GET') {
        const date = url.searchParams.get('date')
        if (!date) return json({ error: 'Parâmetro date é obrigatório' }, 400)

        const today = new Date().toISOString().split('T')[0]
        if (date < today) return json({ available: [] })

        const { data, error } = await supabase
          .from('appointments')
          .select('time')
          .eq('date', date)
          .neq('status', 'cancelled')
        if (error) throw error

        const booked = (data ?? []).map((a: { time: string }) => a.time)
        const available = ALL_SLOTS.filter((slot) => !booked.includes(slot))
        return json({ available })
      }

      // GET todos os agendamentos (uso admin)
      if (url.pathname === '/api/appointments' && request.method === 'GET') {
        const date = url.searchParams.get('date')
        let query = supabase.from('appointments').select('*').order('date').order('time')
        if (date) query = query.eq('date', date)
        const { data, error } = await query
        if (error) throw error
        return json(data)
      }

      // POST criar agendamento
      if (url.pathname === '/api/appointments' && request.method === 'POST') {
        const body = (await request.json()) as AppointmentBody
        const { client_name, phone, service, service_price, date, time } = body

        if (!client_name?.trim() || !phone?.trim() || !service?.trim() || !date || !time) {
          return json({ error: 'Campos obrigatórios: client_name, phone, service, date, time' }, 400)
        }

        if (!ALL_SLOTS.includes(time)) {
          return json({ error: 'Horário inválido.' }, 400)
        }

        const { data: existing } = await supabase
          .from('appointments')
          .select('id')
          .eq('date', date)
          .eq('time', time)
          .neq('status', 'cancelled')
          .maybeSingle()

        if (existing) {
          return json({ error: 'Horário já reservado. Escolha outro horário.' }, 409)
        }

        const { data, error } = await supabase
          .from('appointments')
          .insert({
            client_name: client_name.trim(),
            phone: phone.trim(),
            service: service.trim(),
            service_price,
            date,
            time,
            status: 'pending',
          })
          .select()
          .single()

        if (error) throw error

        // Notificar Soraia via Evolution API (WhatsApp)
        if (env.EVOLUTION_API_URL && env.EVOLUTION_API_KEY && env.EVOLUTION_INSTANCE) {
          const msg =
            `🔔 *Novo Agendamento!*\n` +
            `👤 ${client_name.trim()}\n` +
            `✂️ ${service.trim()} (${service_price ?? ''})\n` +
            `📅 ${date}  ⏰ ${time}\n` +
            `📱 ${phone.trim()}`

          ctx.waitUntil(
            fetch(`${env.EVOLUTION_API_URL}/message/sendText/${env.EVOLUTION_INSTANCE}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': env.EVOLUTION_API_KEY,
              },
              body: JSON.stringify({
                number: '5592999836459',
                options: { delay: 0 },
                textMessage: { text: msg },
              }),
            })
          )
        }

        return json(data, 201)
      }

      // PATCH atualizar status (uso admin)
      if (url.pathname.startsWith('/api/appointments/') && request.method === 'PATCH') {
        const id = url.pathname.split('/').pop()
        const body = (await request.json()) as { status?: string }
        if (!body.status || !['pending', 'confirmed', 'cancelled'].includes(body.status)) {
          return json({ error: 'Status inválido.' }, 400)
        }
        const { data, error } = await supabase
          .from('appointments')
          .update({ status: body.status })
          .eq('id', id)
          .select()
          .single()
        if (error) throw error
        return json(data)
      }

      return json({ error: 'Not found' }, 404)
    } catch (error) {
      return json(
        { error: error instanceof Error ? error.message : 'Internal server error' },
        500,
      )
    }
  },
}
