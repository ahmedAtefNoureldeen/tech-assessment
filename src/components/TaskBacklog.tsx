import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";

interface TaskBacklogProps {
  tasks: Task[];
  employees: Array<{ id: string; name: string }>;
  onTaskUpdate: (taskId: string, data: Partial<Task>) => Promise<{ success: boolean; error?: string }>;
  onTaskDelete: (taskId: string) => Promise<{ success: boolean; error?: string }>;
}

export function TaskBacklog({
  tasks,
  employees,
  onTaskUpdate,
  onTaskDelete,
}: TaskBacklogProps) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Partial<Task> | null>(null);

  const handleEditTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingTaskId(taskId);
      setEditingTask(task);
    }
  };

  const handleSaveEdit = async (taskId: string) => {
    if (!editingTask) return;

    const result = await onTaskUpdate(taskId, {
      title: editingTask.title,
      description: editingTask.description,
      priority: editingTask.priority,
      status: editingTask.status,
      assignedTo: editingTask.assignedTo,
    });

    if (result.success) {
      setEditingTaskId(null);
      setEditingTask(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTask(null);
  };

  return (
    <div className="border rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Title</th>
            <th className="text-left p-4">Priority</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Assignee</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className="border-b">
              <td className="p-4">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editingTask?.title || ''}
                    onChange={(e) => setEditingTask(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  task.title
                )}
              </td>
              <td className="p-4">
                {editingTaskId === task.id ? (
                  <select
                    value={editingTask?.priority || 'LOW'}
                    onChange={(e) => setEditingTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                    className="p-1 border rounded"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                ) : (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === "HIGH" ? "bg-red-100 text-red-800" :
                    task.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {task.priority}
                  </span>
                )}
              </td>
              <td className="p-4">
                {editingTaskId === task.id ? (
                  <select
                    value={editingTask?.status || 'TODO'}
                    onChange={(e) => setEditingTask(prev => ({ ...prev, status: e.target.value as Task['status'] }))}
                    className="p-1 border rounded"
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                ) : (
                  task.status
                )}
              </td>
              <td className="p-4">
                {editingTaskId === task.id ? (
                  <select
                    value={editingTask?.assignedTo?.id || ''}
                    onChange={(e) => {
                      const employee = employees.find(emp => emp.id === e.target.value);
                      setEditingTask(prev => ({
                        ...prev,
                        assignedTo: employee ? { id: employee.id, name: employee.name } : null
                      }));
                    }}
                    className="p-1 border rounded"
                  >
                    <option value="">Unassigned</option>
                    {employees.map(employee => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  task.assignedTo?.name || "Unassigned"
                )}
              </td>
              <td className="p-4">
                {editingTaskId === task.id ? (
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveEdit(task.id)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditTask(task.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onTaskDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 