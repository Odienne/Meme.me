import React from 'react'
import {StyleSheet, Text, View, Share} from 'react-native'
import {Button} from 'react-native-paper'

class MyMemes extends React.Component {
    shareMeme = () => {
        Share.share({title: 'cc', message: 'ccaa'})
    }

    render() {
        return (
            <View>
                <Text>my memes</Text>
                <Button onPress={this.shareMeme}>Share it</Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

export default MyMemes