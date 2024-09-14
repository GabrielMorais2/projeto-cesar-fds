import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AssessmentItem from "../AssessmentItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Filter } from "lucide-react";

interface Assessment {
  id: number;
  name: string;
  discipline: {
    id: number;
    name: string;
    semester: string;
  };
  group: {
    id: number;
    name: string;
  };
  deadline: string;
  sent: boolean;
}

interface AssessmentListProps {
  assessments: Assessment[];
  searchTerm: string;
  handleEdit: (assessment: Assessment) => void;
  handleDelete: (id: number) => void;
  handleSendAssessment: (id: number) => void;
  disciplines: { id: number; name: string }[];
  groups: { id: number; name: string }[];
}

const AssessmentList: React.FC<AssessmentListProps> = ({
  assessments,
  searchTerm,
  handleEdit,
  handleDelete,
  handleSendAssessment,
  disciplines,
  groups,
}) => {
  const [filters, setFilters] = useState({
    name: "",
    disciplineId: "",
    groupId: "",
    deadline: null as Date | null,
    status: "all",
    semester: "all",
  });
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const filteredAssessments = useMemo(() => {
    return assessments.filter((assessment) => {
      const matchesName = assessment.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchesDiscipline =
        (filters.disciplineId === "" || filters.disciplineId === "all") ||
        assessment.discipline.id.toString() === filters.disciplineId;
      const matchesGroup =
        (filters.groupId === "" || filters.groupId === "all") ||
        assessment.group.id.toString() === filters.groupId;
      const matchesDeadline =
        !filters.deadline ||
        assessment.deadline === format(filters.deadline, "yyyy-MM-dd");
      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "sent" && assessment.sent) ||
        (filters.status === "pending" && !assessment.sent);
      const matchesSemester =
        filters.semester === "all" ||
        assessment.discipline.semester === filters.semester;

      return (
        matchesName &&
        matchesDiscipline &&
        matchesGroup &&
        matchesDeadline &&
        matchesStatus &&
        matchesSemester
      );
    });
  }, [assessments, filters]);

  const semesters = useMemo(() => {
    const uniqueSemesters = new Set(assessments.map((a) => a.discipline.semester));
    return Array.from(uniqueSemesters).sort();
  }, [assessments]);

  const handleFilterChange = (key: string, value: string | Date | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      disciplineId: "",
      groupId: "",
      deadline: null,
      status: "all",
      semester: "all",
    });
  };

  const applyFilters = () => {
    setIsFilterDialogOpen(false);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Avaliações Existentes
        </CardTitle>
        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filtrar Avaliações</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="disciplineId" className="text-right">
                  Disciplina
                </Label>
                <Select
                  value={filters.disciplineId}
                  onValueChange={(value) =>
                    handleFilterChange("disciplineId", value)
                  }
                >
                  <SelectTrigger id="disciplineId" className="col-span-3">
                    <SelectValue placeholder="Selecione a disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {disciplines.map((discipline) => (
                      <SelectItem
                        key={discipline.id}
                        value={discipline.id.toString()}
                      >
                        {discipline.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="groupId" className="text-right">
                  Grupo
                </Label>
                <Select
                  value={filters.groupId}
                  onValueChange={(value) =>
                    handleFilterChange("groupId", value)
                  }
                >
                  <SelectTrigger id="groupId" className="col-span-3">
                    <SelectValue placeholder="Selecione o grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id.toString()}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Data Limite
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="deadline"
                      variant="outline"
                      className="col-span-3 justify-start text-left font-normal"
                    >
                      {filters.deadline
                        ? format(filters.deadline, "dd/MM/yyyy", {
                            locale: ptBR,
                          })
                        : "Selecionar data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.deadline}
                      onSelect={(date) => handleFilterChange("deadline", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger id="status" className="col-span-3">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="sent">Enviados</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="semester" className="text-right">
                  Semestre
                </Label>
                <Select
                  value={filters.semester}
                  onValueChange={(value) =>
                    handleFilterChange("semester", value)
                  }
                >
                  <SelectTrigger id="semester" className="col-span-3">
                    <SelectValue placeholder="Selecione o semestre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={clearFilters}>
                Limpar Filtros
              </Button>
              <Button onClick={applyFilters} className="bg-orange ">Aplicar Filtros</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Disciplina</TableHead>
              <TableHead>Grupo</TableHead>
              <TableHead>Data Limite</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssessments.map((assessment) => (
              <AssessmentItem
                key={assessment.id}
                assessment={assessment}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleSendAssessment={handleSendAssessment}
              />
            ))}
          </TableBody>
        </Table>
        {filteredAssessments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhuma avaliação encontrada com os filtros selecionados.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssessmentList;
