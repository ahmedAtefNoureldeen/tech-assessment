import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import { TaskCard } from "@/components/TaskCard";
import { Task } from "@/types/task";
import { TaskFormModal, TaskFormData } from "@/components/TaskFormModal";
import { TaskBacklog } from "./TaskBacklog";

const columns = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "COMPLETED", title: "Done" },
] as const;

function DroppableColumn({ id, title, tasks }: { id: string; title: string; tasks: Task[] }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[200px] bg-gray-50 rounded-lg p-4"
    >
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

interface TaskBoardProps {
  tasks: Task[];
  employees: Array<{ id: string; name: string }>;
  onTaskCreate: (data: TaskFormData) => Promise<{ success: boolean; error?: string }>;
  onTaskUpdate: (taskId: string, data: Partial<Task>) => Promise<{ success: boolean; error?: string }>;
  onTaskDelete: (taskId: string) => Promise<{ success: boolean; error?: string }>;
  projectId: string;
}

export function TaskBoard({
  tasks,
  employees,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
  projectId,
}: TaskBoardProps) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const newStatus = over.id as Task["status"];
    if (activeTask.status === newStatus) return;

    await onTaskUpdate(active.id.toString(), {
      ...activeTask,
      status: newStatus
    });
  };

  const handleCreateTask = async (data: TaskFormData) => {
    const result = await onTaskCreate(data);
    if (result.success) {
      setIsTaskModalOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Tasks</CardTitle>
          <Button onClick={() => setIsTaskModalOpen(true)}>+ Add Task</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="kanban" className="w-full">
          <TabsList>
            <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            <TabsTrigger value="backlog">Backlog</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kanban" className="mt-4">
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-3 gap-4">
                {columns.map((column) => (
                  <DroppableColumn
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    tasks={tasks.filter((task) => task.status === column.id)}
                  />
                ))}
              </div>

              <DragOverlay>
                {activeTask ? (
                  <TaskCard
                    task={activeTask}
                    style={{
                      cursor: "grabbing",
                      transform: "rotate(3deg)",
                    }}
                  />
                ) : null}
              </DragOverlay>
            </DndContext>
          </TabsContent>

          <TabsContent value="backlog" className="mt-4">
            <TaskBacklog
              tasks={tasks}
              employees={employees}
              onTaskUpdate={onTaskUpdate}
              onTaskDelete={onTaskDelete}
            />
          </TabsContent>
        </Tabs>
      </CardContent>

      <TaskFormModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleCreateTask}
        projectId={projectId}
        employees={employees}
      />
    </Card>
  );
}