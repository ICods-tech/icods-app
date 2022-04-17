import React from 'react';
import {Container} from './styles';
import Logo from '../../assets/images/iCods_logo.svg';
import LinearGradient from 'react-native-linear-gradient';

const Splash = () => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#2B90D9', '#53C4E8']}
      style={{flex: 1}}>
      <Container>
        <Logo />
      </Container>
    </LinearGradient>
  );
};

export default Splash;
