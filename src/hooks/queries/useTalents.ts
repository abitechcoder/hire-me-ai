import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Talent {
  userId: string;
  Name: string;
  Email: string;
  "Phone Number": string;
  Role: string;
  Skills: string[];
  "Trust Score": number;
  "Verification Status": string;
  "Profile Photo": string;
  "Video URL": string;
  "Portfolio Link": string;
  "Github URL": string;
  "LinkedIn Profile URL": string;
  "Rates": number;
  Availability: string;
  "Category": string;
  Experience: string;
  Location: string;
  "Placements": string[];
  "Total Placements": number;
  "Active Placements": number;
  "Profile Summary (AI)": string;
  status?: string;
  applicationId?: string;
}

export interface Applicant extends Talent {
  applicationId: string;
  status: string;
}

// Query Keys for consistency
export const talentKeys = {
  all: ['talents'] as const,
  lists: () => [...talentKeys.all, 'list'] as const,
  list: (filters: string) => [...talentKeys.lists(), { filters }] as const,
  details: () => [...talentKeys.all, 'detail'] as const,
  detail: (id: string) => [...talentKeys.details(), id] as const,
  applicants: (jobId: string) => [...talentKeys.all, 'applicants', jobId] as const,
};

// Fetch all users
export function useTalents(filters?: string) {
  return useQuery({
    queryKey: talentKeys.list(filters || ''),
    queryFn: () => apiClient.get<Talent[]>('/talents'),
  });
}

// Fetch single user
export function useTalent(id: string) {
  return useQuery({
    queryKey: talentKeys.detail(id),
    queryFn: () => apiClient.get<Talent>(`/talents/${id}`),
    enabled: !!id,  // Don't fetch if no id
  });
}

// Fetch applicants for a job
export function useJobApplicants(jobId: string) {
  return useQuery({
    queryKey: talentKeys.applicants(jobId),
    queryFn: async () => {
      const response = await apiClient.get<{ data: Applicant[]; success: boolean }>(`/jobs/${jobId}/applicants`);
      return response.data;
    },
    enabled: !!jobId,
  });
}

// Update application status
export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applicationId, status }: { applicationId: string; status: string }) => {
      const response = await apiClient.patch<{ success: boolean }>(`/applications/${applicationId}`, { status });
      return response;
    },
    onSuccess: (_, variables) => {
      // Invalidate all applicants queries to refresh the lists
      queryClient.invalidateQueries({ queryKey: talentKeys.all });
    },
  });
}