import { useNavigate } from '@/lib/router-compat';
import { Users, FileText, Calendar, AlertTriangle, ChevronRight, TrendingUp } from 'lucide-react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { pacientes, exames, consultas, getResultadosAlterados, getResultadosByExame } from '@/data/mockData';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const consultasAgendadas = consultas.filter(c => c.status === 'agendada');
  const totalAlterados = pacientes.reduce((acc, p) => acc + getResultadosAlterados(p.id).length, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visão geral dos seus pacientes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={Users} title="Pacientes" value={pacientes.length} subtitle="Ativos" />
        <StatCard icon={FileText} title="Exames" value={exames.length} subtitle="Total registrados" />
        <StatCard icon={Calendar} title="Consultas" value={consultasAgendadas.length} subtitle="Agendadas" />
        <StatCard icon={AlertTriangle} title="Alertas" value={totalAlterados} subtitle="Valores alterados" trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pacientes com alertas */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-foreground">Pacientes</h2>
            <button onClick={() => navigate('/pacientes')} className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
              Ver todos <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {pacientes.map(paciente => {
              const alterados = getResultadosAlterados(paciente.id);
              const examesPaciente = exames.filter(e => e.pacienteId === paciente.id);
              const ultimoExame = examesPaciente.sort((a, b) => b.dataUpload.localeCompare(a.dataUpload))[0];

              return (
                <button key={paciente.id} onClick={() => navigate(`/pacientes/${paciente.id}`)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full gradient-medical flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {paciente.nome.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{paciente.nome}</p>
                      <p className="text-xs text-muted-foreground">
                        Último exame: {ultimoExame ? new Date(ultimoExame.dataUpload).toLocaleDateString('pt-BR') : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {alterados.length > 0 && (
                      <span className="text-xs font-medium text-destructive flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {alterados.length} alterado{alterados.length > 1 ? 's' : ''}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Próximas consultas */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-5">Próximas Consultas</h2>
          <div className="space-y-4">
            {consultasAgendadas.map(consulta => {
              const paciente = pacientes.find(p => p.id === consulta.pacienteId);
              return (
                <div key={consulta.id} className="p-4 rounded-xl bg-muted/30 space-y-2">
                  <p className="font-medium text-foreground text-sm">{paciente?.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(consulta.data).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Agendada
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
