import React from 'react';

import {
    Container, 
    NotFavoriteIcon
} from './styles';

export function FavoriteButton(){
    return (
        <Container>
            <NotFavoriteIcon />
        </Container>
    );
}