export type UserRole = 'super_admin' | 'business_admin' | 'staff' | 'customer';

export interface UserProfile {
    uid: string;
    email: string | null;
    role: UserRole;
    businessIds?: string[]; // Multiple for super_admin, usually one for others
    activeBusinessId?: string;
    displayName?: string;
    photoURL?: string;
    createdAt?: string;
}

export interface Business {
    id: string;
    name: string;
    ownerId: string;
    createdAt: any;
    themeSettings: ThemeSettings;
}

export interface ThemeSettings {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    logoUrl?: string;
    animationsEnabled: boolean;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    businessId: string;
}
