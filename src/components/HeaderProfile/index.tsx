import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import BackButtonWhite from '../../assets/images/back-button-white.svg';
import profilePictureDashboard from '../../assets/images/photo-perfil.png';
import {LineSeparator} from '../LineSeparator/styles';

import {SubmitButton} from '../SubmitButton';
import {
  AccountText,
  BackButtonContainer,
  CloudLeftContainer,
  Connections,
  Container,
  ContainerButton,
  ContainerText,
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
  WhiteTextName,
} from './styles';

interface ProfileProps {
  avatar?: string;
  fullName?: string;
  following?: Number;
  follower?: Number;
  edit?: boolean;
  ellipsisPressed?: () => void;
}

const HeaderProfile = ({
  fullName,
  avatar,
  following,
  follower,
  edit,
}: ProfileProps) => {
  const navigation = useNavigation<any>();

  return (
    <>
      <Container>
        <HeaderContainerBackground />
        <HeaderInformation>
          <BackButtonContainer>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackButtonWhite />
            </TouchableOpacity>
            {edit ? (
              <AccountText>Editar</AccountText>
            ) : (
              <AccountText>Conta</AccountText>
            )}
          </BackButtonContainer>
          <View>
            <ProfileContainer>
              <LeftCloudsContainer>
                <CloudLeftContainer />
              </LeftCloudsContainer>
              <MiddleProfileContainer>
                <ProfilePictureContainer>
                  <ProfilePicture
                    source={avatar ? {uri: avatar} : profilePictureDashboard}
                  />
                </ProfilePictureContainer>
                {fullName && (
                  <ContainerText>
                    <WhiteTextName>{fullName}</WhiteTextName>
                  </ContainerText>
                )}
              </MiddleProfileContainer>
              <RightCloudsContainer>
                <RightCloudsTop />
                <RightCloudsBottom />
              </RightCloudsContainer>
            </ProfileContainer>
          </View>
          <LineSeparator />
          <Connections>
            <WhiteText>Seguidores: 0</WhiteText>
            <WhiteText>Seguindo: 0</WhiteText>
          </Connections>
          {!edit && (
            <>
              <LineSeparator />
              <ContainerButton>
                <SubmitButton
                  text="Editar Conta"
                  onPress={() =>
                    navigation.navigate('EditProfile', {
                      following,
                      follower,
                    })
                  }
                  darkMode={true}
                />
              </ContainerButton>
            </>
          )}
        </HeaderInformation>
      </Container>
    </>
  );
};

export default HeaderProfile;
