import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AssessmentDialogProps {
  assessmentId: number;
  assessmentName: string;
  handleDelete: (id: number) => Promise<void>;
}

const AssessmentDialog: React.FC<AssessmentDialogProps> = ({ assessmentId, assessmentName, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await handleDelete(assessmentId);
      setIsOpen(false);
      toast({
        title: "Avaliação excluída",
        description: `A avaliação "${assessmentName}" foi excluída com sucesso.`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a avaliação. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="hover:bg-red-100 hover:text-red-600 transition-colors duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Excluir avaliação</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="w-6 h-6 text-orange-500 mr-2" />
            Confirmar exclusão
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-2">
            Esta ação não pode ser desfeita. Isso excluirá permanentemente a avaliação.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-sm text-gray-700">
            Tem certeza que deseja excluir a avaliação <span className="font-semibold text-orange-700">"{assessmentName}"</span>?
          </p>
        </div>
        <DialogFooter className="mt-6 space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)} 
            className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border-gray-200 transition-colors duration-200"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="flex-1 bg-orange hover:bg-orange text-white focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentDialog;