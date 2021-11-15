import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Title } from './styles';
import { ScannerButton } from '../../ScannerButton';

export function AuthFooter(){
  const navigation = useNavigation()
   
  return (
    <Container>
        <ScannerButton 
          onPress={() =>   navigation.navigate( 'Scanner' )}
        />
    </Container>
  )
}