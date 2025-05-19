import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "@/components/TaskCard";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  assignedTo?: {
    id: string;
    name: string;
  } | null;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export function TaskColumn({ id, title, tasks }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="bg-muted/50 p-4 rounded-lg">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div ref={setNodeRef} className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
} 