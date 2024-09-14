import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import Breadcrumbs from "../DisciplineGroupManagement/Breadcrumbs";
import AssessmentForm from "./AssessmentForm";
import AssessmentList from "./AssessmentList";
import AssessmentSearch from "./AssessmentSearch";
import mockApi from "../../utils/mockApi";
import http from "@/api";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { formatISO } from "date-fns";

export default function AssessmentManagement() {
  // State
  const [assessments, setAssessments] = useState([]);
  const [newAssessment, setNewAssessment] = useState({
    name: "",
    disciplineId: "",
    groupId: "",
    deadline: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddingAssessment, setIsAddingAssessment] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [disciplines, setDisciplines] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  const fetchDisciplines = useCallback(async () => {
    try {
      const response = await mockApi.getDisciplines();
      setDisciplines(response.data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao buscar as disciplinas.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchGroups = useCallback(async () => {
    try {
      const response = await mockApi.getGroups();
      setGroups(response.data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao buscar os grupos.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchAssessments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await http.get("/v1/evaluations");
      setAssessments(response.data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao buscar as avaliações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAssessments();
    fetchDisciplines();
    fetchGroups();
  }, [fetchAssessments, fetchDisciplines, fetchGroups]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formattedDueDate = newAssessment.deadline
        ? formatISO(newAssessment.deadline, { representation: "date" })
        : undefined;

      const payload = {
        ...newAssessment,
        deadline: formattedDueDate,
      };

      if (isEditing) {
        await http.put(`/v1/evaluations/${editingId}`, payload);
        toast({
          title: "Sucesso",
          description: "Avaliação atualizada com sucesso.",
          variant: "success",
        });
      } else {
        await http.post("/v1/evaluations", payload);
        toast({
          title: "Sucesso",
          description: "Nova avaliação criada com sucesso.",
          variant: "success",
        });
      }

      await fetchAssessments();
      resetFormState();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Ocorreu um erro";
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setIsAddingAssessment(false);
    setNewAssessment({
      name: "",
      disciplineId: "",
      groupId: "",
      deadline: undefined,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (assessment) => {
    setNewAssessment({
      name: assessment.name,
      disciplineId: assessment.discipline.id,
      groupId: assessment.group.id,
      deadline: new Date(assessment.deadline + "T00:00:00-03:00"),
    });
    setIsEditing(true);
    setEditingId(assessment.id);
    setIsAddingAssessment(true);
  };

  const handleDelete = async (id) => {
    try {
      await http.delete(`/v1/evaluations/${id}`);
      toast({
        title: "Sucesso",
        description: "Avaliação excluída com sucesso.",
        variant: "success",
      });
      await fetchAssessments();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir a avaliação.",
        variant: "destructive",
      });
    }
  };

  const handleSendAssessment = async (id) => {
    try {
      await http.post(`/v1/evaluations/${id}/send`);
      toast({
        title: "Sucesso",
        description: "Avaliação enviada com sucesso.",
        variant: "success",
      });
      await fetchAssessments();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar a avaliação.",
        variant: "destructive",
      });
    }
  };

  const openFormForAdd = () => {
    resetFormState();
    setIsAddingAssessment(true);
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
            { label: "Gerenciamento de Avaliações", href: "#" },
          ]}
        />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Gerenciamento de Avaliações
          </h1>
          <Button
            onClick={openFormForAdd}
            className="bg-orange hover:bg-orange"
          >
            <Plus className="mr-2 h-4 w-4" /> Adicionar Avaliação
          </Button>
        </div>

        <AssessmentSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <AssessmentList
          assessments={assessments}
          searchTerm={searchTerm}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleSendAssessment={handleSendAssessment}
          disciplines={disciplines}
          groups={groups}
        />

        <AssessmentForm
          newAssessment={newAssessment}
          setNewAssessment={setNewAssessment}
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          isSubmitting={isSubmitting}
          disciplines={disciplines}
          groups={groups}
          isAddingAssessment={isAddingAssessment}
          setIsAddingAssessment={setIsAddingAssessment}
          resetFormState={resetFormState}
        />
      </main>
    </div>
  );
}
