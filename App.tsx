import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {pb} from "./pb";
import * as WebBrowser from "expo-web-browser";
import {useState} from "react";

export default function App() {
    const [loading, setLoading] = useState(false);

    //login fails with a error (EventSource connect took too long.)
    const login = async () => {
        setLoading(true);
        console.log("Login button pressed");

         try {
             console.log("Logging in");
             const res = await pb.collection("users").authWithOAuth2({
                 provider: "github",
                 urlCallback: async (url) => {
                     console.log("opening url", url);
                     await WebBrowser.openAuthSessionAsync(url);
                 }
             })
         } catch (e) {
                console.log("Error");
                console.log(e);
                // @ts-ignore
             console.log(e.originalError);
         } finally {
                setLoading(false);
         }

    }


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity style={!loading ? styles.loginButton : styles.disabled} onPress={() => login()} disabled={loading}>
                    {loading ? <Text>Loading...</Text> : <Text>Login with Github</Text>}
                </TouchableOpacity>
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1
    },
    //disabled button
    disabled: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
        opacity: 0.5
    }
});
