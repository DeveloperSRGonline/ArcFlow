import { create } from 'zustand';
import type { CollabState, CollabActions, Collaborator, ElementLock } from '../types/collaboration';

/**
 * useCollabStore manages real-time presence, live cursors, and element locking.
 * Implementation aligns with PRD Section 5.5 (Real-Time Collaboration).
 */
export const useCollabStore = create<CollabState & CollabActions>((set) => ({
  // --- INITIAL STATE ---
  me: null,
  collaborators: [],
  activeLocks: {},
  followedUserId: null,

  // --- ACTIONS ---

  /**
   * Sets the current user's identity and state.
   */
  setMe: (user: Collaborator) => set({ me: user }),

  /**
   * Updates or adds a single collaborator's data (cursor, viewport, etc.).
   */
  updateCollaborator: (userId: string, updates: Partial<Collaborator>) =>
    set((state) => {
      const exists = state.collaborators.some((c) => c.userId === userId);
      if (exists) {
        return {
          collaborators: state.collaborators.map((c) =>
            c.userId === userId ? { ...c, ...updates } : c
          ),
        };
      }
      return state; // Should be added via setCollaborators or a specific add action if needed
    }),

  /**
   * Removes a collaborator (e.g., on board:left event).
   */
  removeCollaborator: (userId: string) =>
    set((state) => ({
      collaborators: state.collaborators.filter((c) => c.userId !== userId),
      // Also clear follow mode if we were following this user
      followedUserId: state.followedUserId === userId ? null : state.followedUserId,
    })),

  /**
   * Bulk updates the list of active collaborators.
   */
  setCollaborators: (users: Collaborator[]) => set({ collaborators: users }),

  /**
   * Sets a lock on a specific canvas element.
   */
  setLock: (lock: ElementLock) =>
    set((state) => ({
      activeLocks: { ...state.activeLocks, [lock.fabricId]: lock },
    })),

  /**
   * Releases a lock from a canvas element.
   */
  releaseLock: (fabricId: string) =>
    set((state) => {
      const { [fabricId]: _, ...remainingLocks } = state.activeLocks;
      return { activeLocks: remainingLocks };
    }),

  /**
   * Sets the user to follow in Follow Mode.
   */
  setFollowedUser: (userId: string | null) => set({ followedUserId: userId }),
}));
