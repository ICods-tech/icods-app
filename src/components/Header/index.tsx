import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import BackButton from '../../assets/images/back-button-blue.svg';
import BackButtonWhite from '../../assets/images/back-button-white.svg';
import { Container, Title } from './styles';

interface HeaderProps {
  title: string;
  navigate: string;
  isVideoPlayer?: boolean;
}

const Header = ({ title, navigate, isVideoPlayer }: HeaderProps): JSX.Element => {
  const navigation = useNavigation<any>();

  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          if (navigate === 'back') {
            navigation.goBack();
          } else {
            navigation.navigate(`${navigate}`);
          }
        }}>
        {isVideoPlayer ? <BackButtonWhite /> : <BackButton />}
      </TouchableOpacity>
      <Title>
        {title}
      </Title>
    </Container>
  );
};

export default Header;
