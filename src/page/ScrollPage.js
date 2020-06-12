import React from 'react';
import {ScrollView, FlatList, Button, Text,
        View, StyleSheet,
} from 'react-native';

class ScrollPage extends React.Component {

    data = [
        {key: 'Devin'},
        {key: 'Dan'},
        {key: 'Dominic'},
        {key: 'Jackson'},
        {key: 'James'},
        {key: 'Joel'},
        {key: 'John'},
        {key: 'Jillian'},
        {key: 'Jimmy'},
        {key: 'Julie'},
        {key: 'Devin'},
        {key: 'Dan'},
        {key: 'Dominic'},
        {key: 'Jackson'},
        {key: 'James'},
        {key: 'Joel'},
        {key: 'John'},
        {key: 'Jillian'},
        {key: 'Jimmy'},
        {key: 'Julie'},
      ];

    headerPage() {
        const nums = [0, 1, 2, 3, 4, 5, 6, 7,];
        return (
            <View style={styles.header} key='header'>
                {
                    nums.map((text)=> {
                        return <View style={styles.block}>
                            <Text>{text}</Text>
                            <View style={styles.line}></View>
                        </View>
                    })
                }
            </View>
        )
    }

    _onScroll = (event)=> {
       console.log('xxxxx', event, event.target);
        if (event.nativeEvent === this.scrollRef) {
            console.log('----------', event.nativeEvent.contentOffset.y);//垂直滚动距离 
        }else{
            console.log('++++++++++', event.nativeEvent.contentOffset.y);
        }
    }

    render() {
        return (
            <ScrollView style={{flex: 1}} 
                scrollEventThrottle={0.1}
                ref={(ref) => this.scrollRef = ref}
                onScroll={this._onScroll}
                onStartShouldSetResponderCapture={()=> true}
            >
                {
                    this.headerPage()
                }
                <FlatList 
                    key='list'
                    style={{height: 500}}
                    data={this.data}
                    renderItem={({item}, index) => {
                        return <Text style={styles.item} key={index}>{item.key}</Text>
                    }}
                    keyExtractor={(item, index) => "item" + index}
                    ref={(ref) => this.flatListRef = ref}
                    onScroll={this._onScroll}
                >

                </FlatList>
            </ScrollView>
        );
    }
}

export default ScrollPage;

const styles = StyleSheet.create({
    header: {
        flexDirection: "column",
    },

    block: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    line: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#999'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});