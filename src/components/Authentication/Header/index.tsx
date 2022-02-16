import React from 'react';

import {
    Container,
    Gradient,
    IcodsLogo,
    Title,
} from './styles';

interface HeaderProps {
    isKeyboardVisible: boolean;
}

export function Header({isKeyboardVisible}: HeaderProps){
    return(
        <Gradient isKeyboardVisible={isKeyboardVisible}>
            <Container>
                <IcodsLogo />
                <Title>Um novo jeito de compartilhar emoções</Title>
            </Container>
        </Gradient>
    )
}