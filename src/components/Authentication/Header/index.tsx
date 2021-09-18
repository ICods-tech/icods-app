import React from 'react';

import {
    Container,
    Gradient,
    IcodsLogo,
    Title,
} from './styles';

interface HeaderProps {
    isInputFocus: boolean;
}

export function Header({isInputFocus}: HeaderProps){
    return(
        <Gradient isInputFocus={isInputFocus}>
            <Container>
                <IcodsLogo />
                <Title>Um novo jeito de compartilhar emoções</Title>
            </Container>
        </Gradient>
    )
}