import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Avatar from "./Avatar";
import {TextInput, Button} from 'react-native-paper';
import firebase from "firebase/app";
import "firebase/auth";
import SwitchForms from "./SwitchForms";

export default class Login extends React.Component {
    render() {
        return (
            <SwitchForms />
        );
    }
}
