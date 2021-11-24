import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';

import {
    Button, IconContainer, Title,
} from './styles';

interface IconRectButtonProps extends RectButtonProps{
    text: string;
    icon: React.FC<SvgProps>;
}
export function IconRectButton({text, icon: Icon, ...rest}: IconRectButtonProps){
    return (
        <Button {...rest}>
            <IconContainer>
                <Icon 
                    width={RFValue(16)}
                    height={RFValue(16)}
                />
            </IconContainer>
            <Title>{text}</Title>
        </Button>
    );
}