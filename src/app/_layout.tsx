import { Slot, router } from "expo-router";
import { ActivityIndicator } from "react-native";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { tokenCache } from "./../storage/tokenCache";

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function InitialLayout() {
    const { isSignedIn, isLoaded } = useAuth();
    const [authCancelled, setAuthCancelled] = useState(false);

    useEffect(() => {
        if (!isLoaded) return;

        if (isSignedIn) {
            router.replace("(auth)");
        } else {
            router.replace("(public)");
        }
    }, [isLoaded, isSignedIn, authCancelled]);

    return isLoaded ? (
        <Slot />
    ) : (
        <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
    );
}

export default function Layout() {
    return (
        <ClerkProvider
            publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
            tokenCache={tokenCache}
        >
            <InitialLayout />
        </ClerkProvider>
    );
}
