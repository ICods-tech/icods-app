import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Title } from './styles';
import { ScannerButton } from '../../ScannerButton';
import { Text } from 'react-native';

export function AuthFooter(){
  const navigation = useNavigation()
   
  return (
    <Container>
        <ScannerButton 
          onPress={() => navigation.navigate({ name: 'Scanner', key: 'SCANNER_FROM_FOOTER' })}
        />
    </Container>
  )
}