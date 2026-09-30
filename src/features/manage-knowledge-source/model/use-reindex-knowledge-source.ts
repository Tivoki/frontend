'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { knowledgeBaseKeys } from '~/entities/knowledge-base-source';
import type { KnowledgeSourceDto } from '~/entities/knowledge-base-source';
import { apiClient, getApiErrorMessage } from '~/shared/api';

export const useReindexKnowledgeSource = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sourceId: string) =>
      apiClient
        .post(`workspaces/${workspaceId}/knowledge-sources/${sourceId}/reindex`)
        .json<KnowledgeSourceDto>(),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: knowledgeBaseKeys.lists(workspaceId),
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
