import React from 'react';
import {Text, Button, View} from 'react-native';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
class MobxPage extends React.Component {

    _changePhone = ()=> {
        this.props.store.login.setPhone('134576557');
    }

    render() {
        return (
        <View>
            <Text>{'手机号：' + this.props.store.login.phone}</Text>
            <Button title='修改手机号' onPress={this._changePhone}></Button>
        </View>
        );
    }
}

export default MobxPage;