import React from 'react';
import { BorderlessButtonProperties } from 'react-native-gesture-handler';

import {
    Container, 
    FilterIcon, 
} from './styles';

interface FilterButtonProps extends BorderlessButtonProperties{
}

export function FilterButton({...rest}: FilterButtonProps){
    return (
        <Container
            {...rest}
        >
            <FilterIcon />
        </Container>
    );
}