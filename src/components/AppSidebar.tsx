import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from '@/lib/router-compat';
import {
  Activity, Users, FileText, Calendar, Bell, LogOut,
  LayoutDashboard, Upload, TrendingUp, User
} from 'lucide-react';

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const medicoLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Pacientes', path: '/pacientes' },
    { icon: FileText, label: 'Exames', path: '/exames' },
    { icon: Calendar, label: 'Consultas', path: '/consultas' },
    { icon: Bell, label: 'Notificações', path: '/notificacoes' },
  ];

  const pacienteLinks = [
    { icon: LayoutDashboard, label: 'Meu Painel', path: '/' },
    { icon: FileText, label: 'Meus Exames', path: '/exames' },
    { icon: TrendingUp, label: 'Evolução', path: '/evolucao' },
    { icon: Upload, label: 'Upload', path: '/upload' },
    { icon: Bell, label: 'Notificações', path: '/notificacoes' },
  ];

  const links = user?.tipo === 'medico' ? medicoLinks : pacienteLinks;

  return (
    <aside className="w-64 min-h-screen bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-medical flex items-center justify-center">
          <Activity className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-sidebar-foreground">HemoTrack</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {links.map(link => {
          const isActive = location.pathname === link.path;
          return (
            <button key={link.path} onClick={() => navigate(link.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                }`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full gradient-medical flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.nome}</p>
            <p className="text-xs text-sidebar-foreground/50 capitalize">{user?.tipo}</p>
          </div>
          <button onClick={logout} className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground/50 hover:text-sidebar-foreground">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
