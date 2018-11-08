import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback,
    LayoutAnimation,
    NativeModules
 } from 'react-native';

//Android
NativeModules.UIManager.setLayoutAnimationEnabledExperimental && NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);

export default class LongText extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        };
    }

    componentWillUpdate(nextProps, nextState) {
        LayoutAnimation.spring();
    }

    toggleIsExpanded() {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }

    render() {
        const {label = '', content = '-'} = this.props;
        const {isExpanded} = this.state;
        return (
            <View style={style.line}>
                <Text style={[style.cell, style.label]}>{label}</Text>
                <TouchableWithoutFeedback onPress={() => this.toggleIsExpanded()}>
                    <View>
                        <Text style={[
                            style.cell, 
                            style.content, 
                            isExpanded ? style.expanded : style.collapsed]}>{content}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const style = StyleSheet.create({
    line: {
        paddingTop: 3,
        paddingBottom: 3,
    },
    cell: {
        fontSize: 16,
        paddingLeft: 5,
        paddingRight: 5,
    },
    label: {
        fontWeight: 'bold',
        paddingBottom: 8
    },
    content: {
        textAlign: 'justify',

    },
    collapsed: {
        maxHeight: 60
    },
    expanded: {
        flex: 1
    }
});