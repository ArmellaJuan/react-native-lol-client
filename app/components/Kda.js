import React, { Component, PropTypes } from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Kda extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return(
        <View style={ { flex: 1, flexDirection: 'row' } }>
          <Text style={[ styles.kdaLabel, styles.goodStatLabel ]}>{this.props.kills}</Text><Text style={ styles.kdaLabel }>/</Text>
          <Text style={[ styles.kdaLabel, styles.badStatLabel ]}>{this.props.deaths}</Text><Text style={ styles.kdaLabel }>/</Text>
          <Text style={[ styles.kdaLabel, styles.goodStatLabel ]}>{this.props.assists}</Text>
        </View>
    );
  }
}

Kda.propTypes = {
  kills: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired,
  assists: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  kdaLabel:{
    fontSize: 10,
    fontWeight: 'bold'
  },
  goodStatLabel: {
    color: '#1a78ae',
    fontWeight: 'bold',
  },
  badStatLabel:{
    color: '#c6443e',
    fontWeight: 'bold',
  }
});
