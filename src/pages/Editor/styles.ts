import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../global/styles/theme';

export const PopUpButton = styled.TouchableOpacity`
    padding: ${RFValue(6)}px ${RFValue(8)}px;
    margin-left: ${RFValue(8)}px;
    
    align-items: center;
    justify-content: center;
`;

export const HeaderContainer = styled.View`
  margin-left: ${RFValue(15)}px;
`;

export const ModalConfirmButtonText = styled.Text`
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    letter-spacing: ${Dimensions.get('window').width * 0.001}px;
    
    color: ${({ theme }) => theme.colors.primary};
`;

export const ModalCancelButtonText = styled.Text`
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    letter-spacing: ${Dimensions.get('window').width * 0.001}px;
    
    /* color: ${({ theme }) => theme.colors.cancelButton}; */
    opacity: 0.40;
`;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonNext: {
    position: 'absolute',
    right: 15,
    top: 15,

    width: 125,
    height: 32,

    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8,
  },
  modal: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: width * 0.8,
    height: height * 0.35,
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalIcon: {
    width: width * 0.15,
    height: width * 0.15,
    backgroundColor: '#F5AB0B',
    borderRadius: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
  },
  modalTitle: {
    // font- family: Manrope;
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    setLetterSpacing: 0.02,
    color: '#282C37',
    marginBottom: 14,
  },
  modalText: {
    width: width * 0.8 * 0.75,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 28,
  },
  modalButtonsContainer: {
    // backgroundColor: '#f00',
    width: width * 0.8 * 0.8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});

export default styles;
