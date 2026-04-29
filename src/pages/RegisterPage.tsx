import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heart, Stethoscope, Activity, User } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  onBackToLogin: () => void;
}

export default function RegisterPage({ onBackToLogin }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [tipo, setTipo] = useState<'paciente' | 'medico'>('paciente');
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim().length < 2) {
      toast.error('Informe seu nome completo');
      return;
    }
    if (senha.length < 6) {
      toast.error('A senha deve ter ao menos 6 caracteres');
      return;
    }
    if (senha !== confirmar) {
      toast.error('As senhas não conferem');
      return;
    }
    setLoading(true);
    const res = await register({ nome: nome.trim(), email: email.trim(), senha, tipo });
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error ?? 'Erro ao cadastrar');
      return;
    }
    toast.success('Conta criada com sucesso!');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-medical items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-primary-foreground/20"
              style={{
                width: `${200 + i * 120}px`, height: `${200 + i * 120}px`,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center space-y-8 max-w-md">
          <div className="flex justify-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight">
            Crie sua conta
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Cadastre-se gratuitamente e comece a acompanhar seus exames
            sanguíneos com inteligência e clareza.
          </p>
        </div>
      </div>

      {/* Right panel - Register form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
          <CardHeader className="space-y-4 text-center pb-6">
            <div className="lg:hidden flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl gradient-medical flex items-center justify-center">
                <Activity className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Criar conta</h2>
            <p className="text-muted-foreground">Preencha os dados para começar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tipo */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Sou</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTipo('paciente')}
                    className={`flex items-center justify-center gap-2 h-12 rounded-lg border transition-all text-sm font-medium ${
                      tipo === 'paciente'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <User className="w-4 h-4" /> Paciente
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipo('medico')}
                    className={`flex items-center justify-center gap-2 h-12 rounded-lg border transition-all text-sm font-medium ${
                      tipo === 'medico'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <Stethoscope className="w-4 h-4" /> Médico
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nome" className="text-sm font-medium">Nome completo</Label>
                <Input id="nome" value={nome} onChange={e => setNome(e.target.value)}
                  placeholder="Seu nome" className="h-12 rounded-lg" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
                <Input id="email" type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com" className="h-12 rounded-lg" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha" className="text-sm font-medium">Senha</Label>
                <Input id="senha" type="password" value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder="Mínimo 6 caracteres" className="h-12 rounded-lg" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmar" className="text-sm font-medium">Confirmar senha</Label>
                <Input id="confirmar" type="password" value={confirmar}
                  onChange={e => setConfirmar(e.target.value)}
                  placeholder="••••••••" className="h-12 rounded-lg" required />
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 rounded-lg gradient-primary text-primary-foreground font-semibold text-base">
                {loading ? 'Criando...' : 'Criar conta'}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <button onClick={onBackToLogin}
                className="font-semibold text-primary hover:underline">
                Entrar
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
