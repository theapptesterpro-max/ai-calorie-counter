import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { UserProfile, DailyLog } from '../types';

// --- User Profile Functions ---

/**
 * Fetches a user's profile from Firestore.
 * @param userId - The UID of the user.
 * @returns The user profile object or null if it doesn't exist.
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userDocRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  } else {
    return null;
  }
};

/**
 * Creates a new user profile document in Firestore.
 * @param userId - The UID of the new user.
 * @param profileData - The initial profile data.
 */
export const createUserProfile = async (userId: string, profileData: UserProfile): Promise<void> => {
  const userDocRef = doc(db, 'users', userId);
  await setDoc(userDocRef, profileData);
};

/**
 * Updates an existing user profile in Firestore.
 * @param userId - The UID of the user.
 * @param profileData - The profile data to update.
 */
export const updateUserProfile = async (userId: string, profileData: UserProfile): Promise<void> => {
    const userDocRef = doc(db, 'users', userId);
    // Use setDoc with merge to handle creating/updating fields without overwriting the whole doc
    await setDoc(userDocRef, profileData, { merge: true });
};


// --- Daily Log Functions ---

/**
 * Fetches a daily food log for a specific user and date.
 * @param userId - The UID of the user.
 * @param dateString - The date in YYYY-MM-DD format.
 * @returns The daily log object, or a new empty log if none exists.
 */
export const getDailyLog = async (userId: string, dateString: string): Promise<DailyLog> => {
    const logDocRef = doc(db, 'users', userId, 'dailyLogs', dateString);
    const docSnap = await getDoc(logDocRef);
    if (docSnap.exists()) {
        return docSnap.data() as DailyLog;
    } else {
        return { entries: [] };
    }
};

/**
 * Creates or updates a daily food log.
 * @param userId - The UID of the user.
 * @param dateString - The date in YYYY-MM-DD format.
 * @param logData - The daily log data to save.
 */
export const updateDailyLog = async (userId: string, dateString: string, logData: DailyLog): Promise<void> => {
    const logDocRef = doc(db, 'users', userId, 'dailyLogs', dateString);
    await setDoc(logDocRef, logData);
};