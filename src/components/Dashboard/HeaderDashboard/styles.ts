import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: ${RFValue(8)}px ${RFValue(15)}px;
  background-color: ${({theme}) => theme.colors.primary};
  align-items: center;
`;

export const HeaderContainer = styled.View``;

export const HeaderUserInfoContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  flex-direction: row;
  align-items: center;
`;

export const HeaderUserPhoto = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  margin-right: ${RFValue(13)}px;
`;

export const HeaderUserNameContainer = styled.View``;

export const HeaderUserNameText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.semi_bold};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: ${({theme}) => theme.colors.white};
`;

export const HeaderMenuButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: ${RFValue(41)}px;
  height: ${RFValue(26)}px;
  align-items: center;
  justify-content: center;
`;
