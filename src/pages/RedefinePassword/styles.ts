import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const BackButtonContainer = styled.View`
  position: absolute;
  top: ${RFValue(21)}px;
  left: ${RFValue(16)}px;
`;

export const RedefinePasswordForm = styled.View`
  width: 100%;
  padding: 0 ${RFValue(8)}px;
  margin-top: ${RFValue(22)}px;
  align-itens: center;
`;

export const RedefinePasswordFormLabel = styled.Text`
  text-align: justify;
  font-size: ${RFValue(16)}px;
  padding: 0 ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  margin: ${RFValue(32)}px ${RFValue(0)}px ${RFValue(28)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: ${({theme}) => theme.colors.title};
`;

export const NicknameContainer = styled.View`
  background: ${({theme}) => theme.colors.shape};
  margin: ${RFValue(0)}px ${RFValue(28)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(8)}px;
  border: ${RFValue(1)}px solid #2b90d9;
  align-itens: center;
  justify-content: center;
  flex-direction: row;
`;

export const NicknameText = styled.Text`
  margin: auto;
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  font-weight: 500;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
  text-transform: uppercase;
  color: ${({theme}) => theme.colors.primary};
`;

interface ErrorStyleProps {
  isErrored?: boolean;
}

export const InputContainer = styled.View<ErrorStyleProps>`
  margin: 0 ${RFValue(32)}px ${RFValue(32)}px;
  border: 1px solid
    ${({isErrored, theme}) =>
      isErrored ? theme.colors.attention : theme.colors.light_line};
  border-radius: 4px;
`;

export const SpacingLine = styled.View<ErrorStyleProps>`
  height: 1px;
  background-color: ${({isErrored, theme}) =>
    isErrored ? theme.colors.attention : theme.colors.light_line};
`;

export const RedefinePasswordFormSendButton = styled.TouchableNativeFeedback``;

export const RedefinePasswordFormSendButtonContainer = styled.View`
  background: ${({theme}) => theme.colors.primary};
  width: 80%;
  height: 40px;
  margin: 0 auto;
  align-itens: center;
  justify-content: center;
  border-radius: ${RFValue(116)}px;
`;

export const RedefinePasswordFormSendButtonLabel = styled.Text`
  text-align: center;
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: ${({theme}) => theme.colors.shape};
`;

interface ICellProps {
  focused: boolean;
  isCorrect: boolean;
  errored: boolean;
  editable: boolean;
}

export const Cell = styled.Text<ICellProps>`
  width: 38px;
  height: 38px;
  font-size: ${RFValue(22)}px;
  font-family: ${({theme}) => theme.fonts.light};
  color: ${({theme}) => theme.colors.primary};
  text-align: center;
  margin-left: 8px;
  background-color: ${({theme, editable}) => editable ? theme.colors.shape : theme.colors.light_line};
  border-width: 1px;
  border-color: ${({ theme, focused, errored }) =>  
    focused ? 
    theme.colors.primary 
    : errored ? 
    theme.colors.attention
    : theme.colors.gray};
  justify-content: flex-start;
`;

export const FieldsRow = styled.View`
  flex-direction: row;
  align-self: center;
`;

export const EmailText = styled(RedefinePasswordFormLabel)`
 color: ${({theme}) => theme.colors.primary};
 font-family: ${({theme}) => theme.fonts.semi_bold};
`