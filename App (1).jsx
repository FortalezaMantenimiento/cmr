// ============================================================
//  📌 PASO 2: PEGA ESTE ARCHIVO EN src/App.jsx
//  Asegúrate de tener instaladas las dependencias:
//  npm install @supabase/supabase-js
//  npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
// ============================================================

import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabaseClient'

// ─── Constantes de estado ───────────────────────────────────
const STATUS_CONFIG = {
  Pendiente:  { label: 'Pendiente',   bg: 'bg-gray-100',   text: 'text-gray-600',  dot: 'bg-gray-400'  },
  'En Proceso': { label: 'En Proceso', bg: 'bg-blue-100',  text: 'text-blue-700',  dot: 'bg-blue-500'  },
  Completado: { label: 'Completado',  bg: 'bg-green-100',  text: 'text-green-700', dot: 'bg-green-500' },
}

const PRIORITY_CONFIG = {
  Alta:   { bg: 'bg-red-100',    text: 'text-red-700'    },
  Media:  { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  Baja:   { bg: 'bg-slate-100',  text: 'text-slate-600'  },
}

// ─── Componente: Badge de Estado ────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG['Pendiente']
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

// ─── Componente: Badge de Prioridad ─────────────────────────
function PriorityBadge({ priority }) {
  const cfg = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG['Media']
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      {priority}
    </span>
  )
}

// ─── Componente: Skeleton Loader ─────────────────────────────
function SkeletonRow() {
  return (
    <div className="animate-pulse flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-6 bg-gray-200 rounded-full w-24" />
      <div className="h-6 bg-gray-200 rounded w-16 ml-auto" />
    </div>
  )
}

// ─── Componente: Login ───────────────────────────────────────
function LoginForm({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">CRM Mantenimiento</h1>
          <p className="text-slate-400 text-sm mt-1">Inicia sesión para continuar</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="usuario@empresa.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg text-sm transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Verificando...
                </>
              ) : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ─── Componente: Vista Admin ─────────────────────────────────
function AdminDashboard({ user }) {
  const [tickets, setTickets]     = useState([])
  const [operarios, setOperarios] = useState([])
  const [loading, setLoading]     = useState(true)
  const [creating, setCreating]   = useState(false)
  const [showForm, setShowForm]   = useState(false)
  const [form, setForm] = useState({
    titulo: '', prioridad: 'Media', id_operario: ''
  })
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    // Cargar tickets
    const { data: ticketsData, error: tErr } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false })

    // Cargar operarios desde profiles
    const { data: profilesData, error: pErr } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .eq('role', 'operario')

    if (tErr || pErr) {
      showToast('Error cargando datos', 'error')
    } else {
      setTickets(ticketsData ?? [])
      setOperarios(profilesData ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.titulo.trim()) return
    setCreating(true)
    const { error } = await supabase.from('tickets').insert([{
      titulo: form.titulo,
      prioridad: form.prioridad,
      id_operario: form.id_operario || null,
      estado: 'Pendiente',
    }])
    setCreating(false)
    if (error) {
      showToast('Error al crear el ticket: ' + error.message, 'error')
    } else {
      showToast('Ticket creado correctamente ✓')
      setForm({ titulo: '', prioridad: 'Media', id_operario: '' })
      setShowForm(false)
      fetchData()
    }
  }

  // ── Estadísticas ──
  const stats = {
    total:      tickets.length,
    pendiente:  tickets.filter(t => t.estado === 'Pendiente').length,
    enProceso:  tickets.filter(t => t.estado === 'En Proceso').length,
    completado: tickets.filter(t => t.estado === 'Completado').length,
  }

  const STAT_CARDS = [
    { label: 'Total',       value: stats.total,      color: 'bg-slate-700',  icon: '📋' },
    { label: 'Pendientes',  value: stats.pendiente,  color: 'bg-gray-500',   icon: '⏳' },
    { label: 'En Proceso',  value: stats.enProceso,  color: 'bg-blue-600',   icon: '🔄' },
    { label: 'Completados', value: stats.completado, color: 'bg-green-600',  icon: '✅' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 transition-all ${
          toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
        }`}>
          {toast.type === 'error' ? '✗' : '✓'} {toast.msg}
        </div>
      )}

      {/* Navbar */}
      <Navbar user={user} role="admin" />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STAT_CARDS.map(card => (
            <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{card.icon}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${card.color}`}>
                  {card.label}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Header + Botón crear */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Todos los Tickets</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <span className="text-lg leading-none">{showForm ? '✕' : '+'}</span>
            {showForm ? 'Cancelar' : 'Nuevo Ticket'}
          </button>
        </div>

        {/* Formulario crear ticket */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-base font-bold text-gray-800 mb-5">Crear Nuevo Ticket</h3>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Título *</label>
                <input
                  required
                  value={form.titulo}
                  onChange={e => setForm({...form, titulo: e.target.value})}
                  placeholder="Ej: Revisión sistema eléctrico Sala A"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Prioridad</label>
                <select
                  value={form.prioridad}
                  onChange={e => setForm({...form, prioridad: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
                >
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Asignar a Operario</label>
                <select
                  value={form.id_operario}
                  onChange={e => setForm({...form, id_operario: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
                >
                  <option value="">Sin asignar</option>
                  {operarios.map(op => (
                    <option key={op.id} value={op.id}>
                      {op.full_name ?? op.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={creating}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg text-sm transition flex items-center justify-center gap-2"
                >
                  {creating ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Creando...
                    </>
                  ) : 'Crear Ticket'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabla de tickets */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6 space-y-3">
                {[1,2,3,4].map(i => <SkeletonRow key={i} />)}
              </div>
            ) : tickets.length === 0 ? (
              <EmptyState text="No hay tickets aún. ¡Crea el primero!" />
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Título</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Prioridad</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Operario ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {tickets.map(ticket => (
                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800 max-w-xs truncate">{ticket.titulo}</td>
                      <td className="px-4 py-4"><StatusBadge status={ticket.estado} /></td>
                      <td className="px-4 py-4"><PriorityBadge priority={ticket.prioridad} /></td>
                      <td className="px-4 py-4 text-gray-400 font-mono text-xs">
                        {ticket.id_operario ? ticket.id_operario.slice(0, 8) + '…' : (
                          <span className="text-gray-300 italic">Sin asignar</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </main>
    </div>
  )
}

// ─── Componente: Vista Operario ──────────────────────────────
function OperarioDashboard({ user }) {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null) // id del ticket que se está actualizando
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchTickets = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id_operario', user.id)
      .neq('estado', 'Completado') // ocultamos los ya completados por defecto
      .order('created_at', { ascending: false })

    if (error) showToast('Error cargando tareas', 'error')
    else setTickets(data ?? [])
    setLoading(false)
  }, [user.id])

  useEffect(() => { fetchTickets() }, [fetchTickets])

  const updateStatus = async (ticketId, newStatus) => {
    setUpdating(ticketId)
    const { error } = await supabase
      .from('tickets')
      .update({ estado: newStatus })
      .eq('id', ticketId)

    if (error) {
      showToast('Error actualizando estado', 'error')
    } else {
      showToast(`Ticket marcado como "${newStatus}" ✓`)
      setTickets(prev =>
        newStatus === 'Completado'
          ? prev.filter(t => t.id !== ticketId)
          : prev.map(t => t.id === ticketId ? { ...t, estado: newStatus } : t)
      )
    }
    setUpdating(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 ${
          toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
        }`}>
          {toast.type === 'error' ? '✗' : '✓'} {toast.msg}
        </div>
      )}

      <Navbar user={user} role="operario" />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Mis Tareas Pendientes</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {loading ? '...' : `${tickets.length} tarea${tickets.length !== 1 ? 's' : ''} activa${tickets.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button onClick={fetchTickets} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
            ↻ Actualizar
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <SkeletonRow key={i} />)}
          </div>
        ) : tickets.length === 0 ? (
          <EmptyState text="🎉 No tienes tareas pendientes. ¡Todo al día!" />
        ) : (
          <div className="space-y-3">
            {tickets.map(ticket => (
              <div key={ticket.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-base leading-tight">{ticket.titulo}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <StatusBadge status={ticket.estado} />
                      <PriorityBadge priority={ticket.prioridad} />
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  {ticket.estado !== 'En Proceso' && (
                    <button
                      onClick={() => updateStatus(ticket.id, 'En Proceso')}
                      disabled={updating === ticket.id}
                      className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
                    >
                      {updating === ticket.id ? '...' : '🔄 Iniciar'}
                    </button>
                  )}
                  {ticket.estado !== 'Completado' && (
                    <button
                      onClick={() => updateStatus(ticket.id, 'Completado')}
                      disabled={updating === ticket.id}
                      className="flex-1 py-2 px-3 bg-green-50 hover:bg-green-100 text-green-700 font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
                    >
                      {updating === ticket.id ? '...' : '✅ Completar'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}

// ─── Componente: Navbar ──────────────────────────────────────
function Navbar({ user, role }) {
  const handleLogout = () => supabase.auth.signOut()

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">⚙</span>
          </div>
          <div>
            <span className="font-bold text-gray-800 text-sm">CRM Mantenimiento</span>
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-semibold ${
              role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {role === 'admin' ? 'Administrador' : 'Operario'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}

// ─── Componente: Empty State ──────────────────────────────────
function EmptyState({ text }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
      <div className="text-4xl mb-3">📭</div>
      <p className="text-sm">{text}</p>
    </div>
  )
}

// ─── App Principal ───────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(undefined) // undefined = cargando
  const [role, setRole]       = useState(null)
  const [loadingRole, setLoadingRole] = useState(false)

  // 1. Escuchar cambios de sesión
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (!session) setRole(null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  // 2. Cuando hay sesión, obtener el rol
  useEffect(() => {
    if (!session?.user) return
    setLoadingRole(true)
    supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
      .then(({ data, error }) => {
        if (error) console.error('Error obteniendo role:', error.message)
        else setRole(data?.role ?? null)
        setLoadingRole(false)
      })
  }, [session])

  // ── Estados de carga ──
  if (session === undefined || loadingRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin w-10 h-10 text-blue-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <p className="text-gray-400 text-sm">Cargando sistema...</p>
        </div>
      </div>
    )
  }

  if (!session) return <LoginForm />

  if (!role) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow text-center max-w-sm">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-gray-600 font-medium">No se encontró un perfil válido para este usuario.</p>
        <p className="text-gray-400 text-sm mt-2">Contacta al administrador para asignarte un rol.</p>
        <button onClick={() => supabase.auth.signOut()} className="mt-4 text-sm text-red-500 hover:text-red-700">
          Cerrar sesión
        </button>
      </div>
    </div>
  )

  // ── Routing por rol ──
  return role === 'admin'
    ? <AdminDashboard user={session.user} />
    : <OperarioDashboard user={session.user} />
}
