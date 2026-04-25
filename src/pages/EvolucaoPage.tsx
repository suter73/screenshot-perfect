import { useAuth } from '@/contexts/AuthContext';
import ParametroChart from '@/components/ParametroChart';
import { pacientes, getExamesByPaciente, getResultadosByExame } from '@/data/mockData';
import { TrendingUp } from 'lucide-react';

export default function EvolucaoPage() {
  const { user } = useAuth();
  const paciente = pacientes.find(p => p.usuarioId === user?.id);
  if (!paciente) return null;

  const examesList = getExamesByPaciente(paciente.id);
  const parametros = [...new Set(examesList.flatMap(e => getResultadosByExame(e.id).map(r => r.nomeParametro)))];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Evolução</h1>
        <p className="text-muted-foreground mt-1">Acompanhe a evolução dos seus parâmetros ao longo do tempo</p>
      </div>

      {parametros.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {parametros.map(p => (
            <ParametroChart key={p} pacienteId={paciente.id} parametro={p} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center">
          <TrendingUp className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum dado de evolução disponível</p>
        </div>
      )}
    </div>
  );
}
