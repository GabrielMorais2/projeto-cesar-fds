import React, { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Filter, Pencil, Trash2, Plus } from "lucide-react"
import { DisciplineListProps } from './types'
import { motion, AnimatePresence } from "framer-motion"

export default function Component({
  disciplines,
  isAddingDiscipline,
  setIsAddingDiscipline,
  newDiscipline,
  setNewDiscipline,
  handleAddDiscipline,
  handleDeleteDiscipline,
  handleEditDiscipline,
  editingDiscipline,
  setEditingDiscipline
}: DisciplineListProps) {
  const [filters, setFilters] = useState({
    name: "",
    course: "",
    semester: "all",
  })
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)

  const filteredDisciplines = useMemo(() => {
    return disciplines.filter((discipline) => {
      const matchesName = discipline.name.toLowerCase().includes(filters.name.toLowerCase())
      const matchesCourse = discipline.course.toLowerCase().includes(filters.course.toLowerCase())
      const matchesSemester = filters.semester === "all" || discipline.semester === filters.semester
      return matchesName && matchesCourse && matchesSemester
    })
  }, [disciplines, filters])

  const semesters = useMemo(() => {
    const uniqueSemesters = new Set(disciplines.map((d) => d.semester))
    return Array.from(uniqueSemesters).sort()
  }, [disciplines])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      name: "",
      course: "",
      semester: "all",
    })
  }

  const applyFilters = () => {
    setIsFilterDialogOpen(false)
  }

  const resetForm = () => {
    setNewDiscipline({
      name: '',
      course: '',
      semester: ''
    });
    setEditingDiscipline(null);
  };

  useEffect(() => {
    if (!isAddingDiscipline) {
      resetForm();
    }
  }, [isAddingDiscipline]);

  const handleOpenAddDialog = () => {
    resetForm();
    setIsAddingDiscipline(true);
  };

  return (
    <Card className="bg-white shadow-lg mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <CardTitle className="text-3xl font-bold text-gray-800">Disciplinas</CardTitle>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4" />
                Filtrar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filtrar Disciplinas</DialogTitle>
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
                  <Label htmlFor="course" className="text-right">
                    Curso
                  </Label>
                  <Input
                    id="course"
                    value={filters.course}
                    onChange={(e) => handleFilterChange("course", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="semester" className="text-right">
                    Semestre
                  </Label>
                  <Select
                    value={filters.semester}
                    onValueChange={(value) => handleFilterChange("semester", value)}
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
                <Button onClick={applyFilters} className="bg-orange hover:bg-orange text-white">
                  Aplicar Filtros
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddingDiscipline} onOpenChange={setIsAddingDiscipline}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenAddDialog} className="bg-orange hover:bg-orange text-white w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Disciplina
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingDiscipline ? "Editar Disciplina" : "Adicionar Nova Disciplina"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="new-name"
                    value={newDiscipline.name}
                    onChange={(e) => setNewDiscipline({ ...newDiscipline, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-course" className="text-right">
                    Curso
                  </Label>
                  <Input
                    id="new-course"
                    value={newDiscipline.course}
                    onChange={(e) => setNewDiscipline({ ...newDiscipline, course: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-semester" className="text-right">
                    Semestre
                  </Label>
                  <Input
                    id="new-semester"
                    value={newDiscipline.semester}
                    onChange={(e) => setNewDiscipline({ ...newDiscipline, semester: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingDiscipline(false);
                    resetForm();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    handleAddDiscipline();
                    setIsAddingDiscipline(false);
                    resetForm();
                  }}
                  className="bg-orange hover:bg-orange text-white"
                >
                  {editingDiscipline ? "Salvar Alterações" : "Adicionar Disciplina"}
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
                <TableHead className="w-[25%]">Curso</TableHead>
                <TableHead className="w-[15%]">Semestre</TableHead>
                <TableHead className="w-[15%]">Número de Grupos</TableHead>
                <TableHead className="w-[15%] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredDisciplines.map((discipline) => (
                  <motion.tr
                    key={discipline.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TableCell className="font-medium">{discipline.name}</TableCell>
                    <TableCell>{discipline.course}</TableCell>
                    <TableCell>{discipline.semester}</TableCell>
                    <TableCell>{discipline.groups?.length || 0}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            handleEditDiscipline(discipline);
                            setIsAddingDiscipline(true);
                          }}
                          className="hover:bg-blue-100 hover:text-blue-600 transition-colors p-2"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar disciplina</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteDiscipline(discipline.id)}
                          className="hover:bg-red-100 hover:text-red-600 transition-colors p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir disciplina</span>
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
        {filteredDisciplines.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhuma disciplina encontrada com os filtros selecionados.
          </div>
        )}
      </CardContent>
    </Card>
  )
}