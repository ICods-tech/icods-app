import React from 'react';
import {RectButtonProps} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgProps} from 'react-native-svg';

import {Button, Gradient, Title} from './styles';

interface HighlightButtonProps extends RectButtonProps {
  text: string;
  icon: React.FC<SvgProps>;
}

export function HighlightButton({
  text,
  icon: Icon,
  ...rest
}: HighlightButtonProps) {
  return (
    <Gradient>
      <Button {...rest}>
        <Icon width={RFValue(47)} height={RFValue(47)} />
        <Title>{text}</Title>
      </Button>
    </Gradient>
  );
}
