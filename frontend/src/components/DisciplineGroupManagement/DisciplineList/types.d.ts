export interface Discipline {
    id: number;
    name: string;
    course: string;
    semester: string;
    groups: any[];
  }
  
  export interface DisciplineListProps {
    setEditingDiscipline: () => void;
    disciplines: Discipline[];
    isAddingDiscipline: boolean;
    setIsAddingDiscipline: (isAdding: boolean) => void;
    newDiscipline: {
      name: string;
      course: string;
      semester: string;
    };
    setNewDiscipline: (discipline: {
      name: string;
      course: string;
      semester: string;
    }) => void;
    handleAddDiscipline: () => void;
    handleDeleteDiscipline: (id: number) => void;
    handleEditDiscipline: (discipline: Discipline) => void;
    editingDiscipline: boolean;
  }