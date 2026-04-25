import { useAuth } from '@/contexts/AuthContext';
import { FileText, TrendingUp, AlertTriangle, Calendar } from 'lucide-react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import ParametroChart from '@/components/ParametroChart';
import { pacientes, getExamesByPaciente, getResultadosByExame, getResultadosAlterados, consultas } from '@/data/mockData';

export default function PatientDashboard() {
  const { user } = useAuth();
  const paciente = pacientes.find(p => p.usuarioId === user?.id);
  if (!paciente) return null;

  const examesList = getExamesByPaciente(paciente.id).sort((a, b) => b.dataUpload.localeCompare(a.dataUpload));
  const ultimoExame = examesList[0];
  const resultados = ultimoExame ? getResultadosByExame(ultimoExame.id) : [];
  const alterados = getResultadosAlterados(paciente.id);
  const minhasConsultas = consultas.filter(c => c.pacienteId === paciente.id && c.status === 'agendada');

  const parametros = [...new Set(examesList.flatMap(e => getResultadosByExame(e.id).map(r => r.nomeParametro)))];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Olá, {paciente.nome.split(' ')[0]}!</h1>
        <p className="text-muted-foreground mt-1">Aqui está o resumo dos seus exames</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={FileText} title="Total de Exames" value={examesList.length} />
        <StatCard icon={TrendingUp} title="Parâmetros" value={resultados.length} subtitle={ultimoExame ? `Último: ${new Date(ultimoExame.dataUpload).toLocaleDateString('pt-BR')}` : undefined} />
        <StatCard icon={AlertTriangle} title="Valores Alterados" value={alterados.length} trend={alterados.length > 0 ? 'up' : 'neutral'} />
        <StatCard icon={Calendar} title="Consultas" value={minhasConsultas.length} subtitle="Agendadas" />
      </div>

      {/* Último exame */}
      {resultados.length > 0 && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-1">Último Exame</h2>
          <p className="text-sm text-muted-foreground mb-5">
            {ultimoExame.tipoExame} — {new Date(ultimoExame.dataUpload).toLocaleDateString('pt-BR')}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Parâmetro</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Valor</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Referência</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map(r => (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{r.nomeParametro}</td>
                    <td className="py-3 px-4 text-center font-mono font-medium text-foreground">{r.valor} {r.unidade}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{r.valorReferencia}</td>
                    <td className="py-3 px-4 text-center"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Charts */}
      {parametros.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Evolução
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {parametros.slice(0, 4).map(p => (
              <ParametroChart key={p} pacienteId={paciente.id} parametro={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
