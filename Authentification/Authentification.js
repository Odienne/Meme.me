import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import firebase from "firebase/app";
import "firebase/auth"

import {db} from "../firebaseAuth";

let user = firebase.auth().currentUser
export function isLoggedIn() {
    console.log(user)
    return user ? true : false
}

export function getUser() {
    return user
}

firebase.auth().onAuthStateChanged(u => {
    if (u) {
        user = u
    } else {
        user = null
    }
})



export default class Authentification extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: firebase.auth().currentUser
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({user, isLoggedIn: true})
            } else {
                this.setState({user: null, isLoggedIn: false})
            }
        })
    }

    render() {
        return (
            <View><Text>CC</Text></View>
        )
    }

}

const styles = StyleSheet.create({})

