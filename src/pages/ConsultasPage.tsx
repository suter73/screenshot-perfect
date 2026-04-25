import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { consultas, pacientes, medicos } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export default function ConsultasPage() {
  const sorted = [...consultas].sort((a, b) => b.data.localeCompare(a.data));

  const statusConfig = {
    agendada: { icon: Clock, label: 'Agendada', className: 'bg-primary/10 text-primary' },
    realizada: { icon: CheckCircle, label: 'Realizada', className: 'status-normal' },
    cancelada: { icon: XCircle, label: 'Cancelada', className: 'status-danger' },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Consultas</h1>
          <p className="text-muted-foreground mt-1">Gerenciamento de consultas</p>
        </div>
        <Button className="gradient-primary text-primary-foreground rounded-xl">
          <Calendar className="w-4 h-4 mr-2" /> Nova Consulta
        </Button>
      </div>

      <div className="space-y-3">
        {sorted.map(consulta => {
          const paciente = pacientes.find(p => p.id === consulta.pacienteId);
          const medico = medicos.find(m => m.id === consulta.medicoId);
          const config = statusConfig[consulta.status];
          const StatusIcon = config.icon;

          return (
            <div key={consulta.id} className="glass-card rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{paciente?.nome}</p>
                  <p className="text-sm text-muted-foreground">
                    {medico?.nome} • {medico?.especialidade}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(consulta.data).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}>
                  <StatusIcon className="w-3.5 h-3.5" /> {config.label}
                </span>
                {consulta.status === 'agendada' && (
                  <Button variant="outline" size="sm" className="rounded-xl text-xs">
                    Encerrar
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
