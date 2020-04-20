import * as React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import createBottomTabNavigator from "@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator";
import {TextInput, Button} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Accueil from "../Components/Accueil";
import GestionMeme from "../Components/GestionMeme";
import Profil from "../Components/Profil";
import Lobby from "../Components/Lobby";
import ModeChoice from "../Components/ModeChoice";
import MyMemes from "../Components/MyMemes";
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "firebase";

const Stack = createStackNavigator()

function BarTitle({navigation}) {
    return (
        <View style={styles.accueilHeader}>
            <Icon name="image" size={40} color="#fff" onPress={() => navigation.push('MyMemes')}/>
            <Text style={{fontSize: 19, color: 'white'}}>Accueil</Text>
            <TouchableOpacity onPress={() => navigation.push('Profil')}>
                <Image style={styles.avatar} source={{uri: firebase.auth().currentUser.photoURL}} />
            </TouchableOpacity>
        </View>
    );
}

function Home() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Accueil" screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff'
                }}>
                    <Stack.Screen
                        name="Accueil"
                        component={Accueil}
                        options={{header: props => <BarTitle {...props} />}}
                    />
                    <Stack.Screen
                        name="MyMemes"
                        component={MyMemes}
                        options={{title: 'My memes'}}
                    />
                    <Stack.Screen
                        name="Profil"
                        component={Profil}
                        options={{title: 'Profil'}}
                    />
                    <Stack.Screen
                        name="Lobby"
                        component={Lobby}
                        options={{title: 'Membres dans le lobby'}}
                    />
                    <Stack.Screen
                        name="ModeChoice"
                        component={ModeChoice}
                        options={{title: 'ModeChoice'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    accueilHeader: {
        display: 'flex',
        backgroundColor: '#dcaeff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        height: 80,
    },
    barTitle: {
        display: 'flex',
        backgroundColor: '#daaa33',
        justifyContent: 'space-between'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
});

export default Home