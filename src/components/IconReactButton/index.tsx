import React from 'react';
import {RectButtonProps} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';

import {Button, Container, IconContainer, Title} from './styles';

interface IconReactButtonProps extends RectButtonProps {
  text: string;
  noIcon?: boolean;
  icon?: any;
  color?: 'White' | 'Blue' | 'Gray';
}

export function IconReactButton({
  text,
  noIcon,
  icon: Icon,
  color,
  ...rest
}: IconReactButtonProps) {
  const content = (
    <Button color={color!} {...rest}>
      {noIcon ? (
        <IconContainer>
          <Icon width={RFValue(16)} height={RFValue(16)} />
        </IconContainer>
      ) : (
        <></>
      )}
      <Title color={color!}>{text}</Title>
    </Button>
  );
  return color === 'White' ? <Container>{content}</Container> : content;
}
