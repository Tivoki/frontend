'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '~/shared/api';

interface TelegramBotInfo {
  username: string;
}

/** Static server config (TELEGRAM_BOT_USERNAME) — fetched once and never refetched. */
export const useTelegramBotInfo = () =>
  useQuery({
    queryKey: ['telegram-bot-info'],
    queryFn: () => apiClient.get('integrations/telegram/bot-info').json<TelegramBotInfo>(),
    staleTime: Infinity,
  });
