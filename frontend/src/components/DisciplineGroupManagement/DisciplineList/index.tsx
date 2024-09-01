import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Discipline {
  id: number;
  name: string;
  class: string;
  semester: string;
  groups: { id: number; name: string; students: string[] }[];
}

interface DisciplineListProps {
  disciplines: Discipline[];
  isAddingDiscipline: boolean;
  setIsAddingDiscipline: (open: boolean) => void;
  newDiscipline: { name: string; class: string; semester: string };
  setNewDiscipline: (discipline: { name: string; class: string; semester: string }) => void;
  handleAddDiscipline: () => void;
}

const DisciplineList: React.FC<DisciplineListProps> = ({
  disciplines,
  isAddingDiscipline,
  setIsAddingDiscipline,
  newDiscipline,
  setNewDiscipline,
  handleAddDiscipline,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disciplinas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Lista de Disciplinas</h2>
          <Dialog open={isAddingDiscipline} onOpenChange={setIsAddingDiscipline}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> Adicionar Disciplina</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Nova Disciplina</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Nome</Label>
                  <Input
                    id="name"
                    value={newDiscipline.name}
                    onChange={(e) => setNewDiscipline({ ...newDiscipline, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right">Turma</Label>
                  <Input
                    id="class"
                    value={newDiscipline.class}
                    onChange={(e) => setNewDiscipline({ ...newDiscipline, class: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="semester" className="text-right">Semestre</Label>
                  <Input
                    id="semester"
                    value={newDiscipline.semester}
                    onChange={(e) => setNewDiscipline({ ...newDiscipline, semester: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddDiscipline}>Adicionar Disciplina</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome da Disciplina</TableHead>
              <TableHead>Turma</TableHead>
              <TableHead>Semestre</TableHead>
              <TableHead>Número de Grupos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disciplines.map((discipline) => (
              <TableRow key={discipline.id}>
                <TableCell>{discipline.name}</TableCell>
                <TableCell>{discipline.class}</TableCell>
                <TableCell>{discipline.semester}</TableCell>
                <TableCell>{discipline.groups.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DisciplineList;
