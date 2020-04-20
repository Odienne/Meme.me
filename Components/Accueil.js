import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Button} from "react-native-paper";
import {db} from '../firebaseAuth'
import firebase from "firebase";
import {connect} from 'react-redux'

class Accueil extends React.Component {
    constructor(props) {
        super(props)
    }

    createAndNavigateToLobby = () => {
        let user = firebase.auth().currentUser

        let lobbyId = Date.now() + "_" + user.uid
        let lobbyRef = db.collection('Lobbies').doc(lobbyId);
        let userInfos = {uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL}
        lobbyRef.set({
            createdBy: userInfos,
            status: 'active',
            participants: {
                [user.uid]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    status: 'waiting'
                }
            }
        })
            .then(() => {
                const action = {type: "SET_LOBBY", value: lobbyId};
                this.props.dispatch(action);

                this.props.navigation.push('Lobby', {
                    lobbyId
                })
            })
            .catch(e => {
                console.log(e);
                console.log(e.message);
            });

    }

    goToCurrentLobby = () => {
        const lobbyId = this.props.lobby
        this.props.navigation.push('Lobby', {
            lobbyId
        })
    }

    render() {
        const currentLobby = this.props.lobby
        return (
            <View style={{height: 300}}>
                {currentLobby &&
                <Button style={styles.mainAction} mode="contained" onPress={this.goToCurrentLobby}>Retourner au lobby</Button>
                }
                {!currentLobby &&
                <Button style={styles.mainAction} mode="contained" onPress={this.createAndNavigateToLobby}>Créer un lobby</Button>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainAction: {
        width: '60%',
        margin: 'auto',
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    }
})

const mapStateToProps = state => {
    return {
        lobby: state.lobby
    }
}

export default connect(mapStateToProps)(Accueil)