import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/lib/firebase";

// User type as before
export interface User {
  id: string;
  name: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  avatarUrl: string;
  // Add other fields as needed
}

// SkillDoc type for the new structure
export interface SkillDoc {
  id: string;
  data: string[];
}

export interface WorksDoc {
  id: string;
  data: {
    company: string;
    href: string;
    badges: string[];
    location: string;
    title: string;
    logoUrl: string;
    start: string;
    end: string;
    description: string;
  }[];
}

const db = getFirestore(app);

/**
 * Fetches the first user document from the 'users' collection in Firestore.
 * @returns The user object with its Firestore document ID, or null if not found.
 */
export async function fetchUser(): Promise<User | null> {
  const querySnapshot = await getDocs(collection(db, "users"));
  const docSnap = querySnapshot.docs[0];
  if (docSnap) {
    return { id: docSnap.id, ...docSnap.data() } as User;
  } else {
    return null;
  }
}

/**
 * Fetches the skills subcollection for a given userId.
 * Each document contains a 'data' array of strings.
 * @param userId The Firestore document ID of the user.
 * @returns An array of SkillDoc objects: { id, data }
 */
export async function fetchSkills(userId: string): Promise<SkillDoc | null> {
  const skillsCol = collection(db, `users/${userId}/skills`);
  const querySnapshot = await getDocs(skillsCol);
  const docSnap = querySnapshot.docs[0];
  if (docSnap) {
    const docData = docSnap.data();
    if (Array.isArray(docData.data)) {
      return {
        id: docSnap.id,
        data: docData.data as string[],
      };
    }
  }
  return null;
}

export const fetchWorks = async (userId: string): Promise<WorksDoc | null> => {
  const skillsCol = collection(db, `users/${userId}/work`);
  const querySnapshot = await getDocs(skillsCol);
  const docSnap = querySnapshot.docs[0];
  if (docSnap) {
    const docData = docSnap.data();
    if (Array.isArray(docData.data)) {
      return {
        id: docSnap.id,
        data: docData.data,
      };
    }
  }
  return null;
};

/**
 * Fetches both the user and their skills in parallel.
 * @param userId The Firestore document ID of the user.
 * @returns An object containing the user and their skills.
 */
export async function fetchUserAndSkills(userId: string): Promise<{
  user: User | null;
  skills: SkillDoc | null;
  works: WorksDoc | null;
}> {
  const [user, skills, works] = await Promise.all([
    fetchUser(),
    fetchSkills(userId),
    fetchWorks(userId),
  ]);
  return { user, skills, works };
}
