import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    Navigator,
    TouchableHighlight,
} from 'react-native';

import Matchs from './app/components/Matchs';
import Profile from './app/components/Profile';
import './app/util/titleize';

var NavigationBarRouteMapper = {
  RightButton: function() {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

  LeftButton: (route, navigator, index, navState) =>
    {
        if (route.id === 'profile') {
        return null;
        } else {
          return (
            <TouchableHighlight underlayColor='transparent' style={ styles.back }  onPress={() => navigator.pop()}>
              <Text  style={ {color: 'white'} } >Back</Text>
            </TouchableHighlight>
          );
        } 
    },
};

class SimpleNavigationApp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Profile', id: 'profile' }}
        debugOverlay={false}
        navigationBar={
           <Navigator.NavigationBar
              navigationStyles={Navigator.NavigationBar.StylesIOS}
              routeMapper={NavigationBarRouteMapper}
              style={styles.navBar}
           />}
        renderScene={(route, navigator) => {

           if(route.id == 'profile') {
               return  <View style={ styles.scene } >
                          <Profile
                            navigator = { navigator }
                           /> 
                       </View>
             }
            if(route.id == 'matchHistory'){
              return <View style={ styles.scene } >
                          <Matchs summonerData={route.summonerData} />
                       </View>
            }
           }
        }
      />
    )
  }
}




var styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'dodgerblue',
  },
  titleStyle: {
    color: 'white'
  },
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
    flex: 1
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
    color: 'white'
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  scene: {
    flex: 1,
    paddingTop: 60,
    flexDirection: 'column',
  },
  back: {
    padding: 10,
  }
});

AppRegistry.registerComponent('PaisaLolClient', () => SimpleNavigationApp)


