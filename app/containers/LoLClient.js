import React, {Component} from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

import GamesContainer from '../containers/GamesContainer';
import ProfileContainer from '../containers/ProfileContainer';
import GameDetailContainer from '../containers/GameDetailContainer';

import '../util/titleize';

const scenes = Actions.create(
  <Scene key="root" >
    <Scene key="profile" component={ProfileContainer} title="Profile" initial={true} />
    <Scene key="games" component={GamesContainer} title="Games"/>
    <Scene key="gameDetail" component={GameDetailContainer} title="Game Detail"/>
  </Scene>
);


export default class LolClientApp extends Component {
  render() {
    return <Router navigationBarStyle={styles.navigationBar} titleStyle={styles.title} 
    barButtonIconStyle={styles.barButton} sceneStyle={styles.scene} scenes={scenes}/>;
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 50
  },
  navigationBar:{
    backgroundColor: 'dodgerblue',
  },
  title:{
    color: 'white'
  },
  barButton:{
    tintColor:'rgb(255,255,255)'
  }
});


