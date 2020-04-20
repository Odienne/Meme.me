import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, StatusBar, SafeAreaView, Platform, ActivityIndicator} from 'react-native'
import Authentification from "./Authentification/Authentification";
import Login from "./Components/Login";
import firebase from "firebase/app";
import Navigation from "./Navigation/Navigation";

import {Provider} from 'react-redux';
import Store from './Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            isLoggedIn: false,
            isLoading: true
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({user, isLoggedIn: true, isLoading: false})
            } else {
                this.setState({user: null, isLoggedIn: false, isLoading: false})
            }
        })
    }

    renderApp() {
        return this.state.isLoggedIn ? <Navigation/> : <Login/>
    }

    render() {
        let persistor = persistStore(Store)
        return (
            <Provider store={Store}>
                <PersistGate persistor={persistor}>
                    <SafeAreaView style={styles.SafeArea}>
                        {!this.state.isLoading && this.renderApp()}
                    </SafeAreaView>
                </PersistGate>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    SafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})
