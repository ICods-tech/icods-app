import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
import { 
    Button, 
    ButtonText, 
    Container, 
    IconContainer 
} from './styles';

interface LoginSocialButtonProps extends RectButtonProperties {
    title: string;
    icon: React.FC<SvgProps>;
    textColor?: string;
}

export function LoginSocialButton({title, icon: Icon, textColor, ...rest}: LoginSocialButtonProps){
    return(
        <Container>
            <Button
                {...rest}
            >
                <IconContainer>
                    <Icon 
                        width={RFValue(16)}
                        height={RFValue(16)}
                    />
                </IconContainer>

                <ButtonText textColor={textColor}>{title}</ButtonText>
            </Button>
        </Container>
    );
}