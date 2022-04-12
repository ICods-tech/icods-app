import React, {useState} from 'react';
import profilePictureDashboard from '../../../assets/images/photo-perfil.png';
import EllipsisDashboard from '../../../assets/images/Icons/ellipsis-dashboard.svg';
import HeaderDashboardBackgroundImage from '../../../assets/images/background-header-dashboard.png';

import {
  Container,
  Gradient,
  HeaderContainer,
  HeaderDashboardBackground,
  HeaderDashboardImageContainer,
  HeaderMenuButton,
  HeaderUserInfoContainer,
  HeaderUserNameContainer,
  HeaderUserNameText,
  HeaderUserPhoto,
} from './styles';
import {useNavigation} from '@react-navigation/native';

interface HeaderProps {
  avatar?: string;
  name?: string;
  surname?: string;
  ellipsisPressed?: () => void;
}

const HeaderDashboard = ({
  name,
  surname,
  avatar,
  ellipsisPressed,
}: HeaderProps) => {
  const navigation = useNavigation<any>();

  return (
    <Gradient>
      <Container>
        <HeaderContainer>
          <HeaderUserInfoContainer
            onPress={() => navigation.navigate('Profile')}>
            {
              <HeaderUserPhoto
                source={avatar ? {uri: avatar} : profilePictureDashboard}
              />
            }

            <HeaderUserNameContainer>
              <HeaderUserNameText>{name ? name + '  ' : ''}</HeaderUserNameText>
              <HeaderUserNameText>{surname ? surname : ''}</HeaderUserNameText>
            </HeaderUserNameContainer>
          </HeaderUserInfoContainer>

          <HeaderMenuButton onPress={ellipsisPressed}>
            <EllipsisDashboard />
          </HeaderMenuButton>
        </HeaderContainer>
      </Container>
    </Gradient>
  );
};

export default HeaderDashboard;
