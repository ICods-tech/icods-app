import CloudRightTop from '../../assets/images/cloud-right-1.svg'
import CloudLeft from '../../assets/images/cloud-profile-left.svg'
import CloudRightBottomn from '../../assets/images/cloud-right-2.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import Header from '../../assets/images/header-profile.svg'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native';
import { Edit } from 'react-native-iconly';

export const Container = styled.View`
`

export const BackButtonContainer = styled.View`
  margin-top: ${RFValue(20)}px;
  margin-left: ${RFValue(16)}px;
  flex-direction: row;
  align-items: center;
`

export const ProfileContainer = styled.View`
  flexDirection: row;
  marginTop: ${RFValue(-30)}px;
  alignItems: center;
  justifyContent: center;
`

export const MiddleProfileContainer = styled.View`
  flexDirection: column;
  alignItems: center;
  justifyContent: center;
`
export const ProfilePicture = styled.Image.attrs({
  resizeMode: "contain"
})`
  width: ${RFValue(166)}px;
  height: ${RFValue(166)}px;
`;


export const WhiteText = styled.Text`
  color: #fff;
  font-style: normal;
  font-weight: 700;
  font-size: ${RFValue(16)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`

export const WhiteTextName = styled.Text`
  color: #fff;
  font-style: normal;
  font-weight: 700;
  font-size: ${RFValue(16)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  margin-top: ${RFValue(10)}px;
`

export const WhiteTextNumbers = styled.Text`
  color: #fff;
  font-style: normal;
  font-weight: 700;
  font-size: ${RFValue(16)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  margin-top: ${RFValue(12)}px;
  margin-bottom: ${RFValue(-60)}px;
`

export const FollowingFollowersContainers = styled.View`
  flexDirection: row;
  justifyContent: space-around;
  marginTop: ${RFValue(18)}px;
`

export const Connections = styled.View`
  alignItems: center;
  justifyContent: center;
`

export const LeftCloudsContainer = styled.View`
  flexDirection: column;
  justifyContent: flex-end;
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
`

export const ProfilePictureContainer = styled.View`
`

export const HeaderInformation = styled.View`
  flex-direction: column;
`

export const RightCloudsContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: ${RFValue(100)}px;
  height: ${RFValue(220)}px;
`

export const AccountText = styled.Text`
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.semi_bold};
  font-size: ${RFValue(24)}px;
  margin-left: ${RFValue(8)}px;
`

export const RightCloudsTop = styled(CloudRightTop)`
  marginRight: ${RFValue(24)}px;
`

export const RightCloudsBottom = styled(CloudRightBottomn)`
  marginTop: ${RFValue(80)}px;
`

export const EditIconContainer = styled.TouchableOpacity`
  position: absolute;
  top: ${RFValue(8)}px;
  right: 0;
  zIndex: 2;
`

export const HeaderContainerBackground = styled(Header)`
  position: absolute;
  z-index: -1;
  top: ${RFValue(-60)}px;
`

export const CloudLeftContainer = styled(CloudLeft)`
  margin-left: ${RFValue(18)}px;
`

export const EditIcon = styled(Edit)`
  color: #2B90D9;
  background: white;
  border-radius: ${RFValue(16)}px;
`