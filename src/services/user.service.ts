import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    setDoc,
    arrayUnion
} from 'firebase/firestore';
import { db } from './firebase';
import type { UserProfile, UserRole } from '../types';

const USERS_COLLECTION = 'users';

export const userService = {
    async getUserProfile(uid: string): Promise<UserProfile | null> {
        const docRef = doc(db, USERS_COLLECTION, uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { uid: docSnap.id, ...docSnap.data() } as UserProfile;
        }
        return null;
    },

    async getAllUsers(): Promise<UserProfile[]> {
        const q = query(collection(db, USERS_COLLECTION));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile));
    },

    async updateUserRole(uid: string, role: UserRole) {
        const docRef = doc(db, USERS_COLLECTION, uid);
        await updateDoc(docRef, { role });
    },

    async assignBusinessToUser(uid: string, businessId: string) {
        const docRef = doc(db, USERS_COLLECTION, uid);
        await updateDoc(docRef, {
            businessIds: arrayUnion(businessId),
            role: 'business_admin' // Automatically upgrade if they are being assigned a business
        });
    },

    async createInitialProfile(uid: string, email: string | null, role: UserRole = 'customer') {
        const docRef = doc(db, USERS_COLLECTION, uid);
        const profile: Partial<UserProfile> = {
            uid,
            email,
            role,
            businessIds: [],
            createdAt: new Date().toISOString()
        };
        await setDoc(docRef, profile, { merge: true });
    }
};
