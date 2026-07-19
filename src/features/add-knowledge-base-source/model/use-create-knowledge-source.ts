'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { knowledgeBaseKeys } from '~/entities/knowledge-base-source';
import type { KnowledgeSourceDto } from '~/entities/knowledge-base-source';
import { apiClient, getApiErrorMessage } from '~/shared/api';
import type { CreateSourcePayload } from './mappers';

export const useCreateKnowledgeSource = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSourcePayload) => {
      const url = `workspaces/${workspaceId}/knowledge-sources`;
      const request =
        payload.kind === 'form-data'
          ? apiClient.post(url, { body: payload.body })
          : apiClient.post(url, { json: payload.body });

      return request.json<KnowledgeSourceDto>();
    },
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
