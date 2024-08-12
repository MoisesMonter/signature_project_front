import React,{useEffect,useState} from "react";
import { router } from "expo-router";
import {View,Text,StyleSheet, TouchableOpacity,Image} from 'react-native'

import { Colors } from "./../Components/colors";
import { Button } from "./../Components/button";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useOAuth } from "@clerk/clerk-expo";


WebBrowser.maybeCompleteAuthSession()


export default function SignIn(){
    const [isLoading,setIsLoading] = useState(false)
    const googleOAuth = useOAuth({strategy:"oauth_google"})
    async function onGoogleSignIn(){
        try{
            setIsLoading(true)

            const redirectUrl = Linking.createURL("/")
        
            const oAuthFlow = await googleOAuth.startOAuthFlow({redirectUrl:redirectUrl})
         if (oAuthFlow.authSessionResult?.type === "success"){
                if(oAuthFlow.setActive){
                    await oAuthFlow.setActive({session: oAuthFlow.createdSessionId})
                }
                else{
                    setIsLoading(false)
                }
            }
            
        }catch(error){
            setIsLoading(false)
            console.error(error);
        }
    }
    useEffect(()=>{
        WebBrowser.warmUpAsync()

        return ()=>{
            WebBrowser.coolDownAsync()
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.under}>
                <View style={styles.imageContainer}><Image
        source={require('../../../assets/images/art.png')}
        style={styles.image}
      /></View>
                </View>
            <View style={styles.front}>
            <View style ={styles.subcontainer}>
            <Text style={styles.title}>Bem vindo a FEDERATA</Text>
            <Button icon="logo-google" title="Entrar com Google" isLoading={isLoading} onPress={onGoogleSignIn}/>
            </View>
            </View>

            
            </View>




    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colors["background"]

    },
    front:{
        position:'absolute',
    },
    under:{ width: 400,
        height: 400,
        backgroundColor: 'rgba(135 207 235 / 0)',
        justifyContent: 'center',
        alignItems: 'center',
        

    },
    subcontainer:{

        backgroundColor: Colors.white_70,
        minHeight:300,
        maxHeight:500,
        padding:20,
        gap:30,
        borderRadius:15,
        shadowColor:Colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    title:{
        width:200,
        fontSize:32,
        fontWeight:"bold",
        color: Colors.secundary
    },
    image: {


        width: 500,
        height: 500,
        borderRadius:250,
        backgroundColor: Colors["background-2"],
        borderColor:Colors.primary,

      },
      imageContainer: {
        width: 260,
        height: 260,
        borderRadius: 130,

        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 10,
        shadowRadius: 2,
        elevation: 90,
    },
})