import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ButtonTitle, Container } from './styles';
import { ScannerButton } from '../../ScannerButton';

export function AuthFooter() {
  const navigation = useNavigation<any>();

  return (
    <Container>
      <ScannerButton
        onPress={() =>
          navigation.navigate({ name: 'Scanner', key: 'SCANNER_FROM_FOOTER' })
        }
      />
      <ButtonTitle>Escanear</ButtonTitle>

    </Container>
  );
}
