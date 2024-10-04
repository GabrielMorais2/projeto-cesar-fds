import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "../Sidebar";
import Breadcrumbs from "./Breadcrumbs";
import GroupList from "./GroupList";
import DisciplineList from "./DisciplineList";
import { toast } from "react-toastify";
import http from "@/api";
import { ToastAction } from "../ui/toast";

// Types
interface Discipline {
  id: number;
  name: string;
  course: string;
  semester: string;
  groups: Group[];
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

interface GroupWithStudentsDTO extends Group {
  disciplineName: string;
  disciplineId: number;
}

export default function DisciplineGroupManagement() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [newDiscipline, setNewDiscipline] = useState({
    name: "",
    course: "",
    semester: "",
  });
  const [isAddingDiscipline, setIsAddingDiscipline] = useState(false);
  const [editingDiscipline, setEditingDiscipline] = useState<Discipline | null>(
    null
  );
  const [editingGroup, setEditingGroup] = useState<Group | null>(
    null
  );
  const [newGroup, setNewGroup] = useState({
    name: "",
    disciplineId: "",
    students: [{ name: "", email: "" }],
  });
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedDiscipline, setSelectedDiscipline] = useState("all");
  const [activeTab, setActiveTab] = useState("disciplines");
  const [filteredGroups, setFilteredGroups] = useState<GroupWithStudentsDTO[]>(
    []
  );

  // API calls
  const fetchDisciplines = useCallback(async () => {
    try {
      const response = await http.get<Discipline[]>("/v1/disciplines");
      setDisciplines(response.data);
      setFilteredGroups(
        response.data.flatMap((discipline) =>
          discipline.groups.map((group) => ({
            ...group,
            disciplineName: discipline.name,
          }))
        )
      );
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar as disciplinas.");
    }
  }, []);

  const addDiscipline = async (discipline: {
    name: string;
    course: string;
    semester: string;
  }) => {
    try {
      const response = await http.post<Discipline>(
        "/v1/disciplines",
        discipline
      );
      return response.data;
    } catch (error) {
      throw new Error("Ocorreu um erro ao adicionar a disciplina.");
    }
  };

  const editDiscipline = async (
    id: number,
    updatedDiscipline: { name: string; course: string; semester: string }
  ) => {
    try {
      const response = await http.put<Discipline>(
        `/v1/disciplines/${id}`,
        updatedDiscipline
      );
      return response.data;
    } catch (error) {
      throw new Error("Ocorreu um erro ao editar a disciplina.");
    }
  };

  const addGroup = async (group: {
    name: string;
    disciplineId: number;
    students: Student[];
  }) => {
    try {
      const response = await http.post<Group>("/v1/groups", group);
      return response.data;
    } catch (error) {
      throw new Error("Ocorreu um erro ao adicionar o grupo.");
    }
  };

  const editGroup = async (
    id: number,
    updatedGroup: any
  ) => {
    try {
      const response = await http.put<Group>(
        `/v1/groups/${id}`,
        updatedGroup
      );
      return response.data;
    } catch (error) {
      throw new Error("Ocorreu um erro ao editar a disciplina.");
    }
  };

  const deleteGroup = async (groupId: number) => {
    try {
      await http.delete(`/v1/groups/${groupId}`);
    } catch (error) {
      throw new Error("Ocorreu um erro ao excluir o grupo.");
    }
  };

  // Effects
  useEffect(() => {
    fetchDisciplines();
  }, [activeTab]);

  // Handlers
  const handleAddDiscipline = async () => {
    if (newDiscipline.name && newDiscipline.course && newDiscipline.semester) {
      try {
        if (editingDiscipline) {
          const updatedDiscipline = await editDiscipline(
            editingDiscipline.id,
            newDiscipline
          );
          setDisciplines(
            disciplines.map((d) =>
              d.id === updatedDiscipline.id ? updatedDiscipline : d
            )
          );
          setEditingDiscipline(null);
        } else {
          const addedDiscipline = await addDiscipline(newDiscipline);
          setDisciplines([...disciplines, addedDiscipline]);
        }
        setNewDiscipline({ name: "", course: "", semester: "" });
        setIsAddingDiscipline(false);
        toast.success(
          editingDiscipline
            ? "Disciplina editada com sucesso."
            : "Disciplina adicionada com sucesso."
        );
      } catch (error) {
        toast.error("Ocorreu um erro ao adicionar ou editar a disciplina.");
      }
    }
  };

  const handleAddGroup = async () => {
    if (newGroup.name && newGroup.disciplineId && newGroup.students.length > 0) {
      try {
        if (editingGroup) {
          const updatedGroup = await editGroup(editingGroup.id, {
            name: newGroup.name,
            disciplineId: Number(newGroup.disciplineId),
            students: newGroup.students,
          });
          setFilteredGroups(
            filteredGroups.map((g) =>
              g.id === updatedGroup.id
                ? { ...updatedGroup, disciplineName: selectedDiscipline }
                : g
            )
          );
          setEditingGroup(null);
        } else {
          const addedGroup = await addGroup(newGroup);
          setFilteredGroups([
            ...filteredGroups,
            { ...addedGroup, disciplineName: selectedDiscipline },
          ]);
        }
        setNewGroup({
          name: "",
          disciplineId: "",
          students: [{ name: "", email: "" }],
        });
        setIsAddingGroup(false);
        fetchDisciplines();
        toast.success(
          editingGroup ? "Grupo editado com sucesso." : "Grupo adicionado com sucesso."
        );
      } catch (error) {
        toast.error("Ocorreu um erro ao adicionar ou editar o grupo.");
      }
    }
  };


  const handleDeleteDiscipline = async (id: number) => {
    try {
      await http.delete(`/v1/disciplines/${id}`);
      setDisciplines(disciplines.filter((discipline) => discipline.id !== id));
      setFilteredGroups(
        filteredGroups.filter((group) => group.disciplineId !== id)
      );
      toast.success("Disciplina excluída com sucesso.");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Erro desconhecido ao tentar deletar a disciplina.";
      
      toast({
        title: "Erro ao deletar",
        description: errorMessage,
        action: <ToastAction altText="Tente novamente">Try again</ToastAction>,
        variant: "destructive"
      });
    }
  };

  const handleEditDiscipline = (discipline: Discipline) => {
    setEditingDiscipline(discipline);
    setNewDiscipline({
      name: discipline.name,
      course: discipline.course,
      semester: discipline.semester,
    });
    setIsAddingDiscipline(true);
  };

  const handleAddStudent = () => {
    setNewGroup({
      ...newGroup,
      students: [...newGroup.students, { name: "", email: "" }],
    });
  };

  const handleRemoveStudent = (index: number) => {
    const updatedStudents = newGroup.students.filter((_, i) => i !== index);
    setNewGroup({ ...newGroup, students: updatedStudents });
  };

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const handleDisciplineFilter = (value: string) => {
    setSelectedDiscipline(value);
    if (value === "all") {
      fetchDisciplines();
    } else {
      setFilteredGroups(
        filteredGroups.filter((group) => group.disciplineName === value)
      );
    }
  };

  const handleDeleteGroup = async (groupId: number) => {
    try {
      await deleteGroup(groupId);
      setFilteredGroups(filteredGroups.filter((group) => group.id !== groupId));
      toast.success("Grupo excluído com sucesso.");
    } catch (error) {
      toast.error("Ocorreu um erro ao excluir o grupo.");
    }
  };

  const handleEditGroup = (group: GroupWithStudentsDTO) => {
    setEditingGroup(group);
    setNewGroup({
      name: group.name,
      disciplineId: "",
      students: group.students,
    });
    setIsAddingGroup(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <main className="flex-1 overflow-auto p-8">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Gerenciamento de Disciplinas e Grupos", href: "#" },
          ]}
        />

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Gerenciamento de Disciplinas e Grupos
        </h1>

        <Tabs defaultValue="disciplines" className="w-full">
          <TabsList>
          <TabsTrigger value="disciplines" onClick={() => setActiveTab("disciplines")}>Disciplinas</TabsTrigger>
          <TabsTrigger value="groups" onClick={() => setActiveTab("groups")}>Grupos</TabsTrigger>
          </TabsList>

          <TabsContent value="disciplines">
            <DisciplineList
              disciplines={disciplines}
              isAddingDiscipline={isAddingDiscipline}
              setIsAddingDiscipline={setIsAddingDiscipline}
              newDiscipline={newDiscipline}
              setNewDiscipline={setNewDiscipline}
              handleAddDiscipline={handleAddDiscipline}
              handleDeleteDiscipline={handleDeleteDiscipline}
              handleEditDiscipline={handleEditDiscipline}
              editingDiscipline={editingDiscipline}
              setEditingDiscipline={setEditingDiscipline}
            />
          </TabsContent>

          <TabsContent value="groups">
            <GroupList
              disciplines={disciplines}
              groups={filteredGroups}
              handleAddGroup={handleAddGroup}
              newGroup={newGroup}
              setNewGroup={setNewGroup}
              handleDeleteGroup={handleDeleteGroup}
              handleEditGroup={handleEditGroup}
              selectedDiscipline={selectedDiscipline}
              handleDisciplineFilter={handleDisciplineFilter}
              handleCsvUpload={handleCsvUpload}
              csvFile={csvFile}
              handleAddStudent={handleAddStudent}
              handleRemoveStudent={handleRemoveStudent}
              setIsAddingGroup={setIsAddingGroup}
              isAddingGroup={isAddingGroup}
              editingGroup={editingGroup}
              setEditingGroup={setEditingGroup }
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
