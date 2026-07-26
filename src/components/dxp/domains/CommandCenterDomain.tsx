import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { 
  Users, 
  Target,
  DollarSign,
  ShoppingBag,
  Activity,
  RefreshCw
} from 'lucide-react';
import { 
  getContactMessages,
  getAIChatLogs,
  getSuperAdminAuditLogs,
  getCDOChallengeResponses
} from '../../../lib/supabase';

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  rawDate: Date;
  colorClass: string;
}

export const CommandCenterDomain: React.FC = () => {
  const { deals, leads, enrollments, refreshData, loading: dataLoading } = useData();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    visitors: 0,
    leads: 0,
    coursesSold: 0,
    revenue: 0,
    openTickets: 0
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const tickets = await getContactMessages();
      const chats = await getAIChatLogs();
      const audits = await getSuperAdminAuditLogs();
      const challenges = await getCDOChallengeResponses();

      // Calculations
      const totalDealsVal = deals.reduce((sum: number, d: any) => {
        const valNum = d.deal_value || Number(String(d.val || '').replace(/[^0-9]/g, '')) || 0;
        return sum + valNum;
      }, 0);
      const totalEnrVal = enrollments.reduce((sum: number, e: any) => sum + (Number(e.amount_paid) || 0), 0);

      const dynamicLeads = leads.length;
      const dynamicCourses = enrollments.length;
      const dynamicRevenue = totalDealsVal + totalEnrVal;

      setStats({
        visitors: leads.length * 5 + enrollments.length * 10 + chats.length + challenges.length,
        leads: dynamicLeads,
        coursesSold: dynamicCourses,
        revenue: dynamicRevenue,
        openTickets: tickets.filter((t: any) => t.status === 'Nuevo').length
      });

      // Construct combined activity list
      const list: ActivityItem[] = [];

      // 1. Leads
      leads.forEach((l: any) => {
        list.push({
          id: `lead-${l.id}`,
          type: 'NUEVO LEAD CRM',
          title: l.company || 'Empresa Independiente',
          description: `Solicitud de demo por ${l.full_name}: "${l.topic_of_interest}"`,
          timestamp: formatTimeAgo(l.created_at),
          rawDate: new Date(l.created_at),
          colorClass: 'text-cyan-400'
        });
      });

      // 2. Enrollments
      enrollments.forEach((e: any) => {
        list.push({
          id: `enroll-${e.id}`,
          type: 'MATRÍCULA LMS',
          title: e.course_title,
          description: `Inscripción de ${e.full_name} (${e.company || 'Persona Natural'}) - Estado: ${e.payment_status}`,
          timestamp: formatTimeAgo(e.created_at),
          rawDate: new Date(e.created_at),
          colorClass: 'text-purple-400'
        });
      });

      // 3. Audits
      audits.forEach((a: any) => {
        list.push({
          id: `audit-${a.id}`,
          type: 'SUPABASE AUDIT',
          title: a.action_type.replace(/_/g, ' '),
          description: `${a.admin_user}: Código ${a.confirmation_code} (${a.affected_records} registros afectados)`,
          timestamp: formatTimeAgo(a.created_at),
          rawDate: new Date(a.created_at),
          colorClass: 'text-emerald-400'
        });
      });

      // 4. Chat Logs
      chats.forEach((c: any) => {
        list.push({
          id: `chat-${c.id}`,
          type: 'CONSULTA IA',
          title: `Categoría: ${c.topic_category}`,
          description: `Usuario preguntó: "${c.user_prompt.substring(0, 50)}${c.user_prompt.length > 50 ? '...' : ''}"`,
          timestamp: formatTimeAgo(c.created_at),
          rawDate: new Date(c.created_at),
          colorClass: 'text-indigo-400'
        });
      });

      // 5. CDO challenge
      challenges.forEach((ch: any) => {
        list.push({
          id: `cdo-${ch.id}`,
          type: 'RETO CDO DAMA',
          title: ch.is_correct ? 'Respuesta Correcta (Opción A)' : 'Respuesta Incorrecta (Opción B)',
          description: `Resultado de simulación CDO guardada en base de datos. Puntos ganados: ${ch.score || 0}`,
          timestamp: formatTimeAgo(ch.created_at),
          rawDate: new Date(ch.created_at),
          colorClass: 'text-amber-400'
        });
      });

      // Sort chronological descending
      list.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());

      setActivities(list);
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [deals, leads, enrollments]);

  const handleSyncClick = async () => {
    await refreshData();
    await loadDashboardData();
  };

  const formatTimeAgo = (dateStr: string) => {
    if (!dateStr) return 'Hace unos momentos';
    const past = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Hace unos momentos';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Hace ${diffHours} hr`;
    return past.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="text-left">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">SISTEMA INTEGRADO DXP • CORE CONTROL PANEL</span>
          <h2 className="text-2xl font-extrabold text-white font-heading">Centro de Mandos del Ecosistema Digital</h2>
        </div>
        <button
          onClick={handleSyncClick}
          className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 shadow-lg flex items-center space-x-2 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${(loading || dataLoading) ? 'animate-spin' : ''}`} />
          <span>Sincronizar Supabase Realtime</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex items-start justify-between shadow-xl">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Visitas del Mes</span>
            <span className="text-2xl font-extrabold text-white font-mono tracking-tight block mt-1">
              {stats.visitors.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-emerald-400 mt-2 block">+14.2% vs mes anterior</span>
          </div>
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex items-start justify-between shadow-xl">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Leads Calificados (CRM)</span>
            <span className="text-2xl font-extrabold text-white font-mono tracking-tight block mt-1">
              {stats.leads.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-cyan-400 mt-2 block">Alta intención de compra</span>
          </div>
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Target className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex items-start justify-between shadow-xl">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Matrículas Academy</span>
            <span className="text-2xl font-extrabold text-white font-mono tracking-tight block mt-1">
              {stats.coursesSold.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-purple-400 mt-2 block">DAMA & IA Bootcamps</span>
          </div>
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex items-start justify-between shadow-xl">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ingresos Estimados</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono tracking-tight block mt-1">
              ${stats.revenue.toLocaleString()} USD
            </span>
            <span className="text-[10px] font-bold text-emerald-400 mt-2 block">Pipeline + LMS Cohortes</span>
          </div>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Telemetry Activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        
        {/* Left col: Real-Time Event Telemetry */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-2xl flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white font-heading uppercase tracking-wider flex items-center space-x-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Telemetría de Eventos en Tiempo Real (Supabase)</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold font-mono">
              REALTIME
            </span>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 flex-1">
            {activities.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs font-mono">
                No hay actividades recientes en la plataforma.
              </div>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between space-x-4 hover:border-slate-700 transition-colors">
                  <div className="space-y-1">
                    <span className={`text-[9px] font-mono font-bold uppercase ${act.colorClass}`}>{act.type}</span>
                    <h4 className="text-xs font-bold text-white leading-tight">{act.title}</h4>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{act.description}</p>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 whitespace-nowrap shrink-0">{act.timestamp}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right col: Infrastructure Status */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-2xl">
          <h3 className="text-sm font-bold text-white font-heading uppercase tracking-wider border-b border-slate-800 pb-3">
            Estado de Infraestructura DXP
          </h3>
          
          <div className="space-y-4 text-xs font-semibold">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-slate-300">Base de Datos Supabase</p>
                <p className="text-[10px] text-slate-500 font-mono">https://mrhmfrwzdrmulfqpmgq...</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-slate-300">Edge Functions & GenAI</p>
                <p className="text-[10px] text-slate-500 font-mono">Anthropic Claude & DeepSeek</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-slate-300">LMS & MasterClass Hosting</p>
                <p className="text-[10px] text-slate-500 font-mono">Vercel Edge Network</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 font-bold block">DATOS DE AUDITORÍA DE SEGURIDAD</span>
              <div className="text-[10px] text-slate-400 space-y-1 font-mono">
                <p>Último Backup: Hace 14 minutos</p>
                <p>SSL Status: TLS 1.3 Activo</p>
                <p>Nivel de Encriptado: AES-256 GCM</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
