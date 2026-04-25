import { createFileRoute } from "@tanstack/react-router";
import ExamesPage from "@/pages/ExamesPage";

export const Route = createFileRoute("/exames")({
  component: ExamesPage,
});
