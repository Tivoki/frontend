'use client';

import ky from 'ky';

export const apiClient = ky.create({
  prefix: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});
