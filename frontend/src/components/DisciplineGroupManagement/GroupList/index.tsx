import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, Pencil, Trash2, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GroupListProps } from './types';

export default function GroupList({
  disciplines,
  groups,
  isAddingGroup,
  newGroup,
  setNewGroup,
  handleAddGroup,
  handleAddStudent,
  handleRemoveStudent,
  handleCsvUpload,
  handleDeleteGroup,
  handleEditGroup,
  editingGroup,
  setIsAddingGroup,
  setEditingGroup
}: GroupListProps) {
  const [filters, setFilters] = useState({
    name: "",
    discipline: "all",
  });
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const filteredAndSearchedGroups = useMemo(() => {
    return groups.filter((group) => {
      const matchesName = group.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchesDiscipline =
        filters.discipline === "all" ||
        group.disciplineName === filters.discipline;
      return matchesName && matchesDiscipline;
    });
  }, [groups, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      discipline: "all",
    });
  };

  const applyFilters = () => {
    setIsFilterDialogOpen(false);
  };

  const resetForm = () => {
    setNewGroup({
      name: '',
      disciplineId: '',
      students: [{ name: '', email: '' }]
    });
    setEditingGroup(null);
  };

  useEffect(() => {
    if (!isAddingGroup) {
      resetForm();
    }
  }, [isAddingGroup]);

  const handleOpenAddDialog = () => {
    resetForm();
    setIsAddingGroup(true);
  };

  return (
    <Card className="bg-white shadow-lg mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <CardTitle className="text-3xl font-bold text-gray-800">
          Gerenciar Grupos
        </CardTitle>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Dialog
            open={isFilterDialogOpen}
            onOpenChange={setIsFilterDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4" />
                Filtrar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filtrar Grupos</DialogTitle>
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
                  <Label htmlFor="discipline" className="text-right">
                    Disciplina
                  </Label>
                  <Select
                    value={filters.discipline}
                    onValueChange={(value) =>
                      handleFilterChange("discipline", value)
                    }
                  >
                    <SelectTrigger id="discipline" className="col-span-3">
                      <SelectValue placeholder="Selecione a disciplina" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {disciplines.map((discipline) => (
                        <SelectItem key={discipline.id} value={discipline.name}>
                          {discipline.name}
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
                <Button
                  onClick={applyFilters}
                  className="bg-orange hover:bg-orange text-white"
                >
                  Aplicar Filtros
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddingGroup} onOpenChange={setIsAddingGroup}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenAddDialog} className="bg-orange hover:bg-orange text-white w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Adicionar Grupo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>{editingGroup ? "Editar Grupo" : "Adicionar Novo Grupo"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="group-name" className="text-right">
                    Nome do Grupo
                  </Label>
                  <Input
                    id="group-name"
                    value={newGroup.name}
                    onChange={(e) =>
                      setNewGroup({ ...newGroup, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="discipline" className="text-right">
                    Disciplina
                  </Label>
                  <Select
                    value={newGroup.disciplineId.toString()}
                    onValueChange={(value) =>
                      setNewGroup({
                        ...newGroup,
                        disciplineId: parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger id="discipline" className="col-span-3">
                      <SelectValue placeholder="Selecione a disciplina" />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Label className="text-right">Estudantes</Label>
                  <div className="col-span-3 space-y-2">
                    <AnimatePresence>
                      {newGroup.students.map((student, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            placeholder="Nome"
                            value={student.name}
                            onChange={(e) =>
                              setNewGroup((prevGroup) => {
                                const updatedStudents = [...prevGroup.students];
                                updatedStudents[index].name = e.target.value;
                                return {
                                  ...prevGroup,
                                  students: updatedStudents,
                                };
                              })
                            }
                          />
                          <Input
                            placeholder="Email"
                            value={student.email}
                            onChange={(e) =>
                              setNewGroup((prevGroup) => {
                                const updatedStudents = [...prevGroup.students];
                                updatedStudents[index].email = e.target.value;
                                return {
                                  ...prevGroup,
                                  students: updatedStudents,
                                };
                              })
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleRemoveStudent(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleAddStudent}
                    >
                      Adicionar Estudante
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="csv-upload" className="text-right">
                    Upload CSV
                  </Label>
                  <Input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleCsvUpload}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingGroup(false);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    handleAddGroup();
                    setIsAddingGroup(false);
                    resetForm();
                  }}
                  className="bg-orange hover:bg-orange text-white"
                >
                  {editingGroup ? "Salvar Alterações" : "Adicionar Grupo"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Nome</TableHead>
                <TableHead className="w-[30%]">Disciplina</TableHead>
                <TableHead className="w-[30%]">Estudantes</TableHead>
                <TableHead className="w-[10%]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredAndSearchedGroups.map((group) => (
                  <motion.tr
                    key={group.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TableCell className="font-medium">{group.name}</TableCell>
                    <TableCell>{group.disciplineName}</TableCell>
                    <TableCell>
                      {group.students?.map((student) => student.name).join(", ")}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            handleEditGroup(group);
                            setIsAddingGroup(true);
                          }}
                          className="p-2"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleDeleteGroup(group.id)}
                          className="p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
        {filteredAndSearchedGroups.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum grupo encontrado com os filtros selecionados.
          </div>
        )}
      </CardContent>
    </Card>
  );
}