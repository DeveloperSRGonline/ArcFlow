/**
 * Collaborator represents another user active on the same board.
 */
export interface Collaborator {
  userId: string;
  userName: string;
  avatarColor: string;
  cursor: { x: number; y: number };
  viewport: { x: number; y: number; zoom: number };
  isTyping?: boolean;
  lastActive: number; // Timestamp
}

/**
 * ElementLock tracks which user is currently editing a specific element.
 */
export interface ElementLock {
  fabricId: string;
  userId: string;
  userName: string;
  color: string;
}

/**
 * CollabState defines the structure for real-time collaboration data.
 */
export interface CollabState {
  me: Collaborator | null;
  collaborators: Collaborator[];
  activeLocks: Record<string, ElementLock>; // Key: fabricId
  followedUserId: string | null; // ID of the user being followed in "Follow Mode"
}

/**
 * CollabActions defines methods to update collaboration state.
 */
export interface CollabActions {
  setMe: (user: Collaborator) => void;
  updateCollaborator: (userId: string, updates: Partial<Collaborator>) => void;
  removeCollaborator: (userId: string) => void;
  setCollaborators: (users: Collaborator[]) => void;
  setLock: (lock: ElementLock) => void;
  releaseLock: (fabricId: string) => void;
  setFollowedUser: (userId: string | null) => void;
}
