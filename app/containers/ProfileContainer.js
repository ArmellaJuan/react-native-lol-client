import * as summonerActions from '../actions/summoner';
import { connect } from 'react-redux';

import Profile from '../components/Profile';


const mapStateToProps = (state, ownProps) => {
  return {
    name: state.summoner.name,
    loading: state.summoner.loading,
    summoner: state.summoner.summoner,
    found: state.summoner.found,
    navigator: ownProps.navigator
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSummoner: (name) => {
      dispatch(summonerActions.fetchSummoner(name));
    },
    onChangeSummonerName: (name) =>{
      dispatch(summonerActions.changeSummonerName(name));
    },
    onRecentGames: () =>{
      dispatch(summonerActions.requestRecentGames());
    }
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfileContainer;

