import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default class RowInfo extends Component{

  constructor(props){
    super(props);
  }

  render() {
    return (
        <View style = {styles.rowInfo} >
          <Text style = { [styles.rowLabel,  this.props.fontSize? { fontSize: this.props.fontSize } : {}, this.props.labelStyle? this.props.labelStyle : {}  ] }>{this.props.label}</Text>
          <Text style = { [styles.rowValue, this.props.fontSize? { fontSize: this.props.fontSize } : {}, this.props.valueStyle? this.props.valueStyle : {} ] }>{this.props.value}</Text>
        </View>
    );
  }

}


RowInfo.propTypes = {
  label: PropTypes.string,
  value: PropTypes.node,
  fontSize: PropTypes.number,
  valueStyle: PropTypes.array,
  labelStyle: PropTypes.array
};



const styles = StyleSheet.create({
  rowInfo: {
    flexDirection: 'row',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowLabel: {
    flex:1,
    fontWeight: 'bold',
  },
  rowValue: {
    flex:1,
  },
});