'use client';

import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient, nextPage } from '~/shared/api';
import { KNOWLEDGE_SOURCES_PAGE_SIZE } from '../model/config';
import { knowledgeBaseKeys } from '../model/keys';
import type { KnowledgeSourceDto, KnowledgeSourceListResponseDto } from '../model/mappers';

const POLL_INTERVAL_MS = 3000;

const IN_FLIGHT_STATUSES: KnowledgeSourceDto['status'][] = ['PENDING', 'INDEXING'];

const hasInFlightSource = (data: InfiniteData<KnowledgeSourceListResponseDto> | undefined) =>
  data?.pages.some((page) =>
    page.data.some((source) => IN_FLIGHT_STATUSES.includes(source.status)),
  ) ?? false;

/** Lists a workspace's knowledge base sources, paginated. Polls while any source is indexing. */
export const useKnowledgeSources = (workspaceId: string | null) =>
  useInfiniteQuery({
    queryKey: knowledgeBaseKeys.lists(workspaceId ?? ''),
    queryFn: ({ pageParam }) => {
      if (!workspaceId) throw new Error('Workspace ID is required');
      return apiClient
        .get(`workspaces/${workspaceId}/knowledge-sources`, {
          searchParams: { page: pageParam, take: KNOWLEDGE_SOURCES_PAGE_SIZE },
        })
        .json<KnowledgeSourceListResponseDto>();
    },
    initialPageParam: 1,
    getNextPageParam: nextPage,
    enabled: workspaceId !== null,
    refetchInterval: (query) => (hasInFlightSource(query.state.data) ? POLL_INTERVAL_MS : false),
  });
