import { Dimensions, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  dropdownStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    paddingTop: RFValue(18),
    paddingBottom: RFValue(18),
    width: RFValue(132),
    height: RFValue(144),
    borderRadius: RFValue(20)
  },
  dropdownOptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: RFValue(32), 
    paddingLeft: RFValue(16),
    alignItems: 'center',
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