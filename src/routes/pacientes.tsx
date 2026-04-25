import { createFileRoute } from "@tanstack/react-router";
import PacientesPage from "@/pages/PacientesPage";

export const Route = createFileRoute("/pacientes")({
  component: PacientesPage,
});
