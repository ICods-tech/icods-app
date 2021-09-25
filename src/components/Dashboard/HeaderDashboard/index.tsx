import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react';
import { View, Text, Image, StatusBar, Button, SafeAreaView, TouchableOpacity, TouchableHighlight, Pressable, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import profilePictureDashboard from '../../../assets/images/photo-perfil.png';
import InfoAndEllipsis from '../../../assets/images/info_and_ellipsis.svg'
import InfoIcon from '../../../assets/images/Icons/info_icon.svg'
import EllipsisIcon from '../../../assets/images/Icons/ellipsis.svg'
import EllipsisDashboard from '../../../assets/images/Icons/ellipsis-dashboard.svg'
import HeaderDashboardBackground from '../../../assets/images/background-header-dashboard.svg';
import styles from './styles'
import { 
  Container, 
  HeaderContainer, 
  HeaderDashboardImageContainer, 
  HeaderMenuButton,
  HeaderUserInfoContainer,
  HeaderUserNameContainer,
  HeaderUserNameText,
  HeaderUserPhoto
} from './newStyles';

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
    <Container>
        <HeaderDashboardImageContainer>
          <HeaderDashboardBackground style={{width: '90%'}}/>
        </HeaderDashboardImageContainer>
        
        <HeaderContainer>
          
          <HeaderUserInfoContainer >
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
  )
}

export default HeaderDashboard;