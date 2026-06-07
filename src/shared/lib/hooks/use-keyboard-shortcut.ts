'use client';

import { useEffect, useRef } from 'react';

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
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const modStr = modifiers.slice().sort().join(',');

  useEffect(() => {
    if (!enabled) return;

    const el: EventTarget = target === 'window' ? window : document;

    const listener = (e: Event) => {
      const event = e as KeyboardEvent;
      const mods = modStr ? modStr.split(',') : [];
      const matchesMod = !mods.includes('mod') || event.metaKey || event.ctrlKey;
      const matchesShift = !mods.includes('shift') || event.shiftKey;
      const matchesAlt = !mods.includes('alt') || event.altKey;

      if (event.key.toLowerCase() === key.toLowerCase() && matchesMod && matchesShift && matchesAlt) {
        event.preventDefault();
        handlerRef.current(event);
      }
    };

    el.addEventListener('keydown', listener);
    return () => el.removeEventListener('keydown', listener);
  }, [key, modStr, enabled, target]);
};
