import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const data = [
  {
    nome: "João Silva",
    assiduidade: 4.5,
    dedicacao: 4.2,
    colaboracao: 4.8,
    qualidade: 4.3,
    prazo: 4.0,
    criatividade: 4.6,
    comentarios: [
      "João é muito dedicado e sempre entrega no prazo.",
      "Excelente trabalho em equipe, sempre disposto a ajudar.",
      "Poderia melhorar um pouco na criatividade das soluções.",
    ],
  },
  {
    nome: "Maria Santos",
    assiduidade: 4.8,
    dedicacao: 4.7,
    colaboracao: 4.5,
    qualidade: 4.9,
    prazo: 4.6,
    criatividade: 4.7,
    comentarios: [
      "Maria é extremamente pontual e assídua.",
      "Seu trabalho é sempre de altíssima qualidade.",
      "Contribui muito com ideias criativas para o projeto.",
    ],
  },
  {
    nome: "Pedro Oliveira",
    assiduidade: 4.2,
    dedicacao: 4.5,
    colaboracao: 4.3,
    qualidade: 4.4,
    prazo: 4.1,
    criatividade: 4.3,
    comentarios: [
      "Pedro tem se esforçado bastante, mas às vezes atrasa as entregas.",
      "Bom trabalho em equipe, sempre disposto a aprender.",
      "Tem potencial para melhorar em todos os aspectos.",
    ],
  },
];

const criterios = ["assiduidade", "dedicacao", "colaboracao", "qualidade", "prazo", "criatividade"];

export default function ReportsGroups() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const calcularMedia = (aluno) => {
    const soma = criterios.reduce((acc, criterio) => acc + aluno[criterio], 0);
    return (soma / criterios.length).toFixed(2);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Usando o componente Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main content */}
      <div className="flex-1 p-8 max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Relatórios de Avaliação</h1>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione o grupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grupo-a">Grupo A</SelectItem>
                <SelectItem value="grupo-b">Grupo B</SelectItem>
                <SelectItem value="grupo-c">Grupo C</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Exportar Relatório
            </Button>
          </div>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Médias por Critério</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip />
                {criterios.map((criterio, index) => (
                  <Bar key={criterio} dataKey={criterio} fill={`hsl(${index * 60}, 70%, 50%)`} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes das Avaliações</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  {criterios.map((criterio) => (
                    <TableHead key={criterio} className="text-right">
                      {criterio.charAt(0).toUpperCase() + criterio.slice(1)}
                    </TableHead>
                  ))}
                  <TableHead className="text-right">Média</TableHead>
                  <TableHead className="text-right">Comentários</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((aluno, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{aluno.nome}</TableCell>
                    {criterios.map((criterio) => (
                      <TableCell key={criterio} className="text-right">
                        {aluno[criterio]}
                      </TableCell>
                    ))}
                    <TableCell className="text-right font-bold">{calcularMedia(aluno)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Ver
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Comentários - {aluno.nome}</DialogTitle>
                            <DialogDescription>Feedback recebido pelos colegas de equipe.</DialogDescription>
                          </DialogHeader>
                          <ScrollArea className="mt-4 h-[200px] rounded-md border p-4">
                            {aluno.comentarios.map((comentario, index) => (
                              <p key={index} className="mb-4 last:mb-0">
                                • {comentario}
                              </p>
                            ))}
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}