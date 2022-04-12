import {Dimensions} from 'react-native';
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
  RectButton,
} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  top: 0;
  right: -4px;
  width: ${RFValue(132)}px;
  height: ${RFValue(160)}px;
  z-index: 2;
  background-color: ${({theme}) => theme.colors.shape};
  border-radius: ${RFValue(20)}px;

  padding: ${RFValue(19)}px 0 ${RFValue(16)}px 0;
  justify-content: space-between;
`;

export const NavigationButton = styled(RectButton)`
  width: 100%;
  height: ${RFValue(30)}px;}  
  flex-direction: row;
  align-items: center;
  padding-left: ${RFValue(16)}px;
`;

export const NavigationButtonText = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(10)}px;
  color: ${({theme}) => theme.colors.title};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;

  margin-left: ${RFValue(17)}px;
`;
