import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import {db} from '../firebaseAuth'
import * as firebase from "firebase";
import LobbyUser from "./LobbyUser";
import {TextInput, Button} from 'react-native-paper';
import {connect} from "react-redux";
import {ScrollView} from "react-native-web";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {abs} from "react-native-reanimated";

class Lobby extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lobbyId: this.props.route.params.lobbyId,
            lobbyInfos: [],
            lobbyStatus: 'waiting',
            userStatus: 'waiting',
            countDown: 3
        }


    }

    componentDidMount() {
        this.getLobbyInfos()
    }

    getLobbyInfos() {
        let query = db.collection('Lobbies').doc(this.state.lobbyId);
        let observer = query.onSnapshot(snap => {
            let waiting = false
            Object.entries(snap.data().participants).map((part) => {
                    console.log(part[1].status)
                    if (part[0] === firebase.auth().currentUser.uid) {
                        this.setState({userStatus: part[1].status})
                    }
                    if (part[1].status === 'waiting') {
                        waiting = true
                        this.setState({lobbyStatus: 'waiting'})
                        return
                    }
                }
            )
            if (!waiting) {
                this.setState({lobbyStatus: 'ready'})
                this.setTimerBeforeModechoice()
            }
            this.setState({lobbyInfos: snap.data()})
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }

    goToModeChoice = () => {
        const {lobbyId, lobbyInfos} = this.state
        this.props.navigation.push('ModeChoice', {lobbyId, lobbyInfos})
    }

    closeCurrentLobby = () => {
        db.collection('Lobbies').doc(this.state.lobbyId).update({status: 'closed'});
        const action = {type: "SET_LOBBY", value: null};
        this.props.dispatch(action);

        this.props.navigation.push('Accueil')
    }

    sendInvitationToLobby = () => {
        console.log('coucou les amis')
    }

    setUserReady = () => {
        let uid = firebase.auth().currentUser.uid
        db.collection('Lobbies').doc(this.state.lobbyId).update({[`participants.${uid}.status`]: 'ready'}).then((snap) => {
                this.setState({userStatus: 'ready'})
            }
        );
    }

    renderReadyButton() {
        const {userStatus, lobbyStatus, countDown} = this.state

        let func = userStatus === "waiting" ? this.setUserReady : (lobbyStatus === 'waiting' ? null : this.goToModeChoice)
        let text = userStatus === "waiting" ? 'Prêt' : (lobbyStatus === 'waiting' ? 'En attente des autres joueurs' : `${countDown}... Choix des options`)

        return (
            <Button icon="arrow-right" mode='contained' onPress={func} style={[styles.button, styles.startGame]}>
                {text}
            </Button>
        )
    }


    setTimerBeforeModechoice = () => {
        let x = setInterval(() => {
            this.setState({countDown: this.state.countDown - 1})
            if (this.state.countDown === 0) {
                this.goToModeChoice()
                clearInterval(x)
            }
        }, 1000);
    }

    render() {
        if (this.state.lobbyInfos.length === 0) {
            return <View></View>
        }
        const {participants} = this.state.lobbyInfos
        console.log(this.state.lobbyStatus)
        return (
            <View style={styles.viewContainer}>
                <ScrollView style={styles.lobbyContainer}>
                    <View style={styles.participantsContainer}>
                        {Object.entries(participants).map((part) => (
                                <LobbyUser participant={part[1]} lobbyInfos={this.state.lobbyInfos} key={part[0]}/>
                            )
                        )}
                        <TouchableOpacity onPress={this.sendInvitationToLobby}>
                            <Icon style={{marginTop: 16}} name="plus-circle" size={100} color="#bbb"/>
                            <Text style={{textAlign: 'center'}}>Inviter un ami</Text>
                        </TouchableOpacity>
                    </View>


                    {this.renderReadyButton()}
                </ScrollView>
                <Button icon="power" mode='contained' onPress={this.closeCurrentLobby}
                        style={[styles.button, styles.closeLobbyBtn]}>
                    Fermer le lobby
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
        height: '100%'
    },
    lobbyContainer: {
        flex: 1,
        padding: 20,
        margin: 'auto',
        width: '80%',
    },
    participantsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    button: {
        width: 'fit-content'
    },
    closeLobbyBtn: {
        position: 'absolute',
        left: 10,
        bottom: 10,
    },
    startGame: {
        flex: 1,
        marginTop: 60,
        alignSelf: 'flex-end',
    }

})

const mapStateToProps = state => {
    return {
        lobby: state.lobby
    }
}

export default connect(mapStateToProps)(Lobby)