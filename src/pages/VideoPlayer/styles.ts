import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.SafeAreaView`
  background-color: #000;
  display: flex;
  flex: 1;
  justify-content: center;
  height: 100%;
`;

export const VideoContainerHeader = styled.View`
  padding: ${RFValue(25)}px 0 0 ${RFValue(20)}px;
`;

export const TouchableOpacity = styled.TouchableOpacity``;

export const VideoContainer = styled.View`
  margin-top: 20px;
  height: 80%;
  background: #000;
`;

export const IconsContainer = styled.View`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;