import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface GlobalSettings {
    allowPublicRegistration: boolean;
    maintenanceMode: boolean;
    platformName: string;
    supportEmail: string;
}

const SETTINGS_DOC_ID = 'platform_config';

export const settingsService = {
    async getSettings(): Promise<GlobalSettings> {
        const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as GlobalSettings;
        }
        return {
            allowPublicRegistration: true,
            maintenanceMode: false,
            platformName: 'Antigravity Mart',
            supportEmail: 'support@mart.com'
        };
    },

    async updateSettings(settings: Partial<GlobalSettings>) {
        const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
        await setDoc(docRef, settings, { merge: true });
    }
};
