import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function CriacaoGrupo() {
  const [alunos, setAlunos] = useState([{ nome: '', email: '' }]);

  const adicionarAluno = () => {
    setAlunos([...alunos, { nome: '', email: '' }]);
  };

  const removerAluno = (index: number) => {
    setAlunos(alunos.filter((_, i) => i !== index));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center bg-green-500 text-white hover:bg-green-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Criar Novo Grupo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Grupo</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="disciplina">Disciplina</Label>
              <Select>
                <SelectTrigger id="disciplina">
                  <SelectValue placeholder="Selecione a disciplina" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eng-software">Engenharia de Software</SelectItem>
                  <SelectItem value="banco-dados">Banco de Dados</SelectItem>
                  <SelectItem value="ia">Inteligência Artificial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="turma">Turma</Label>
              <Input id="turma" placeholder="Ex: A" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="semestre">Semestre</Label>
            <Input id="semestre" placeholder="Ex: 2023.1" />
          </div>

          <div className="space-y-2">
            <Label>Alunos</Label>
            {alunos.map((aluno, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Nome do aluno"
                  value={aluno.nome}
                  onChange={(e) => {
                    const newAlunos = [...alunos];
                    newAlunos[index].nome = e.target.value;
                    setAlunos(newAlunos);
                  }}
                />
                <Input
                  placeholder="Email do aluno"
                  type="email"
                  value={aluno.email}
                  onChange={(e) => {
                    const newAlunos = [...alunos];
                    newAlunos[index].email = e.target.value;
                    setAlunos(newAlunos);
                  }}
                />
                <Button variant="ghost" size="icon" onClick={() => removerAluno(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={adicionarAluno}>Adicionar Aluno</Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="csv">Ou faça upload de um arquivo CSV</Label>
            <div className="flex items-center gap-2">
              <Input id="csv" type="file" accept=".csv" />
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full">Criar Grupo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
