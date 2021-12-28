import CloudRightTop from '../../assets/images/cloud-right-1.svg'
import CloudLeft from '../../assets/images/cloud-profile-left.svg'
import CloudRightBottomn from '../../assets/images/cloud-right-2.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import Header from '../../assets/images/header-profile.svg'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native';
import { Edit } from 'react-native-iconly';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
`

export const BackButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
`

export const ProfileContainer = styled.View`
  display: flex;
  flexDirection: row;
  marginTop: ${RFValue(-30)}px;
  alignItems: center;
  justifyContent: center;
`

export const MiddleProfileContainer = styled.View`
  display: flex;
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
  letter-spacing: ${Dimensions.get('window').width*0.002}px;
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
  letter-spacing: ${Dimensions.get('window').width*0.002}px;
  margin-top: ${RFValue(12)}px;
  margin-bottom: ${RFValue(-60)}px;
`

export const FollowingFollowersContainers = styled.View`
  display: flex;
  flexDirection: row;
  justifyContent: space-around;
  marginTop: ${RFValue(18)}px;
`

export const Connections = styled.View`
  alignItems: center;
  justifyContent: center;
`

export const LeftCloudsContainer = styled.View`
  display: flex;
  flexDirection: column;
  justifyContent: flex-end;
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
`

export const ProfilePictureContainer = styled.View`
  display: flex;
`

export const HeaderInformation = styled.View`
  display: flex;
  flex-direction: column;
`

export const RightCloudsContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${RFValue(100)}px;
  height: ${RFValue(220)}px;
`

export const AccountText = styled.Text`
  color: #fff;
  font-weight: 800;
  font-size: ${RFValue(26)}px;
  margin-top: ${RFValue(6)}px;
  margin-left: ${RFValue(-4)}px;
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
  display: flex;
  margin-left: ${RFValue(18)}px;
`

export const EditIcon = styled(Edit)`
  color: #2B90D9;
  background: white;
  border-radius: ${RFValue(16)}px;
`