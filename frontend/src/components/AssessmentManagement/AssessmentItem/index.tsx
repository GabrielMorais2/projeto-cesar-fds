import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Send } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import AssessmentDialog from "../AssessmentDialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Assessment {
  id: number;
  name: string;
  discipline: {
    id: number;
    name: string;
  };
  group: {
    id: number;
    name: string;
  };
  deadline: string;
  sent: boolean;
}

interface AssessmentItemProps {
  assessment: Assessment;
  handleEdit: (assessment: Assessment) => void;
  handleDelete: (id: number) => Promise<void>;
  handleSendAssessment: (id: number) => Promise<void>;
}

const AssessmentItem: React.FC<AssessmentItemProps> = ({
  assessment,
  handleEdit,
  handleDelete,
  handleSendAssessment,
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{assessment.name}</TableCell>
      <TableCell>{assessment.discipline.name}</TableCell>
      <TableCell>{assessment.group.name}</TableCell>
      <TableCell>
    {assessment.deadline
      ? format(
          new Date(assessment.deadline + 'T00:00:00-03:00'),
          "dd/MM/yyyy",
          { locale: ptBR }
        )
      : "Sem data"}
  </TableCell>
      <TableCell>
        {assessment.sent ? (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Enviada
          </span>
        ) : (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
            Pendente
          </span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleEdit(assessment)}
            className="hover:bg-blue-100 hover:text-blue-600 transition-colors"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Editar avaliação</span>
          </Button>
          <AssessmentDialog
            assessmentId={assessment.id}
            assessmentName={assessment.name}
            handleDelete={handleDelete}
          />
          {!assessment.sent && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleSendAssessment(assessment.id)}
              className="hover:bg-green-100 hover:text-green-600 transition-colors"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar avaliação</span>
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AssessmentItem;
