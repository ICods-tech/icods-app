import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ContainerScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: RFValue(12),
  },
})``;

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  height: ${Dimensions.get('window').height}px;
`;

export const EditContainer = styled.View`
  margin-top: ${RFValue(16)}px;
  align-items: center;
`;

export const EditText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(19)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: ${({theme}) => theme.colors.black};
`;

export const UserInformationContainer = styled.View`
  margin-top: ${RFValue(36)}px;
  margin-left: ${RFValue(20)}px;
  align-items: flex-start;
`;

export const UserLabelAndInfoContainer = styled.View`
  margin-bottom: ${RFValue(20)}px;
`;

export const UserInformationLabel = styled.Text`
  color: rgba(40, 44, 55, 0.5);
  font-style: normal;
  font-weight: 400;
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(18)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`;

export const UserInformationText = styled.Text`
  font-family: Manrope;
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(19)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: #282c37;
`;

export const ExcludeAccountText = styled.Text`
  font-family: Manrope;
  font-style: normal;
  font-weight: bold;
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(19)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: #df2c2c;
`;

export const PrivateProfileContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${RFValue(320)}px;
  margin-bottom: ${RFValue(16)}px;
`;
