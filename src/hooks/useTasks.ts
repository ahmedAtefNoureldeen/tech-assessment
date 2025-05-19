import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { TaskFormData } from '@/components/TaskFormModal';

export function useTasks(projectId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Array<{ id: string; name: string }>>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/tasks`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const createTask = async (data: TaskFormData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks((tasks) => [...tasks, newTask]);
        return { success: true };
      }
      return { success: false, error: 'Failed to create task' };
    } catch (error) {
      console.error('Error creating task:', error);
      return { success: false, error: 'Error creating task' };
    }
  };

  const updateTask = async (taskId: string, data: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((tasks) =>
          tasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
        return { success: true };
      }
      return { success: false, error: 'Failed to update task' };
    } catch (error) {
      console.error('Error updating task:', error);
      return { success: false, error: 'Error updating task' };
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
        return { success: true };
      }
      return { success: false, error: 'Failed to delete task' };
    } catch (error) {
      console.error('Error deleting task:', error);
      return { success: false, error: 'Error deleting task' };
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, [projectId]);

  return {
    tasks,
    employees,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks,
  };
} 