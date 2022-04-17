import styled from 'styled-components/native';
import Red from '../../../assets/images/Icons/colors/red.svg';
import Blue from '../../../assets/images/Icons/colors/blue.svg';
import Cyan from '../../../assets/images/Icons/colors/cyan.svg';
import Green from '../../../assets/images/Icons/colors/green.svg';
import Black from '../../../assets/images/Icons/colors/black.svg';
import Pink from '../../../assets/images/Icons/colors/pink.svg';
import Yellow from '../../../assets/images/Icons/colors/yellow.svg';
import NoColor from '../../../assets/images/Icons/colors/none.svg';
import {colorsIconsProps} from '.';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions, FlatList} from 'react-native';
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';

export const ModalContainer = styled.View`
  position: absolute;
  z-index: 2;
  height: ${RFValue(580)}px;
  width: ${Dimensions.get('window').width * 0.9}px;
  background-color: ${({theme}) => theme.colors.shape};

  justify-content: center;
  border-radius: ${RFValue(5)}px;
`;

export const ColorsContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(16)}px;
  margin-bottom: ${RFValue(12)}px;
`;

export const ColorOrderContainer = styled.View`
  margin-bottom: ${RFValue(24)}px;
`;

export const ColorOrderText = styled.Text`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(16)}px;

  color: ${({theme}) => theme.colors.title};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  line-height: ${RFValue(22)}px;
`;

export const ColorsButtonList = styled(
  FlatList as new () => FlatList<colorsIconsProps>,
).attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    AlignItems: 'center',
  },
})`
  height: ${RFValue(50)}px;
  width: 100%;
`;

export const DataContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0 ${RFValue(20)}px;
`;

export const DataText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  color: ${({theme}) => theme.colors.title};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  margin-bottom: ${RFValue(28)}px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${RFValue(36)}px;

  border-radius: ${RFValue(4)}px;
`;

export const SubmitButtonText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.shape};
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
`;

export const Footer = styled(GestureHandlerRootView)`
  flex: 1;
  flex-direction: row;
  align-self: flex-end;
  align-items: flex-end;

  padding-bottom: ${RFValue(8)}px;
  padding-right: ${RFValue(8)}px;
`;

export const BottomButton = styled(RectButton)`
  padding: ${RFValue(6)}px ${RFValue(8)}px;
  margin-left: ${RFValue(8)}px;

  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.shape};
  border-radius: ${RFValue(32)}px;
`;

export const ModalConfirmButtonText = styled.Text`
  text-transform: uppercase;
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;

  color: ${({theme}) => theme.colors.primary};
`;

export const ModalCancelButtonText = styled.Text`
  text-transform: uppercase;
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.001}px;
  background-color: ${({theme}) => theme.colors.shape};
  color: ${({theme}) => theme.colors.cancelButton};
  opacity: 0.4;
`;

export const BlackIcon = styled(Black).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const BlueIcon = styled(Blue).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const CyanIcon = styled(Cyan).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const GreenIcon = styled(Green).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const RedIcon = styled(Red).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const PinkIcon = styled(Pink).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const YellowIcon = styled(Yellow).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;

export const NoColorIcon = styled(NoColor).attrs({
  width: RFValue(20),
  height: RFValue(20),
})``;
