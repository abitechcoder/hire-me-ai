import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface Application {
    id: string;
    jobId: string;
    talentId: string;
    status: string;
    appliedDate: string;
    // Add other fields as needed
}

export const applicationKeys = {
    all: ['applications'] as const,
    byTalent: (talentId: string) => [...applicationKeys.all, 'talent', talentId] as const,
};

export function useMyApplications(talentId: string) {
    return useQuery({
        queryKey: applicationKeys.byTalent(talentId),
        queryFn: async () => {
            const response = await apiClient.get<{ data: Application[]; success: boolean }>(`/applications?talentId=${talentId}`);
            return response.data;
        },
        enabled: !!talentId,
    });
}
