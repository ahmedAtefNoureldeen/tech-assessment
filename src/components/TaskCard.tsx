import { useDraggable } from "@dnd-kit/core";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  style?: React.CSSProperties;
}

export function TaskCard({ task, style }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task,
  });

  const transformStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        ...style,
      }
    : style;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={transformStyle}
      className="bg-white p-4 rounded-lg shadow cursor-grab active:cursor-grabbing"
    >
      <h4 className="font-medium">{task.title}</h4>
      {task.description && (
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      )}
      <div className="mt-2 flex items-center justify-between">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            task.priority === "HIGH"
              ? "bg-red-100 text-red-800"
              : task.priority === "MEDIUM"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {task.priority}
        </span>
        {task.assignedTo && (
          <span className="text-sm text-gray-600">{task.assignedTo.name}</span>
        )}
      </div>
    </div>
  );
} 