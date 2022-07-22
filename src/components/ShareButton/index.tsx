import React from 'react';
import {Button, ShareItemContainer} from './styles';
import {Send} from 'react-native-iconly';
import {useTheme} from 'styled-components/native';

export function ShareButton({...rest}) {
  const theme = useTheme();
  return (
    <Button {...rest}>
      <ShareItemContainer>
        <Send size={18} set="bold" color={theme.colors.primary} />
      </ShareItemContainer>
    </Button>
  );
}
