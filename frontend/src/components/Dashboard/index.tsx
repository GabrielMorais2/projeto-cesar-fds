import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Users, Bell, Clock, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import OverviewChart from "../OverviewChart";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ModeToggle } from "../ThemeToggle";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lembretes, setLembretes] = useState([
    { id: 1, text: "Enviar lembrete para Grupo A - Engenharia de Software", color: "text-yellow-500" },
    { id: 2, text: "Revisar avaliações de Banco de Dados", color: "text-green-500" },
    { id: 3, text: "Finalizar período de avaliação para IA em 2 dias", color: "text-red-500" }
  ]);
  const [newReminder, setNewReminder] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const openReportsGroups = () => {
    navigate("/reports-groups");
  };

  const handleAddReminder = () => {
    if (newReminder.trim()) {
      setLembretes([
        ...lembretes,
        { id: lembretes.length + 1, text: newReminder, color: "text-gray-500" }
      ]);
      setNewReminder("");
      setShowDialog(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className="flex-1 overflow-auto p-8">
        <header className="mb-8 flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600 mt-1">Bem-vindo de volta! Aqui está um resumo das suas atividades.</p>
          </div>
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Visão Geral das Avaliações</CardTitle>
            </CardHeader>
            <CardContent>
              <OverviewChart /> {/* Gráfico atualizado */}
            </CardContent>
          </Card>
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
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Avaliação concluída</p>
                      <p className="text-xs text-gray-500">Grupo A - Engenharia de Software</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
          <CardHeader>
  <div className="flex justify-between items-center">
    <CardTitle className="text-lg">Lembretes</CardTitle>
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => setShowDialog(true)}
    >
      <Plus className="h-4 w-4" /> Adicionar Lembrete
    </Button>
  </div>
</CardHeader>
            <CardContent>
              
              <ul className="space-y-2">
                {lembretes.map((lembrete) => (
                  <li key={lembrete.id} className="flex items-center space-x-2">
                    <Bell className={`h-4 w-4 ${lembrete.color}`} />
                    <span className="text-sm">{lembrete.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Lembrete</DialogTitle>
              <DialogDescription>Insira o texto do novo lembrete abaixo.</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Input
                value={newReminder}
                onChange={(e) => setNewReminder(e.target.value)}
                placeholder="Digite o lembrete"
                className="w-full"
              />
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  onClick={handleAddReminder}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
