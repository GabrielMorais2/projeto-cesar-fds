import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import data from "../../data.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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

const criterios = [
  "assiduidade",
  "dedicacao",
  "colaboracao",
  "qualidade",
  "prazo",
  "criatividade",
];
const disciplinas = [
  "Engenharia de Software",
  "Banco de Dados",
  "Inteligência Artificial",
];
const grupos = ["Grupo A", "Grupo B"];

export default function ReportsGroups() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedDisciplina, setSelectedDisciplina] = useState<
    string | undefined
  >(undefined);
  const [selectedGrupo, setSelectedGrupo] = useState<string | undefined>(
    undefined
  );

  const calcularMedia = (aluno) => {
    const soma = criterios.reduce((acc, criterio) => acc + aluno[criterio], 0);
    return (soma / criterios.length).toFixed(2);
  };

  function calculateAverages(data) {
    return data.map((item) => {
      const averages = criterios.reduce((acc, criterio) => {
        const values = item[criterio] || [];
        const average =
          values.reduce((sum, value) => sum + value, 0) / values.length;
        acc[criterio] = average.toFixed(2);
        return acc;
      }, {});

      return {
        ...item,
        ...averages,
      };
    });
  }

  const filteredData = data.filter(
    (aluno) =>
      (selectedDisciplina ? aluno.disciplina === selectedDisciplina : true) &&
      (selectedGrupo ? aluno.grupo === selectedGrupo : true)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Usando o componente Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main content */}
      <div className="flex-1 p-8 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Relatórios de Avaliação</h1>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Select onValueChange={setSelectedDisciplina}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione a disciplina" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Disciplinas</SelectItem>
                {disciplinas.map((disciplina) => (
                  <SelectItem key={disciplina} value={disciplina}>
                    {disciplina}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedGrupo}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione o grupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Grupos</SelectItem>
                {grupos.map((grupo) => (
                  <SelectItem key={grupo} value={grupo}>
                    {grupo}
                  </SelectItem>
                ))}
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
              <BarChart data={calculateAverages(filteredData)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D0D0D0" />
                <XAxis dataKey="nome" tick={{ fontSize: 12, fill: "#333" }} />
                <YAxis tick={{ fontSize: 12, fill: "#333" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#F9F9F9",
                    borderColor: "#D0D0D0",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                />
                {criterios.map((criterio, index) => (
                  <Bar
                    key={criterio}
                    dataKey={criterio}
                    fill={`rgba(180, 180, 180, ${0.5 + index * 0.1})`} // Variando a opacidade
                    label={{ position: "top", fill: "#333", fontSize: 12 }}
                  />
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
          <TableHead className="text-center">Aluno</TableHead>
          {criterios.map((criterio) => (
            <TableHead key={criterio} className="text-center">
              {criterio.charAt(0).toUpperCase() + criterio.slice(1)}
            </TableHead>
          ))}
          <TableHead className="text-center">Média</TableHead>
          <TableHead className="text-center">Comentários</TableHead>
          <TableHead className="text-center">Pesquisa Preenchida</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.map((aluno, i) => {
          // Calcular a média dos valores para cada critério
          const media = criterios.reduce((acc, criterio) => {
            const valores = aluno[criterio];
            if (Array.isArray(valores)) {
              const soma = valores.reduce((soma, valor) => soma + valor, 0);
              return acc + (soma / valores.length);
            }
            return acc;
          }, 0) / criterios.length;

          return (
            <TableRow key={i}>
              <TableCell className="text-center font-medium">
                {aluno.nome}
              </TableCell>
              {criterios.map((criterio) => {
                // Calcular a média para cada critério
                const valores = aluno[criterio];
                const mediaCriterio = Array.isArray(valores) 
                  ? (valores.reduce((soma, valor) => soma + valor, 0) / valores.length).toFixed(2) 
                  : valores;

                return (
                  <TableCell key={criterio} className="text-center">
                    {mediaCriterio}
                  </TableCell>
                );
              })}
              <TableCell className="text-center font-bold">
                {media.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Ver
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        Comentários - {aluno.nome}
                      </DialogTitle>
                      <DialogDescription>
                        Feedback recebido pelos colegas de equipe.
                      </DialogDescription>
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
              <TableCell
                className={`text-center font-medium ${
                  aluno.preenchido ? "text-green-500" : "text-red-500"
                }`}
              >
                {aluno.preenchido ? "Preenchido" : "Falta Preencher"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </CardContent>
</Card>
      </div>
    </div>
  );
}
