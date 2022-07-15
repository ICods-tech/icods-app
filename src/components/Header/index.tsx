import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import BackButton from '../../assets/images/back-button-blue.svg';
import BackButtonWhite from '../../assets/images/back-button-white.svg';
import { Container, Title } from './styles';

interface HeaderProps {
  title: string;
  navigate: string;
  whiteMode?: boolean;
}

const Header = ({ title, navigate, whiteMode = false }: HeaderProps): JSX.Element => {
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
        {whiteMode ? <BackButtonWhite /> : <BackButton />}
      </TouchableOpacity>
      <Title whiteMode={whiteMode}>
        {title}
      </Title>
    </Container>
  );
};

export default Header;
