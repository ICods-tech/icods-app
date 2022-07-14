import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { StyleSheet, Platform, Dimensions } from 'react-native'

export const Header = styled.View`
    padding: 0px ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;
    margin-top: ${RFValue(getStatusBarHeight() + 3)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(26)}px;

    font-family: ${({ theme }) => theme.fonts.extra_bold};
    color: ${({ theme }) => theme.colors.title};
    
    letter-spacing: ${Dimensions.get('window').width * 0.001}px;
    
    margin-left: ${RFValue(17)}px;
    margin-bottom: 4px;
`;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 2 : 2,
    height: "100%",
    backgroundColor: '#FFF'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    color: '#282C37',
    fontFamily: 'Manrope',
    fontSize: 25.89,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 35,
    letterSpacing: Dimensions.get('window').width * 0.002,
    marginTop: 6,
    marginLeft: -4,
  },
  helpTextContainer: {
    alignSelf: 'flex-start',
    marginTop: 38,
    marginBottom: 38,
    marginLeft: 16
  },
  helpText: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.02,
    color: '#282C37',
  },
  helpInput: {
    paddingLeft: 24,
    height: 232,
    width: '95%',
    lineHeight: 20,
    textAlign: 'justify',
    textAlignVertical: 'top',

  },
  inputContainer: {
    width: '90%',
    height: 232,
    backgroundColor: '#F2F2F2',
    marginLeft: 16,
    borderRadius: 4,

  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 38,
    width: '70%',
    height: 40,
    fontFamily: 'Manrope',
  }
});
export default styles;