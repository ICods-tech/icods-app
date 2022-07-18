import React from 'react';
import { Dimensions, StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    position: 'absolute',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: 0,
    right: 0
  },
  textStyle: {
    position: 'absolute',
    bottom: 2,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 16 : 0,
    fontSize: 10,
    lineHeight: 12,
    setLetterSpacing: 0.02,
    color: '#282C37'
  }
})

export default styles;
