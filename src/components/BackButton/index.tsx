import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {BackBlueIcon, BackWhiteIcon, Button, Container} from './styles';
import {TouchableOpacityProps} from 'react-native';

interface BackButtonProps extends TouchableOpacityProps {
  navigationTo: any;
  customFunction?: () => void;
  color?: 'blue' | 'white';
}

export function BackButton({
  navigationTo,
  customFunction,
  color,
}: BackButtonProps) {
  const navigation = useNavigation();
  return (
    <Container color={color}>
      <Button
        onPress={
          navigationTo === 'WAIT' ? customFunction : () => navigation.goBack()
        }>
        {color === 'white' ? <BackWhiteIcon /> : <BackBlueIcon />}
      </Button>
    </Container>
  );
}
