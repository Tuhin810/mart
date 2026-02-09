import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import type { Business, ThemeSettings } from '../types';

const BUSINESSES_COLLECTION = 'businesses';

export const businessService = {
    async createBusiness(ownerId: string, name: string) {
        const businessId = name.toLowerCase().replace(/\s+/g, '-');
        const defaultTheme: ThemeSettings = {
            primaryColor: '#6366f1',
            secondaryColor: '#ec4899',
            fontFamily: 'Inter',
            animationsEnabled: true
        };

        const businessData: Partial<Business> = {
            name,
            ownerId,
            createdAt: serverTimestamp(),
            themeSettings: defaultTheme
        };

        await setDoc(doc(db, BUSINESSES_COLLECTION, businessId), businessData);

        // Also update user's profile with the new businessId
        // Note: This logic should ideally be in a cloud function or handled carefully
        return businessId;
    },

    async getBusiness(businessId: string): Promise<Business | null> {
        const docRef = doc(db, BUSINESSES_COLLECTION, businessId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Business;
        }
        return null;
    },

    async getAllBusinesses(): Promise<Business[]> {
        const q = query(collection(db, BUSINESSES_COLLECTION));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Business));
    },

    async updateBusiness(businessId: string, updates: Partial<Business>) {
        const docRef = doc(db, BUSINESSES_COLLECTION, businessId);
        await updateDoc(docRef, updates);
    },

    async deleteBusiness(businessId: string) {
        const docRef = doc(db, BUSINESSES_COLLECTION, businessId);
        await deleteDoc(docRef);
    }
};
