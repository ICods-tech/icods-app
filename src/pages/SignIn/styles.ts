import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.shape};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  showsVerticalScrollIndicator: false,
})`
  margin-top: ${RFValue(25)}px;
  background-color: ${({theme}) => theme.colors.shape};
`;

export const SignInOptions = styled.View`
  width: 100%;
  /* height: 100%; */
  padding: 0 ${RFValue(55)}px;
  /* margin-bottom: ${Dimensions.get('window').width * 0.24}px; */
`;

export const SpacingContainer = styled.View`
  width: 100%;

  margin-top: ${RFValue(24)}px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SpacingLine = styled.View`
  height: ${RFValue(1)}px;
  background-color: ${({theme}) => theme.colors.light_line};
`;

export const SpacingText = styled.Text`
  margin: 0 ${RFValue(15)}px 0 ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.subtitle};
  font-size: ${RFValue(10)}px;
  font-family: ${({theme}) => theme.fonts.medium};

  font-weight: 500;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`;

export const LoginButtonContainer = styled.View`
  width: 100%;
  height: ${RFValue(88)}px;

  margin-top: ${RFValue(22)}px;

  justify-content: space-between;
`;

export const HelpContainer = styled.View`
  width: 100%;

  margin: ${RFValue(12)}px 0 ${RFValue(24)}px 0;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HelpButtonContainer = styled(RectButton)`
  padding: ${RFValue(4)}px;
  background-color: ${({theme}) => theme.colors.shape};
  border-radius: ${RFValue(16)}px;
`;

interface HelpButtonTextProps {
  textColor: string;
}

export const HelpButtonText = styled.Text<HelpButtonTextProps>`
  font-size: ${RFValue(10)}px;
  font-family: ${({theme}) => theme.fonts.semi_bold};

  color: ${({textColor}) => textColor};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;

  border-bottom-width: 1px;
  border-bottom-color: ${({textColor}) => textColor};
`;

export const RegisterAndPassowordForgotContainer = styled.View`
  width: 100%;

  justify-content: space-between;
  flex-direction: row;

  margin: ${RFValue(12)}px 0 ${RFValue(24)}px 0;
`;

export const HelpContainerTexts = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.regular};
`;
