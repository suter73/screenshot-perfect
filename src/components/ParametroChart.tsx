import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getHistoricoParametro } from '@/data/mockData';

interface ParametroChartProps {
  pacienteId: number;
  parametro: string;
  refMin?: number;
  refMax?: number;
}

export default function ParametroChart({ pacienteId, parametro, refMin, refMax }: ParametroChartProps) {
  const historico = getHistoricoParametro(pacienteId, parametro);

  if (historico.length === 0) return null;

  const data = historico.map(h => ({
    data: new Date(h.data).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
    valor: h.valor,
  }));

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-foreground mb-1">{parametro}</h3>
      <p className="text-xs text-muted-foreground mb-4">Evolução ao longo do tempo</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
            <XAxis dataKey="data" tick={{ fontSize: 11, fill: 'hsl(215 12% 50%)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(215 12% 50%)' }} />
            <Tooltip
              contentStyle={{
                background: 'hsl(0 0% 100%)',
                border: '1px solid hsl(214 20% 90%)',
                borderRadius: '12px',
                fontSize: '13px',
              }}
            />
            {refMin && <ReferenceLine y={refMin} stroke="hsl(38 92% 50%)" strokeDasharray="4 4" />}
            {refMax && <ReferenceLine y={refMax} stroke="hsl(38 92% 50%)" strokeDasharray="4 4" />}
            <Line
              type="monotone" dataKey="valor"
              stroke="hsl(210 80% 45%)" strokeWidth={2.5}
              dot={{ fill: 'hsl(210 80% 45%)', r: 5, strokeWidth: 2, stroke: 'hsl(0 0% 100%)' }}
              activeDot={{ r: 7, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
