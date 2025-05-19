import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ProjectFormData } from '@/components/ProjectFormModal';
import { useRouter } from 'next/navigation';

export function useProject(projectId: string) {
  const [project, setProject] = useState<ProjectFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      const data = await response.json();
      setProject({
        id: data.id,
        name: data.name,
        description: data.description,
        startDate: format(new Date(data.startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(data.endDate), 'yyyy-MM-dd'),
        status: data.status,
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      router.push('/dashboard/projects');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (data: ProjectFormData) => {
    try {
      const response = await fetch(`/api/projects/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setProject(data);
        return { success: true };
      }
      return { success: false, error: 'Failed to update project' };
    } catch (error) {
      console.error('Error updating project:', error);
      return { success: false, error: 'Error updating project' };
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  return {
    project,
    isLoading,
    updateProject,
  };
} 