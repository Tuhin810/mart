import {
    collection,
    doc,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import type { Product } from '../types';

const getProductsCollection = (businessId: string) =>
    collection(db, 'businesses', businessId, 'products');

export const productService = {
    async addProduct(businessId: string, productData: Omit<Product, 'id' | 'businessId'>) {
        const colRef = getProductsCollection(businessId);
        const docRef = await addDoc(colRef, {
            ...productData,
            businessId,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    },

    async getProducts(businessId: string): Promise<Product[]> {
        const colRef = getProductsCollection(businessId);
        const querySnapshot = await getDocs(colRef);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    },

    async updateProduct(businessId: string, productId: string, updates: Partial<Product>) {
        const docRef = doc(db, 'businesses', businessId, 'products', productId);
        await updateDoc(docRef, updates);
    },

    async deleteProduct(businessId: string, productId: string) {
        const docRef = doc(db, 'businesses', businessId, 'products', productId);
        await deleteDoc(docRef);
    }
};
