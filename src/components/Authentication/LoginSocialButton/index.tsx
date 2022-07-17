import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
import { Button, ButtonText, Container, IconContainer } from './styles';

interface LoginSocialButtonProps extends RectButtonProps {
  title: string;
  icon: React.FC<SvgProps>;
  background?: 'White' | 'Blue';
  textColor?: string;
}

export function LoginSocialButton({
  title,
  icon: Icon,
  background,
  textColor,
  ...rest
}: LoginSocialButtonProps) {
  return (
    <Container
      style={{
        borderWidth: background === 'Blue' ? 0 : 2,
      }}>
      <Button {...rest}>
        <IconContainer>
          <Icon width={RFValue(16)} height={RFValue(16)} />
        </IconContainer>

        <ButtonText textColor={textColor}>{title}</ButtonText>
      </Button>
    </Container>
  );
}
