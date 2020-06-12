import React from 'react';
import {Text, DeviceEventEmitter} from 'react-native';
import HttpUtil from '../networking/HttpUtil';
import DeviceInfo from 'react-native-device-info';
import globalData from '../extend/GlobalData';

class LaunchLoadingPage extends React.Component {

    componentDidMount() {
        this._deviceLogin();
    }

    _deviceLogin() {
        let device = {};
        device.uuid = DeviceInfo.getUniqueId() || '';
        device.idfa = '';
        device.screen_resolution = '750x1334';
        device.phone_model = DeviceInfo.getModel() || '';
        device.phone_brand = DeviceInfo.getBrand() || '';
        device.os_version = DeviceInfo.getSystemVersion() || '';
        device.wifi_mac_addr = DeviceInfo.getMacAddressSync() || '';
        device.bluetooth_mac_addr = '';
        let param = {
            past_deviceno: device.uuid,
            device_no: device.uuid,
            app_category_id: '0',
            channel_id: 'n_1_18000_appstore',
            app_id: '7c59fa87-a794-4037-8c18-cba5dc04290e',
            device_info: device,
        };
        HttpUtil.post('/user_api/v1/login/device', param, (res, error) => {
            console.log('---------', res, error);
            globalData.loginParam.device_login_logs_id = res.device_login_logs_id;
            globalData.loginParam.device_id = res.device_id;
            if (!error) {
                 DeviceEventEmitter.emit('enterHome');
            }
        });
    }

    render() {
        return (
            <Text>我市启动页</Text>
        );
    }
}

export default LaunchLoadingPage;