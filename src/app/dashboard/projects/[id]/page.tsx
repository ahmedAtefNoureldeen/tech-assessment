"use client";

import { use, useState } from "react";
import { ProjectOverviewCard } from "@/components/ProjectOverviewCard";
import { TaskBoard } from "@/components/TaskBoard";
import { ProjectFormModal, ProjectFormData } from "@/components/ProjectFormModal";
import { useProject } from "@/hooks/useProject";
import { useTasks } from "@/hooks/useTasks";

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { project, isLoading, updateProject } = useProject(resolvedParams.id);
  const { tasks, employees, createTask, updateTask, deleteTask } = useTasks(resolvedParams.id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUpdateProject = async (data: ProjectFormData) => {
    const result = await updateProject(data);
    if (result.success) {
      setIsEditModalOpen(false);
    }
  };

  if (isLoading) {
    return <div className="container p-8">Loading...</div>;
  }

  if (!project) {
    return null;
  }

  return (
    <div className="container p-8 space-y-8">
      <ProjectOverviewCard
        project={project}
        onEditClick={() => setIsEditModalOpen(true)}
      />

      <TaskBoard
        tasks={tasks}
        employees={employees}
        onTaskCreate={createTask}
        onTaskUpdate={updateTask}
        onTaskDelete={deleteTask}
        projectId={resolvedParams.id}
      />

      <ProjectFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateProject}
        project={project}
      />
    </div>
  );
}