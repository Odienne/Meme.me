import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {Badge} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


class LobbyUser extends React.Component {


    renderParticipants() {
        const {participant} = this.props
        let displayStatus = participant.status === 'ready' ? 'Prêt' : 'en attente'

        let readyBadge =
            <Text style={styles.status}>
                <Icon name={participant.status === 'ready' ? 'check' : 'clock-o'} size={13} color="#fff"/>
                {' ' + displayStatus}
            </Text>
        return (
            <View style={styles.participant}>
                <Text style={styles.participantName}>{participant.displayName}</Text>
                <Image style={styles.participantAvatar} source={{uri: participant.photoURL}}/>
                <Badge value={readyBadge} badgeStyle={{height: 30}}
                       status={participant.status === 'ready' ? 'success' : 'error'}/>
            </View>
        )
    }

    render() {
        return this.renderParticipants()
    }
}

const styles = StyleSheet.create({
    participant: {
        alignItems: 'center',
        alignContent: 'center',
        width: '40%',
        marginBottom: 20
    },
    participantAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10
    },
    participantName: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold'
    },
    status: {
        padding: 13,
        paddingLeft: 10,
        paddingRight: 10,
        color: 'white',
        paddingBottom: 14
    }
})

export default LobbyUser