import React from 'react';
import { BorderlessButtonProperties } from 'react-native-gesture-handler';
import { Heart2 } from 'react-native-iconly'
import {
    Button, 
    FavoriteItemContainer
} from './styles'; 

interface FavoriteButtonProps extends BorderlessButtonProperties {
    favorite: boolean;
    background?: 'WHITE' | 'BLUE';
}

export function FavoriteButton({ favorite, background, ...rest }: FavoriteButtonProps) {
    const iconColor = background! === 'WHITE' ? '#2B90D9' :'white'
    const selectedIcon = <Heart2 set='bold' size={18} primaryColor={iconColor} />
    const notSelectedIcon = <Heart2 size={18} primaryColor={iconColor} />
    
    return (
        <Button
            {...rest}
        >
            <FavoriteItemContainer
                background={background!}
            >
                {favorite ? selectedIcon : notSelectedIcon }
            </FavoriteItemContainer>
        </Button>
    );
}