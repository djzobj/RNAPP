/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  DeviceEventEmitter,
  Button
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Provider} from 'mobx-react';
import store from './src/store/Index';

import globalData from './src/extend/GlobalData';

import LaunchLoadingPage from './src/page/LaunchLoadingPage';
import HomePage from './src/page/HomePage';
import BottomTabBarPage from './src/page/TabBar/BottomTabBar';
import NextPage from './src/page/NextPage';
import MobxPage from './src/page/MobxPage';
import ScrollPage from './src/page/ScrollPage';

const Stack = createStackNavigator();

class App extends React.Component {

  state = {
    enterHome: false,
  }

  UNSAFE_componentWillMount() {
    DeviceEventEmitter.addListener('enterHome', ()=> {
      this.setState({
        enterHome: true,
      });
    });
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer onStateChange={(state)=> {
          globalData.routes = state.routes;
      }}>
  <Stack.Navigator screenOptions={(navigation) => {
    return {
      headerStyle: {
        backgroundColor: '#ee7530'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20
      },
      headerBackTitle: null,
      headerTruncatedBackTitle: null,
      headerLeft: (props)=> {
        return <Button title="<-" color='#333' onPress={props.onPress}/>
      },
    }
  }}>
    {
      this.state.enterHome ? (
        <>
        <Stack.Screen name='BottomTabBarPage' component={BottomTabBarPage} 
        options={{
          headerShown: false,
        }}>
        </Stack.Screen>
        <Stack.Screen name='NextPage' component={NextPage} options={
          NextPage.navigationOptions
        }/>
        <Stack.Screen name='MobxPage' component={MobxPage} />
        <Stack.Screen name='ScrollPage' component={ScrollPage} />
        </>
      ) : (
        <Stack.Screen name='LaunchLoadingPage' component={LaunchLoadingPage}
        options={{
          headerShown: false,
        }}>
        </Stack.Screen>
      )
    }
    
  </Stack.Navigator>
</NavigationContainer>
      </Provider>
    );
  }
}

export default App;
