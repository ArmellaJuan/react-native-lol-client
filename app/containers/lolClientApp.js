import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    Navigator,
    TouchableHighlight,
} from 'react-native';

import GamesContainer from '../containers/GamesContainer';
import ProfileContainer from '../containers/ProfileContainer';
import GameDetailContainer from '../containers/GameDetailContainer';
import Icon from 'react-native-vector-icons/Entypo';

import '../util/titleize';

var NavigationBarRouteMapper = {
  RightButton: function() {
    return null;
  },

  Title: function(route) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

  LeftButton: function(route, navigator)
  {
    if (route.id === 'profile') {
      return null;
    } else {
      return (
        <TouchableHighlight underlayColor='transparent' style={ styles.back }  onPress={() => navigator.pop()}>
          <Icon name="chevron-thin-left" size={20} color="white" />
        </TouchableHighlight>
      );
    } 
  },
};

export default class LolClientApp extends Component {

  constructor(props) {
    super(props);
  }

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
                      <ProfileContainer
                        navigator={ navigator }
                            /> 
                   </View>;
          }
          if(route.id == 'matchHistory'){
            return <View style={ styles.scene } >
                       <GamesContainer
                          navigator={ navigator }
                            />
                   </View>;
          }
          if(route.id == 'gameDetail'){
            return <View style={ styles.scene } >
                     <GameDetailContainer />
                   </View>;
          }
        }
        }
      />
    );
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
