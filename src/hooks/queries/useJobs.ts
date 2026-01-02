import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Job {
  id: string;
  workType: string;
  status: string;
  salary: number;
  location: string;
  description: string;
  pendingApplicants: number;
  hired: number;
  rejected: number;
  title: string;
  experienceLevel: string;
  skills: string[];
  postedDate: string;
  applicants: string[];
}

// Query Keys for consistency
export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (filters: string) => [...jobKeys.lists(), { filters }] as const,
  details: () => [...jobKeys.all, 'detail'] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
};

// Fetch all jobs
export function useJobs(filters?: string) {
  return useQuery({
    queryKey: jobKeys.list(filters || ''),
    queryFn: async () => {
      const response = await apiClient.get<{ data: Job[]; success: boolean }>('/jobs');
      return response.data;
    },
  });
}

// Fetch single job
export function useJob(id: string) {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<{ data: Job; success: boolean }>(`/jobs/${id}`);
      return response.data;
    },
    enabled: !!id,  // Don't fetch if no id
  });
}

// Close a job
export function useCloseJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, status }: { jobId: string; status: string }) => {
      const response = await apiClient.patch<{ success: boolean }>(`/jobs/${jobId}`, { status });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

// Update a job
export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, updates }: { jobId: string; updates: Partial<Job> }) => {
      const response = await apiClient.patch<{ success: boolean }>(`/jobs/${jobId}`, updates);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}