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
  customBackBehavior?: () => void;
}

const Header = ({ title, navigate, whiteMode = false, customBackBehavior }: HeaderProps): JSX.Element => {
  const navigation = useNavigation<any>();
  const onPressBack = () => {
    if (customBackBehavior) {

      return customBackBehavior();
    } else {
      if (navigate === 'back') {
        return navigation.goBack();
      }
      navigation.navigate(`${navigate}`);
    }
  }
  return (
    <Container>
      <TouchableOpacity
        onPress={onPressBack}>
        {whiteMode ? <BackButtonWhite /> : <BackButton />}
      </TouchableOpacity>
      <Title whiteMode={whiteMode}>
        {title}
      </Title>
    </Container>
  );
};

export default Header;
