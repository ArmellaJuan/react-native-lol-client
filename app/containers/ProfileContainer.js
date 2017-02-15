import * as summonerActions from '../actions/summoner';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Profile from '../components/Profile';


const mapStateToProps = (state) => {
  return {
    name: state.summoner.name,
    loading: state.summoner.loading,
    summoner: state.summoner.summoner,
    found: state.summoner.found
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSummoner: (name) => {
      dispatch(summonerActions.fetchSummoner(name));
    },
    onChangeSearchSummonerName: (name) =>{
      dispatch(summonerActions.changeSearchSummonerName(name));
    },
    onRecentGames: (name) =>{
      Actions.games({title: `${name}'s Games`});
    },
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfileContainer;

