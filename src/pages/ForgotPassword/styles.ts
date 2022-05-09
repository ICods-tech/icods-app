import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

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

export const ForgotPasswordForm = styled.View`
  width: 100%;
  padding: 0 ${RFValue(15)}px;

  align-itens: center;
`;

export const ForgotPasswordFormLabel = styled.Text`
  text-align: center;
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  margin: ${RFValue(35)}px ${RFValue(32)}px ${RFValue(18)}px;

  letter-spacing: ${Dimensions.get('window').width*0.002}px;
  color: ${({theme}) => theme.colors.title};
`;

export const ForgotPasswordFormTextInput = styled.TextInput`
  width: 100%;
  background: #F2F2F2;
  padding-left: ${RFValue(16)}px;
  margin-bottom: ${RFValue(39)}px;
  border-radius: ${RFValue(8)}px;
`;

export const ForgotPasswordFormSendButton = styled.TouchableNativeFeedback`
`;

interface ForgotPasswordFormSendButtonContainerProps {
  active: boolean;
}

export const ForgotPasswordFormSendButtonContainer = styled.View<ForgotPasswordFormSendButtonContainerProps>`
  background: ${({active, theme}) => active ? theme.colors.primary : theme.colors.gray};

  width: 80%;
  height: 40px;
  margin: 0 auto;

  align-itens: center;
  justify-content: center;
  border-radius: ${RFValue(116)}px;
`;

export const ForgotPasswordFormSendButtonLabel = styled.Text`
  text-align: center;
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.bold};

  letter-spacing: ${Dimensions.get('window').width*0.002}px;
  color: ${({theme}) => theme.colors.shape};
`;

export const InfoSendEmailContainer = styled.View`
  width: 100%;

  height: 80px;

  align-itens: center;
  justify-content: center;
`;

interface InfoSendEmailTextProps {
  isBlue: boolean;   
}

export const InfoSendEmailText = styled.Text<InfoSendEmailTextProps>`
  color: ${({isBlue, theme}) => isBlue ? theme.colors.primary : theme.colors.gray2};

  text-align: center;
  font-size: ${RFValue(10)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  margin: ${RFValue(35)}px ${RFValue(32)}px ${RFValue(18)}px;

  letter-spacing: ${Dimensions.get('window').width*0.002}px;
`;
