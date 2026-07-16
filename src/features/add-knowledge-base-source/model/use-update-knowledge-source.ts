'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { knowledgeBaseKeys } from '~/entities/knowledge-base-source';
import type {
  KnowledgeSourceDto,
  UpdateKnowledgeSourceDto,
} from '~/entities/knowledge-base-source';
import { apiClient, getApiErrorMessage } from '~/shared/api';

interface UpdateKnowledgeSourceInput {
  sourceId: string;
  data: UpdateKnowledgeSourceDto;
}

export const useUpdateKnowledgeSource = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sourceId, data }: UpdateKnowledgeSourceInput) =>
      apiClient
        .patch(`workspaces/${workspaceId}/knowledge-sources/${sourceId}`, { json: data })
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
