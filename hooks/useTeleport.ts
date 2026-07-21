'use client';

import { useCallback, useRef } from 'react';
import type { RoomId } from '@/types';
import { create } from 'zustand';

interface TeleportState {
  currentRoom: RoomId;
  previousRoom: RoomId | null;
  isTransitioning: boolean;
  transitionProgress: number;
  setRoom: (room: RoomId) => void;
  startTransition: () => void;
  endTransition: () => void;
  setProgress: (progress: number) => void;
}

/**
 * Zustand store for teleportation state.
 */
export const useTeleportStore = create<TeleportState>((set) => ({
  currentRoom: 'lobby',
  previousRoom: null,
  isTransitioning: false,
  transitionProgress: 0,
  setRoom: (room) =>
    set((state) => ({
      previousRoom: state.currentRoom,
      currentRoom: room,
    })),
  startTransition: () => set({ isTransitioning: true, transitionProgress: 0 }),
  endTransition: () => set({ isTransitioning: false, transitionProgress: 1 }),
  setProgress: (progress) => set({ transitionProgress: progress }),
}));

/**
 * Hook for room teleportation logic.
 */
export function useTeleport() {
  const store = useTeleportStore();
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const teleportTo = useCallback(
    (roomId: RoomId, onTransitionMidpoint?: () => void) => {
      if (store.isTransitioning || store.currentRoom === roomId) return;

      store.startTransition();

      // Fade out (first half of transition)
      const fadeOutDuration = 750;
      const fadeInDuration = 750;

      // At midpoint: switch rooms
      transitionTimeout.current = setTimeout(() => {
        store.setRoom(roomId);
        store.setProgress(0.5);
        onTransitionMidpoint?.();

        // Fade in (second half)
        transitionTimeout.current = setTimeout(() => {
          store.endTransition();
        }, fadeInDuration);
      }, fadeOutDuration);
    },
    [store]
  );

  const teleportToLobby = useCallback(() => {
    teleportTo('lobby');
  }, [teleportTo]);

  return {
    currentRoom: store.currentRoom,
    previousRoom: store.previousRoom,
    isTransitioning: store.isTransitioning,
    transitionProgress: store.transitionProgress,
    teleportTo,
    teleportToLobby,
  };
}
