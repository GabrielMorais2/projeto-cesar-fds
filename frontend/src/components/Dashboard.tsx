import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Book, FileText, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CriacaoGrupo from "./CreateGroup";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const disciplinas = [
    { id: 1, nome: "Engenharia de Software", grupos: 3, avaliacoesPendentes: 5 },
    { id: 2, nome: "Banco de Dados", grupos: 2, avaliacoesPendentes: 0 },
    { id: 3, nome: "Inteligência Artificial", grupos: 4, avaliacoesPendentes: 12 },
  ];

  const openReportsGroups = () => {
    navigate("/reports-groups");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard do Professor</h1>
          <div className="flex gap-4">
            <CriacaoGrupo />
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {disciplinas.map((disciplina) => (
            <Card key={disciplina.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{disciplina.nome}</CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold">{disciplina.grupos}</span>
                  <span className="text-xs text-muted-foreground">Grupos</span>
                </div>
                <Progress value={100 - (disciplina.avaliacoesPendentes / (disciplina.grupos * 10)) * 100} className="h-2" />
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span>{disciplina.avaliacoesPendentes} avaliações pendentes</span>
                  <span>{100 - (disciplina.avaliacoesPendentes / (disciplina.grupos * 10)) * 100}% completo</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button variant="outline" className="justify-start">
                <Users className="mr-2 h-4 w-4" />
                Gerenciar Grupos
              </Button>
              <Button variant="outline" className="justify-start" onClick={openReportsGroups}>
                <FileText className="mr-2 h-4 w-4" />
                Ver Relatórios
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lembretes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-sm">• Enviar lembrete para Grupo A - Engenharia de Software</li>
                <li className="text-sm">• Revisar avaliações de Banco de Dados</li>
                <li className="text-sm">• Finalizar período de avaliação para IA em 2 dias</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
