import { useAuth } from '@/contexts/AuthContext';
import { FileText, Download, Eye } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { pacientes, exames, getResultadosByExame } from '@/data/mockData';
import { useState } from 'react';

export default function ExamesPage() {
  const { user } = useAuth();
  const isMedico = user?.tipo === 'medico';
  const [selectedExame, setSelectedExame] = useState<number | null>(null);

  const listaExames = isMedico
    ? exames
    : exames.filter(e => {
        const paciente = pacientes.find(p => p.usuarioId === user?.id);
        return paciente && e.pacienteId === paciente.id;
      });

  const sortedExames = [...listaExames].sort((a, b) => b.dataUpload.localeCompare(a.dataUpload));
  const resultados = selectedExame ? getResultadosByExame(selectedExame) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{isMedico ? 'Exames' : 'Meus Exames'}</h1>
        <p className="text-muted-foreground mt-1">
          {isMedico ? 'Todos os exames dos pacientes' : 'Histórico dos seus exames'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista */}
        <div className="lg:col-span-1 space-y-3">
          {sortedExames.map(exame => {
            const paciente = pacientes.find(p => p.id === exame.pacienteId);
            const results = getResultadosByExame(exame.id);
            const hasAlerts = results.some(r => r.status !== 'normal');

            return (
              <button key={exame.id} onClick={() => setSelectedExame(exame.id)}
                className={`w-full text-left p-4 rounded-xl transition-all
                  ${selectedExame === exame.id
                    ? 'gradient-primary text-primary-foreground'
                    : 'glass-card hover:shadow-md'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{exame.tipoExame}</p>
                    {isMedico && <p className={`text-xs mt-0.5 ${selectedExame === exame.id ? 'opacity-80' : 'text-muted-foreground'}`}>{paciente?.nome}</p>}
                    <p className={`text-xs mt-1 ${selectedExame === exame.id ? 'opacity-70' : 'text-muted-foreground'}`}>
                      {new Date(exame.dataUpload).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  {hasAlerts && selectedExame !== exame.id && (
                    <span className="w-2 h-2 rounded-full bg-destructive shrink-0 mt-2" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detalhes */}
        <div className="lg:col-span-2">
          {selectedExame ? (
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Resultados do Exame</h2>
                  <p className="text-sm text-muted-foreground">
                    {exames.find(e => e.id === selectedExame)?.tipoExame}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Parâmetro</th>
                      <th className="text-center py-3 px-4 text-muted-foreground font-medium">Valor</th>
                      <th className="text-center py-3 px-4 text-muted-foreground font-medium">Referência</th>
                      <th className="text-center py-3 px-4 text-muted-foreground font-medium">Unidade</th>
                      <th className="text-center py-3 px-4 text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultados.map(r => (
                      <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium text-foreground">{r.nomeParametro}</td>
                        <td className="py-3 px-4 text-center font-mono font-medium text-foreground">{r.valor}</td>
                        <td className="py-3 px-4 text-center text-muted-foreground">{r.valorReferencia}</td>
                        <td className="py-3 px-4 text-center text-muted-foreground">{r.unidade}</td>
                        <td className="py-3 px-4 text-center"><StatusBadge status={r.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Eye className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Selecione um exame para ver os resultados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
