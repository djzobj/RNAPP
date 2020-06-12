import React from 'react';
import {Text, Button, View} from 'react-native';

class NextPage extends React.Component {

    static navigationOptions = ({navigation, route}) => {
        return {
            headerTitle: '我是谁',
            headerRight: () => (
                <Button
                  title="+1"
                  color="#333"
                  onPress={() => {
                    route.params.navigatePress();
                  }}
                />
            ),
            headerLeft: (props)=> {
                return <Button title="<" color='#fff' onPress={route.params.goBack}/>
            },
        }
    }

    componentWillMount() {
        console.log('------', this.props);
        this.props.navigation.setParams({
         title:'自定义Header',
         navigatePress:this._navigatePress,
         goBack: this._goBack,
        });
    }

    _goBack = ()=> {
        this.props.navigation.goBack();
    }

    _navigatePress = () => {
        alert('点击headerRight');
    }

    _openMobx = () => {
        this.props.navigation.push('MobxPage');
    }

    _openScroll = () => {
        this.props.navigation.push('ScrollPage');
    }

    render() {
        return (
        <View>
            <Text>{'id:' + this.props.route.params.id}</Text>
            <Button title='mobx测试' onPress={this._openMobx}></Button>
            <Button title='scrollView' onPress={this._openScroll}></Button>
        </View>
        );
    }
}

export default NextPage;