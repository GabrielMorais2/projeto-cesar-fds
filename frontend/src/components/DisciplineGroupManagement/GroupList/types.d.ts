export interface Discipline {
  id: number;
  name: string;
}

export interface Student {
  name: string;
  email: string;
}

export interface Group {
  id: number;
  name: string;
  students: Student[];
  disciplineName: string;
  disciplineId: number;
}

export interface GroupListProps {
  disciplines: Discipline[];
  groups: Group[];
  isAddingGroup: boolean;
  editingGroup: boolean;
  setIsAddingGroup: (open: boolean) => void;
  newGroup: {
    name: string;
    disciplineId: number;
    students: Student[];
  };
  setNewGroup: (group: {
    name: string;
    disciplineId: number;
    students: Student[];
  }) => void;
  handleAddGroup: () => void;
  handleAddStudent: () => void;
  handleRemoveStudent: (index: number) => void;
  handleCsvUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedDiscipline: string;
  handleDisciplineFilter: (value: string) => void;
  handleDeleteGroup: (id: number) => void;
  handleEditGroup: (group: Group) => void;
  handleSendGroup: (id: number) => void;
}
