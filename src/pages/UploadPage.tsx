import { useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const { toast } = useToast();

  const handleUpload = () => {
    setUploaded(true);
    toast({ title: 'Sucesso', description: 'Exame enviado para processamento. Os resultados estarão disponíveis em breve.' });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload de Exame</h1>
        <p className="text-muted-foreground mt-1">Envie seu exame em PDF para extração automática dos dados</p>
      </div>

      {!uploaded ? (
        <div
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={e => { e.preventDefault(); setIsDragging(false); handleUpload(); }}
          className={`glass-card rounded-2xl p-12 text-center border-2 border-dashed transition-all cursor-pointer
            ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
          onClick={handleUpload}
        >
          <Upload className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="font-medium text-foreground mb-1">Arraste o arquivo aqui ou clique para selecionar</p>
          <p className="text-sm text-muted-foreground">Suporta PDF, PNG, JPG — Máximo 10MB</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Exame Enviado!</h2>
          <p className="text-muted-foreground mb-6">O sistema está processando o documento e extraindo os dados do exame.</p>
          <div className="flex items-center gap-3 justify-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">exame_sangue.pdf</span>
            </div>
          </div>
          <Button onClick={() => setUploaded(false)} variant="outline" className="mt-6 rounded-xl">
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
