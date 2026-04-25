import { createFileRoute } from "@tanstack/react-router";
import ConsultasPage from "@/pages/ConsultasPage";

export const Route = createFileRoute("/consultas")({
  component: ConsultasPage,
});
