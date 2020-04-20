import React from 'react';
import {Animated, Dimensions} from "react-native";


class SlideInRight extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            positionRight: new Animated.Value(Dimensions.get('window').width)
        }
    }

    componentDidMount() {
        Animated.spring(
            this.state.positionRight, {toValue: 0, useNativeDriver: false}
        ).start()
    }


    render() {

        return (
            <Animated.View style={{right: this.state.positionRight}}>
                {this.props.children}
            </Animated.View>
        )
    }
}


export default SlideInRight