import { createContext, useContext, useState, ReactNode } from 'react';
import { usuarios, Usuario } from '@/data/mockData';

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  tipo: 'paciente' | 'medico';
}

interface AuthContextType {
  user: Usuario | null;
  login: (email: string, senha: string) => boolean;
  register: (data: RegisterData) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [extraUsers, setExtraUsers] = useState<Usuario[]>([]);

  const allUsers = () => [...usuarios, ...extraUsers];

  const login = (email: string, _senha: string) => {
    const found = allUsers().find(u => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const register = ({ nome, email, tipo }: RegisterData) => {
    if (allUsers().some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'E-mail já cadastrado' };
    }
    const novo: Usuario = {
      id: Date.now(),
      nome,
      email,
      tipo,
      plano: 'basico',
    };
    setExtraUsers(prev => [...prev, novo]);
    setUser(novo);
    return { ok: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
