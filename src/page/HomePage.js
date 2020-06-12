import React from 'react';
import {Text, View, SafeAreaView, Button,
        Image, TouchableHighlight, StyleSheet, 
        ScrollView} from 'react-native';
import HttpUtil from '../networking/HttpUtil';
import Swiper from 'react-native-swiper';
import NextPage from './NextPage';


class HomePage extends React.Component {
    state = {
        settingData: {},
    };

    componentDidMount() {
        this._homeSetting();
    }

    componentWillUnmount() {

    }

    _homeSetting() {
        HttpUtil.get('/51app/api/gjj/home', null, (res, error) => {
            if (res) {
                this.setState({
                    settingData: res.results,
                });
            }
        });
    }

    _loanMore = ()=> {

    }

    _openDetail = () => {
        this.props.navigation.push('NextPage', {
            id: '134555'
        });
    }

    _onScrollView() {
        console.log('scrollView滚动了-', )
    }

    _bannerSwiper(props) {
        if (!this.state.settingData.banner_list) {
            return (<></>);
        }
        return (
            <Swiper style={{height: 100, paddingBottom: 10, paddingTop: 10}} autoplay>
                {
                    this.state.settingData.banner_list.map((item, index) => {
                        return (
                            <Image resizeMode='stretch' source={{uri: item.logo}} style={{flex: 1}} key={'banner_' + index}></Image>
                        );
                    })
                }
            </Swiper>
        );
    }

    _loan() {
        if (!this.state.settingData.business) {
            return null;
        }
        let loanItem = {};
        for (let index = 0; index < this.state.settingData.business.length; index ++) {
            let item = this.state.settingData.business[index];
            if (item.slag === 'loan') {
                loanItem = item;
                break;
            }
        }
        if (!loanItem.data || loanItem.data.length == 0) {
            return null;
        }
        return (
            <View style={styles.bussiness} key="business">
                <View style={styles.bussiness_header}>
                    <Text style={styles.bussiness_header_title}>{loanItem.title}</Text>
                    <TouchableHighlight style={styles.bussiness_header_more} onPress={this._loanMore}>
                        <Text style={styles.bussiness_header_more_text}>{loanItem.more_title}</Text>
                    </TouchableHighlight>
                </View>
                <View>
                {
                    loanItem.data.map((item, index) => {
                        return <View style={styles.bussiness_loan_item} key={'loan-' + index}>
                            <Image source={{uri: item.logo}} style={styles.bussiness_loan_item_logo}></Image>
                            <View style={{flex: 1,flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={styles.bussiness_loan_item_center}>
                                    <Text style={styles.bussiness_loan_item_center_name}>{item.name}</Text>
                                    <Text style={styles.bussiness_loan_item_center_tag}>{item.desc + ' ' + item.show}</Text>
                                </View>
                                <View>
                                    <View style={styles.bussiness_loan_item_quota}>
                                        <Text style={styles.bussiness_loan_item_quota_num}>{item.loan_max_value}</Text>
                                        <Text style={styles.bussiness_loan_item_quota_unit}>万</Text>
                                    </View>
                                    <Text style={styles.bussiness_loan_item_tips_text}>{item.loan_max_title}</Text>
                                </View>
                            </View>
                        </View>
                    })
                }
                </View>
            </View>
        );
    }

    _house() {
        if (!this.state.settingData.business) {
            return null;
        }
        let houseItem = {};
        for (let index = 0; index < this.state.settingData.business.length; index ++) {
            let item = this.state.settingData.business[index];
            if (item.slag === 'house') {
                houseItem = item;
                break;
            }
        }
        if (!houseItem.data || houseItem.data.length == 0) {
            return null;
        }
        return(
            <View style={styles.bussiness} key="business">
                <View style={styles.bussiness_header}>
                    <Text style={styles.bussiness_header_title}>{houseItem.title}</Text>
                    <TouchableHighlight style={styles.bussiness_header_more} onPress={this._loanMore}>
                        <Text style={styles.bussiness_header_more_text}>{houseItem.more_title}</Text>
                    </TouchableHighlight>
                </View>
                <View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <ScrollView style={{}} 
                    onScroll={this._onScrollView}
                >
                {
                    this.state.settingData.icon_list ? (
                        <View style={styles.icon_list} key='icon-list'>
                            {
                                this.state.settingData.icon_list.map((item, index) => {
                                    return (
                                        <TouchableHighlight underlayColor={'#fff'} style={styles.icon_list_item} key={'icon_list' + index} onPress={this._openDetail}>
                                            <View>
                                                <Image source={{uri:item.logo}} style={{width:33, height: 36}} />
                                                <Text style={styles.icon_list_item_title}>{item.title}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    );
                                })
                            }
                        </View>
                    ) : (<></>)
                }
                {
                    this._bannerSwiper()
                }
                {
                    this._loan()
                }
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default HomePage;

const styles = StyleSheet.create({
    icon_list: {
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    icon_list_item: {
        flex: 1,
        alignItems: 'center',
    },
    icon_list_item_title: {
        marginTop: 10
    },
    bussiness: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'column'
    },
    bussiness_header: {
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bussiness_header_title: {
        color: '#172742',
        fontSize: 20,
        fontWeight: 'bold'
    },
    bussiness_header_more: {
        width: 60,
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bussiness_header_more_text: {
        color: '#999999',
        fontSize: 14,
    },
    bussiness_loan_item: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    bussiness_loan_item_logo: {
        width: 32,
        height: 32,
        marginRight: 6,
    },
    bussiness_loan_item_center: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    bussiness_loan_item_center_name: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 20
    },
    bussiness_loan_item_center_tag: {
        fontSize: 12,
        color: '#999999'
    },
    bussiness_loan_item_quota: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: 30,
    },
    bussiness_loan_item_quota_num: {
        color: '#4678e7',
        fontSize: 20,
        height: 30,
        lineHeight: 30
    },
    bussiness_loan_item_quota_unit: {
        color: '#4678e7',
        fontSize: 12,
        height: 30,
        lineHeight: 36
    },
    bussiness_loan_item_tips: {

    },
    bussiness_loan_item_tips_text: {
        color: '#969fb0',
        fontSize: 11,
        paddingTop: 8,
    }
});