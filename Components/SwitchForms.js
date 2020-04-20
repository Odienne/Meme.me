import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import Avatar from "./Avatar";
import {TextInput, Button} from 'react-native-paper';
import firebase from "firebase/app";
import "firebase/auth";
import SlideInRight from "../Animations/SlideInRight";
import SlideInLeft from "../Animations/SlideInLeft";

export default class SwitchForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: '', password: '', pseudo: '', coMail: '', coPassword: '',
            currentForm: 'inscription',
        };

    }

    handleChange = (text) => {
        this.setState({mail: text});
    }

    handleChangePassword = (text) => {
        this.setState({password: text});
    }

    handleChangePseudo = (text) => {
        this.setState({pseudo: text});
    }

    handleChangeCoMail = (text) => {
        this.setState({coMail: text});
    }

    handleChangeCoPassword = (text) => {
        this.setState({coPassword: text});
    }


    handleSubmit = (event) => {
        event.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.coMail, this.state.coPassword)
            .then(res => {
                if (res.user) firebase.auth().setLoggedIn(true);
            })
            .catch(e => {
                console.log(e.message);
            });
    }

    handleInscription = (event) => {
        event.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.mail, this.state.password)
            .then(res => {
                if (res.user) {
                    firebase.auth().currentUser.updateProfile({
                        displayName: this.state.pseudo,
                    }).then(function () {
                        console.log('profil créé')
                    }).catch(function (error) {
                        console.log('erreur')
                    });

                }

            })
            .catch(e => {
                console.log(e.message);
            });
    }

    switchForm = (form) => {
        this.setState({currentForm: form})
    }

    renderButtons() {
        let {currentForm} = this.state

        return (
            <View style={styles.switch_buttons}>
                <Button icon="login" mode={currentForm === 'inscription' ? 'contained' : ''} onPress={() => {
                    this.switchForm('inscription')
                }}>
                    Inscription
                </Button>
                <View style={styles.separator}></View>
                <Button icon="account" mode={currentForm === 'connexion' ? 'contained' : ''} onPress={() => {
                    this.switchForm('connexion')
                }}>
                    Connexion
                </Button>
            </View>
        )
    }

    render() {
        let {currentForm} = this.state

        return (
            <View>
                <View style={styles.switch_buttons}>
                    {this.renderButtons()}
                </View>
                {currentForm === 'inscription' &&
                <SlideInLeft>
                    <View style={styles.form}>
                        <TextInput style={styles.marginBottom} label='Email' mode="outlined" value={this.state.mail}
                                   onChangeText={this.handleChange}/>
                        <TextInput style={styles.marginBottom} label="Password" mode='outlined' secureTextEntry={true}
                                   value={this.state.password}
                                   onChangeText={this.handleChangePassword}/>
                        <TextInput style={styles.marginBottom} label='Pseudo' mode='outlined' value={this.state.pseudo}
                                   onChangeText={this.handleChangePseudo}/>
                        <Button style={styles.submitButton} mode="contained" onPress={this.handleInscription}>
                            S'inscrire
                        </Button>
                    </View>
                </SlideInLeft>
                }
                {currentForm === 'connexion' &&
                <SlideInRight>
                    <View style={styles.form}>
                        <TextInput style={styles.marginBottom} label='Email' mode='outlined' value={this.state.coMail}
                                   onChangeText={this.handleChangeCoMail}/>
                        <TextInput style={styles.marginBottom} label='Password' mode='outlined' secureTextEntry={true}
                                   value={this.state.coPassword}
                                   onChangeText={this.handleChangeCoPassword}/>
                        <Button style={styles.submitButton} mode="contained" onPress={this.handleSubmit}>
                            Se connecter
                        </Button>
                    </View>
                </SlideInRight>
                }
            </View>
        );
    }
}

let styles = StyleSheet.create({
    switch_buttons: {
        display: 'flex',
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 'auto',
        marginTop: 30,
        marginBottom: 30,
    },
    separator: {
        width: 2,
        height: 20,
        backgroundColor: '#ad54aa',
        marginLeft: 6,
        marginRight: 6
    },
    form: {
        display: 'flex',
        width: '80%',
        margin: 'auto'
    },
    submitButton: {
        width: 'fit-content',
        alignSelf: 'flex-end'
    },
    marginBottom: {
        marginBottom: 20
    },
})
