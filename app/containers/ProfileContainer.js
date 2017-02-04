import * as actions from '../actions/actions';
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
      dispatch(actions.fetchSummoner(name));
    },
    onChangeSummonerName: (name) =>{
      dispatch(actions.changeSummonerName(name));
    },
    onRecentGames: () =>{
      dispatch(actions.requestRecentGames());
    }
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfileContainer;

