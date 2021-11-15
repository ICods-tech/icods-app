import React, { useState } from 'react';
import profilePictureDashboard from '../../../assets/images/photo-perfil.png';
import EllipsisDashboard from '../../../assets/images/Icons/ellipsis-dashboard.svg'
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
  ellipsisPressed 
}: HeaderProps) => {
  const [dropdownMenu, setDropdownMenu] = useState(false)
  return (
    <Gradient>
      <Container>
          <HeaderContainer>
            
            <HeaderUserInfoContainer>
              {avatar
                ? <></>
                : <HeaderUserPhoto 
                    source={profilePictureDashboard}
                    />
                  }
              
              <HeaderUserNameContainer>
                <HeaderUserNameText>{name ? name : 'Unknown'}</HeaderUserNameText>
                <HeaderUserNameText>{surname ? surname : 'Surname'}</HeaderUserNameText>
              </HeaderUserNameContainer>
            
            </HeaderUserInfoContainer>

            <HeaderMenuButton 
              onPress={ellipsisPressed}>
              <EllipsisDashboard />
            </HeaderMenuButton>

          </HeaderContainer>
      </Container>
    </Gradient>
  )
}

export default HeaderDashboard;