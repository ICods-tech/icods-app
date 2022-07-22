import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {ScannerButton} from '../../atoms/ScannerButton';
import {Container} from './styles';

export function AuthFooter() {
  const navigation = useNavigation();
  return (
    <Container>
      <ScannerButton onPress={() => navigation.navigate('Scanner')} />
    </Container>
  );
}
