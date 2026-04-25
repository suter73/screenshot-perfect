import { useAuth } from '@/contexts/AuthContext';
import { Bell, Check } from 'lucide-react';
import { notificacoes } from '@/data/mockData';

export default function NotificacoesPage() {
  const { user } = useAuth();
  const minhas = notificacoes.filter(n => n.usuarioId === user?.id).sort((a, b) => b.data.localeCompare(a.data));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Notificações</h1>
        <p className="text-muted-foreground mt-1">Suas notificações recentes</p>
      </div>

      <div className="space-y-3 max-w-2xl">
        {minhas.map(n => (
          <div key={n.id} className={`glass-card rounded-2xl p-5 flex items-start gap-4 transition-all ${!n.lida ? 'border-l-4 border-l-primary' : 'opacity-70'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${!n.lida ? 'bg-primary/10' : 'bg-muted'}`}>
              {n.lida ? <Check className="w-5 h-5 text-muted-foreground" /> : <Bell className="w-5 h-5 text-primary" />}
            </div>
            <div>
              <p className={`text-sm ${!n.lida ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{n.mensagem}</p>
              <p className="text-xs text-muted-foreground mt-1">{new Date(n.data).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
