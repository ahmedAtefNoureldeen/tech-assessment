import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { format } from "date-fns";
import { ProjectFormData } from "./ProjectFormModal";

const statusColors: Record<"active" | "completed" | "overdue" | "deleted", string> = {
  active: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  overdue: "bg-red-100 text-red-800",
  deleted: "bg-gray-100 text-gray-800",
};

interface ProjectOverviewCardProps {
  project: ProjectFormData;
  onEditClick: () => void;
}

export function ProjectOverviewCard({ project, onEditClick }: ProjectOverviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">{project.name}</CardTitle>
          <p className="text-muted-foreground mt-2">{project.description}</p>
        </div>
        <Button onClick={onEditClick}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Project
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p>{format(new Date(project.startDate), "MMM dd, yyyy")}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">End Date</p>
            <p>{format(new Date(project.endDate), "MMM dd, yyyy")}</p>
          </div>
        </div>
        <div className="mt-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
} 