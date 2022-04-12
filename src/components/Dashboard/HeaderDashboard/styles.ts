import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {BorderlessButton, RectButton} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';

export const Gradient = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
  colors: ['#2B90D9', '#53C4E8'],
  style: {flex: 1},
})`
  height: ${RFValue(72)}px;
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;

export const HeaderDashboardImageContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  left: 0;
  top: 0;
  z-index: -1;
`;

export const HeaderDashboardBackground = styled.Image.attrs({
  resizeMode: 'stretch',
})`
  width: 100%;
  height: 100%;
`;

export const HeaderContainer = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderUserInfoContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${RFValue(23)}px;
`;

export const HeaderUserPhoto = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  margin-right: ${RFValue(13)}px;
`;

export const HeaderUserNameContainer = styled.View`
  flex-direction: row;
`;

export const HeaderUserNameText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.semi_bold};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: ${({theme}) => theme.colors.shape};
`;

export const HeaderMenuButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: ${RFValue(41)}px;
  height: ${RFValue(26)}px;
  align-items: center;
  justify-content: center;
  margin-right: ${RFValue(23)}px;
`;
