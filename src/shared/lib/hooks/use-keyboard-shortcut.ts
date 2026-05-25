'use client';

import { useEffect } from 'react';

type Modifier = 'mod' | 'shift' | 'alt';

interface ShortcutOptions {
  enabled?: boolean;
  target?: 'window' | 'document';
}

export const useKeyboardShortcut = (
  key: string,
  handler: (event: KeyboardEvent) => void,
  modifiers: Modifier[] = [],
  options: ShortcutOptions = {},
) => {
  const { enabled = true, target = 'document' } = options;

  useEffect(() => {
    if (!enabled) return;

    const el: EventTarget = target === 'window' ? window : document;

    const listener = (e: Event) => {
      const event = e as KeyboardEvent;
      const matchesMod = !modifiers.includes('mod') || event.metaKey || event.ctrlKey;
      const matchesShift = !modifiers.includes('shift') || event.shiftKey;
      const matchesAlt = !modifiers.includes('alt') || event.altKey;

      if (event.key === key && matchesMod && matchesShift && matchesAlt) {
        event.preventDefault();
        handler(event);
      }
    };

    el.addEventListener('keydown', listener);
    return () => el.removeEventListener('keydown', listener);
  }, [key, handler, modifiers, enabled, target]);
};
