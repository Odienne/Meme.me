import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Avatar from "./Avatar";
import {TextInput, Button} from 'react-native-paper';
import firebase from "firebase/app";
import "firebase/auth";

export default class waitingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mail: '', password: '', pseudo: '', coMail: '', coPassword: ''};

    }



    handleSubmit = (event) => {
        event.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.mail, this.state.password)
            .then(res => {
                if (res.user) firebase.auth().setLoggedIn(true);
            })
            .catch(e => {
                console.log(e.message);
            });
    }

    handleInscription = (event) => {

    }

    render() {
        return (
            <View>
                <Text>Inscription</Text>
            </View>
        );
    }
}