export interface Task {
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