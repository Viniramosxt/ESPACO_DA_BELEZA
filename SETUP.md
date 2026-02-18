# Guia de Configuração - Espaço da Beleza

## 1. Variáveis de Ambiente

### FRONTEND (.env.local)
Copie o conteúdo de `.env.example` e preencha com as credenciais do Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

Como obter:
1. Acesse https://app.supabase.com
2. Selecione seu projeto "Viniramosxt's Project"
3. Vá em Settings → API
4. Copie `Project URL` e `anon public` key

### BACKEND (wrangler.toml)
Edite o arquivo `wrangler.toml` e preencha as mesmas credenciais:

```toml
[env.production]
vars = { SUPABASE_URL = "https://seu-projeto.supabase.co", SUPABASE_KEY = "sua-chave-aqui" }

[env.development]
vars = { SUPABASE_URL = "https://seu-projeto.supabase.co", SUPABASE_KEY = "sua-chave-aqui" }
```

## 2. Tabelas Necessárias no Supabase

Execute as queries abaixo no SQL Editor do Supabase:

```sql
-- Tabela de Serviços
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration_minutes INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Agendamentos
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20),
  service_id UUID REFERENCES services(id),
  appointment_date TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Profissionais
CREATE TABLE professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(100),
  phone VARCHAR(20),
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 3. Deploy

### Frontend (Netlify)
1. Acesse https://app.netlify.com
2. Clique em "Add new site" → "Import an existing project"
3. Selecione seu repositório GitHub
4. Branch: `main`
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Adicione variáveis de ambiente nas Settings

### Backend (Cloudflare Workers)
1. Certifique-se que tem wrangler instalado: `npm install -g wrangler`
2. Faça login: `wrangler login`
3. Dentro da pasta BACKEND: `wrangler deploy`

## 4. Teste a API

```
GET https://seu-worker.workers.dev/api/health
GET https://seu-worker.workers.dev/api/services
GET https://seu-worker.workers.dev/api/appointments
```
