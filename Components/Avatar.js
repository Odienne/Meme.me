import React from 'react'
import {StyleSheet, Image, TouchableOpacity} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

class Avatar extends React.Component {

    constructor(props) {
        super(props)
        this._avatarClicked = this._avatarClicked.bind(this)
    }

    async _avatarClicked() {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({image: result.uri});
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    }

    render() {
        console.log(this.props.avatar)
        return (
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={this._avatarClicked}>
                <Image style={styles.avatar} source={this.props.avatar}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableOpacity: {
        margin: 5,
        width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#9B9B9B',
        borderWidth: 2
    }
})

export default Avatar