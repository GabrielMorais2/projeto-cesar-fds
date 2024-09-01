import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, Edit, Trash2, Send } from 'lucide-react'

interface Discipline {
  id: number;
  name: string;
}

interface Student {
  name: string;
  registration: string;
  email: string;
}

interface Group {
  id: number;
  name: string;
  students: string[];
  disciplineName: string;
}

interface GroupListProps {
  disciplines: Discipline[];
  filteredGroups: Group[];
  isAddingGroup: boolean;
  setIsAddingGroup: (open: boolean) => void;
  newGroup: {
    discipline: string;
    students: Student[];
  };
  setNewGroup: (group: {
    discipline: string;
    students: Student[];
  }) => void;
  handleAddGroup: () => void;
  handleAddStudent: () => void;
  handleRemoveStudent: (index: number) => void;
  handleCsvUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedDiscipline: string;
  handleDisciplineFilter: (value: string) => void;
  handleDeleteGroup: any;
}

const GroupList: React.FC<GroupListProps> = ({
  disciplines,
  filteredGroups,
  isAddingGroup,
  setIsAddingGroup,
  newGroup,
  setNewGroup,
  handleAddGroup,
  handleAddStudent,
  handleRemoveStudent,
  handleCsvUpload,
  selectedDiscipline,
  handleDisciplineFilter,
  handleDeleteGroup
}) => {
  console.log('Selected Discipline:', selectedDiscipline);
  console.log('Filtered Groups:', filteredGroups);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grupos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">Lista de Grupos</h2>
            <Select value={selectedDiscipline} onValueChange={(value) => {
              console.log('Filter Changed:', value);
              handleDisciplineFilter(value);
            }}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por disciplina" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as disciplinas</SelectItem>
                {disciplines.map((discipline) => (
                  <SelectItem key={discipline.id} value={discipline.name}>{discipline.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isAddingGroup} onOpenChange={setIsAddingGroup}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> Adicionar Grupo</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Grupo</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="discipline" className="text-right">Disciplina</Label>
                  <Select
                    value={newGroup.discipline}
                    onValueChange={(value) => setNewGroup({ ...newGroup, discipline: value })}
                  >
                    <SelectTrigger className="w-[180px] col-span-3">
                      <SelectValue placeholder="Selecione a disciplina" />
                    </SelectTrigger>
                    <SelectContent>
                      {disciplines.map((discipline) => (
                        <SelectItem key={discipline.id} value={discipline.name}>{discipline.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Estudantes</Label>
                  <div className="col-span-3 space-y-2">
                    {newGroup.students.map((student, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder="Nome"
                          value={student.name}
                          onChange={(e) =>
                            setNewGroup((prevGroup) => {
                              const updatedStudents = [...prevGroup.students];
                              updatedStudents[index].name = e.target.value;
                              return { ...prevGroup, students: updatedStudents };
                            })
                          }
                        />
                        <Input
                          placeholder="Matrícula"
                          value={student.registration}
                          onChange={(e) =>
                            setNewGroup((prevGroup) => {
                              const updatedStudents = [...prevGroup.students];
                              updatedStudents[index].registration = e.target.value;
                              return { ...prevGroup, students: updatedStudents };
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
                              return { ...prevGroup, students: updatedStudents };
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
                      </div>
                    ))}
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
                  <Label htmlFor="csv-upload" className="text-right">Upload CSV</Label>
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
                <Button onClick={handleAddGroup}>Adicionar Grupo</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Disciplina</TableHead>
              <TableHead>Nome do Grupo</TableHead>
              <TableHead>Estudantes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.disciplineName}</TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>
                  {group.students.join(', ')}
                </TableCell>
                <TableCell>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteGroup(group.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                        </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GroupList;
