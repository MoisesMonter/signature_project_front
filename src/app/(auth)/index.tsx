import { useState,useEffect } from "react";
import { router } from "expo-router";
import { View,Text,StyleSheet ,Image} from "react-native";
import { SignedOut, useAuth,useUser} from "@clerk/clerk-expo";
import { Button } from "../Components/button";


import { tokenCache } from "./../storage/tokenCache";
export default function Home(){
    const { user } = useUser();
    const { signOut, getToken } = useAuth();
    const [token, setToken] = useState<string | null>(null);
    const [providerId, setProviderId] = useState<string | null>(null);

    useEffect(() => {
        if (!user?.id) {
            // Redirecionar para a tela pública se user.id estiver ausente
            router.replace("(public)");
        }
    }, [user]);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await getToken({ template: "token" });
                setToken(token);
                if (token) {
                    // await sendTokenToBackend(token);
                    setToken(token);
                }
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchToken();
    }, [getToken]);

    useEffect(() => {
        if (user && user.verifiedExternalAccounts && user.verifiedExternalAccounts.length > 0) {
            setProviderId(user.verifiedExternalAccounts[0].providerUserId);
        }
    }, [user]);

    const sendTokenToBackend = async (token : string) => {
        try {
            const response = await fetch('https://http://127.0.0.1:8000/auth/google/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_token: token }), // Enviar o token como id_token
            });
            const data = await response.json();
            // Armazene o token JWT retornado para autenticar futuras requisições
            console.log('JWT token from backend:', data.access);
        } catch (error) {
            console.error('Error sending token to backend:', error);
        }
    };

    return(
        <View style={styles.container}>
            <Image source={{uri:user?.imageUrl}} style={styles.imageperfil}/>
            <Text style={styles.text}>{user?.fullName}</Text>
            <Text style={styles.text}>Name: {user?.fullName}</Text>
            <Text style={styles.text}>
                Email: {user?.primaryEmailAddress ? user.primaryEmailAddress.emailAddress : "No email available"}
            </Text>

            {/* <Text style={styles.text}>Id: {user?.id}</Text> */}

            <Button icon="exit" title="exit" onPress={() =>{signOut()}}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:32,
        justifyContent:"center",
        alignItems:"center",
        gap:12,
        // backgroundColor: Colors["background-1"],
    },
    text:{
        fontSize: 16,
        width:350,  
        marginLeft:50,
        fontWeight:'bold',
    },
    imageperfil:{
        width:92,
        height:92,
        borderRadius:46,
    }
})  