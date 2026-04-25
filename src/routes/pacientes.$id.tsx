import { createFileRoute } from "@tanstack/react-router";
import PacienteDetalhes from "@/pages/PacienteDetalhes";

export const Route = createFileRoute("/pacientes/$id")({
  component: PacienteDetalhes,
});
