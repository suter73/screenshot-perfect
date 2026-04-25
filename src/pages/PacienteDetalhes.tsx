import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, AlertTriangle, TrendingUp } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import ParametroChart from '@/components/ParametroChart';
import { pacientes, getExamesByPaciente, getResultadosByExame } from '@/data/mockData';
import { useState } from 'react';

export default function PacienteDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const paciente = pacientes.find(p => p.id === Number(id));
  const examesList = getExamesByPaciente(Number(id)).sort((a, b) => b.dataUpload.localeCompare(a.dataUpload));
  const [selectedExame, setSelectedExame] = useState(examesList[0]?.id);

  if (!paciente) return <div className="text-center py-12 text-muted-foreground">Paciente não encontrado</div>;

  const resultados = selectedExame ? getResultadosByExame(selectedExame) : [];
  const alterados = resultados.filter(r => r.status !== 'normal');

  // Get unique parameters for charts
  const parametros = [...new Set(examesList.flatMap(e => getResultadosByExame(e.id).map(r => r.nomeParametro)))];

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      {/* Header */}
      <div className="glass-card rounded-2xl p-6 flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl gradient-medical flex items-center justify-center text-2xl font-bold text-primary-foreground">
          {paciente.nome.charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">{paciente.nome}</h1>
          <p className="text-sm text-muted-foreground">CPF: {paciente.cpf} • Nascimento: {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{examesList.length}</p>
            <p className="text-xs text-muted-foreground">Exames</p>
          </div>
          {alterados.length > 0 && (
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">{alterados.length}</p>
              <p className="text-xs text-muted-foreground">Alterados</p>
            </div>
          )}
        </div>
      </div>

      {/* Exam selector */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" /> Exames
        </h2>
        <div className="flex gap-2 flex-wrap mb-6">
          {examesList.map(exame => (
            <button key={exame.id} onClick={() => setSelectedExame(exame.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${selectedExame === exame.id
                  ? 'gradient-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
            >
              {exame.tipoExame} — {new Date(exame.dataUpload).toLocaleDateString('pt-BR')}
            </button>
          ))}
        </div>

        {/* Results table */}
        {resultados.length > 0 && (
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
        )}
      </div>

      {/* Charts */}
      {parametros.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Evolução dos Parâmetros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {parametros.slice(0, 4).map(p => (
              <ParametroChart key={p} pacienteId={Number(id)} parametro={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
