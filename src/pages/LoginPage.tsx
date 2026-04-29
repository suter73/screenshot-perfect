import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heart, Stethoscope, Activity } from 'lucide-react';
import { toast } from 'sonner';
import RegisterPage from './RegisterPage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  if (showRegister) {
    return <RegisterPage onBackToLogin={() => setShowRegister(false)} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, senha);
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error ?? 'Credenciais inválidas');
    }
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
            HemoTrack
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Sistema inteligente de acompanhamento e análise de exames sanguíneos. 
            Monitoramento contínuo da saúde do paciente.
          </p>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="lg:hidden flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl gradient-medical flex items-center justify-center">
                <Activity className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Bem-vindo de volta</h2>
            <p className="text-muted-foreground">Acesse sua conta para continuar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
                <Input
                  id="email" type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="h-12 rounded-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha" className="text-sm font-medium">Senha</Label>
                <Input
                  id="senha" type="password" value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 rounded-lg"
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 rounded-lg gradient-primary text-primary-foreground font-semibold text-base">
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <button onClick={() => setShowRegister(true)}
                className="font-semibold text-primary hover:underline">
                Cadastre-se
              </button>
            </p>

            <div className="mt-6 p-4 rounded-xl bg-muted/50 space-y-2">
              <p className="text-xs font-medium text-muted-foreground mb-3">Contas de demonstração:</p>
              <button onClick={() => { setEmail('carlos@clinica.com'); setSenha('123'); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
                <span className="font-medium text-foreground">Médico:</span>{' '}
                <span className="text-muted-foreground">carlos@clinica.com</span>
              </button>
              <button onClick={() => { setEmail('maria@email.com'); setSenha('123'); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
                <span className="font-medium text-foreground">Paciente:</span>{' '}
                <span className="text-muted-foreground">maria@email.com</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
