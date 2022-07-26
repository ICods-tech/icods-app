import {Dimensions} from 'react-native';
import {Edit} from 'react-native-iconly';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import CloudLeft from '../../assets/images/cloud-profile-left.svg';
import CloudRightTop from '../../assets/images/cloud-right-1.svg';
import CloudRightBottomn from '../../assets/images/cloud-right-2.svg';

export const Container = styled.View``;

export const ContainerButton = styled.View`
  margin: ${RFValue(20)}px 0 ${RFValue(20)}px 0;
  width: 80%;
  align-self: center;
`;

export const BackButtonContainer = styled.View`
  margin-top: ${RFValue(20)}px;
  margin-left: ${RFValue(16)}px;
  flex-direction: row;
  align-items: center;
`;

export const ContainerText = styled.View`
  margin-top: ${RFValue(8)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const MiddleProfileContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const ProfilePicture = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${RFValue(166)}px;
  height: ${RFValue(166)}px;
`;

export const WhiteText = styled.Text`
  color: #fff;

  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`;

export const WhiteTextName = styled.Text`
  color: #fff;
  font-style: normal;
  font-weight: 700;
  font-size: ${RFValue(16)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  margin-top: ${RFValue(10)}px;
`;

export const WhiteTextNumbers = styled.Text`
  color: #fff;
  font-style: normal;
  font-weight: 700;
  font-size: ${RFValue(16)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  margin-top: ${RFValue(12)}px;
  margin-bottom: ${RFValue(-60)}px;
`;

export const Connections = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: ${RFValue(10)}px 0 ${RFValue(10)}px 0;
`;

export const LeftCloudsContainer = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
`;

export const ProfilePictureContainer = styled.View``;

export const HeaderInformation = styled.View`
  flex-direction: column;
`;

export const RightCloudsContainer = styled.View`
  align-items: center;
  width: ${RFValue(100)}px;
  height: ${RFValue(220)}px;
`;

export const AccountText = styled.Text`
  color: #fff;
  font-family: ${({theme}) => theme.fonts.semi_bold};
  font-size: ${RFValue(24)}px;
  margin-left: ${RFValue(8)}px;
`;

export const RightCloudsTop = styled(CloudRightTop)`
  margin-right: ${RFValue(24)}px;
`;

export const RightCloudsBottom = styled(CloudRightBottomn)`
  margin-top: ${RFValue(80)}px;
`;

export const HeaderContainerBackground = styled.View`
  position: absolute;
  background-color: ${({theme}) => theme.colors.primary};
  width: 100%;
  height: 100%;
`;

export const CloudLeftContainer = styled(CloudLeft)`
  margin-left: ${RFValue(18)}px;
`;

export const EditIcon = styled(Edit)`
  color: #2b90d9;
  background: white;
  border-radius: ${RFValue(16)}px;
`;
