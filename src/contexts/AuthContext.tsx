import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import type { UserProfile } from '../types';

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    activeBusinessId: string | null;
    setActiveBusinessId: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeBusinessId, setActiveBusinessId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch additional user data from Firestore
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data() as UserProfile;
                    setUser({ ...userData, uid: firebaseUser.uid, email: firebaseUser.email });

                    // Set default active business
                    if (userData.businessIds && userData.businessIds.length > 0) {
                        setActiveBusinessId(userData.activeBusinessId || userData.businessIds[0]);
                    }
                } else {
                    // New user case (default to customer or handle super admin initialization)
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        role: 'customer'
                    });
                }
            } else {
                setUser(null);
                setActiveBusinessId(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, activeBusinessId, setActiveBusinessId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
