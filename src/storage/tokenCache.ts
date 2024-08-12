import * as SecureStore from "expo-secure-store";

async function getToken(key: string): Promise<string | null> {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        throw error;
    }
}

async function saveToken(key: string, value: string): Promise<void> {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        throw error;
    }
}

async function removeToken(key: string): Promise<void> {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        throw error;
    }
}

export const tokenCache = { getToken, saveToken, removeToken };