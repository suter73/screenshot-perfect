import { createFileRoute } from "@tanstack/react-router";
import EvolucaoPage from "@/pages/EvolucaoPage";

export const Route = createFileRoute("/evolucao")({
  component: EvolucaoPage,
});
