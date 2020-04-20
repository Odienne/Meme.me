import React from 'react'
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import * as ImagePicker from "expo-image-picker";
// import ImagePicker from 'react-native-image-picker'
import * as firebase from "firebase";
import {Button} from "react-native-paper";

class Profil extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            image: firebase.auth().currentUser.photoURL
        }
    }

    _pickImage = () => {
        try {
            ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0,
                base64: true
            }).then(result => {
                if (!result.cancelled) {
                    firebase.storage().ref('Avatars').child(firebase.auth().currentUser.uid).put(this.b64toBlob(result.uri)).then(snapshot => {
                        firebase.storage().ref('Avatars').child(firebase.auth().currentUser.uid).getDownloadURL().then(url => {
                            firebase.auth().currentUser.updateProfile({photoURL: url}).then(() => {
                                this.setState({image: url})
                            }).catch(e => {
                                console.log(e)
                            })
                        })
                    }).catch(e => {
                        console.log(e)
                    });
                }
            })

        } catch (E) {
            console.log(E);
        }
    };

    b64toBlob(dataURI) {
        let byteString = atob(dataURI.split(',')[1]);
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/jpeg'});
    }

    render() {
        return (
            <View>
                <Text>Profil</Text>
                <TouchableOpacity onPress={this._pickImage}>
                    <Image style={{height: 100, width: 100}} source={{uri: this.state.image}}/>
                </TouchableOpacity>
                <Button onPress={() => firebase.auth().signOut()}>Signout</Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

export default Profil