import type { RoomId, RoomConfig } from '@/types';
import { ROOM_CONFIGS } from '@/lib/constants';

/**
 * Get the configuration for a specific room.
 */
export function getRoomConfig(roomId: RoomId): RoomConfig | undefined {
  return ROOM_CONFIGS.find((r) => r.id === roomId);
}

/**
 * Get all room IDs excluding the theatre (which is the intro scene).
 */
export function getNavigableRooms(): RoomConfig[] {
  return ROOM_CONFIGS.filter((r) => r.id !== 'theatre');
}

/**
 * Get portal rooms (rooms accessible from the lobby).
 */
export function getPortalRooms(): RoomConfig[] {
  return ROOM_CONFIGS.filter((r) => r.id !== 'theatre' && r.id !== 'lobby');
}

/**
 * Calculate the world position for a portal based on room index.
 * Portals are arranged in a circle around the lobby center.
 */
export function getPortalPosition(
  index: number,
  total: number,
  radius: number = 12
): [number, number, number] {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
}

/**
 * Get the rotation for a portal to face the lobby center.
 */
export function getPortalRotation(
  index: number,
  total: number
): [number, number, number] {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return [0, -angle + Math.PI, 0];
}

/**
 * Get adjacent rooms for navigation.
 */
export function getAdjacentRooms(currentRoom: RoomId): RoomConfig[] {
  const navigable = getPortalRooms();
  const currentIndex = navigable.findIndex((r) => r.id === currentRoom);
  if (currentIndex === -1) return navigable;

  const prev = navigable[(currentIndex - 1 + navigable.length) % navigable.length];
  const next = navigable[(currentIndex + 1) % navigable.length];
  return [prev, next];
}
