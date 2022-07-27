import React from 'react';
import {RectButtonProps} from 'react-native-gesture-handler';

import {Button, Gradient, Title} from './styles';

interface HighlightButtonProps extends RectButtonProps {
  text: string;
  icon: any;
}

export function HighlightButton({text, icon, ...rest}: HighlightButtonProps) {
  return (
    <Gradient>
      <Button {...rest}>
        {icon}
        <Title>{text}</Title>
      </Button>
    </Gradient>
  );
}
