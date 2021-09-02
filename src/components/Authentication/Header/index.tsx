import React from 'react';

import {
    Container,
    IcodsAsteroid,
    IcodsIcon,
} from './styles';

export function Header(){
    return(
        <Container>
            <IcodsAsteroid />
            <IcodsIcon />
        </Container>
    )
}