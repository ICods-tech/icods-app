import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';

import {
    Button, Container, IconContainer, Title,
} from './styles';

interface IconRectButtonProps extends RectButtonProps{
    text: string;
    noIcon?: boolean;
    icon?: any;
    color?: 'White' | 'Blue';
}


export function IconRectButton({ text, noIcon, icon: Icon, color, ...rest }: IconRectButtonProps) {
    const content = (
        <Button color={color!} {...rest}>
            {noIcon ? <IconContainer>
                <Icon  
                    width={RFValue(16)}
                    height={RFValue(16)}
                />
            </IconContainer> : <></>}
            <Title color={color!}>{text}</Title>
        </Button>
    )
    return (
        color === 'White' ? (
            <Container>
                {content}
            </Container>
        ) : (content)
    );
}