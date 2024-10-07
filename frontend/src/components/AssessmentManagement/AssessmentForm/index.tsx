import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

export interface Discipline {
  id: number;
  name: string;
  course: string;
  semester: string;
  groups: any[];
}

interface Group {
  id: number;
  name: string;
  students: Student[];
}

interface Student {
  name: string;
  email: string;
}

interface Assessment {
  name: string;
  disciplineId: number;
  groupId: number;
  deadline: Date | undefined;
}

interface AssessmentFormProps {
  newAssessment: Assessment;
  setNewAssessment: React.Dispatch<React.SetStateAction<Assessment>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isEditing: boolean;
  isSubmitting: boolean;
  disciplines: Discipline[];
  groups: Group[];
  isAddingAssessment: boolean;
  setIsAddingAssessment: React.Dispatch<React.SetStateAction<boolean>>;
  resetFormState: () => void;
}

export default function AssessmentForm({
  newAssessment,
  setNewAssessment,
  handleSubmit,
  isEditing,
  isSubmitting,
  disciplines,
  groups,
  isAddingAssessment,
  setIsAddingAssessment,
  resetFormState,
}: AssessmentFormProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]); // Estado para grupos filtrados

  const formattedDate = newAssessment.deadline
    ? format(newAssessment.deadline, "PPP", { locale: ptBR })
    : "Selecione uma data";

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAssessment((prev) => ({ ...prev, [name]: value }));
  }, [setNewAssessment]);

  const handleSelectChange = useCallback((name: string) => (value: string) => {
    setNewAssessment((prev) => ({ ...prev, [name]: value }));


  }, [setNewAssessment, groups]);

  const handleDateSelect = useCallback((date: Date | undefined) => {
    setNewAssessment((prev) => ({ ...prev, deadline: date }));
    setIsCalendarOpen(false);
  }, [setNewAssessment]);

  useEffect(() => {

    setFilteredGroups(groups);
  }, [groups]);
  return (
    <Dialog
      open={isAddingAssessment}
      onOpenChange={(isOpen) => {
        setIsAddingAssessment(isOpen);
        if (!isOpen) resetFormState();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {isEditing ? "Editar Avaliação" : "Adicionar Avaliação"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Avaliação</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Digite o nome da avaliação"
              value={newAssessment.name}
              onChange={handleInputChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discipline">Disciplina</Label>
            <Select
              onValueChange={handleSelectChange("disciplineId")}
              value={newAssessment.disciplineId}
            >
              <SelectTrigger id="discipline" className="w-full">
                <SelectValue>
                  {newAssessment.disciplineId
                    ? disciplines.find((discipline) => discipline.id === newAssessment.disciplineId)?.name
                    : "Selecione uma Disciplina"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <AnimatePresence>
                  {disciplines.map((discipline) => (
                    <motion.div
                      key={discipline.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SelectItem value={String(discipline.id)}>
                        {discipline.name}
                      </SelectItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="group">Grupo</Label>
            <Select
              onValueChange={handleSelectChange("groupId")}
              value={newAssessment.groupId}
            >
              <SelectTrigger id="group" className="w-full">
                <SelectValue>
                  {newAssessment.groupId
                    ? filteredGroups.find((group) => group.id === newAssessment.groupId)?.name
                    : "Selecione um Grupo"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <AnimatePresence>
                  {filteredGroups.map((group) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SelectItem value={String(group.id)}>
                        {group.name}
                      </SelectItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </SelectContent>
            </Select>

          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Data Limite</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="deadline"
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formattedDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={newAssessment.deadline}
                  onSelect={handleDateSelect}
                  locale={ptBR}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            type="submit"
            className="w-full bg-orange hover:bg-orange/90 transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : isEditing ? (
              "Salvar Alterações"
            ) : (
              "Adicionar Avaliação"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}