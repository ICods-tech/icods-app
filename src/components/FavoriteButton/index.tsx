import React from 'react';
import { BorderlessButtonProperties } from 'react-native-gesture-handler';
import {
    Button, 
    FavoritedIcon,
    NotFavoriteIcon,
    FavoriteItemContainer
} from './styles'; 

interface FavoriteButtonProps extends BorderlessButtonProperties {
    favorite: boolean;
}

export function FavoriteButton({favorite, ...rest }: FavoriteButtonProps) {
    return (
        <Button
            {...rest}
        >
            <FavoriteItemContainer>
                {favorite ? <FavoritedIcon /> : <NotFavoriteIcon />}
            </FavoriteItemContainer>
        </Button>
    );
}