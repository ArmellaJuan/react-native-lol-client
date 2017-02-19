import React, { Component, PropTypes } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Util from './../util/Util';
 
export default class HorizontalPercentageRow extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    let value = Util.parseNumber(this.props.value);
    let percentage = value / this.props.maxValue;
    return (
      <View style={ [styles.row ]}>
       <View style={ [{ flex: percentage } , styles.valueRow]} />
       <View style={ [{ flex: 1 - percentage } , styles.blankRow]} />
       <Text style={ styles.valueText } >{value}</Text>
      </View>
    );
  }
}

HorizontalPercentageRow.propTypes = {
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number
};


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 25,
    flex: 1
  },
  valueRow: {
    backgroundColor: 'dodgerblue'
  },
  blankRow: {
    backgroundColor: '#93c4eb'
  },
  valueText:{
    position: 'absolute',
    color: 'white',
    paddingTop: 2,
    paddingLeft: 10,
    backgroundColor: 'transparent'
  }
});

