import { createContext, useContext, useState, ReactNode } from 'react';
import { usuarios, Usuario } from '@/data/mockData';

const API_BASE_URL = 'http://localhost:8081';

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  tipo: 'paciente' | 'medico';
}

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AuthContextType {
  user: Usuario | null;
  login: (nomeUsuario: string, senhaUsuario: string) => Promise<AuthResult>;
  register: (data: RegisterData) => Promise<AuthResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    return data?.message || data?.error || `Erro ${res.status}`;
  } catch {
    return `Erro ${res.status}`;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  const login = async (nomeUsuario: string, senhaUsuario: string): Promise<AuthResult> => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomeUsuario, senhaUsuario }),
      });

      if (!res.ok) {
        return { ok: false, error: await parseError(res) };
      }

      const data = await res.json().catch(() => ({} as any));

      // Tenta mapear a resposta para Usuario; se falhar, usa fallback do mock por nome/email.
      const fallback =
        usuarios.find(u => u.email === nomeUsuario || u.nome === nomeUsuario) ?? usuarios[0];

      const logged: Usuario = {
        id: data?.id ?? fallback.id,
        nome: data?.nome ?? data?.nomeUsuario ?? fallback.nome,
        email: data?.email ?? data?.emailUsuario ?? fallback.email,
        tipo: data?.tipo ?? fallback.tipo,
        plano: data?.plano ?? fallback.plano,
      };

      setUser(logged);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: 'Não foi possível conectar ao servidor (localhost:8081)' };
    }
  };

  const register = async ({ nome, email, senha, tipo }: RegisterData): Promise<AuthResult> => {
    try {
      const res = await fetch(`${API_BASE_URL}/login/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomeUsuario: nome,
          senhaUsuario: senha,
          emailUsuario: email,
          tipoUsuario: tipo === 'paciente' ? 1 : 2,
        }),
      });

      if (!res.ok) {
        return { ok: false, error: await parseError(res) };
      }

      const data = await res.json().catch(() => ({} as any));

      const novo: Usuario = {
        id: data?.id ?? Date.now(),
        nome: data?.nome ?? data?.nomeUsuario ?? nome,
        email: data?.email ?? data?.emailUsuario ?? email,
        tipo: data?.tipo ?? tipo,
        plano: data?.plano ?? 'basico',
      };

      setUser(novo);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: 'Não foi possível conectar ao servidor (localhost:8081)' };
    }
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
