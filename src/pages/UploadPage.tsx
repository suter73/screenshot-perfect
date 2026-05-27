import { useRef, useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const API_BASE_URL = 'http://localhost:8081/exames';

export default function UploadPage() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [tipoExame, setTipoExame] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFile = (f: File) => setFile(f);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const handleSubmit = async () => {
    if (!file) { toast.error('Selecione um arquivo.'); return; }
    if (!tipoExame.trim()) { toast.error('Informe o tipo do exame.'); return; }
    if (!user) { toast.error('Usuário não autenticado.'); return; }

    const formData = new FormData();
    formData.append('arquivo', file);

    const url = `${API_BASE_URL}/documento/enviar?idPaciente=${user.id}&tipoExame=${encodeURIComponent(tipoExame.trim())}`;

    setLoading(true);
    try {
      const res = await fetch(url, { method: 'POST', body: formData });

      if (!res.ok) {
        let msg = `Erro ${res.status}`;
        try { const d = await res.json(); msg = d?.message ?? d?.error ?? msg; } catch {}
        toast.error(msg);
        return;
      }

      setUploaded(true);
      toast.success('Exame enviado para processamento. Os resultados estarão disponíveis em breve.');
    } catch {
      toast.error('Não foi possível conectar ao servidor (localhost:8081)');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setTipoExame('');
    setUploaded(false);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload de Exame</h1>
        <p className="text-muted-foreground mt-1">Envie seu exame em PDF para extração automática dos dados</p>
      </div>

      {!uploaded ? (
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />

          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`glass-card rounded-2xl p-12 text-center border-2 border-dashed transition-all cursor-pointer
              ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
          >
            {file ? (
              <>
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="font-medium text-foreground mb-1">{file.name}</p>
                <p className="text-sm text-muted-foreground">Clique para trocar o arquivo</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <p className="font-medium text-foreground mb-1">Arraste o arquivo aqui ou clique para selecionar</p>
                <p className="text-sm text-muted-foreground">Suporta PDF, PNG, JPG — Máximo 10MB</p>
              </>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipoExame">Tipo do exame</Label>
            <Input
              id="tipoExame"
              placeholder="Ex: Hemograma Completo, Glicemia, TSH..."
              value={tipoExame}
              onChange={e => setTipoExame(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading || !file || !tipoExame.trim()}
            className="w-full rounded-xl"
          >
            {loading ? 'Enviando...' : 'Enviar Exame'}
          </Button>
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Exame Enviado!</h2>
          <p className="text-muted-foreground mb-6">O sistema está processando o documento e extraindo os dados do exame.</p>
          <div className="flex items-center gap-3 justify-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{file?.name}</span>
            </div>
          </div>
          <Button onClick={reset} variant="outline" className="mt-6 rounded-xl">
            Enviar outro exame
          </Button>
        </div>
      )}

      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-semibold text-foreground mb-3">Como funciona?</h3>
        <div className="space-y-3">
          {[
            { step: '1', text: 'Faça upload do PDF do seu exame de sangue' },
            { step: '2', text: 'O sistema extrai automaticamente os parâmetros (glicose, hemoglobina, etc.)' },
            { step: '3', text: 'Os resultados são armazenados e comparados com exames anteriores' },
            { step: '4', text: 'Visualize gráficos de evolução e receba alertas sobre valores alterados' },
          ].map(item => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full gradient-medical flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                {item.step}
              </div>
              <p className="text-sm text-muted-foreground pt-1">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
