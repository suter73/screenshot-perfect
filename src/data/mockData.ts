export interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: 'paciente' | 'medico';
  plano: string;
}

export interface Paciente {
  id: number;
  usuarioId: number;
  cpf: string;
  dataNascimento: string;
  nome: string;
}

export interface Medico {
  id: number;
  usuarioId: number;
  crm: string;
  especialidade: string;
  nome: string;
}

export interface Exame {
  id: number;
  pacienteId: number;
  dataUpload: string;
  tipoExame: string;
  arquivo: string;
}

export interface ResultadoExame {
  id: number;
  exameId: number;
  nomeParametro: string;
  valor: number;
  valorReferencia: string;
  unidade: string;
  status: 'normal' | 'alto' | 'baixo';
}

export interface Consulta {
  id: number;
  pacienteId: number;
  medicoId: number;
  data: string;
  status: 'agendada' | 'realizada' | 'cancelada';
}

export interface Avaliacao {
  id: number;
  medicoId: number;
  pacienteId: number;
  nota: number;
  comentario: string;
}

export interface Notificacao {
  id: number;
  usuarioId: number;
  mensagem: string;
  data: string;
  lida: boolean;
}

export const usuarios: Usuario[] = [
  { id: 1, nome: 'Dr. Carlos Mendes', email: 'carlos@clinica.com', tipo: 'medico', plano: 'premium' },
  { id: 2, nome: 'Maria Silva', email: 'maria@email.com', tipo: 'paciente', plano: 'basico' },
  { id: 3, nome: 'João Santos', email: 'joao@email.com', tipo: 'paciente', plano: 'premium' },
  { id: 4, nome: 'Ana Oliveira', email: 'ana@email.com', tipo: 'paciente', plano: 'basico' },
];

export const pacientes: Paciente[] = [
  { id: 1, usuarioId: 2, cpf: '123.456.789-00', dataNascimento: '1985-03-15', nome: 'Maria Silva' },
  { id: 2, usuarioId: 3, cpf: '987.654.321-00', dataNascimento: '1990-07-22', nome: 'João Santos' },
  { id: 3, usuarioId: 4, cpf: '456.789.123-00', dataNascimento: '1978-11-08', nome: 'Ana Oliveira' },
];

export const medicos: Medico[] = [
  { id: 1, usuarioId: 1, crm: 'CRM/SP 123456', especialidade: 'Hematologia', nome: 'Dr. Carlos Mendes' },
];

export const exames: Exame[] = [
  { id: 1, pacienteId: 1, dataUpload: '2025-12-01', tipoExame: 'Hemograma Completo', arquivo: 'hemograma_maria.pdf' },
  { id: 2, pacienteId: 1, dataUpload: '2025-09-15', tipoExame: 'Hemograma Completo', arquivo: 'hemograma_maria_2.pdf' },
  { id: 3, pacienteId: 1, dataUpload: '2025-06-10', tipoExame: 'Hemograma Completo', arquivo: 'hemograma_maria_3.pdf' },
  { id: 4, pacienteId: 2, dataUpload: '2025-11-20', tipoExame: 'Perfil Lipídico', arquivo: 'lipidico_joao.pdf' },
  { id: 5, pacienteId: 2, dataUpload: '2025-08-05', tipoExame: 'Perfil Lipídico', arquivo: 'lipidico_joao_2.pdf' },
  { id: 6, pacienteId: 3, dataUpload: '2025-10-10', tipoExame: 'Glicemia', arquivo: 'glicemia_ana.pdf' },
];

export const resultadosExame: ResultadoExame[] = [
  // Exame 1 - Maria - Hemograma Dec 2025
  { id: 1, exameId: 1, nomeParametro: 'Hemoglobina', valor: 12.5, valorReferencia: '12.0 - 16.0', unidade: 'g/dL', status: 'normal' },
  { id: 2, exameId: 1, nomeParametro: 'Hematócrito', valor: 38, valorReferencia: '36 - 46', unidade: '%', status: 'normal' },
  { id: 3, exameId: 1, nomeParametro: 'Leucócitos', valor: 11200, valorReferencia: '4000 - 11000', unidade: '/mm³', status: 'alto' },
  { id: 4, exameId: 1, nomeParametro: 'Plaquetas', valor: 250000, valorReferencia: '150000 - 400000', unidade: '/mm³', status: 'normal' },
  { id: 5, exameId: 1, nomeParametro: 'Glicose', valor: 105, valorReferencia: '70 - 100', unidade: 'mg/dL', status: 'alto' },
  { id: 6, exameId: 1, nomeParametro: 'Colesterol Total', valor: 195, valorReferencia: '< 200', unidade: 'mg/dL', status: 'normal' },
  { id: 7, exameId: 1, nomeParametro: 'Triglicerídeos', valor: 160, valorReferencia: '< 150', unidade: 'mg/dL', status: 'alto' },

  // Exame 2 - Maria - Hemograma Sep 2025
  { id: 8, exameId: 2, nomeParametro: 'Hemoglobina', valor: 11.8, valorReferencia: '12.0 - 16.0', unidade: 'g/dL', status: 'baixo' },
  { id: 9, exameId: 2, nomeParametro: 'Hematócrito', valor: 35, valorReferencia: '36 - 46', unidade: '%', status: 'baixo' },
  { id: 10, exameId: 2, nomeParametro: 'Leucócitos', valor: 8500, valorReferencia: '4000 - 11000', unidade: '/mm³', status: 'normal' },
  { id: 11, exameId: 2, nomeParametro: 'Plaquetas', valor: 220000, valorReferencia: '150000 - 400000', unidade: '/mm³', status: 'normal' },
  { id: 12, exameId: 2, nomeParametro: 'Glicose', valor: 98, valorReferencia: '70 - 100', unidade: 'mg/dL', status: 'normal' },
  { id: 13, exameId: 2, nomeParametro: 'Colesterol Total', valor: 210, valorReferencia: '< 200', unidade: 'mg/dL', status: 'alto' },
  { id: 14, exameId: 2, nomeParametro: 'Triglicerídeos', valor: 145, valorReferencia: '< 150', unidade: 'mg/dL', status: 'normal' },

  // Exame 3 - Maria - Hemograma Jun 2025
  { id: 15, exameId: 3, nomeParametro: 'Hemoglobina', valor: 13.0, valorReferencia: '12.0 - 16.0', unidade: 'g/dL', status: 'normal' },
  { id: 16, exameId: 3, nomeParametro: 'Hematócrito', valor: 40, valorReferencia: '36 - 46', unidade: '%', status: 'normal' },
  { id: 17, exameId: 3, nomeParametro: 'Leucócitos', valor: 7200, valorReferencia: '4000 - 11000', unidade: '/mm³', status: 'normal' },
  { id: 18, exameId: 3, nomeParametro: 'Plaquetas', valor: 280000, valorReferencia: '150000 - 400000', unidade: '/mm³', status: 'normal' },
  { id: 19, exameId: 3, nomeParametro: 'Glicose', valor: 88, valorReferencia: '70 - 100', unidade: 'mg/dL', status: 'normal' },
  { id: 20, exameId: 3, nomeParametro: 'Colesterol Total', valor: 185, valorReferencia: '< 200', unidade: 'mg/dL', status: 'normal' },
  { id: 21, exameId: 3, nomeParametro: 'Triglicerídeos', valor: 130, valorReferencia: '< 150', unidade: 'mg/dL', status: 'normal' },

  // Exame 4 - João - Lipídico Nov 2025
  { id: 22, exameId: 4, nomeParametro: 'Colesterol Total', valor: 240, valorReferencia: '< 200', unidade: 'mg/dL', status: 'alto' },
  { id: 23, exameId: 4, nomeParametro: 'HDL', valor: 38, valorReferencia: '> 40', unidade: 'mg/dL', status: 'baixo' },
  { id: 24, exameId: 4, nomeParametro: 'LDL', valor: 165, valorReferencia: '< 130', unidade: 'mg/dL', status: 'alto' },
  { id: 25, exameId: 4, nomeParametro: 'Triglicerídeos', valor: 185, valorReferencia: '< 150', unidade: 'mg/dL', status: 'alto' },

  // Exame 5 - João - Lipídico Aug 2025
  { id: 26, exameId: 5, nomeParametro: 'Colesterol Total', valor: 220, valorReferencia: '< 200', unidade: 'mg/dL', status: 'alto' },
  { id: 27, exameId: 5, nomeParametro: 'HDL', valor: 42, valorReferencia: '> 40', unidade: 'mg/dL', status: 'normal' },
  { id: 28, exameId: 5, nomeParametro: 'LDL', valor: 145, valorReferencia: '< 130', unidade: 'mg/dL', status: 'alto' },
  { id: 29, exameId: 5, nomeParametro: 'Triglicerídeos', valor: 165, valorReferencia: '< 150', unidade: 'mg/dL', status: 'alto' },

  // Exame 6 - Ana - Glicemia Oct 2025
  { id: 30, exameId: 6, nomeParametro: 'Glicose em Jejum', valor: 132, valorReferencia: '70 - 100', unidade: 'mg/dL', status: 'alto' },
  { id: 31, exameId: 6, nomeParametro: 'Hemoglobina Glicada', valor: 7.2, valorReferencia: '< 5.7', unidade: '%', status: 'alto' },
  { id: 32, exameId: 6, nomeParametro: 'Insulina', valor: 25, valorReferencia: '2.6 - 24.9', unidade: 'µUI/mL', status: 'alto' },
];

export const consultas: Consulta[] = [
  { id: 1, pacienteId: 1, medicoId: 1, data: '2025-12-15', status: 'agendada' },
  { id: 2, pacienteId: 2, medicoId: 1, data: '2025-12-10', status: 'realizada' },
  { id: 3, pacienteId: 3, medicoId: 1, data: '2025-12-18', status: 'agendada' },
  { id: 4, pacienteId: 1, medicoId: 1, data: '2025-09-20', status: 'realizada' },
];

export const notificacoes: Notificacao[] = [
  { id: 1, usuarioId: 1, mensagem: 'Novos resultados de exame disponíveis para Maria Silva', data: '2025-12-01', lida: false },
  { id: 2, usuarioId: 1, mensagem: 'Consulta agendada com Ana Oliveira em 18/12', data: '2025-12-02', lida: false },
  { id: 3, usuarioId: 1, mensagem: 'Alerta: Valores alterados no exame de João Santos', data: '2025-11-20', lida: true },
  { id: 4, usuarioId: 2, mensagem: 'Seus resultados de exame estão disponíveis', data: '2025-12-01', lida: false },
  { id: 5, usuarioId: 2, mensagem: 'Consulta agendada para 15/12 com Dr. Carlos', data: '2025-12-02', lida: false },
];

export function getExamesByPaciente(pacienteId: number) {
  return exames.filter(e => e.pacienteId === pacienteId);
}

export function getResultadosByExame(exameId: number) {
  return resultadosExame.filter(r => r.exameId === exameId);
}

export function getResultadosAlterados(pacienteId: number) {
  const examesPaciente = getExamesByPaciente(pacienteId);
  const ultimoExame = examesPaciente.sort((a, b) => b.dataUpload.localeCompare(a.dataUpload))[0];
  if (!ultimoExame) return [];
  return getResultadosByExame(ultimoExame.id).filter(r => r.status !== 'normal');
}

export function getHistoricoParametro(pacienteId: number, nomeParametro: string) {
  const examesPaciente = getExamesByPaciente(pacienteId).sort((a, b) => a.dataUpload.localeCompare(b.dataUpload));
  return examesPaciente.map(exame => {
    const resultado = getResultadosByExame(exame.id).find(r => r.nomeParametro === nomeParametro);
    return resultado ? { data: exame.dataUpload, valor: resultado.valor, status: resultado.status } : null;
  }).filter(Boolean) as { data: string; valor: number; status: string }[];
}
