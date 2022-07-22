import { useNavigation } from '@react-navigation/native'
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import BackButtonWhite from '../../assets/images/back-button-white.svg'
import EditIcon from '../../assets/images/Icons/edit-icon.svg'
import ButtonProfilePicture from '../../components/ButtonProfilePicture'
import profilePictureDashboard from '../../assets/images/photo-perfil.png';

import {
  AccountText,
  BackButtonContainer,
  CloudLeftContainer,
  Connections,
  Container,
  EditIconContainer,
  FollowingFollowersContainers,
  HeaderContainerBackground,
  HeaderInformation,
  LeftCloudsContainer,
  MiddleProfileContainer,
  ProfileContainer,
  ProfilePicture,
  ProfilePictureContainer,
  RightCloudsBottom,
  RightCloudsContainer,
  RightCloudsTop,
  WhiteText,
  WhiteTextName
} from './styles';

interface ProfileProps {
  avatar?: string;
  fullName?: string;
  following?: Number;
  follower?: Number;
  edit?: boolean;
  ellipsisPressed?: () => void;
}

const HeaderProfile = ({ fullName, avatar, following, follower, edit, ellipsisPressed }: ProfileProps) => {
  const navigation = useNavigation<any>()
  return (
    <>
      <Container>
        <HeaderContainerBackground />
        <HeaderInformation>
          <BackButtonContainer>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackButtonWhite />
            </TouchableOpacity>
            {edit ?
              <AccountText>
                Editar
              </AccountText>
              : <AccountText>
                Conta
              </AccountText>}
          </BackButtonContainer>
          <View>
            <ProfileContainer>
              <LeftCloudsContainer>
                <CloudLeftContainer />
              </LeftCloudsContainer>
              <MiddleProfileContainer>
                <ProfilePictureContainer>
                  {!edit && (
                    <EditIconContainer onPress={() => navigation.navigate('EditProfile', { following, follower })}>
                      <EditIcon />
                    </EditIconContainer>
                  )}
                  <ProfilePicture
                    source={avatar ? { uri: avatar } : profilePictureDashboard}
                  />
                </ProfilePictureContainer>
                {
                  edit ?
                    <ButtonProfilePicture
                      text={'Trocar sua foto de perfil'}
                    />
                    : (fullName
                      ? <WhiteTextName>
                        {fullName}
                      </WhiteTextName>
                      : <WhiteTextName>
                        Mucas Loreira
                      </WhiteTextName>)
                }
              </MiddleProfileContainer>
              <RightCloudsContainer>
                <RightCloudsTop />
                <RightCloudsBottom />
              </RightCloudsContainer>
            </ProfileContainer>
          </View>
          <FollowingFollowersContainers>
            <Connections>
              <WhiteText>Seguidores</WhiteText>
              {
                follower
                  ? <WhiteText>{follower}</WhiteText>
                  : <WhiteText>0</WhiteText>
              }
            </Connections>
            <Connections>
              <WhiteText>Seguindo</WhiteText>
              {
                following
                  ? <WhiteText>{following}</WhiteText>
                  : <WhiteText>0</WhiteText>
              }
            </Connections>
          </FollowingFollowersContainers>
        </HeaderInformation>
      </Container>
    </>
  )
}

export default HeaderProfile;