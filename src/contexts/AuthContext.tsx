import { createContext, useContext, useState, ReactNode } from 'react';
import { Usuario } from '@/data/mockData';

const API_BASE_URL = 'http://localhost:8081';

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  tipo: 'paciente' | 'medico';
  // paciente
  cpf?: string;
  dataNascimento?: string;
  // medico
  crm?: string;
  especialidade?: string;
}

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AuthContextType {
  user: Usuario | null;
  login: (emailUsuario: string, senhaUsuario: string) => Promise<AuthResult>;
  register: (data: RegisterData) => Promise<AuthResult>;
  logout: () => void;
}

interface LoginResponseData {
  sucess: boolean;
  errors: string[];
  nomeUsuario?: string;
  tipoUsuario?: number;
  id?: number;
  plano?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  const login = async (emailUsuario: string, senhaUsuario: string): Promise<AuthResult> => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailUsuario, senhaUsuario }),
      });

      const data = (await res.json().catch(() => ({}))) as LoginResponseData;

      if (!data.sucess) {
        return { ok: false, error: data.errors?.[0] ?? "Email ou senha inválidos" };
      }

      setUser({
        id: data.id ?? 0,
        nome: data.nomeUsuario ?? "",
        email: emailUsuario,
        tipo: data.tipoUsuario === 2 ? "medico" : "paciente",
        plano: data.plano ?? "basico",
      });
      return { ok: true };
    } catch {
      return { ok: false, error: "Não foi possível conectar ao servidor (localhost:8081)" };
    }
  };

  const register = async ({
    nome,
    email,
    senha,
    tipo,
    cpf,
    dataNascimento,
    crm,
    especialidade,
  }: RegisterData): Promise<AuthResult> => {
    try {
      const res = await fetch(`${API_BASE_URL}/login/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeUsuario: nome,
          senhaUsuario: senha,
          emailUsuario: email,
          tipoUsuario: tipo === "paciente" ? 1 : 2,
          cpfPaciente: cpf ?? "",
          dataNascimentoPaciente: dataNascimento ?? null,
          crmMedico: crm ?? "",
          especialidadeMedico: especialidade ?? "",
        }),
      });

      const data = (await res.json().catch(() => ({}))) as LoginResponseData;

      if (!res.ok || !data.sucess) {
        return { ok: false, error: data.errors?.[0] ?? `Erro ${res.status}` };
      }

      return { ok: true };
    } catch {
      return { ok: false, error: "Não foi possível conectar ao servidor (localhost:8081)" };
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
