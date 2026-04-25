import { useNavigate } from '@/lib/router-compat';
import { Search, ChevronRight, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { pacientes, exames, getResultadosAlterados } from '@/data/mockData';
import { useState } from 'react';

export default function PacientesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = pacientes.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    p.cpf.includes(search)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pacientes</h1>
        <p className="text-muted-foreground mt-1">Gerencie seus pacientes</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nome ou CPF..."
          className="pl-10 h-11 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(paciente => {
          const alterados = getResultadosAlterados(paciente.id);
          const examesPaciente = exames.filter(e => e.pacienteId === paciente.id);

          return (
            <button key={paciente.id} onClick={() => navigate(`/pacientes/${paciente.id}`)}
              className="glass-card rounded-2xl p-5 text-left hover:shadow-md transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-medical flex items-center justify-center text-lg font-bold text-primary-foreground shrink-0">
                  {paciente.nome.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{paciente.nome}</p>
                  <p className="text-xs text-muted-foreground mt-1">CPF: {paciente.cpf}</p>
                  <p className="text-xs text-muted-foreground">Nascimento: {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs font-medium text-muted-foreground">{examesPaciente.length} exame{examesPaciente.length !== 1 ? 's' : ''}</span>
                    {alterados.length > 0 && (
                      <span className="text-xs font-medium text-destructive flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> {alterados.length} alerta{alterados.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
