import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  dropdownStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    paddingLeft: RFValue(16),
    paddingTop: RFValue(18),
    paddingBottom: RFValue(21),
    width: RFValue(132),
    height: RFValue(129),
    borderRadius: RFValue(20)
  },
  dropdownSecondOption: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: RFValue(21),
    marginBottom: RFValue(21),
  },
  dropdownEdgeOptions: {
    display: 'flex',
    flexDirection: 'row',
  },
  dropdownOptionsText: {
    fontSize: RFValue(10),
    fontFamily: 'Manrope-Regular',
    color: 'rgba(0, 0, 0, 0.87)',
    marginLeft: RFValue(19),
    letterSpacing: Dimensions.get('window').width*0.002
  },
})

export default styles;