import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const AssessmentSearch = ({ searchTerm, setSearchTerm }) => (
  <div className="relative mb-4">
    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
    <Input placeholder="Pesquisar avaliações..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8" />
  </div>
);

export default AssessmentSearch;
