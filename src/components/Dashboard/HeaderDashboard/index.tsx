import React from 'react';
import profilePictureDashboard from '../../../assets/images/photo-perfil.png';
import EllipsisDashboard from '../../../assets/images/Icons/ellipsis-dashboard.svg';

import {
  Container,
  HeaderContainer,
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
    <Container>
      <HeaderUserInfoContainer onPress={() => navigation.navigate('Profile')}>
        {
          <HeaderUserPhoto
            source={avatar ? {uri: avatar} : profilePictureDashboard}
          />
        }
        <HeaderUserNameContainer>
          <HeaderUserNameText>{name}</HeaderUserNameText>
          {!!surname && <HeaderUserNameText>{surname}</HeaderUserNameText>}
        </HeaderUserNameContainer>
      </HeaderUserInfoContainer>

      <HeaderContainer>
        <HeaderMenuButton onPress={ellipsisPressed}>
          <EllipsisDashboard />
        </HeaderMenuButton>
      </HeaderContainer>
    </Container>
  );
};

export default HeaderDashboard;
